import { Button, Divider, Flex, Input } from "antd";
import {
	CopyOutlined,
	DownloadOutlined,
	SaveOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import { useIcons, useSelectedIcon } from "#atom";
import PrefixIcon from "./prefixicon.tsx";
import AutoComplete from "./autocomplete.tsx";
import Canvas from "./previewcanvas.tsx";

const Card = styled(Flex)`
	padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;
	width: 760px;
	background-color: #fff;
`;

const Preview = () => {
	const [icons] = useIcons();
	const [selectedIcon] = useSelectedIcon();

	const fallbackIcon = icons.data.find((icon) => icon.slug === "simpleicons");
	const icon = selectedIcon ?? fallbackIcon;

	return (
		<Flex style={{ height: "100vh" }} align="center" justify="center">
			<Card vertical gap={8}>
				<Flex gap={8}>
					<AutoComplete />
					<Input
						style={{ paddingLeft: 5, width: 150 }}
						prefix={
							<PrefixIcon
								icon={icon}
								style="color"
							/>
						}
						placeholder="Color"
						value={icon?.hex ?? "000000"}
					/>
				</Flex>
				{icon && (
					<>
						<Canvas icon={icon} />
						{
							/* <Flex wrap gap={5} align="center" justify="center">
							{Object.values(BadgeStyle).map((badgeStyle) => {
								const style = badgeStyle === BadgeStyle.Flat
									? undefined
									: badgeStyle;
								return <SocialBadge key={style} icon={icon} style={style} />;
							})}
						</Flex> */
						}
					</>
				)}
				<Divider style={{ margin: 0 }} />
				<Flex gap={8}>
					<Button type="default" icon={<UploadOutlined />}>Upload SVG</Button>
					<div style={{ flex: 1 }} />
					<Button type="default" icon={<DownloadOutlined />}>
						Download SVG
					</Button>
					<Button type="default" icon={<SaveOutlined />}>Save Preview</Button>
					<Button type="default" icon={<CopyOutlined />}>
						Copy Screenshot
					</Button>
					{undefined}
				</Flex>
			</Card>
		</Flex>
	);
};

export default Preview;
