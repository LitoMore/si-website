import {useBrightnessMode, useCardSize, useColorMode} from '#atom';
import {Button} from '#components/ui/button.js';
import {useI18n} from '#hooks';
import {BrightnessMode, CardSize, ColorMode} from '#types';

export default function Reset() {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();
	const [cardSize, setCardSize] = useCardSize();
	const [colorMode, setColorMode] = useColorMode();
	const {i18n} = useI18n();

	const isSettingsChanged =
		brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small ||
		colorMode !== ColorMode.Contrast;

	return (
		<Button
			disabled={!isSettingsChanged}
			onClick={() => {
				setBrightnessMode(BrightnessMode.SimpleIcons);
				setCardSize(CardSize.Small);
				setColorMode(ColorMode.Contrast);
			}}
		>
			{i18n.settings.reset}
		</Button>
	);
}
