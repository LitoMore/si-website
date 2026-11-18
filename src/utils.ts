import {
	type BitmapFormat,
	BrightnessMode,
	CardSize,
	ColorTheme,
	type Icon,
} from '#types';
import {loadIconCatalog} from './icon-catalog/client.js';

export {colorForBackground} from './vendor/make-badge-color.js';
export {getIconSlug} from './vendor/simple-icons-sdk.js';
export {searcherKeySelector} from './icon-catalog/search.js';

export const pixelRatio = globalThis.devicePixelRatio || 1;

const svgRequests = new Map<string, Promise<string>>();
const iconLookups = new Map<string, Map<string, Icon>>();

export const getSvgPath = (svg: string) => {
	const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
	if (
		document.documentElement.localName !== 'svg' ||
		document.querySelector('parsererror')
	)
		return undefined;
	return (
		[...document.querySelectorAll('path')]
			.map((element) => element.getAttribute('d'))
			.filter(Boolean)
			.join(' ') || undefined
	);
};

async function readBundledSvg(version: string, slug: string) {
	const catalog = await loadIconCatalog(BrightnessMode.SimpleIcons);
	if (version !== catalog.version)
		throw new Error('Icon catalog version mismatch.');
	let lookup = iconLookups.get(version);
	if (!lookup) {
		lookup = new Map(catalog.icons.map((icon) => [icon.slug, icon]));
		iconLookups.set(version, lookup);
	}

	const icon = lookup.get(slug);
	if (!icon) throw new Error(`Unknown bundled icon: ${slug}`);
	const title = icon.title
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
	return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${title}</title><path d="${icon.path}"/></svg>`;
}

export const getSvg = async (simpleIconsVersion: string, slug: string) => {
	const key = `${simpleIconsVersion}/${slug}`;
	let request = svgRequests.get(key);
	if (!request) {
		request = readBundledSvg(simpleIconsVersion, slug).catch(
			(error: unknown) => {
				svgRequests.delete(key);
				throw error;
			},
		);
		svgRequests.set(key, request);
	}

	return request;
};

export const normalizeColor = (style?: string) => {
	if (style && /^[\da-f]{3,4}|[\da-f]{6}$/i.test(style)) {
		if (style.length === 6 || style.length === 8) return style;
		if (style.length === 3 || style.length === 4) {
			return [...style].map((char) => char + char).join('');
		}
	}

	return undefined;
};

export const getSvgDataUri = (svg: string, color?: string) => {
	const hexColor = normalizeColor(color);
	const source = hexColor
		? svg.replace('<svg ', () => `<svg fill="#${hexColor}" `)
		: svg;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
};

export const getColorVariables = (isDark: boolean) => ({
	iconFg: isDark ? '#eee' : '#111',
	headerFg: isDark ? 'var(--si-header-fg-dark)' : 'var(--si-header-fg)',
	headerBg: isDark ? 'var(--si-header-bg-dark)' : 'var(--si-header-bg)',
	galleryFg: isDark ? 'var(--si-gallery-fg-dark)' : 'var(--si-gallery-fg)',
	galleryBg: isDark ? 'var(--si-gallery-bg-dark)' : 'var(--si-gallery-bg)',
	cardFg: isDark ? 'var(--si-card-fg-dark)' : 'var(--si-card-fg)',
	cardBg: isDark ? 'var(--si-card-bg-dark)' : 'var(--si-card-bg)',
	emptyFg: isDark ? 'var(--si-empty-fg-dark)' : 'var(--si-empty-fg)',
});

export const getSimpleIconsCdnUrl = (
	slug: string,
	options?: {
		autoViewbox?: boolean;
		size?: number;
		color?: string;
		darkModeColor?: string;
	},
) => {
	const url = new URL(`https://cdn.simpleicons.org/${slug}`);
	const encodeColor = (color: string) =>
		encodeURIComponent(color).replaceAll(
			/[!'()*]/g,
			(character) => `%${character.codePointAt(0)!.toString(16).toUpperCase()}`,
		);
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- Empty strings mean no color; either nonempty color requires URL segments.
	if (options?.color || options?.darkModeColor) {
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- An empty light color needs the same placeholder as an undefined color.
		url.pathname += `/${encodeColor(options.color || '_')}`;
		if (options.darkModeColor)
			url.pathname += `/${encodeColor(options.darkModeColor)}`;
	}

	if (options?.autoViewbox) url.searchParams.set('viewbox', 'auto');
	if (options?.size) url.searchParams.set('size', String(options.size));

	return url.href;
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

	return shareUrl.href;
};

export const getAliases = (icon?: Icon) => {
	if (!icon) return [];
	const aka = icon.aliases?.aka ?? [];
	const old = icon.aliases?.old ?? [];
	const dup =
		icon.aliases?.dup?.flatMap((d) => [
			d.title,
			...Object.values(d.loc ?? {}),
		]) ?? [];
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
	return badgeUrl.href;
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
