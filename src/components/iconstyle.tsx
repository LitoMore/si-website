import {IconHelp} from '@tabler/icons-react';
import {Radio, Tooltip} from 'antd';
import {useIconStyle} from '#atom';
import {useI18n} from '#hooks';

function IconStyle() {
	const [iconStyle, setIconStyle] = useIconStyle();
	const {i18n} = useI18n();

	return (
		<Radio.Group
			block
			buttonStyle="solid"
			defaultValue="icon"
			optionType="button"
			value={iconStyle}
			onChange={(event) => {
				setIconStyle(event.target.value as 'icon' | 'badge');
			}}
		>
			<Radio.Button value="icon">
				Icon{' '}
				<Tooltip title={i18n.settings.contrastTooltip}>
					<IconHelp />
				</Tooltip>
			</Radio.Button>
			<Radio.Button value="badge">
				Badge{' '}
				<Tooltip title={i18n.settings.contrastTooltip}>
					<IconHelp />
				</Tooltip>
			</Radio.Button>
		</Radio.Group>
	);
}

export default IconStyle;
