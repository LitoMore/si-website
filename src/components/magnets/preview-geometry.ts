import type {Mesh} from 'manifold-3d';
import {BufferAttribute, BufferGeometry} from 'three';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';

export function createPreviewGeometry(mesh: Mesh) {
	const indexed = new BufferGeometry();
	const positions = new Float32Array(mesh.numVert * 3);
	for (let index = 0; index < mesh.numVert; index++) {
		positions.set(
			mesh.vertProperties.slice(index * mesh.numProp, index * mesh.numProp + 3),
			index * 3,
		);
	}

	indexed.setAttribute('position', new BufferAttribute(positions, 3));
	const caps: number[] = [];
	const walls: number[] = [];
	for (let index = 0; index < mesh.triVerts.length; index += 3) {
		const a = mesh.triVerts[index]!;
		const b = mesh.triVerts[index + 1]!;
		const c = mesh.triVerts[index + 2]!;
		const z = positions[a * 3 + 2];
		const isCap = z === positions[b * 3 + 2] && z === positions[c * 3 + 2];
		(isCap ? caps : walls).push(a, b, c);
	}

	// Match ExtrudeGeometry's cap/wall material slots used by badge3d, without
	// changing the original Manifold mesh that the exporters use.
	indexed.setIndex([...caps, ...walls]);
	indexed.addGroup(0, caps.length, 0);
	indexed.addGroup(caps.length, walls.length, 1);
	// Keep caps flat at the 90° rim while smoothing adjacent curved wall faces.
	const result = toCreasedNormals(indexed, Math.PI / 6);
	indexed.dispose();
	return result;
}
