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
		<div className="flex">
			<img
				alt="Simple Icons"
				className="h-6 w-6"
				src={`https://cdn.simpleicons.org/simpleicons/${iconFg.slice(
					1,
				)}?viewbox=auto`}
			/>
			{/* <CaretDownOutlined style={{ fontSize: 12 }} /> */}
		</div>
		// </Dropdown>
	);
}

export default Apps;
