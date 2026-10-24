import type {Vec2} from 'manifold-3d';

// Manifold 3.5.4 supports Square joins, which differ from SVG bevel joins.
// Build complete offset contours; Positive fill resolves their intersections.
// Canonical CrossSection contours have fill on their left, including hole rings.
export function bevelBorder(polygons: Vec2[][], border: number): Vec2[][] {
	return polygons.map((ring) => {
		const normals: Vec2[] = ring.map((point, index) => {
			const next = ring[(index + 1) % ring.length]!;
			const dx = next[0] - point[0];
			const dy = next[1] - point[1];
			const length = Math.hypot(dx, dy);
			return length > 0
				? [(dy * border) / length, (-dx * border) / length]
				: [0, 0];
		});
		const expanded: Vec2[] = [];
		for (const [index, point] of ring.entries()) {
			const normal = normals[index]!;
			const previous = normals[(index + ring.length - 1) % ring.length]!;
			expanded.push([point[0] + previous[0], point[1] + previous[1]]);
			if (previous[0] * normal[1] < previous[1] * normal[0]) {
				// A negative-winding wedge trims concave joins during the union.
				expanded.push(point);
			}

			expanded.push([point[0] + normal[0], point[1] + normal[1]]);
		}

		return expanded;
	});
}
