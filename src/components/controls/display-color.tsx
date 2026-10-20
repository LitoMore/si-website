import {IconHelp} from '@tabler/icons-react';
import {useColorMode} from '#atom';
import {SegmentedControl} from '#components/ui/form.js';
import {Tooltip} from '#components/ui/popover.js';
import {useI18n} from '#hooks';
import {ColorMode} from '#types';

export default function DisplayColor() {
	const [colorMode, setColorMode] = useColorMode();
	const {i18n} = useI18n();
	return (
		<SegmentedControl
			label={`${i18n.settings.contrast} / ${i18n.settings.actual}`}
			options={[
				{
					value: ColorMode.Contrast,
					label: (
						<div className="flex items-center justify-center gap-1.25">
							{i18n.settings.contrast}
							<Tooltip title={i18n.settings.contrastTooltip}>
								<IconHelp size={16} />
							</Tooltip>
						</div>
					),
				},
				{
					value: ColorMode.Actual,
					label: (
						<div className="flex items-center justify-center gap-1.25">
							{i18n.settings.actual}
							<Tooltip title={i18n.settings.actualTooltip}>
								<IconHelp size={16} />
							</Tooltip>
						</div>
					),
				},
			]}
			value={colorMode}
			onChange={setColorMode}
		/>
	);
}
