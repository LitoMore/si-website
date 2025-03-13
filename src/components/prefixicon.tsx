import { useIcons } from "#atom";
import { brightThreshold } from "#constants";
import { useColorScheme } from "#hooks";
import { getMaskStyles, normalizeColor } from "#utils";
import { Icon } from "#types";

const PrefixIcon = (
	{ icon, style, color }: {
		icon?: Icon;
		style: "color" | "icon";
		color?: string;
	},
) => {
	const [{ version }] = useIcons();
	const { isLight } = useColorScheme();
	if (!icon) return null;

	return (
		<div
			style={{
				width: 20,
				height: 20,
				marginRight: 4,
				borderRadius: style === "color" ? 4 : undefined,
				boxShadow: style === "color"
					? "0 0 5px 0 rgba(0, 0, 0, 0.25)"
					: undefined,
				backgroundColor: style === "color"
					? `#${normalizeColor(color) ?? icon.hex ?? "000000"}`
					: undefined,
				...(style === "icon" ? getMaskStyles(version, icon, isLight) : {}),
				filter: style === "icon" && icon.brightness > brightThreshold
					? "var(--si-contrast)"
					: undefined,
			}}
		/>
	);
};

export default PrefixIcon;
