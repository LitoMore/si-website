import * as THREE from 'three';
import {
	type MagnetMesh,
	type MagnetModel,
	type MagnetSettings,
	modelSvg,
} from './geometry.js';

export function stl(mesh: MagnetMesh) {
	const bytes = new Uint8Array(84 + mesh.numTri * 50);
	const view = new DataView(bytes.buffer);
	bytes.set(new TextEncoder().encode('Simple Magnets - millimeters'));
	view.setUint32(80, mesh.numTri, true);
	for (let triangle = 0; triangle < mesh.numTri; triangle++) {
		const vertices = Array.from({length: 3}, (_, vertex) => {
			const index = mesh.triVerts[triangle * 3 + vertex]! * mesh.numProp;
			return [...mesh.vertProperties.slice(index, index + 3)] as [
				number,
				number,
				number,
			];
		});
		const a = vertices[1]!.map(
			(value, index) => value - vertices[0]![index]!,
		) as [number, number, number];
		const b = vertices[2]!.map(
			(value, index) => value - vertices[0]![index]!,
		) as [number, number, number];
		const normal = [
			a[1] * b[2] - a[2] * b[1],
			a[2] * b[0] - a[0] * b[2],
			a[0] * b[1] - a[1] * b[0],
		];
		const length = Math.max(Math.hypot(...normal), Number.EPSILON);
		const values = [
			...normal.map((value) => value / length),
			...vertices.flat(),
		];
		for (const [index, value] of values.entries()) {
			view.setFloat32(84 + triangle * 50 + index * 4, value, true);
		}
	}

	return bytes;
}

function printablePart(mesh: MagnetMesh, color: string, name: string) {
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(mesh.numVert * 3);
	for (let index = 0; index < mesh.numVert; index++) {
		positions.set(
			mesh.vertProperties.slice(index * mesh.numProp, index * mesh.numProp + 3),
			index * 3,
		);
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setIndex(
		new THREE.BufferAttribute(new Uint32Array(mesh.triVerts), 1),
	);
	const part = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color}));
	part.name = name;
	return part;
}

export async function threeMf(model: MagnetModel, settings: MagnetSettings) {
	const {defaultPrintConfig, exportTo3MF: exportTo3mf} =
		await import('three-3mf-exporter');
	const base = printablePart(model.base, settings.baseColor, 'Magnet base');
	const logoParts = model.logoParts.map((mesh, index) =>
		printablePart(mesh, settings.iconColor, `Logo part ${index + 1}`),
	);
	const printable = new THREE.Group();
	printable.name = 'Simple Magnets';
	printable.add(base, ...logoParts);
	printable.updateMatrixWorld(true);
	try {
		return await exportTo3mf(printable, {
			metadata: {
				// Preserve the same Bambu application marker as Badge3D so filament
				// assignments load when the file is opened as a project.
				...defaultPrintConfig.metadata,
				// eslint-disable-next-line @typescript-eslint/naming-convention -- This is the exporter's metadata API key.
				ApplicationTitle: 'Simple Magnets multicolor magnet',
			},
		});
	} finally {
		for (const part of [base, ...logoParts]) {
			part.geometry.dispose();
			part.material.dispose();
		}
	}
}

export function download(
	data: Uint8Array | string | Blob,
	filename: string,
	mime: string,
) {
	const content =
		data instanceof Uint8Array ? new Uint8Array(data).buffer : data;
	const blob =
		content instanceof Blob ? content : new Blob([content], {type: mime});
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	setTimeout(() => {
		URL.revokeObjectURL(url);
	}, 1000);
}

export async function downloadPng(
	model: MagnetModel,
	settings: MagnetSettings,
	filename: string,
) {
	const source = URL.createObjectURL(
		new Blob([modelSvg(model, settings)], {type: 'image/svg+xml'}),
	);
	try {
		const image = new Image();
		image.src = source;
		await image.decode();
		const canvas = document.createElement('canvas');
		canvas.width = Math.round(
			(2048 * model.width) / Math.max(model.width, model.height),
		);
		canvas.height = Math.round(
			(2048 * model.height) / Math.max(model.width, model.height),
		);
		const context = canvas.getContext('2d');
		if (!context) {
			throw new Error('Could not create the image.');
		}

		context.drawImage(image, 0, 0, canvas.width, canvas.height);
		const blob = await new Promise<Blob>((resolve, reject) => {
			canvas.toBlob((result) => {
				if (result) {
					resolve(result);
				} else {
					reject(new Error('PNG export failed.'));
				}
			}, 'image/png');
		});
		download(new Uint8Array(await blob.arrayBuffer()), filename, 'image/png');
	} finally {
		URL.revokeObjectURL(source);
	}
}
