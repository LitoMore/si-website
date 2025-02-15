/*
 * [INFO] We don't use styled-components for this component due to performance reasons.
 */
// @deno-types="@types/react"
import { CSSProperties } from "react";
import { useColorMode, useIcons, useSelectedIcon } from "#atom";
import { brightThreshold, darkThreshold } from "#constants";
import { useColorScheme, useSizes } from "#hooks";
import { getMaskStyles } from "#utils";
import { ColorMode, Icon } from "#types";

const Card = ({ icon, style }: { icon: Icon; style?: CSSProperties }) => {
	const [{ version }] = useIcons();
	const [, setSelectedIcon] = useSelectedIcon();
	const [colorMode] = useColorMode();
	const { cardPixels } = useSizes();
	const { isLight, isDark, galleryFg, contrast } = useColorScheme();
	const hexColor = `#${icon.hex}`;
	const borderColor = isLight ? hexColor : galleryFg;
	const borderWidth = isLight ? 2 : 1;
	const a11yFriendly = (isLight && icon.brightness <= brightThreshold) ||
		(isDark && icon.brightness > darkThreshold);
	const applyContrast = colorMode === ColorMode.Contrast && !a11yFriendly;

	return (
		<div
			className="icon"
			style={{
				...style,
				width: cardPixels,
				height: cardPixels,
				borderTop: `${borderWidth}px solid ${borderColor}`,
				borderLeft: `${borderWidth}px solid ${borderColor}`,
				borderRight: `${borderWidth}px solid ${borderColor}`,
				borderBottom: isLight ? 0 : `${borderWidth}px solid ${borderColor}`,
				filter: applyContrast ? contrast : undefined,
			}}
			onClick={() => setSelectedIcon(icon)}
		>
			<div
				className="icon-image"
				style={getMaskStyles(version, icon, true)}
			/>
			<div className="icon-title">{icon.title}</div>
			<div
				className="icon-color"
				style={{
					backgroundColor: hexColor,
					color: icon.relativeColor,
					borderTop: isLight ? undefined : `1px dashed ${borderColor}`,
				}}
			>
				{hexColor}
				{colorMode === ColorMode.Actual
					? " " + icon.brightness.toFixed(2)
					: null}
			</div>
		</div>
	);
};

export default Card;
