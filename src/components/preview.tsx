import { Flex, Input } from "antd";
import { styled } from "styled-components";
import { useSelectedIcon } from "#atom";
import PrefixIcon from "./prefixicon.tsx";
import AutoComplete from "./autocomplete.tsx";
import Canvas from "./previewcanvas.tsx";

const Card = styled(Flex)`
	padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
	width: 760px;
	height: 462px;
	background-color: #fff;
`;

const Preview = () => {
	const [selectedIcon] = useSelectedIcon();

	return (
		<Flex style={{ height: "100vh" }} align="center" justify="center">
			<Card vertical gap={8}>
				<Flex gap={8}>
					<AutoComplete />
					<Input
						style={{ paddingLeft: 5, width: 150 }}
						prefix={
							<PrefixIcon
								icon={selectedIcon}
								style="color"
							/>
						}
						placeholder="Color"
						value={selectedIcon?.hex ?? "000000"}
					/>
				</Flex>
				{selectedIcon && <Canvas icon={selectedIcon} />}
			</Card>
		</Flex>
	);
};

export default Preview;
