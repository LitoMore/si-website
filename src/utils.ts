// @deno-types="@types/react"
import { CSSProperties } from "react";
import { actionIntentText, actionIntentUrl } from "#constants";
import {
	BitmapFormat,
	BrightnessMode,
	CardSize,
	ColorTheme,
	Icon,
	IconData,
	JsDelivrNpmResponse,
} from "#types";
import { colorForBackground } from "./vendor/make-badge-color.ts";
import { getIconSlug } from "./vendor/simple-icons-sdk.ts";

export { getIconSlug } from "./vendor/simple-icons-sdk.ts";

export const getLatestVersion = async (packageName: string) => {
	const response = await fetch(
		new Request(`https://data.jsdelivr.com/v1/packages/npm/${packageName}`, {
			cache: "no-cache",
		}),
	);
	const json = (await response.json()) as JsDelivrNpmResponse;
	return json.tags.latest;
};

export const getIconsData = async (
	simpleIconsVersion: string,
	brightnessMode: BrightnessMode,
) => {
	const [major] = simpleIconsVersion.split(".");
	const isNewFormat = Number(major) >= 14;
	const response = await fetch(
		`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/_data/simple-icons.json`,
	);
	const json = await response.json();
	const iconsData = (isNewFormat ? json : json.icons) as IconData[];
	return iconsData.map((icon, index) => {
		const { relativeColor, brightness } = colorForBackground(
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
	const iconUrl =
		`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
	const response = await fetch(iconUrl);
	const svg = await response.text();
	return svg;
};

export const getMaskStyles = (
	version: string,
	icon: Icon,
	isLight: boolean,
): CSSProperties => ({
	backgroundColor: isLight ? `#${icon.hex}` : "var(--si-gallery-fg-dark)",
	WebkitMaskImage:
		`url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
	WebkitMaskSize: "contain",
	WebkitMaskRepeat: "no-repeat",
	WebkitMaskPosition: "center",
});

export const getColorVariables = (isDark: boolean) => {
	return {
		iconFg: isDark ? "#eee" : "#111",
		headerFg: isDark ? "var(--si-header-fg-dark)" : "var(--si-header-fg)",
		headerBg: isDark ? "var(--si-header-bg-dark)" : "var(--si-header-bg)",
		galleryFg: isDark ? "var(--si-gallery-fg-dark)" : "var(--si-gallery-fg)",
		galleryBg: isDark ? "var(--si-gallery-bg-dark)" : "var(--si-gallery-bg)",
		cardFg: isDark ? "var(--si-card-fg-dark)" : "var(--si-card-fg)",
		cardBg: isDark ? "var(--si-card-bg-dark)" : "var(--si-card-bg)",
		contrast: isDark ? "var(--si-contrast-dark)" : "var(--si-contrast)",
	};
};

export const getSimpleIconsCdnUrl = (
	slug: string,
	options?: { autoViewbox?: boolean; size?: number },
) => {
	const url = new URL(`https://cdn.simpleicons.org/${slug}`);
	if (options?.autoViewbox) url.searchParams.set("viewbox", "auto");
	if (options?.size) url.searchParams.set("size", String(options.size));
	return url.toString();
};

export const getJsdelivrCdnUrl = (version: string, slug: string) =>
	`https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${slug}.svg`;

export const getUnpkgCdnUrl = (version: string, slug: string) =>
	`https://unpkg.com/simple-icons@${version}/icons/${slug}.svg`;

export const getShareUrl = (
	base: string,
	options: { urlInText?: boolean } = {},
) => {
	const { urlInText } = options;
	const shareUrl = new URL(base);
	shareUrl.searchParams.set(
		"text",
		actionIntentText + (urlInText ? `\n${actionIntentUrl}` : ""),
	);
	if (!urlInText) shareUrl.searchParams.set("url", actionIntentUrl);
	return shareUrl.toString();
};

export const searcherKeySelector = (icon: Icon) =>
	[
		icon.title,
		icon.slug,
		icon.aliases?.aka,
		icon.aliases?.dup?.map((duplicate) => duplicate.title),
		Object.values(icon.aliases?.loc ?? {}),
	]
		.flat()
		.filter(Boolean) as string[];

export const getAliases = (icon?: Icon) => {
	if (!icon) return [];
	const aka = icon.aliases?.aka ?? [];
	const dup =
		icon.aliases?.dup?.map((d) => [d.title, ...Object.values(d.loc ?? {})])
			.flat() ?? [];
	const loc = Object.values(icon.aliases?.loc ?? {});
	return [...new Set([...aka, ...dup, ...loc])];
};

export const ellipsis = (text: string, maxLength: number) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export const tidyLink = (url: string, isMobileSize?: boolean) => {
	const tidyUrl = url.replace(/^https:\/\//, "").replace(/^www\./, "");
	return isMobileSize ? tidyUrl : ellipsis(tidyUrl, 30);
};

export const encodeBadgeContentParameters = (params: string[]) =>
	params.map((p) =>
		encodeURIComponent(p.replace(/-/g, "--").replace(/_/g, "__"))
	);

export const makeBadge = (icon: Icon) => {
	const staticBadgeBaseUrl = "https://img.shields.io/badge/";
	const badgeContent = encodeBadgeContentParameters([icon.title, icon.hex])
		.join("-");
	const badgeUrl = new URL(staticBadgeBaseUrl + badgeContent);
	badgeUrl.searchParams.set("logo", icon.slug);
	badgeUrl.searchParams.set("logoColor", icon.relativeColor.slice(1));
	return badgeUrl.toString();
};

export const cardSizeToPixels = (
	width: number,
	gap: number,
	cardSize: number | string,
) => {
	if (typeof cardSize === "number") return cardSize;
	if (!cardSize.endsWith("%")) return CardSize.Small;
	const percentage = Number(cardSize.replace("%", ""));
	return (width * percentage) / 100 - gap;
};

export const classNames = (classes: string[]) =>
	classes.filter(Boolean).join(" ");

export const getColorScheme = (colorTheme: ColorTheme) =>
	({
		[ColorTheme.Auto]: undefined,
		[ColorTheme.Light]: "only light",
		[ColorTheme.Dark]: "only dark",
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

const loadPdfKitAndBlobStream = async () => {
	const [pdfkit, blobStream] = await Promise.all([
		import("pdfkit/js/pdfkit.standalone.js"),
		import("blob-stream/.js"),
	]);
	return [pdfkit.default, blobStream.default];
};

export const downloadSvg = async (
	version: string,
	slug: string,
	hex?: string,
) => {
	let svg = await getSvg(version, slug);
	if (hex) svg = svg.replace("<svg ", `<svg fill="#${hex}" `);
	const url = `data:image/svg+xml;base64,${btoa(svg)}`;
	const a = document.createElement("a");
	a.classList.add("hidden");
	a.setAttribute("href", url);
	a.setAttribute("download", `${slug}.svg`);
	document.body.append(a);
	a.click();
	a.remove();
};

export const downloadPdf = async (version: string, slug: string) => {
	const svg = await getSvg(version, slug);
	const svgPath = svg.split('"')[7];
	const [PDFDocument, blobStream] = await loadPdfKitAndBlobStream();
	let document_;
	let stream;
	try {
		document_ = new PDFDocument({ size: [24, 24] });
		stream = document_.pipe(blobStream());
		document_.path(svgPath).fill();
	} catch (error) {
		document_ = new PDFDocument({ size: "A8" });
		stream = document_.pipe(blobStream());
		console.error(error);
		document_.fontSize(12);
		document_.text(
			`Error generating PDF with PDFKit library: ${
				error instanceof Error ? error.message : error
			}`,
			0,
			0,
			{
				align: "center",
			},
		);
	}
	document_.end();
	stream.on("finish", () => {
		const url = stream.toBlobURL("application/pdf");
		const a = document.createElement("a");
		a.classList.add("hidden");
		a.setAttribute("href", url);
		a.setAttribute("download", `${slug}.pdf`);
		document.body.append(a);
		a.click();
		a.remove();
	});
};

export const downloadBitmap = async (
	version: string,
	slug: string,
	hex: string,
	format: BitmapFormat,
	size: number = 512,
) => {
	let svg = await getSvg(version, slug);
	svg = svg.replace("<svg ", `<svg fill="#${hex}" `);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;
	const ratio = globalThis.devicePixelRatio || 1;
	canvas.width = size * ratio;
	canvas.height = size * ratio;
	canvas.style.width = size + "px";
	canvas.style.height = size + "px";
	ctx.scale(ratio, ratio);
	const img = new Image();
	img.width = size;
	img.height = size;
	img.onload = () => {
		ctx.drawImage(img, 0, 0, size, size);
		const pngUrl = canvas.toDataURL(`image/${format}`);
		const link = document.createElement("a");
		link.href = pngUrl;
		link.download = `${slug}.png`;
		link.click();
	};
	img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
};
