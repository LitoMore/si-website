import { Flex } from "antd";
// import { CaretDownOutlined, EyeOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router";
import { useColorScheme } from "#hooks";
// import { PageLayout } from "#types";

const Apps = () => {
	// const navigate = useNavigate();
	const { iconFg } = useColorScheme();

	return (
		// <Dropdown
		// 	menu={{
		// 		items: [{
		// 			key: PageLayout.Previewer,
		// 			icon: <EyeOutlined style={{ fontSize: 20 }} />,
		// 			label: <span>Icon Previewer</span>,
		// 			onClick: () => navigate("preview"),
		// 		}],
		// 	}}
		// >
		<Flex>
			<img
				alt="Simple Icons"
				src={`https://cdn.simpleicons.org/simpleicons/${
					iconFg.slice(1)
				}?viewbox=auto`}
				style={{ width: 24, height: 24 }}
			/>
			{/* <CaretDownOutlined style={{ fontSize: 12 }} /> */}
		</Flex>
		// </Dropdown>
	);
};

export default Apps;
