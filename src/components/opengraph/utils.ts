import {type OpenGraphImage} from '#types';

export const isValidOpenGraphImage = (image: OpenGraphImage) =>
	Object.values(image).every((value) => Number.isSafeInteger(value)) &&
	image.width >= 128 &&
	image.width <= 4096 &&
	image.height >= 128 &&
	image.height <= 4096 &&
	image.size >= 8 &&
	image.size <= 256 &&
	image.gap >= 0 &&
	image.gap <= 256 &&
	image.size + image.gap * 2 <= Math.min(image.width, image.height);

export const openGraphGrid = ({width, height, size, gap}: OpenGraphImage) => {
	const rows = Math.floor((height - gap) / (size + gap));
	const columns = Math.floor((width - gap) / (size + gap));
	const ratio = Math.min(2 + (rows % 2), rows, columns);
	const centerColumn = (columns - ratio) / 2;
	const centerRow = (rows - ratio) / 2;
	const left = (width - (columns * size + (columns - 1) * gap)) / 2;
	const top = (height - (rows * size + (rows - 1) * gap)) / 2;
	return {
		rows,
		columns,
		centerSize: size * ratio + gap * (ratio - 1),
		centerX: left + centerColumn * (size + gap),
		centerY: top + centerRow * (size + gap),
		position: (index: number) => ({
			x: left + (index % columns) * (size + gap),
			y: top + Math.floor(index / columns) * (size + gap),
		}),
		isCenter(index: number) {
			const row = Math.floor(index / columns);
			const column = index % columns;
			return (
				row >= Math.floor(centerRow) &&
				row < Math.ceil(centerRow + ratio) &&
				column >= Math.floor(centerColumn) &&
				column < Math.ceil(centerColumn + ratio)
			);
		},
	};
};

export const loadOpenGraphImage = async (source: string) => {
	const image = new Image();
	// Set CORS before starting the request so the canvas remains exportable.
	image.crossOrigin = 'anonymous';
	await new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(() => {
			reject(new Error('Icon loading timed out'));
		}, 30_000);
		image.addEventListener('load', () => {
			clearTimeout(timeout);
			resolve();
		});

		image.addEventListener('error', () => {
			clearTimeout(timeout);
			reject(new Error('Icon loading failed'));
		});

		image.src = source;
	});
	return image;
};

export const canCopyOpenGraphImage = () =>
	globalThis.isSecureContext &&
	typeof ClipboardItem !== 'undefined' &&
	Boolean(navigator.clipboard?.write);

export const openGraphFormatLabel = (format: string) =>
	format === 'webp' ? 'WebP' : format.toUpperCase();

export const openGraphMimeType = (format: string) =>
	`image/${format === 'jpg' ? 'jpeg' : format}`;

export const supportedOpenGraphFormats = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	return ['png', 'jpg', 'webp'].filter((format) =>
		canvas
			.toDataURL(openGraphMimeType(format))
			.startsWith(`data:${openGraphMimeType(format)};`),
	);
};
