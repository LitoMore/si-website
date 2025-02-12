import { Radio, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useColorMode } from "#atom";
import { useI18n } from "#hooks";
import { ColorMode } from "#types";

const DisplayColor = () => {
	const [colorMode, setColorMode] = useColorMode();
	const i18n = useI18n();

	return (
		<Radio.Group
			block
			defaultValue={ColorMode.Contrast}
			value={colorMode}
			optionType="button"
			buttonStyle="solid"
			onChange={(event) => {
				setColorMode(event.target.value);
			}}
		>
			<Radio.Button value={ColorMode.Contrast}>
				{i18n.settings.contrast}{" "}
				<Tooltip title={i18n.settings.contrastTooltip}>
					<QuestionCircleOutlined />
				</Tooltip>
			</Radio.Button>
			<Radio.Button value={ColorMode.Actual}>
				{i18n.settings.actual}{" "}
				<Tooltip title={i18n.settings.actualTooltip}>
					<QuestionCircleOutlined />
				</Tooltip>
			</Radio.Button>
		</Radio.Group>
	);
};

export default DisplayColor;
