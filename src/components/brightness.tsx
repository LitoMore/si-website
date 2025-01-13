import { Radio, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useBrightnessMode } from "#atom";
import { BrightnessMode } from "#types";

const Brightness = () => {
	const [brightnessMode, setBrightnessMode] = useBrightnessMode();

	return (
		<Radio.Group
			block
			defaultValue={BrightnessMode.SimpleIcons}
			value={brightnessMode}
			optionType="button"
			buttonStyle="solid"
			onChange={(event) => {
				setBrightnessMode(event.target.value);
			}}
		>
			<Radio.Button value={BrightnessMode.SimpleIcons}>
				Luminance{" "}
				<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
					<QuestionCircleOutlined />
				</Tooltip>
			</Radio.Button>
			<Radio.Button value={BrightnessMode.ShieldsIo}>
				Brightness{" "}
				<Tooltip title="This uses shields.io's brightness function.">
					<QuestionCircleOutlined />
				</Tooltip>
			</Radio.Button>
		</Radio.Group>
	);
};

export default Brightness;
