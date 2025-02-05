import { actionIntentText, actionIntentUrl } from "#constants";
import {
	BrightnessMode,
	CardSize,
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

export const getMaskStyles = (version: string, icon: Icon) => ({
	backgroundColor: `#${icon.hex}`,
	WebkitMaskImage:
		`url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
	WebkitMaskSize: "contain",
	WebkitMaskRepeat: "no-repeat",
	WebkitMaskPosition: "center",
});

export const getSimpleIconsCdnUrl = (slug: string) =>
	`https://cdn.simpleicons.org/${slug}`;

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
