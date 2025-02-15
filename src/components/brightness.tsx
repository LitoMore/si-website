import { Flex, Radio, Tooltip } from "antd";
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
				<Flex gap={5}>
					Luminance
					<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
						<QuestionCircleOutlined />
					</Tooltip>
				</Flex>
			</Radio.Button>
			<Radio.Button value={BrightnessMode.ShieldsIo}>
				<Flex gap={5}>
					Brightness{" "}
					<Tooltip title="This uses shields.io's brightness function.">
						<QuestionCircleOutlined />
					</Tooltip>
				</Flex>
			</Radio.Button>
		</Radio.Group>
	);
};

export default Brightness;
