import { Dropdown, Flex } from "antd";
import { CaretDownOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageLayout } from "#types";

const Apps = () => {
	const navigate = useNavigate();

	return (
		<Dropdown
			menu={{
				items: [{
					key: PageLayout.Previewer,
					icon: <EyeOutlined style={{ fontSize: 20 }} />,
					label: <span>Icon Previewer</span>,
					onClick: () => navigate("preview"),
				}],
			}}
		>
			<Flex>
				<img
					alt="Simple Icons"
					src="https://cdn.simpleicons.org/simpleicons/111?viewbox=auto"
					style={{ width: 24, height: 24 }}
				/>
				<CaretDownOutlined style={{ fontSize: 12 }} />
			</Flex>
			{/* </a> */}
		</Dropdown>
	);
};

export default Apps;
