import {Button} from 'antd';
import {useBrightnessMode, useCardSize, useColorMode} from '#atom';
import {useI18n} from '#hooks';
import {BrightnessMode, CardSize, ColorMode} from '#types';

function Reset() {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();
	const [cardSize, setCardSize] = useCardSize();
	const [colorMode, setColorMode] = useColorMode();
	const {i18n} = useI18n();

	const settingsChanged =
		brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small ||
		colorMode !== ColorMode.Contrast;

	return (
		<Button
			disabled={!settingsChanged}
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

export default Reset;
