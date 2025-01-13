import { Flex, Segmented, Slider } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { useCardSize } from "#atom";
import { mobileWidth } from "#constants";
import { useSizes } from "#hooks";
import { CardSize } from "#types";

const CardsizeSlider = () => {
	const { cardPixels, innerWidth } = useSizes();
	const [, setCardSize] = useCardSize();
	if (innerWidth < mobileWidth) return null;

	return (
		<>
			{/* <ControlTitle plain>{i18n.zoom}</ControlTitle> */}
			<Flex gap={10}>
				<ZoomOutOutlined style={{ color: "rgba(0,0,0,0.5)" }} />
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
					style={{ color: "rgba(0,0,0,0.5)", fontSize: 16 }}
				/>
			</Flex>
		</>
	);
};

export default CardsizeSlider;

/**
 * [INFO] This is another approach to the above component.
 */
export const CardsizeSegmented = () => {
	const [, setCardSize] = useCardSize();
	const { innerWidth } = useSizes();
	if (innerWidth < mobileWidth) return null;

	return (
		<Segmented
			options={[{
				label: "Small",
				value: CardSize.Small,
			}, {
				label: "Medium",
				value: CardSize.Medium,
			}, {
				label: "Large",
				value: CardSize.Large,
			}]}
			onChange={setCardSize}
		/>
	);
};
