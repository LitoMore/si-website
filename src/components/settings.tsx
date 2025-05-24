import { Badge, Flex, Popover } from "antd";
import { useLocation } from "react-router";
import { IconSettings } from "@tabler/icons-react";
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
	const { pathname } = useLocation();
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();
	const { iconFg } = useColorScheme();

	const isPreview = pathname === "/preview";
	const settingsChanged = brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small || colorMode !== ColorMode.Contrast;

	return (
		<Popover
			trigger="hover"
			content={
				<Flex vertical gap={10}>
					{!isPreview && <CardsizeSlider />}
					<ColorThemes />
					{!isPreview && <DisplayColor />}
					{!isPreview && <Brightness />}
					<Reset />
				</Flex>
			}
		>
			<Badge offset={[-6, 6]} color="#0cf" dot={settingsChanged}>
				<Control
					as={IconSettings}
					style={{ color: iconFg }}
				/>
			</Badge>
		</Popover>
	);
};

export default Settings;
