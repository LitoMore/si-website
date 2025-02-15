import { Flex } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
			<LoadingOutlined style={{ color: "#0cf", fontSize: 48 }} spin />
		</Flex>
	);
};

export default Loading;
