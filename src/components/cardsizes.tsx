import { Flex, Slider } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
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
		<Flex gap={10}>
			<ZoomOutOutlined style={{ color: iconFg }} />
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
			<ZoomInOutlined
				style={{ color: iconFg, fontSize: 16 }}
			/>
		</Flex>
	);
};

export default CardsizeSlider;
