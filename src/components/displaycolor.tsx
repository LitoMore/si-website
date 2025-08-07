import {IconHelp} from '@tabler/icons-react';
import {Radio, Tooltip} from 'antd';
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
				<div className="flex items-center justify-center gap-[5px]">
					{i18n.settings.contrast}
					<Tooltip title={i18n.settings.contrastTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</div>
			</Radio.Button>
			<Radio.Button value={ColorMode.Actual}>
				<div className="flex items-center justify-center gap-[5px]">
					{i18n.settings.actual}
					<Tooltip title={i18n.settings.actualTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</div>
			</Radio.Button>
		</Radio.Group>
	);
}

export default DisplayColor;
