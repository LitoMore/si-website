import {IconHelp} from '@tabler/icons-react';
import {Flex, Radio, Tooltip} from 'antd';
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
				<Flex align="center" gap={5} justify="center">
					Luminance
					<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
			<Radio.Button value={BrightnessMode.ShieldsIo}>
				<Flex align="center" gap={5} justify="center">
					Brightness{' '}
					<Tooltip title="This uses shields.io's brightness function.">
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
		</Radio.Group>
	);
}

export default Brightness;
