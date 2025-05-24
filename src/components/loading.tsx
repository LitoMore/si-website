import { Flex } from "antd";
import { IconLoader2 } from "@tabler/icons-react";
import { spinning } from "#constants";
import { useSizes } from "#hooks";

const Loading = () => {
	const { galleryHeight } = useSizes();

	return (
		<Flex
			vertical
			justify="center"
			align="center"
			gap={20}
			style={{ height: galleryHeight }}
		>
			<IconLoader2 color="#0cf" style={spinning} />
		</Flex>
	);
};

export default Loading;
