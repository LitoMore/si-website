import {IconHelp} from '@tabler/icons-react';
import {Flex, Radio, Tooltip} from 'antd';
import {useColorMode} from '#atom';
import {useI18n} from '#hooks';
import {ColorMode} from '#types';

function DisplayColor() {
	const [colorMode, setColorMode] = useColorMode();
	const {i18n} = useI18n();

	return (
		<Radio.Group
			block
			buttonStyle="solid"
			defaultValue={ColorMode.Contrast}
			optionType="button"
			value={colorMode}
			onChange={(event) => {
				setColorMode(event.target.value as ColorMode);
			}}
		>
			<Radio.Button value={ColorMode.Contrast}>
				<Flex align="center" gap={5} justify="center">
					{i18n.settings.contrast}
					<Tooltip title={i18n.settings.contrastTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
			<Radio.Button value={ColorMode.Actual}>
				<Flex align="center" gap={5} justify="center">
					{i18n.settings.actual}
					<Tooltip title={i18n.settings.actualTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
		</Radio.Group>
	);
}

export default DisplayColor;
