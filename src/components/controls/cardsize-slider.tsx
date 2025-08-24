import {IconZoomIn, IconZoomOut} from '@tabler/icons-react';
import {Slider} from 'antd';
import {useCardSize} from '#atom';
import {mobileWidth} from '#constants';
import {useColorScheme, useSizes} from '#hooks';
import {CardSize} from '#types';

function CardsizeSlider() {
	const {cardPixels, innerWidth} = useSizes();
	const [, setCardSize] = useCardSize();
	const {iconFg} = useColorScheme();
	if (innerWidth < mobileWidth) return null;

	return (
		<div className="flex justify-center gap-[10px]">
			<IconZoomOut color={iconFg} size={18} />
			<Slider
				className="w-[300px]"
				defaultValue={cardPixels}
				max={CardSize.Large}
				min={CardSize.Small}
				step={25}
				tooltip={{open: false}}
				value={cardPixels}
				onChange={setCardSize}
			/>
			<IconZoomIn color={iconFg} size={20} />
		</div>
	);
}

export default CardsizeSlider;
