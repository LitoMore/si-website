import { Badge, Flex, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useBrightnessMode, useCardSize, useColorMode } from "#atom";
import {
	Brightness,
	CardsizeSlider,
	ColorThemes,
	DisplayColor,
	Reset,
} from "#components";
import { useColorScheme } from "#hooks";
import { BrightnessMode, CardSize, ColorMode } from "#types";
import { Control } from "./controls.tsx";

const Settings = () => {
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();
	const { iconFg } = useColorScheme();

	const settingsChanged = brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small || colorMode !== ColorMode.Contrast;

	return (
		<Popover
			trigger="hover"
			content={
				<Flex vertical gap={10}>
					<CardsizeSlider />
					<ColorThemes />
					<DisplayColor />
					<Brightness />
					<Reset />
				</Flex>
			}
		>
			<Badge offset={[-6, 6]} color="#0cf" dot={settingsChanged}>
				<Control
					as={SettingOutlined}
					style={{ color: iconFg }}
				/>
			</Badge>
		</Popover>
	);
};

export default Settings;
