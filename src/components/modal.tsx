import { lazy, Suspense } from "react";
import { Button, ConfigProvider, Dropdown, Flex, Modal, theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useColorMode, useIcons, useSelectedIcon } from "#atom";
import { useCopyText, useI18n, useSizes } from "#hooks";
import {
	getJsdelivrCdnUrl,
	getSimpleIconsCdnUrl,
	getSvg,
	getSvgPath,
	getUnpkgCdnUrl,
} from "#utils";
import { ColorMode, Icon } from "#types";
import DownloadImage from "./downloadimage.tsx";

const ModalContent = lazy(() => import("./modalcontent.tsx"));

const CopySvgButtons = ({ icon }: { icon: Icon }) => {
	const [{ version }] = useIcons();
	const { i18n } = useI18n();
	const copyText = useCopyText();

	const copySvg = async (
		options?: { colored?: boolean; path?: boolean },
	) => {
		const svg = await getSvg(version, icon.slug);

		if (options?.path) {
			const path = getSvgPath(svg);
			copyText(i18n.modal.svgPath, path);
			return;
		}

		if (options?.colored) {
			const colored = svg.replace("<svg ", `<svg fill="#${icon.hex}" `);
			copyText(i18n.modal.svgColored, colored);
			return;
		}

		copyText(i18n.modal.svgPlain, svg);
	};

	const items = [{
		type: i18n.modal.svgPlain,
		onClick: () => copySvg(),
	}, {
		type: i18n.modal.svgColored,
		onClick: () => copySvg({ colored: true }),
	}, {
		type: i18n.modal.svgPath,
		onClick: () => copySvg({ path: true }),
	}].map((x) => ({
		key: x.type,
		label: (
			<Flex key={x.type} onClick={x.onClick}>
				{x.type}
			</Flex>
		),
	}));

	return (
		<Dropdown placement="bottom" menu={{ items }}>
			<Button color="default">
				{i18n.modal.copy} SVG
			</Button>
		</Dropdown>
	);
};

const CdnButtons = ({ icon }: { icon: Icon }) => {
	const [{ version }] = useIcons();
	const { i18n } = useI18n();
	const copyText = useCopyText();

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
				onClick={() => copyText(x.title, x.link)}
			>
				{x.title}
			</Flex>
		),
	}));

	return (
		<Dropdown placement="bottom" menu={{ items }}>
			<Button color="default">
				{i18n.modal.copy} CDN
			</Button>
		</Dropdown>
	);
};

export default function SiModal() {
	const [icon, setSelectedIcon] = useSelectedIcon();
	const { isMobileSize } = useSizes();
	const [colorMode] = useColorMode();
	const { i18n } = useI18n();
	const copyText = useCopyText();
	const isDarkIcon = icon?.relativeColor === "#fff";

	return (
		<ConfigProvider
			theme={colorMode === ColorMode.Actual
				? {
					algorithm: isDarkIcon ? theme.defaultAlgorithm : theme.darkAlgorithm,
				}
				: undefined}
		>
			<Modal
				centered
				destroyOnHidden
				closeIcon={isMobileSize}
				open={Boolean(icon)}
				footer={icon
					? (
						<Flex vertical gap={5} justify="center" align="center">
							<Flex wrap gap={5} justify="center">
								<Button
									color="default"
									onClick={() => {
										copyText("slug", icon.slug);
									}}
								>
									{i18n.modal.copy} Slug
								</Button>
								<CopySvgButtons icon={icon} />
								<CdnButtons icon={icon} />
								<DownloadImage icon={icon} />
							</Flex>
						</Flex>
					)
					: []}
				onCancel={() => {
					setSelectedIcon(undefined);
				}}
			>
				<Suspense fallback={<LoadingOutlined />}>
					<ModalContent icon={icon} />
				</Suspense>
			</Modal>
		</ConfigProvider>
	);
}
