import { Badge, Flex, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useBrightnessMode, useCardSize, useColorMode } from "#atom";
import {
	Brightness,
	CardsizeSlider,
	Control,
	DisplayColor,
	Reset,
} from "#components";
import { BrightnessMode, CardSize, ColorMode } from "#types";

const Settings = () => {
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();

	const settingsChanged = brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small || colorMode !== ColorMode.Contrast;

	return (
		<Popover
			trigger="hover"
			content={
				<Flex vertical gap={10}>
					<CardsizeSlider />
					<DisplayColor />
					<Brightness />
					<Reset />
				</Flex>
			}
		>
			<Badge offset={[-6, 6]} color="#0cf" dot={settingsChanged}>
				<Control as={SettingOutlined} />
			</Badge>
		</Popover>
	);
};

export default Settings;
