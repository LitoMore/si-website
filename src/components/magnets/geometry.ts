import createManifold, {
	type CrossSection,
	type Manifold,
	type Mesh,
	type Vec2,
} from 'manifold-3d';
import wasmUrl from 'manifold-3d/manifold.wasm?url';
import {split} from 'svg-path-areas-splitter';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';

export type MagnetSettings = {
	style: 'outline' | 'square' | 'circle';
	size: number;
	border: number;
	radius: number;
	iconScale: number;
	circleIconScale: number;
	offsetX: number;
	offsetY: number;
	baseHeight: number;
	reliefHeight: number;
	baseColor: string;
	iconColor: string;
};

export const defaults: MagnetSettings = {
	style: 'outline',
	size: 50,
	border: 3.5,
	radius: 11,
	iconScale: 76,
	circleIconScale: 70,
	offsetX: 0,
	offsetY: 0,
	baseHeight: 3,
	reliefHeight: 1,
	baseColor: '#ffffff',
	iconColor: '#00ccff',
};

export type MagnetModel = {
	base: Mesh;
	logo: Mesh;
	logoParts: Mesh[];
	fused: Mesh;
	basePolygons: Vec2[][];
	logoPolygons: Vec2[][];
	width: number;
	height: number;
	components: number;
	volume: number;
};

let kernel: ReturnType<typeof createManifold> | undefined;
export async function getKernel() {
	kernel ??= createManifold({locateFile: () => wasmUrl}).then((module) => {
		module.setup();
		return module;
	});
	return kernel;
}

export function signedArea(points: Vec2[]) {
	let area = 0;
	for (const [index, point] of points.entries()) {
		const next = points[(index + 1) % points.length]!;
		area += point[0] * next[1] - next[0] * point[1];
	}

	return area / 2;
}

function pathPolygons(path: string) {
	const svg = new SVGLoader().parse(
		`<svg xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`,
	);
	const polygons: Vec2[][] = [];
	for (const shape of svg.paths.flatMap((svgPath) => svgPath.toShapes())) {
		const points = shape.extractPoints(48);
		for (const [index, ring] of [points.shape, ...points.holes].entries()) {
			const contour: Vec2[] = ring.map((point) => [point.x, -point.y]);
			if (signedArea(contour) > 0 !== (index === 0)) {
				contour.reverse();
			}

			polygons.push(contour);
		}
	}

	return polygons;
}

