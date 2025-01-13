import {
	Button,
	Col,
	Dropdown,
	Flex,
	Image as AntImage,
	Modal as AntModal,
	Row,
	Tag as AntTag,
	Typography,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useIcons, useSelectedIcon } from "#atom";
import { useCopyText, useSizes } from "#hooks";
import {
	getAliases,
	getJsdelivrCdnUrl,
	getSimpleIconsCdnUrl,
	getSvg,
	getUnpkgCdnUrl,
	tidyLink,
} from "#utils";
import { Icon } from "#types";

const previewImageSize = 300;

const StyledModal = styled(AntModal)<{ $backgroundColor?: string }>(
	(props) => {
		const isDark = props.$backgroundColor === "#333";
		return `
			& .ant-modal-content {
				background-color: ${props.$backgroundColor};
				transition: background-color 1s;
			}
			& .ant-typography, & .ant-modal-close {
				color: ${isDark ? "#fff" : "#333"};
			}
		`;
	},
);

export const Image = styled(AntImage).attrs<{ $color?: string }>(
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

export const Text = styled(Typography.Text).attrs((props) => ({
	copyable: props.copyable ?? true,
}))`
	margin: 0;
`;

export const Tag = styled(AntTag)<{ $textColor?: string }>`
	margin-right: 0;
	color: ${(props) => props.$textColor} !important;
`;

export const Link = styled(Typography.Link).attrs({
	copyable: true,
	target: "_blank",
	rel: "noopener nofollow noreferrer",
})`
	margin: 0;
`;

const CdnButtons = ({ icon }: { icon: Icon }) => {
	const [{ version }] = useIcons();
	const copyText = useCopyText();
	const isDarkBackground = icon.relativeColor === "#333";
	const items = [
		{
			title: "cdn.simpleicons.org",
			link: getSimpleIconsCdnUrl(icon.slug),
		},
		{
			title: "jsDelivr",
			link: getJsdelivrCdnUrl(version, icon.slug),
		},
		{
			title: "unpkg",
			link: getUnpkgCdnUrl(version, icon.slug),
		},
	].map((x) => ({
		key: x.title,
		label: (
			<Flex
				key={x.title}
				onClick={() => copyText(`${x.title} URL`, x.link)}
			>
				{x.title}
			</Flex>
		),
	}));

	return (
		<Dropdown placement="bottom" menu={{ items }}>
			<Button color="default" variant={isDarkBackground ? "solid" : undefined}>
				Copy CDN
			</Button>
		</Dropdown>
	);
};

const Modal = () => {
	const [icons] = useIcons();
	const [icon, setSelectedIcon] = useSelectedIcon();
	const { isMobileSize } = useSizes();
	const copyText = useCopyText();
	const aliases = getAliases(icon);
	const hexColor = `#${icon?.hex}`;
	const isDarkBackground = icon?.relativeColor === "#333";

	return (
		<StyledModal
			$backgroundColor={icon?.relativeColor}
			centered
			destroyOnClose
			closeIcon={isMobileSize}
			open={Boolean(icon)}
			onCancel={() => {
				setSelectedIcon(undefined);
			}}
			footer={icon
				? (
					<Flex wrap gap="small" justify="center">
						<Button
							key="copy-slug"
							color="default"
							variant={isDarkBackground ? "solid" : undefined}
							onClick={() => {
								copyText("slug", icon.slug);
							}}
						>
							Copy Slug
						</Button>
						<Button
							key="copy-svg"
							color="default"
							variant={isDarkBackground ? "solid" : undefined}
							onClick={async () => {
								const svg = await getSvg(icons.version, icon.slug);
								copyText("SVG", svg);
							}}
						>
							Copy SVG
						</Button>
						<CdnButtons key="copy-cdn" icon={icon} />
					</Flex>
				)
				: []}
		>
			{icon && (
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
								{icon.source === icon.guidelines
									? "Source & Guidelines"
									: "Source"}
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
			)}
		</StyledModal>
	);
};

export default Modal;
