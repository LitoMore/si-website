import {IconHelp} from '@tabler/icons-react';
import {Radio, Tooltip} from 'antd';
import {useBrightnessMode} from '#atom';
import {BrightnessMode} from '#types';

function Brightness() {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();

	return (
		<Radio.Group
			block
			buttonStyle="solid"
			defaultValue={BrightnessMode.SimpleIcons}
			optionType="button"
			value={brightnessMode}
			onChange={(event) => {
				setBrightnessMode(event.target.value as BrightnessMode);
			}}
		>
			<Radio.Button value={BrightnessMode.SimpleIcons}>
				<div className="items-center justify-center gap-[5px]">
					Luminance
					<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
						<IconHelp size={16} />
					</Tooltip>
				</div>
			</Radio.Button>
			<Radio.Button value={BrightnessMode.ShieldsIo}>
				<div className="items-center justify-center gap-[5px]">
					Brightness{' '}
					<Tooltip title="This uses shields.io's brightness function.">
						<IconHelp size={16} />
					</Tooltip>
				</div>
			</Radio.Button>
		</Radio.Group>
	);
}

export default Brightness;
