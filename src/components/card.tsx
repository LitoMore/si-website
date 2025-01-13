/*
 * [INFO] We don't use styled-components for this component due to performance reasons.
 */
import { useColorMode, useIcons, useSelectedIcon } from "#atom";
import { siWebsiteBrightnessThreshold } from "#constants";
import { useSizes } from "#hooks";
import { classNames, getMaskStyles } from "#utils";
import { ColorMode, Icon } from "#types";

const Card = ({ icon }: { icon: Icon }) => {
	const [{ version }] = useIcons();
	const [, setSelectedIcon] = useSelectedIcon();
	const [colorMode] = useColorMode();
	const { cardPixels } = useSizes();
	const hexColor = `#${icon.hex}`;
	const applyContrast = colorMode === ColorMode.Contrast &&
		icon.brightness > siWebsiteBrightnessThreshold;

	return (
		<div
			className={classNames(["icon", applyContrast ? "contrast" : ""])}
			style={{
				width: cardPixels,
				height: cardPixels,
				borderTop: `2px solid ${hexColor}`,
				borderLeft: `2px solid ${hexColor}`,
				borderRight: `2px solid ${hexColor}`,
				borderBottom: 0,
			}}
			onClick={() => setSelectedIcon(icon)}
		>
			<div
				className="icon-image"
				style={getMaskStyles(version, icon)}
			/>
			<div className="icon-title">{icon.title}</div>
			<div
				className="icon-color"
				style={{
					backgroundColor: hexColor,
					color: icon.relativeColor,
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
