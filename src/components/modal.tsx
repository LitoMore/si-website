// @deno-types="@types/react"
import { lazy, Suspense } from "react";
import { Button, Dropdown, Flex, Modal as AntModal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { useIcons, useSelectedIcon } from "#atom";
import { useCopyText, useSizes } from "#hooks";
import {
	getJsdelivrCdnUrl,
	getSimpleIconsCdnUrl,
	getSvg,
	getUnpkgCdnUrl,
} from "#utils";
import { Icon } from "#types";

const ModalContent = lazy(() => import("./modalcontent.tsx"));

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
			<Suspense fallback={<LoadingOutlined />}>
				{<ModalContent icon={icon} />}
			</Suspense>
		</StyledModal>
	);
};

export default Modal;
