import { Flex, Layout } from "antd";
import { Apps, Controls, Search } from "#components";
import { useSizes } from "#hooks";

const Header = () => {
	const { padding } = useSizes();

	return (
		<Layout.Header
			style={{
				position: "sticky",
				top: 0,
				zIndex: 1,
				width: "100%",
				height: "auto",
				boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
				padding: 0,
				fontSize: 24,
				lineHeight: 1,
			}}
		>
			<Flex
				gap={5}
				justify="center"
				align="center"
				style={{
					background: "var(--si-header-bg)",
					padding: `10px ${padding}px`,
				}}
			>
				<Apps />
				<Search />
				<Controls />
			</Flex>
		</Layout.Header>
	);
};

export default Header;
