import {useIcons} from '#atom';
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
	if (!icon) return null;

	const borderRadius = iconStyle === 'color' ? 4 : undefined;
	const boxShadow =
		iconStyle === 'color' ? '0 0 5px 0 rgba(0, 0, 0, 0.25)' : undefined;
	const backgroundColor =
		iconStyle === 'color'
			? `#${normalizeColor(color) ?? icon.hex ?? '000000'}`
			: 'currentColor';

	return (
		<div
			className="h-[21px] w-[21px] shrink-0"
			style={{
				...(iconStyle === 'icon' && getMaskStyles(version, icon, true)),
				borderRadius,
				boxShadow,
				backgroundColor,
			}}
		/>
	);
}

export default PrefixIcon;
