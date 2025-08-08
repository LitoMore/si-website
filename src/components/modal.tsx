import {Suspense, lazy} from 'react';
import {IconLoader2} from '@tabler/icons-react';
import {Button, ConfigProvider, Dropdown, Modal, theme} from 'antd';
import {useColorMode, useIcons, useSelectedIcon} from '#atom';
import {spinning} from '#constants';
import {useCopyText, useI18n, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {
	getJsdelivrCdnUrl,
	getSimpleIconsCdnUrl,
	getSvg,
	getSvgPath,
	getUnpkgCdnUrl,
} from '#utils';
import DownloadImage from './downloadimage.js';

const ModalContent = lazy(async () => import('./modalcontent.js'));

function CopySvgButtons({icon}: {readonly icon: Icon}) {
	const [{version}] = useIcons();
	const {i18n} = useI18n();
	const copyText = useCopyText();

	const copySvg = async (options?: {colored?: boolean; path?: boolean}) => {
		const svg = await getSvg(version, icon.slug);

		if (options?.path) {
			const path = getSvgPath(svg);
			if (path) copyText(i18n.modal.svgPath, path);
			return;
		}

		if (options?.colored) {
			const colored = svg.replace('<svg ', `<svg fill="#${icon.hex}" `);
			copyText(i18n.modal.svgColored, colored);
			return;
		}

		copyText(i18n.modal.svgPlain, svg);
	};

	const items = [
		{
			type: i18n.modal.svgPlain,
			onClick: async () => copySvg(),
		},
		{
			type: i18n.modal.svgColored,
			onClick: async () => copySvg({colored: true}),
		},
		{
			type: i18n.modal.svgPath,
			onClick: async () => copySvg({path: true}),
		},
	].map((x) => ({
		key: x.type,
		label: (
			<div key={x.type} className="flex" onClick={x.onClick}>
				{x.type}
			</div>
		),
	}));

	return (
		<Dropdown menu={{items}} placement="bottom">
			<Button color="default">{i18n.modal.copy} SVG</Button>
		</Dropdown>
	);
}

function CdnButtons({icon}: {readonly icon: Icon}) {
	const [{version}] = useIcons();
	const {i18n} = useI18n();
	const copyText = useCopyText();

	const items = [
		{
			title: 'cdn.simpleicons.org',
			link: getSimpleIconsCdnUrl(icon.slug),
		},
		{
			title: 'jsDelivr',
			link: getJsdelivrCdnUrl(version, icon.slug),
		},
		{
			title: 'unpkg',
			link: getUnpkgCdnUrl(version, icon.slug),
		},
	].map((x) => ({
		key: x.title,
		label: (
			<div
				key={x.title}
				className="flex"
				onClick={() => {
					copyText(x.title, x.link);
				}}
			>
				{x.title}
			</div>
		),
	}));

	return (
		<Dropdown menu={{items}} placement="bottom">
			<Button color="default">{i18n.modal.copy} CDN</Button>
		</Dropdown>
	);
}

export default function SiModal() {
	const [icon, setSelectedIcon] = useSelectedIcon();
	const {isMobileSize} = useSizes();
	const [colorMode] = useColorMode();
	const {i18n} = useI18n();
	const copyText = useCopyText();
	const isDarkIcon = icon?.relativeColor === '#fff';

	return (
		<ConfigProvider
			theme={
				colorMode === ColorMode.Actual
					? {
							algorithm: isDarkIcon
								? theme.defaultAlgorithm
								: theme.darkAlgorithm,
						}
					: undefined
			}
		>
			<Modal
				centered
				destroyOnHidden
				closeIcon={isMobileSize}
				footer={
					icon ? (
						<div className="flex flex-col items-center justify-center gap-[5px]">
							<div className="flex flex-wrap justify-center gap-[5px]">
								<Button
									color="default"
									onClick={() => {
										copyText('slug', icon.slug);
									}}
								>
									{i18n.modal.copy} Slug
								</Button>
								<CopySvgButtons icon={icon} />
								<CdnButtons icon={icon} />
								<DownloadImage icon={icon} />
							</div>
						</div>
					) : (
						[]
					)
				}
				open={Boolean(icon)}
				onCancel={() => {
					setSelectedIcon(undefined);
				}}
			>
				<Suspense
					fallback={
						<div className="flex items-center justify-center">
							<IconLoader2 style={spinning} />
						</div>
					}
				>
					<ModalContent icon={icon} />
				</Suspense>
			</Modal>
		</ConfigProvider>
	);
}
