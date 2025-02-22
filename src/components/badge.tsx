import { colorForBackground } from "#utils";
import { BadgeStyle, Icon } from "#types";

export const encodeBadgeContentParameters = (params: string[]) =>
	(params.length === 1 ? "-" : "") +
	params.map((p) =>
		encodeURIComponent(p.replace(/-/g, "--").replace(/_/g, "__"))
	).join("-");

export const Badge = (
	{ label, message, color, ...params }: {
		label?: string;
		message?: string;
		color?: string;
		logo?: string;
		logoColor?: string;
		labelColor?: string;
		logoSize?: "auto";
		style?: BadgeStyle;
	},
) => {
	const baseUrl = new URL("https://img.shields.io/badge/");
	const badgeContent = encodeBadgeContentParameters(
		[label ?? "", message ?? "", color ?? ""].filter((x) => Boolean(x)),
	);

	const badgeUrl = new URL(badgeContent, baseUrl);
	for (const [key, value] of Object.entries(params)) {
		badgeUrl.searchParams.set(key, value);
	}

	return <img src={badgeUrl.toString()} />;
};

export const IconOnlyBadge = (
	{ icon, style }: { icon: Icon; style?: BadgeStyle },
) => {
	const { relativeColor } = colorForBackground(`#${icon.hex}`);
	return (
		<Badge
			color={icon.hex}
			logo={icon.slug}
			logoColor={style === BadgeStyle.Social
				? undefined
				: relativeColor.slice(1)}
			style={style}
		/>
	);
};

export const SocialBadge = (
	{ icon, style }: { icon: Icon; style?: BadgeStyle },
) => {
	const { relativeColor } = colorForBackground(`#${icon.hex}`);
	return (
		<Badge
			label={icon.title}
			color={icon.hex}
			logo={icon.slug}
			logoColor={style === BadgeStyle.Social
				? undefined
				: relativeColor.slice(1)}
			style={style}
		/>
	);
};

export const CommonBadge = (
	{ icon, style }: { icon: Icon; style?: BadgeStyle },
) => {
	return (
		<Badge
			message={icon.title}
			label="Preview"
			color={icon.hex}
			logo={icon.slug}
			style={style}
		/>
	);
};