export async function createModel(
	path: string,
	settings: MagnetSettings,
): Promise<MagnetModel> {
	const kernelModule = await getKernel();
	const objects: Array<CrossSection | Manifold> = [];
	function keep<T extends CrossSection | Manifold>(object: T): T {
		objects.push(object);
		return object;
	}

	try {
		const original = keep(new kernelModule.CrossSection(pathPolygons(path)));
		if (original.isEmpty()) {
			throw new Error('The icon has no closed contours to build.');
		}

		const bounds = original.bounds();
		const longest = Math.max(
			bounds.max[0] - bounds.min[0],
			bounds.max[1] - bounds.min[1],
		);
		const center: Vec2 = [
			(bounds.min[0] + bounds.max[0]) / 2,
			(bounds.min[1] + bounds.max[1]) / 2,
		];
		const iconScale =
			settings.style === 'circle'
				? settings.circleIconScale
				: settings.iconScale;
		const logoSize =
			settings.style === 'outline'
				? settings.size - 2 * settings.border
				: (settings.size * iconScale) / 100;
		const scale = logoSize / (settings.style === 'outline' ? longest : 24);
		function transformLogo(section: CrossSection) {
			const centered = keep(section.translate([-center[0], -center[1]]));
			const scaled = keep(centered.scale(scale));
			return settings.style === 'outline'
				? scaled
				: keep(scaled.translate([settings.offsetX, settings.offsetY]));
		}

		const logo = transformLogo(original);
		let base: CrossSection;
		if (settings.style === 'circle') {
			base = keep(kernelModule.CrossSection.circle(settings.size / 2, 128));
		} else if (settings.style === 'square') {
			const radius = Math.min(settings.radius, settings.size / 2);
			if (radius >= settings.size / 2) {
				base = keep(kernelModule.CrossSection.circle(settings.size / 2, 128));
			} else {
				const square = keep(
					kernelModule.CrossSection.square(
						[settings.size - radius * 2, settings.size - radius * 2],
						true,
					),
				);
				base =
					radius > 0 ? keep(square.offset(radius, 'Round', 2, 128)) : square;
			}
		} else {
			const expanded = keep(logo.offset(settings.border, 'Round', 2, 96));
			// Remove every interior contour AFTER offsetting: enclosed gaps get solid backing.
			base = keep(
				new kernelModule.CrossSection(
					expanded.toPolygons().filter((ring) => signedArea(ring) > 0),
				),
			);
		}

		const overflow = keep(logo.subtract(base));
		if (overflow.area() > 0.001) {
			throw new Error(
				'The icon extends beyond the base. Reduce its scale, adjust its offset, or change the base shape.',
			);
		}

		const baseSolid = keep(base.extrude(settings.baseHeight));
		const relief = keep(logo.extrude(settings.reliefHeight));
		const raised = keep(relief.translate([0, 0, settings.baseHeight]));
		const fused = keep(baseSolid.add(raised));
		const logoParts: Mesh[] = [];
		function addLogoRegion(region: CrossSection) {
			if (region.isEmpty()) {
				return;
			}

			// One colorable object per library area, including multiple shells if
			// neighboring areas divide its outline. Use the full icon's transform.
			const section = transformLogo(region);
			const solid = keep(section.extrude(settings.reliefHeight));
			const part = keep(solid.translate([0, 0, settings.baseHeight]));
			logoParts.push(part.getMesh());
		}

		const candidates = split(path, 'nonzero').map((area) =>
			keep(new kernelModule.CrossSection(pathPolygons(area))),
		);
		let remaining = original;
		// Assign nested small areas first so a surrounding fill cannot swallow
		// an independently colorable inner region. Source-order breaks area ties.
		for (const candidate of candidates.toSorted(
			(a, b) => a.area() - b.area(),
		)) {
			// The splitter returns fill-area outlines without their counters.
			// Clip against the original fill to restore holes and avoid overlaps.
			const region = keep(candidate.intersect(remaining));
			addLogoRegion(region);
			remaining = keep(remaining.subtract(region));
		}

		// Winding-dependent omissions in the splitter must never drop source
		// geometry; recover any uncovered fill as separately selectable islands.
		for (const component of remaining.decompose()) {
			keep(component);
			addLogoRegion(component);
		}

		const parts = base.decompose();
		const components = parts.length;
		for (const part of parts) {
			part.delete();
		}

		const box = base.bounds();
		return {
			base: baseSolid.getMesh(),
			logo: raised.getMesh(),
			logoParts,
			fused: fused.getMesh(),
			basePolygons: base.toPolygons(),
			logoPolygons: logo.toPolygons(),
			width: box.max[0] - box.min[0],
			height: box.max[1] - box.min[1],
			components,
			volume: fused.volume(),
		};
	} finally {
		for (const object of objects.toReversed()) {
			object.delete();
		}
	}
}

export function polygonsToPath(polygons: Vec2[][]) {
	return polygons
		.map(
			(ring) =>
				`${ring.map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0].toFixed(4)},${(-point[1]).toFixed(4)}`).join('')}Z`,
		)
		.join('');
}

export function modelSvg(model: MagnetModel, settings: MagnetSettings) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${model.width}mm" height="${model.height}mm" viewBox="${-model.width / 2} ${-model.height / 2} ${model.width} ${model.height}"><path fill="${settings.baseColor}" fill-rule="nonzero" d="${polygonsToPath(model.basePolygons)}"/><path fill="${settings.iconColor}" fill-rule="nonzero" d="${polygonsToPath(model.logoPolygons)}"/></svg>`;
}
