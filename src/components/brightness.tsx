import { Flex, Radio, Tooltip } from "antd";
import { IconHelp } from "@tabler/icons-react";
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
				<Flex align="center" justify="center" gap={5}>
					Luminance
					<Tooltip title="This uses the Simple Icons' get-relative-luminance function.">
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
			<Radio.Button value={BrightnessMode.ShieldsIo}>
				<Flex align="center" justify="center" gap={5}>
					Brightness{" "}
					<Tooltip title="This uses shields.io's brightness function.">
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
		</Radio.Group>
	);
};

export default Brightness;
