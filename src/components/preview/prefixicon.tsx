import {useIcons} from '#atom';
import {brightThreshold} from '#constants';
import {useColorScheme} from '#hooks';
import {type Icon} from '#types';
import {getMaskStyles, normalizeColor} from '#utils';

function PrefixIcon({
	icon,
	color,
	iconStyle,
}: {
	readonly icon?: Icon;
	readonly color?: string;
	readonly iconStyle: 'color' | 'icon';
}) {
	const [{version}] = useIcons();
	const {isLight} = useColorScheme();
	if (!icon) return null;

	const borderRadius = iconStyle === 'color' ? 4 : undefined;
	const boxShadow =
		iconStyle === 'color' ? '0 0 5px 0 rgba(0, 0, 0, 0.25)' : undefined;
	const backgroundColor =
		iconStyle === 'color'
			? `#${normalizeColor(color) ?? icon.hex ?? '000000'}`
			: undefined;
	const filter =
		iconStyle === 'icon' && icon.brightness > brightThreshold
			? 'var(--si-contrast)'
			: undefined;

	return (
		<div
			className="mr-1 h-5 w-5"
			style={{
				borderRadius,
				boxShadow,
				backgroundColor,
				...(iconStyle === 'icon' ? getMaskStyles(version, icon, isLight) : {}),
				filter,
			}}
		/>
	);
}

export default PrefixIcon;
