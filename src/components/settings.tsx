import {IconSettings} from '@tabler/icons-react';
import {Badge, Flex, Popover} from 'antd';
import {useLocation} from 'react-router';
import {useBrightnessMode, useCardSize, useColorMode} from '#atom';
import {
	Brightness,
	CardsizeSlider,
	ColorThemes,
	DisplayColor,
	Reset,
} from '#components';
import {useColorScheme} from '#hooks';
import {BrightnessMode, CardSize, ColorMode} from '#types';
import {Control} from './controls.js';

function Settings() {
	const {pathname} = useLocation();
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();
	const {iconFg} = useColorScheme();

	const isPreview = pathname === '/preview';
	const settingsChanged =
		brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small ||
		colorMode !== ColorMode.Contrast;

	return (
		<Popover
			content={
				<Flex vertical gap={10}>
					{!isPreview && <CardsizeSlider />}
					<ColorThemes />
					{!isPreview && <DisplayColor />}
					{!isPreview && <Brightness />}
					<Reset />
				</Flex>
			}
			trigger="hover"
		>
			<Badge color="#0cf" dot={settingsChanged} offset={[-6, 6]}>
				<Control as={IconSettings} style={{color: iconFg}} />
			</Badge>
		</Popover>
	);
}

export default Settings;
