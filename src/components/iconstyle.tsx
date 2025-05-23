import { Radio, Tooltip } from "antd";
import { IconHelp } from "@tabler/icons-react";
import { useIconStyle } from "#atom";
import { useI18n } from "#hooks";

const IconStyle = () => {
	const [iconStyle, setIconStyle] = useIconStyle();
	const { i18n } = useI18n();

	return (
		<Radio.Group
			block
			defaultValue="icon"
			value={iconStyle}
			optionType="button"
			buttonStyle="solid"
			onChange={(event) => {
				setIconStyle(event.target.value);
			}}
		>
			<Radio.Button value="icon">
				Icon{" "}
				<Tooltip title={i18n.settings.contrastTooltip}>
					<IconHelp />
				</Tooltip>
			</Radio.Button>
			<Radio.Button value="badge">
				Badge{" "}
				<Tooltip title={i18n.settings.contrastTooltip}>
					<IconHelp />
				</Tooltip>
			</Radio.Button>
		</Radio.Group>
	);
};

export default IconStyle;
