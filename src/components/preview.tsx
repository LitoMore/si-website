// @deno-types="@types/react"
import { lazy } from "react";
import { Col, Flex, Input, Row } from "antd";
import { styled } from "styled-components";
import { useSelectedIcon } from "#atom";
import { PrefixIcon } from "#components";

const AutoComplete = lazy(() => import("./autocomplete.tsx"));

const Card = styled(Flex)`
	padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
	width: 800px;
	height: 600px;
	background-color: #fff;
`;

const Preview = () => {
	const [selectedIcon] = useSelectedIcon();

	return (
		<Flex style={{ height: "100vh" }} align="center" justify="center">
			<Card vertical gap={8}>
				<Row gutter={8}>
					<Col span={18}>
						<AutoComplete />
					</Col>
					<Col span={6}>
						<Input
							style={{ paddingLeft: 5 }}
							prefix={
								<PrefixIcon
									icon={selectedIcon}
									style="color"
								/>
							}
							placeholder="Color"
							value={selectedIcon?.hex ?? "000000"}
						/>
					</Col>
				</Row>
			</Card>
		</Flex>
	);
};

export default Preview;
