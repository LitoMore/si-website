import {IconZoomIn, IconZoomOut} from '@tabler/icons-react';
import {useCardSize} from '#atom';
import {Slider} from '#components/ui/form.js';
import {mobileWidth} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {CardSize} from '#types';

export default function CardsizeSlider() {
	const {i18n} = useI18n();
	const {cardPixels, innerWidth} = useSizes();
	const [, setCardSize] = useCardSize();
	const {iconFg} = useColorScheme();
	if (innerWidth < mobileWidth) return null;

	return (
		<div className="flex items-center justify-center gap-2.5">
			<IconZoomOut color={iconFg} size={18} />
			<Slider
				label={i18n.settings.zoom}
				max={CardSize.Large}
				min={CardSize.Small}
				step={25}
				value={cardPixels}
				onChange={setCardSize}
			/>
			<IconZoomIn color={iconFg} size={20} />
		</div>
	);
}
