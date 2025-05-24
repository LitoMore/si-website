import { memo } from "react";
import { Flex, Layout } from "antd";
import Preview from "../components/preview.tsx";
import Controls from "../components/controls.tsx";

export default memo(() => (
	<Layout>
		<Preview />
		<Flex
			align="center"
			justify="center"
			style={{ position: "fixed", top: 0, right: 0, padding: 10 }}
		>
			<Controls />
		</Flex>
	</Layout>
));
