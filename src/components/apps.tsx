import {Flex} from 'antd';
// Import { CaretDownOutlined, EyeOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router";
import {useColorScheme} from '#hooks';
// Import { PageLayout } from "#types";

function Apps() {
	// Const navigate = useNavigate();
	const {iconFg} = useColorScheme();

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
				src={`https://cdn.simpleicons.org/simpleicons/${iconFg.slice(
					1,
				)}?viewbox=auto`}
				style={{width: 24, height: 24}}
			/>
			{/* <CaretDownOutlined style={{ fontSize: 12 }} /> */}
		</Flex>
		// </Dropdown>
	);
}

export default Apps;
