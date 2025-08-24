import {type BitmapFormat} from '#types';
import {getSvg} from '#utils';

export const downloadSvg = async (
	version: string,
	slug: string,
	hex?: string,
) => {
	let svg = await getSvg(version, slug);
	if (hex) svg = svg.replace('<svg ', `<svg fill="#${hex}" `);
	// eslint-disable-next-line no-restricted-globals
	const url = `data:image/svg+xml;base64,${btoa(svg)}`;
	const a = document.createElement('a');
	a.classList.add('hidden');
	a.setAttribute('href', url);
	a.setAttribute('download', `${slug}.svg`);
	document.body.append(a);
	a.click();
	a.remove();
};

export const downloadPdf = async (version: string, slug: string) => {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {jsPDF: JsPdf} = await import('jspdf');
	await import('svg2pdf.js');
	const svgString = await getSvg(version, slug);
	const svgPath = svgString.split('"')[7];
	if (!svgPath) return;

	const ns = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS(ns, 'svg');
	svg.setAttributeNS(null, 'role', 'img');
	svg.setAttributeNS(null, 'viewBox', '0 0 24 24');

	const title = document.createElementNS(ns, 'title');
	title.textContent = slug;

	const path = document.createElementNS(ns, 'path');
	path.setAttributeNS(null, 'd', svgPath);

	svg.append(title);
	svg.append(path);

	const doc = new JsPdf();
	await doc.svg(svg, {
		x: 0,
		y: 0,
		width: 24,
		height: 24,
	});
	doc.save(`${slug}.pdf`);
};

export const downloadBitmap = async (
	version: string,
	slug: string,
	hex: string,
	format: BitmapFormat,
	size = 512,
	// eslint-disable-next-line max-params
) => {
	let svg = await getSvg(version, slug);
	svg = svg.replace('<svg ', `<svg fill="#${hex}" `);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	const ratio = globalThis.devicePixelRatio || 1;
	canvas.width = size * ratio;
	canvas.height = size * ratio;
	canvas.style.width = size + 'px';
	canvas.style.height = size + 'px';
	ctx.scale(ratio, ratio);
	const img = new Image();
	img.width = size;
	img.height = size;
	img.addEventListener('load', () => {
		ctx.drawImage(img, 0, 0, size, size);
		const pngUrl = canvas.toDataURL(`image/${format}`);
		const link = document.createElement('a');
		link.href = pngUrl;
		link.download = `${slug}.png`;
		link.click();
	});

	// eslint-disable-next-line no-restricted-globals
	img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
};
