import {
	Col,
	Flex,
	Image as AntImage,
	Row,
	Tag as AntTag,
	Typography,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useSizes } from "#hooks";
import { getAliases, tidyLink } from "#utils";
import { Icon } from "#types";

const previewImageSize = 300;

const Image = styled(AntImage).attrs<{ $color?: string }>(
	(props) => ({
		width: "100%",
		preview: false,
		placeholder: (
			<Flex
				justify="center"
				style={{
					fontSize: 30,
					color: props.$color,
				}}
			>
				<LoadingOutlined />
			</Flex>
		),
	}),
)`
	padding: 10px;
	max-height: ${previewImageSize}px;
	height: auto;
	transition: height 0.5s;
`;

export const Title = styled.div`
  color: #aaa;
  margin-top: 10px;
`;

const Text = styled(Typography.Text).attrs((props) => ({
	copyable: props.copyable ?? true,
}))`
	margin: 0;
`;

const Tag = styled(AntTag)<{ $textColor?: string }>`
	margin-right: 0;
	color: ${(props) => props.$textColor} !important;
`;

const Link = styled(Typography.Link).attrs({
	copyable: true,
	target: "_blank",
	rel: "noopener nofollow noreferrer",
})`
	margin: 0;
`;

const ModalContent = ({ icon }: { icon?: Icon }) => {
	const { isMobileSize } = useSizes();
	if (!icon) return null;

	const aliases = getAliases(icon);
	const hexColor = `#${icon.hex}`;

	return (
		<Row gutter={16}>
			<Col xs={24} sm={16}>
				<Flex justify="center" align="center" style={{ height: "100%" }}>
					<Image
						$color={hexColor}
						src={`https://cdn.simpleicons.org/${icon.slug}?viewbox=auto`}
					/>
				</Flex>
			</Col>

			<Col xs={24} sm={8}>
				<Flex vertical>
					<Title>Title</Title>
					<Text>{icon.title}</Text>
				</Flex>

				{aliases.length > 0 && (
					<Flex vertical>
						<Title>Aliases</Title>
						<Flex gap="small">
							{aliases.map((alias) => <Text key={alias}>{alias}</Text>)}
						</Flex>
					</Flex>
				)}

				<Flex vertical>
					<Title>Color</Title>
					<div>
						<Text copyable={{ text: hexColor }}>
							<Tag color={hexColor} $textColor={icon.relativeColor}>
								{hexColor}
							</Tag>
						</Text>
					</div>
				</Flex>

				<Flex vertical>
					<Title>
						{icon.source === icon.guidelines ? "Source & Guidelines" : "Source"}
					</Title>
					<Link ellipsis={!isMobileSize} href={icon.source}>
						{tidyLink(icon.source)}
					</Link>
				</Flex>

				{icon.source !== icon.guidelines && icon.guidelines && (
					<Flex vertical>
						<Title>Guidelines</Title>
						<Link ellipsis={!isMobileSize} href={icon.guidelines}>
							{tidyLink(icon.guidelines)}
						</Link>
					</Flex>
				)}

				{icon.license && (
					<Flex vertical>
						<Title>License</Title>
						<Link
							ellipsis={!isMobileSize}
							href={"url" in icon.license
								? icon.license.url
								: `https://spdx.org/licenses/${icon.license.type}`}
						>
							{"url" in icon.license
								? tidyLink(icon.license.url)
								: icon.license.type}
						</Link>
					</Flex>
				)}
			</Col>
		</Row>
	);
};

export default ModalContent;
