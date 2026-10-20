import {IconHelp} from '@tabler/icons-react';
import {useBrightnessMode} from '#atom';
import {SegmentedControl} from '#components/ui/form.js';
import {Tooltip} from '#components/ui/popover.js';
import {BrightnessMode} from '#types';

export default function Brightness() {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();
	return (
		<SegmentedControl
			label="Luminance / Brightness"
			options={[
				{
					value: BrightnessMode.SimpleIcons,
					label: (
						<div className="flex items-center justify-center gap-1.25">
							Luminance
							<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
								<IconHelp size={16} />
							</Tooltip>
						</div>
					),
				},
				{
					value: BrightnessMode.ShieldsIo,
					label: (
						<div className="flex items-center justify-center gap-1.25">
							Brightness
							<Tooltip title="This uses shields.io's brightness function.">
								<IconHelp size={16} />
							</Tooltip>
						</div>
					),
				},
			]}
			value={brightnessMode}
			onChange={setBrightnessMode}
		/>
	);
}
