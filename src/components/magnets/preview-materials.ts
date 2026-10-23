import {MeshBasicMaterial, MeshStandardMaterial} from 'three';

export function createPreviewMaterials(color: string, part: 'base' | 'logo') {
	// Badge3d uses unlit caps for source colors and lit walls for depth.
	const cap = new MeshBasicMaterial({color, toneMapped: false});
	const wall = new MeshStandardMaterial({
		color,
		roughness: part === 'base' ? 0.58 : 0.46,
		metalness: part === 'base' ? 0.02 : 0,
	});
	return [cap, wall] as const;
}
