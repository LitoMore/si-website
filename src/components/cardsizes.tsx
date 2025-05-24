import { Flex, Slider } from "antd";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { useCardSize } from "#atom";
import { mobileWidth } from "#constants";
import { useColorScheme, useSizes } from "#hooks";
import { CardSize } from "#types";

const CardsizeSlider = () => {
	const { cardPixels, innerWidth } = useSizes();
	const [, setCardSize] = useCardSize();
	const { iconFg } = useColorScheme();
	if (innerWidth < mobileWidth) return null;

	return (
		<Flex gap={10} align="center">
			<IconZoomOut color={iconFg} size={18} />
			<Slider
				tooltip={{ open: false }}
				style={{ width: 300 }}
				step={25}
				value={cardPixels}
				defaultValue={cardPixels}
				min={CardSize.Small}
				max={CardSize.Large}
				onChange={setCardSize}
			/>
			<IconZoomIn
				color={iconFg}
				size={20}
			/>
		</Flex>
	);
};

export default CardsizeSlider;
