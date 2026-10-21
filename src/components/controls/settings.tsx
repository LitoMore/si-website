import {type ReactNode} from 'react';
import {IconSettings} from '@tabler/icons-react';
import {useLocation} from 'react-router';
import {useBrightnessMode, useCardSize, useColorMode} from '#atom';
import {Popover} from '#components/ui/popover.js';
import {useColorScheme, useI18n} from '#hooks';
import {BrightnessMode, CardSize, ColorMode} from '#types';
import componentLabels from '../../i18n/ui.js';
import CardsizeSlider from './cardsize-slider.js';
import ColorThemes from './color-themes.js';
import DisplayColor from './display-color.js';
import Reset from './reset.js';

function Settings({extraSettings}: {readonly extraSettings?: ReactNode}) {
	const {languageCode} = useI18n();
	const {pathname} = useLocation();
	const [brightnessMode] = useBrightnessMode();
	const [cardSize] = useCardSize();
	const [colorMode] = useColorMode();
	const {iconFg} = useColorScheme();

	const isOpenGraph = pathname === '/og';
	const isPreview = pathname === '/preview';
	const isMain = !isOpenGraph && !isPreview;

	const isSettingsChanged =
		brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small ||
		colorMode !== ColorMode.Contrast;

	return (
		<Popover
			content={
				<div className="flex flex-col gap-2.5">
					{isMain ? <CardsizeSlider /> : null}
					<ColorThemes />
					{isMain ? <DisplayColor /> : null}
					{extraSettings}
					{isMain ? <Reset /> : null}
				</div>
			}
			label={componentLabels[languageCode].global.settings}
		>
			<button
				aria-label={componentLabels[languageCode].global.settings}
				className="ui-settings-trigger control"
				type="button"
			>
				<IconSettings aria-hidden style={{color: iconFg}} />
				{isSettingsChanged ? <span className="ui-settings-dot" /> : null}
			</button>
		</Popover>
	);
}

export default Settings;
