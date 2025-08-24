import {BadgeStyle, type Icon} from '#types';
import {colorForBackground} from '#utils';

export const encodeBadgeContentParameters = (parameters: string[]) =>
	(parameters.length === 1 ? '-' : '') +
	parameters
		.map((p) =>
			encodeURIComponent(p.replaceAll('-', '--').replaceAll('_', '__')),
		)
		.join('-');

export function Badge({
	label,
	message,
	color,
	...parameters
}: {
	readonly label?: string;
	readonly message?: string;
	readonly color?: string;
	readonly logo?: string;
	readonly logoColor?: string;
	readonly labelColor?: string;
	readonly logoSize?: 'auto';
	readonly style?: BadgeStyle;
}) {
	const baseUrl = new URL('https://img.shields.io/badge/');
	const badgeContent = encodeBadgeContentParameters(
		[label ?? '', message ?? '', color ?? ''].filter(Boolean),
	);

	const badgeUrl = new URL(badgeContent, baseUrl);
	for (const [key, value] of Object.entries(parameters)) {
		badgeUrl.searchParams.set(key, value);
	}

	return <img src={badgeUrl.toString()} />;
}

export function IconOnlyBadge({
	icon,
	style,
}: {
	readonly icon: Icon;
	readonly style?: BadgeStyle;
}) {
	const {relativeColor} = colorForBackground(`#${icon.hex}`);
	return (
		<Badge
			color={icon.hex}
			logo={icon.slug}
			logoColor={
				style === BadgeStyle.Social ? undefined : relativeColor.slice(1)
			}
			style={style}
		/>
	);
}

export function SocialBadge({
	icon,
	style,
}: {
	readonly icon: Icon;
	readonly style?: BadgeStyle;
}) {
	const {relativeColor} = colorForBackground(`#${icon.hex}`);
	return (
		<Badge
			color={icon.hex}
			label={icon.title}
			logo={icon.slug}
			logoColor={
				style === BadgeStyle.Social ? undefined : relativeColor.slice(1)
			}
			style={style}
		/>
	);
}

export function CommonBadge({
	icon,
	style,
}: {
	readonly icon: Icon;
	readonly style?: BadgeStyle;
}) {
	return (
		<Badge
			color={icon.hex}
			label="Preview"
			logo={icon.slug}
			message={icon.title}
			style={style}
		/>
	);
}
