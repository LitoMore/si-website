import {IconZoomIn, IconZoomOut} from '@tabler/icons-react';
import {Slider} from 'antd';
import {useCardSize} from '#atom';
import {mobileWidth} from '#constants';
import {useColorScheme, useSizes} from '#hooks';
import {CardSize} from '#types';

export default function CardsizeSlider() {
	const {cardPixels, innerWidth} = useSizes();
	const [, setCardSize] = useCardSize();
	const {iconFg} = useColorScheme();
	if (innerWidth < mobileWidth) return null;

	return (
		<div className="flex items-center justify-center gap-2.5">
			<IconZoomOut color={iconFg} size={18} />
			<Slider
				className="w-75"
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
