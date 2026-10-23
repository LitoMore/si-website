import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import type {MagnetModel, MagnetSettings} from './geometry.js';
import {useMagnetI18n} from './i18n.js';
import {createPreviewGeometry} from './preview-geometry.js';
import {createPreviewLighting} from './preview-lighting.js';
import {createPreviewMaterials} from './preview-materials.js';

export default function Preview({
	model,
	settings,
	isFront,
	reset,
}: {
	readonly model: MagnetModel;
	readonly settings: MagnetSettings;
	readonly isFront: boolean;
	readonly reset: number;
}) {
	const {labels} = useMagnetI18n();
	const hostRef = useRef<HTMLDivElement>(null);
	const [error, setError] = useState(false);
	const colorsRef = useRef({
		base: settings.baseColor,
		logo: settings.iconColor,
	});
	const materialsRef = useRef<{
		base: ReturnType<typeof createPreviewMaterials>;
		logo: ReturnType<typeof createPreviewMaterials>;
	}>(undefined);
	useEffect(() => {
		colorsRef.current = {base: settings.baseColor, logo: settings.iconColor};
		for (const part of ['base', 'logo'] as const) {
			for (const material of materialsRef.current?.[part] ?? []) {
				material.color.set(colorsRef.current[part]);
			}
		}
	}, [settings.baseColor, settings.iconColor]);
	useEffect(() => {
		if (!hostRef.current) {
			return;
		}

		const element = hostRef.current;
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		} catch {
			queueMicrotask(() => {
				setError(true);
			});
			return;
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 2000);
		camera.up.set(0, 0, 1);
		const size = Math.max(model.width, model.height);
		camera.position.set(
			0,
			isFront ? 0 : -size * 0.92,
			size * (isFront ? 2.8 : 2.4),
		);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 0, settings.baseHeight / 2);
		controls.enableDamping = true;
		controls.enablePan = false;
		controls.minDistance = size * 1.2;
		controls.maxDistance = size * 6;
		controls.maxPolarAngle = Math.PI * 0.49;
		const {hemisphere, key, rim} = createPreviewLighting();
		scene.add(hemisphere, key, rim);
		const baseGeometry = createPreviewGeometry(model.base);
		const logoGeometry = createPreviewGeometry(model.logo);
		const baseMaterials = createPreviewMaterials(
			colorsRef.current.base,
			'base',
		);
		const logoMaterials = createPreviewMaterials(
			colorsRef.current.logo,
			'logo',
		);
		materialsRef.current = {base: baseMaterials, logo: logoMaterials};
		scene.add(
			new THREE.Mesh(baseGeometry, [...baseMaterials]),
			new THREE.Mesh(logoGeometry, [...logoMaterials]),
		);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x00_00_00, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		element.append(renderer.domElement);
		const resize = new ResizeObserver(() => {
			const {width, height} = element.getBoundingClientRect();
			if (width === 0 || height === 0) {
				return;
			}

			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			// Expanding position controls can make the viewport taller. Fit both
			// axes so a circle or square stays fully visible in the narrower view.
			const halfVertical = THREE.MathUtils.degToRad(camera.fov) / 2;
			const halfHorizontal = Math.atan(Math.tan(halfVertical) * camera.aspect);
			const radius =
				Math.hypot(
					model.width,
					model.height,
					settings.baseHeight + settings.reliefHeight,
				) / 2;
			const distance =
				(radius / Math.sin(Math.min(halfVertical, halfHorizontal))) * 1.08;
			const direction = camera.position
				.clone()
				.sub(controls.target)
				.normalize();
			camera.position
				.copy(controls.target)
				.addScaledVector(direction, distance);
			controls.maxDistance = Math.max(size * 6, distance * 2);
			controls.update();
		});
		resize.observe(element);
		renderer.setAnimationLoop(() => {
			controls.update();
			renderer.render(scene, camera);
		});
		return () => {
			materialsRef.current = undefined;
			resize.disconnect();
			renderer.setAnimationLoop(null);
			controls.dispose();
			baseGeometry.dispose();
			logoGeometry.dispose();
			for (const material of [...baseMaterials, ...logoMaterials]) {
				material.dispose();
			}

			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		};
	}, [model, settings.baseHeight, settings.reliefHeight, isFront, reset]);
	return (
		<div
			ref={hostRef}
			aria-label={labels.previewLabel}
			className="three-preview"
		>
			{error ? (
				<p className="preview-error">{labels.previewUnavailable}</p>
			) : null}
		</div>
	);
}
