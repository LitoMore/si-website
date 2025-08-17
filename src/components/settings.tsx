import {type ReactNode} from 'react';
import {IconSettings} from '@tabler/icons-react';
import {Badge, Popover} from 'antd';
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

function Settings({extraSettings}: {readonly extraSettings?: ReactNode}) {
	const {pathname} = useLocation();
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();
	const {iconFg} = useColorScheme();

	const isOpenGraph = pathname === '/og';
	const isPreview = pathname === '/preview';
	const isMain = !isOpenGraph && !isPreview;

	const settingsChanged =
		brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small ||
		colorMode !== ColorMode.Contrast;

	return (
		<Popover
			content={
				<div className="flex flex-col gap-[10px]">
					{isMain ? <CardsizeSlider /> : null}
					<ColorThemes />
					{isMain ? <DisplayColor /> : null}
					{isMain ? <Brightness /> : null}
					{extraSettings}
					{isMain ? <Reset /> : null}
				</div>
			}
			trigger="click"
		>
			<Badge color="#0cf" dot={settingsChanged} offset={[-6, 6]}>
				<IconSettings className="control" style={{color: iconFg}} />
			</Badge>
		</Popover>
	);
}

export default Settings;
