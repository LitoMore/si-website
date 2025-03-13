import { useEffect, useState } from "react";
import { Button, Divider, Flex, Input } from "antd";
import {
	CopyOutlined,
	DownloadOutlined,
	LoadingOutlined,
	SaveOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import { useIcons, useSelectedIcon } from "#atom";
import { useI18n } from "#hooks";
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

const ColorInput = styled(Input)`
	width: 150px;
	padding-left: 5px;
	input:not(:placeholder-shown) {
		text-transform: uppercase;
	}
`;

const Preview = () => {
	const [color, setColor] = useState("000000");
	const [icons] = useIcons();
	const [selectedIcon] = useSelectedIcon();
	const { i18n } = useI18n();

	const fallbackIcon = icons.data.find((icon) => icon.slug === "simpleicons");
	const icon = selectedIcon ?? fallbackIcon;

	useEffect(() => {
		if (!icon?.hex) return;
		setColor(icon.hex);
	}, [icon]);

	return (
		<Flex style={{ height: "100vh" }} align="center" justify="center">
			<Card vertical gap={8}>
				<Flex gap={8}>
					<AutoComplete />
					<ColorInput
						prefix={
							<PrefixIcon
								icon={icon}
								style="color"
								color={color}
							/>
						}
						placeholder="Color"
						value={color}
						onChange={(e) => setColor(e.target.value)}
					/>
				</Flex>
				{icon ? <Canvas icon={icon} color={color} /> : (
					<Flex
						align="center"
						justify="center"
						style={{ width: 720, height: 400 }}
					>
						<LoadingOutlined spin style={{ fontSize: 48, opacity: 0.5 }} />
					</Flex>
				)}
				<Divider style={{ margin: 0 }} />
				<Flex gap={8}>
					<Button type="default" icon={<UploadOutlined />}>
						{i18n.preview.uploadSvg}
					</Button>
					<div style={{ flex: 1 }} />
					<Button type="default" icon={<DownloadOutlined />}>
						{i18n.preview.downloadSvg}
					</Button>
					<Button type="default" icon={<SaveOutlined />}>
						{i18n.preview.savePreview}
					</Button>
					<Button type="default" icon={<CopyOutlined />}>
						{i18n.preview.copyScreenshot}
					</Button>
				</Flex>
			</Card>
		</Flex>
	);
};

export default Preview;
