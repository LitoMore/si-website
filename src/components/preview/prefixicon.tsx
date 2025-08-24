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

	return (
		<div
			className="mr-1 h-5 w-5"
			style={{
				borderRadius: iconStyle === 'color' ? 4 : undefined,
				boxShadow:
					iconStyle === 'color' ? '0 0 5px 0 rgba(0, 0, 0, 0.25)' : undefined,
				backgroundColor:
					iconStyle === 'color'
						? `#${normalizeColor(color) ?? icon.hex ?? '000000'}`
						: undefined,
				...(iconStyle === 'icon' ? getMaskStyles(version, icon, isLight) : {}),
				filter:
					iconStyle === 'icon' && icon.brightness > brightThreshold
						? 'var(--si-contrast)'
						: undefined,
			}}
		/>
	);
}

export default PrefixIcon;
