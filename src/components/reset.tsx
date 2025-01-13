import { Button } from "antd";
import { useBrightnessMode, useCardSize, useColorMode } from "#atom";
import { BrightnessMode, CardSize, ColorMode } from "#types";

const Reset = () => {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();
	const [cardSize, setCardSize] = useCardSize();
	const [colorMode, setColorMode] = useColorMode();

	const settingsChanged = brightnessMode !== BrightnessMode.SimpleIcons ||
		cardSize !== CardSize.Small || colorMode !== ColorMode.Contrast;

	return (
		<Button
			disabled={!settingsChanged}
			onClick={() => {
				setBrightnessMode(BrightnessMode.SimpleIcons);
				setCardSize(CardSize.Small);
				setColorMode(ColorMode.Contrast);
			}}
		>
			Reset
		</Button>
	);
};

export default Reset;
