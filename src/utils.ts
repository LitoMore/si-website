import {type CSSProperties} from 'react';
import {
	type BitmapFormat,
	BrightnessMode,
	CardSize,
	ColorTheme,
	type Icon,
	type IconData,
	type JsDelivrNpmResponse,
} from '#types';
import {colorForBackground} from './vendor/make-badge-color.js';
import {getIconSlug} from './vendor/simple-icons-sdk.js';

export {colorForBackground} from './vendor/make-badge-color.js';
export {getIconSlug} from './vendor/simple-icons-sdk.js';

export const pixelRatio = globalThis.devicePixelRatio || 1;

export const getLatestVersion = async (packageName: string) => {
	const response = await fetch(
		new Request(`https://data.jsdelivr.com/v1/packages/npm/${packageName}`, {
			cache: 'no-cache',
		}),
	);
	const json = (await response.json()) as JsDelivrNpmResponse;
	return json.tags['latest'] ?? 'latest';
};

export const getIconsData = async (
	simpleIconsVersion: string,
	brightnessMode: BrightnessMode,
) => {
	const [major] = simpleIconsVersion.split('.');
	const isNewFormat = Number(major) >= 14;
	const isNewDataFolder = Number(major) >= 15;
	const response = await fetch(
		`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/${
			isNewDataFolder ? 'data' : '_data'
		}/simple-icons.json`,
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json = await response.json();
	const iconsData = (isNewFormat ? json : json.icons) as IconData[];
	return iconsData.map((icon, index) => {
		const {relativeColor, brightness} = colorForBackground(
			`#${icon.hex}`,
			brightnessMode === BrightnessMode.SimpleIcons,
		);
		return {
			...icon,
			slug: getIconSlug(icon),
			index,
			relativeColor,
			brightness,
		};
	}) as Icon[];
};

export const getSvg = async (simpleIconsVersion: string, slug: string) => {
	const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
	const response = await fetch(iconUrl);
	const svg = await response.text();
	return svg;
};

export const getSvgPath = (svg: string) => svg.split('"')[7];

export const normalizeColor = (style?: string) => {
	if (style && /^([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(style)) {
		if (style.length === 6 || style.length === 8) return style;
		if (style.length === 3 || style.length === 4) {
			return [...style].map((char) => char + char).join('');
		}
	}

	return undefined;
};

export const getSvgDataUri = (svg: string, color?: string) => {
	const hexColor = normalizeColor(color);
	// eslint-disable-next-line no-restricted-globals
	return `data:image/svg+xml;base64,${btoa(
		hexColor ? svg.replace('<svg ', `<svg fill="#${hexColor}" `) : svg,
	)}`;
};

export const getMaskStyles = (
	version: string,
	icon: Icon,
	isLight: boolean,
): CSSProperties => ({
	backgroundColor: isLight ? `#${icon.hex}` : 'var(--si-gallery-fg-dark)',
	/* eslint-disable @typescript-eslint/naming-convention */
	WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
	WebkitMaskSize: 'contain',
	WebkitMaskRepeat: 'no-repeat',
	WebkitMaskPosition: 'center',
	/* eslint-enable @typescript-eslint/naming-convention */
});

export const getColorVariables = (isDark: boolean) => {
	return {
		iconFg: isDark ? '#eee' : '#111',
		headerFg: isDark ? 'var(--si-header-fg-dark)' : 'var(--si-header-fg)',
		headerBg: isDark ? 'var(--si-header-bg-dark)' : 'var(--si-header-bg)',
		galleryFg: isDark ? 'var(--si-gallery-fg-dark)' : 'var(--si-gallery-fg)',
		galleryBg: isDark ? 'var(--si-gallery-bg-dark)' : 'var(--si-gallery-bg)',
		cardFg: isDark ? 'var(--si-card-fg-dark)' : 'var(--si-card-fg)',
		cardBg: isDark ? 'var(--si-card-bg-dark)' : 'var(--si-card-bg)',
		emptyFg: isDark ? 'var(--si-empty-fg-dark)' : 'var(--si-empty-fg)',
		contrast: isDark ? 'var(--si-contrast-dark)' : 'var(--si-contrast)',
	};
};

export const getSimpleIconsCdnUrl = (
	slug: string,
	options?: {autoViewbox?: boolean; size?: number},
) => {
	const url = new URL(`https://cdn.simpleicons.org/${slug}`);
	if (options?.autoViewbox) url.searchParams.set('viewbox', 'auto');
	if (options?.size) url.searchParams.set('size', String(options.size));
	return url.toString();
};

export const getJsdelivrCdnUrl = (version: string, slug: string) =>
	`https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${slug}.svg`;

export const getUnpkgCdnUrl = (version: string, slug: string) =>
	`https://unpkg.com/simple-icons@${version}/icons/${slug}.svg`;

export const getShareUrl = (
	base: string,
	parameters?: Record<string, string>,
) => {
	const shareUrl = new URL(base);
	if (parameters) {
		for (const [key, value] of Object.entries(parameters))
			shareUrl.searchParams.set(key, value);
	}

	return shareUrl.toString();
};

export const searcherKeySelector = (icon: Icon): string[] =>
	[
		icon.title,
		icon.slug,
		icon.aliases?.aka,
		icon.aliases?.old,
		icon.aliases?.dup?.map((duplicate) => duplicate.title),
		Object.values(icon.aliases?.loc ?? {}),
		icon.license?.type && icon.license.type !== 'custom'
			? icon.license.type
			: undefined,
	]
		.flat()
		.filter(Boolean) as string[];

export const getAliases = (icon?: Icon) => {
	if (!icon) return [];
	const aka = icon.aliases?.aka ?? [];
	const old = icon.aliases?.old ?? [];
	const dup =
		icon.aliases?.dup
			?.map((d) => [d.title, ...Object.values(d.loc ?? {})])
			.flat() ?? [];
	const loc = Object.values(icon.aliases?.loc ?? {});
	return [...new Set([...aka, ...old, ...dup, ...loc])];
};

export const ellipsis = (text: string, maxLength: number) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export const tidyLink = (url: string, isMobileSize?: boolean) => {
	const tidyUrl = url.replace(/^https:\/\//, '').replace(/^www\./, '');
	return isMobileSize ? tidyUrl : ellipsis(tidyUrl, 30);
};

export const encodeBadgeContentParameters = (parameters: string[]) =>
	parameters.map((p) =>
		encodeURIComponent(p.replaceAll('-', '--').replaceAll('_', '__')),
	);

export const makeBadge = (icon: Icon) => {
	const staticBadgeBaseUrl = 'https://img.shields.io/badge/';
	const badgeContent = encodeBadgeContentParameters([
		icon.title,
		icon.hex,
	]).join('-');
	const badgeUrl = new URL(staticBadgeBaseUrl + badgeContent);
	badgeUrl.searchParams.set('logo', icon.slug);
	badgeUrl.searchParams.set('logoColor', icon.relativeColor.slice(1));
	return badgeUrl.toString();
};

export const cardSizeToPixels = (
	width: number,
	gap: number,
	cardSize: number | string,
) => {
	if (typeof cardSize === 'number') return cardSize;
	if (!cardSize.endsWith('%')) return CardSize.Small;
	const percentage = Number(cardSize.replace('%', ''));
	return (width * percentage) / 100 - gap;
};

export const getColorScheme = (colorTheme: ColorTheme) =>
	({
		[ColorTheme.Auto]: undefined,
		[ColorTheme.Light]: 'only light',
		[ColorTheme.Dark]: 'only dark',
	})[colorTheme];

export const cloneImagetoSize = (image: HTMLImageElement, size: number) => {
	const clone = image.cloneNode() as HTMLImageElement;
	clone.width = size;
	clone.height = size;
	return clone;
};

export const getIconsInRows = (icons: Icon[], iconsPerRow: number) => {
	const iconsInRows: Icon[][] = [];
	const rows = Math.floor(icons.length / iconsPerRow);
	for (let i = 0; i < rows; i++) {
		iconsInRows.push(icons.slice(i * iconsPerRow, (i + 1) * iconsPerRow));
	}

	return iconsInRows;
};

export const copyFromCanvas = (
	canvas: HTMLCanvasElement,
	format: BitmapFormat,
) => {
	canvas.toBlob((blob) => {
		if (!blob) return;
		const item = new ClipboardItem({[`image/${format}`]: blob});
		void navigator.clipboard.write([item]);
	});
};

export const downloadFromCanvas = (
	canvas: HTMLCanvasElement,
	format: BitmapFormat,
) => {
	canvas.toBlob((blob) => {
		if (!blob) return;
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `image.${format}`;
		link.click();
	});
};

export const getImageCanvas = async (
	imageSource: string,
	width: number,
	height: number,
	options?: {
		imageWidth?: number;
		imageHeight?: number;
	},
): Promise<{canvas: HTMLCanvasElement; context: CanvasRenderingContext2D}> => {
	const image = new Image();
	if (options?.imageWidth !== undefined) image.width = options.imageWidth;
	if (options?.imageHeight !== undefined) image.height = options.imageHeight;
	image.src = imageSource;
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	return new Promise((resolve, reject) => {
		image.addEventListener('load', () => {
			const drawWidth = width * pixelRatio;
			const drawHeight = height * pixelRatio;
			canvas.width = drawWidth;
			canvas.height = drawHeight;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			context.scale(pixelRatio, pixelRatio);
			context.drawImage(image, 0, 0, width, height);
			resolve({canvas, context});
		});
		image.addEventListener('error', () => {
			reject(new Error(`Failed to load image`));
		});
	});
};
