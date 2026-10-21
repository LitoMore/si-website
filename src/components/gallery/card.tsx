/*
 * [INFO] We don't use styled-components for this component due to performance reasons.
 */
import {type CSSProperties} from 'react';
import {useColorMode, useIcons, useSelectedIcon} from '#atom';
import {brightThreshold, darkThreshold} from '#constants';
import {useColorScheme, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {getMaskStyles} from '#utils';

function Card({
	icon,
	style,
}: {
	readonly icon: Icon;
	readonly style?: CSSProperties;
}) {
	const [{version}] = useIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const [colorMode] = useColorMode();
	const {cardPixels} = useSizes();
	const {isLight, isDark, galleryFg, contrast} = useColorScheme();
	const hexColor = `#${icon.hex}`;
	const borderColor = isLight ? hexColor : galleryFg;
	const borderWidth = isLight ? 2 : 1;
	const isA11yFriendly =
		(isLight && icon.brightness <= brightThreshold) ||
		(isDark && icon.brightness > darkThreshold);
	const isApplyContrast = colorMode === ColorMode.Contrast && !isA11yFriendly;

	return (
		<button
			aria-label={icon.title}
			className="icon"
			style={{
				...style,
				width: cardPixels,
				height: cardPixels,
				borderTop: `${borderWidth}px solid ${borderColor}`,
				borderLeft: `${borderWidth}px solid ${borderColor}`,
				borderRight: `${borderWidth}px solid ${borderColor}`,
				borderBottom: isLight ? 0 : `${borderWidth}px solid ${borderColor}`,
				filter: isApplyContrast ? contrast : undefined,
				transform:
					selectedIcon?.slug === icon.slug ? 'translateY(-2px)' : undefined,
			}}
			type="button"
			onClick={() => {
				setSelectedIcon(icon);
			}}
		>
			<span
				aria-hidden
				className="icon-image"
				style={getMaskStyles(version, icon, true)}
			/>
			<span className="icon-title" dir="auto">
				{icon.title}
			</span>
			<span
				className="icon-color"
				dir="ltr"
				style={{
					backgroundColor: hexColor,
					color: icon.relativeColor,
					borderTop: isLight ? undefined : `1px dashed ${borderColor}`,
				}}
			>
				{hexColor}
			</span>
		</button>
	);
}

export default Card;
