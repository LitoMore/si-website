import { Flex, Radio, Tooltip } from "antd";
import { IconHelp } from "@tabler/icons-react";
import { useColorMode } from "#atom";
import { useI18n } from "#hooks";
import { ColorMode } from "#types";

const DisplayColor = () => {
	const [colorMode, setColorMode] = useColorMode();
	const { i18n } = useI18n();

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
				<Flex align="center" justify="center" gap={5}>
					{i18n.settings.contrast}
					<Tooltip title={i18n.settings.contrastTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
			<Radio.Button value={ColorMode.Actual}>
				<Flex align="center" justify="center" gap={5}>
					{i18n.settings.actual}
					<Tooltip title={i18n.settings.actualTooltip}>
						<IconHelp size={16} />
					</Tooltip>
				</Flex>
			</Radio.Button>
		</Radio.Group>
	);
};

export default DisplayColor;
