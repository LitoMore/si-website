// Preview layout and interactions follow simple-icons/simple-icons-website-rs (CC0-1.0).
import {svgPathBbox} from 'svg-path-bbox';
import svgpath from 'svgpath';
import {getIconSlug} from '#utils';

export const previewWidth = 740;
export const previewHeight = 520;
export const isValidColor = (color: string) =>
	/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(color);
export const normalizePreviewColor = (value: string) => {
	// RGB channels are consumed positionally.
	// eslint-disable-next-line regexp/prefer-named-capture-group
	const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(value.trim());
	return rgb?.slice(1).every((channel) => Number(channel) <= 255)
		? rgb
				.slice(1)
				.map((channel) => Number(channel).toString(16).padStart(2, '0'))
				.join('')
				.toUpperCase()
		: value.replaceAll('#', '').trim().toUpperCase().slice(0, 6);
};

export const previewSlug = (title: string) =>
	getIconSlug({title, hex: '', source: ''});
export const escapeXml = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll("'", '&apos;');
export const iconSvg = (title: string, path: string, fill?: string) =>
	`<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"${fill ? ` fill="${escapeXml(fill)}"` : ''}><title>${escapeXml(title)}</title><path d="${escapeXml(path)}"/></svg>`;
export const svgDataUrl = (svg: string) =>
	`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
export const svgBase64 = (svg: string) => {
	const bytes = new TextEncoder().encode(svg);
	// eslint-disable-next-line no-restricted-globals -- badge-maker expects a base64 data URL.
	return `data:image/svg+xml;base64,${btoa(Array.from(bytes, (byte) => String.fromCodePoint(byte)).join(''))}`;
};

export const downloadBlob = (blob: Blob, filename: string) => {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	setTimeout(() => {
		URL.revokeObjectURL(url);
	}, 1000);
};

export type PathIssue = {
	message: string;
	start?: number;
	end?: number;
	fix?: string;
};
export const lintPath = (
	path: string,
	labels: {
		invalidPath: string;
		precision: string;
		negativeZero: string;
		size: string;
		centered: string;
		collinear: string;
	},
): PathIssue[] => {
	try {
		if (!/^m/i.test(path.trim()) || /[^\s\d+,\-.acehlmqstvz]/i.test(path))
			return [{message: labels.invalidPath}];
		const parsed = svgpath(path);
		if ('err' in parsed && parsed.err) return [{message: labels.invalidPath}];
		const [left, top, right, bottom] = svgPathBbox(path);
		const width = right - left;
		const height = bottom - top;
		if (
			[left, top, right, bottom].some((value) => !Number.isFinite(value)) ||
			Math.max(width, height) === 0
		)
			return [{message: labels.invalidPath}];
		const issues: PathIssue[] = [];
		let previousLine: {dx: number; dy: number; index: number} | undefined;
		let redundantIndex: number | undefined;
		parsed.abs().iterate((segment, index, x, y) => {
			const end =
				segment[0] === 'L'
					? [segment[1], segment[2]]
					: segment[0] === 'H'
						? [segment[1], y]
						: segment[0] === 'V'
							? [x, segment[1]]
							: undefined;
			if (!end) {
				previousLine = undefined;
				return;
			}

			const dx = end[0]! - x;
			const dy = end[1]! - y;
			if (
				previousLine &&
				Math.abs(previousLine.dx * dy - previousLine.dy * dx) < 0.000001 &&
				previousLine.dx * dx + previousLine.dy * dy >= 0
			)
				redundantIndex ??= previousLine.index;
			previousLine = {dx, dy, index};
		});
		if (redundantIndex !== undefined) {
			const segments: string[] = [];
			parsed.iterate((segment, index) => {
				if (index !== redundantIndex) segments.push(segment.join(' '));
			});
			issues.push({message: labels.collinear, fix: segments.join(' ')});
		}

		const negative = /-0(?=[\s,achlmqstvz]|$)/i.exec(path);
		if (negative)
			issues.push({
				message: labels.negativeZero,
				start: negative.index,
				end: negative.index + 2,
				fix:
					path.slice(0, negative.index) + '0' + path.slice(negative.index + 2),
			});
		const precision = /\.\d{4,}/.exec(path);
		if (precision)
			issues.push({
				message: labels.precision,
				start: precision.index,
				end: precision.index + precision[0].length,
				fix: svgpath(path).round(3).toString(),
			});
		if (Math.abs(Math.max(width, height) - 24) > 0.001) {
			const scale = 24 / Math.max(width, height);
			issues.push({
				message: labels.size,
				fix: svgpath(path)
					.translate(-left, -top)
					.scale(scale)
					.translate((24 - width * scale) / 2, (24 - height * scale) / 2)
					.round(3)
					.toString(),
			});
		}

		if (
			Math.abs((left + right) / 2 - 12) > 0.001 ||
			Math.abs((top + bottom) / 2 - 12) > 0.001
		)
			issues.push({
				message: labels.centered,
				fix: svgpath(path)
					.translate(12 - (left + right) / 2, 12 - (top + bottom) / 2)
					.round(3)
					.toString(),
			});
		return issues;
	} catch {
		return [{message: labels.invalidPath}];
	}
};

export const previewPng = async (svg: SVGSVGElement): Promise<Blob> => {
	const image = new Image();
	image.src = svgDataUrl(new XMLSerializer().serializeToString(svg));
	await image.decode();
	const canvas = document.createElement('canvas');
	const ratio = Math.max(globalThis.devicePixelRatio || 1, 1);
	canvas.width = previewWidth * ratio;
	canvas.height = previewHeight * ratio;
	const context = canvas.getContext('2d')!;
	context.scale(ratio, ratio);
	context.drawImage(image, 0, 0, previewWidth, previewHeight);
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(new Error('PNG export failed'));
		}, 'image/png');
	});
};
