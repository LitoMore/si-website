import {useColorMode, useIcons, useSelectedIcon} from '#atom';
import {Button} from '#components/ui/button.js';
import {Dialog} from '#components/ui/dialog.js';
import {Dropdown} from '#components/ui/dropdown.js';
import {useCopyText, useI18n, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {
	getJsdelivrCdnUrl,
	getSimpleIconsCdnUrl,
	getSvg,
	getSvgPath,
	getUnpkgCdnUrl,
} from '#utils';
import componentLabels from '../../i18n/ui.js';
import DownloadImage from '../download/downloadimage.js';
import ModalContent from './modalcontent.js';

function CopySvgButtons({icon}: {readonly icon: Icon}) {
	const [{version}] = useIcons();
	const {i18n, gettext} = useI18n();
	const copyText = useCopyText();

	const copySvg = async (options?: {colored?: boolean; path?: boolean}) => {
		const svg = await getSvg(version, icon.slug);

		if (options?.path) {
			const path = getSvgPath(svg);
			if (path) copyText(i18n.modal.svgPath, path);
			return;
		}

		if (options?.colored) {
			const colored = svg.replace('<svg ', () => `<svg fill="#${icon.hex}" `);
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
		label: x.type,
		onClick() {
			void x.onClick();
		},
	}));

	return (
		<Dropdown align="center" items={items}>
			<Button>{gettext(i18n.modal.copy, ['SVG'])}</Button>
		</Dropdown>
	);
}

function CdnButtons({icon}: {readonly icon: Icon}) {
	const [{version}] = useIcons();
	const {i18n, gettext} = useI18n();
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
		label: x.title,
		onClick() {
			copyText(x.title, x.link);
		},
	}));

	return (
		<Dropdown align="center" items={items}>
			<Button>{gettext(i18n.modal.copy, ['CDN'])}</Button>
		</Dropdown>
	);
}

export default function SiModal() {
	const [icon, setSelectedIcon] = useSelectedIcon();
	const {isMobileSize} = useSizes();
	const [colorMode] = useColorMode();
	const {i18n, gettext, languageCode} = useI18n();
	const copyText = useCopyText();
	const isDarkIcon = icon?.relativeColor === '#fff';

	return (
		<Dialog
			closeLabel={componentLabels[languageCode].global.close}
			footer={
				icon ? (
					<div className="flex flex-col items-center justify-center gap-1.25">
						<div className="flex flex-wrap justify-center gap-1.25">
							<Button
								onClick={() => {
									copyText('slug', icon.slug);
								}}
							>
								{gettext(i18n.modal.copy, ['Slug'])}
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
			isCloseVisible={isMobileSize}
			isOpen={Boolean(icon)}
			theme={
				colorMode === ColorMode.Actual
					? isDarkIcon
						? 'light'
						: 'dark'
					: undefined
			}
			title={icon?.title ?? i18n.modal.title}
			onOpenChange={(isOpen) => {
				if (!isOpen) setSelectedIcon(undefined);
			}}
		>
			<ModalContent icon={icon} />
		</Dialog>
	);
}
