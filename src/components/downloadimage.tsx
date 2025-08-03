import {IconDownload} from '@tabler/icons-react';
import {Button, Dropdown, Flex} from 'antd';
import {useIcons} from '#atom';
import {useI18n} from '#hooks';
import {BitmapFormat, type Icon} from '#types';
import {downloadBitmap, downloadPdf, downloadSvg} from '#utils';

function DownloadImage({
	icon,
	isShowIcon,
}: {
	readonly icon: Icon;
	readonly isShowIcon?: boolean;
}) {
	const [{version}] = useIcons();
	const {i18n} = useI18n();

	const onClick = (format: BitmapFormat) => async () =>
		downloadBitmap(version, icon.slug, icon.hex, format);

	const items = [
		{
			format: i18n.modal.svgPlain,
			onClick: async () => downloadSvg(version, icon.slug),
		},
		{
			format: i18n.modal.svgColored,
			onClick: async () => downloadSvg(version, icon.slug, icon.hex),
		},
		{
			format: 'PDF',
			onClick: async () => downloadPdf(version, icon.slug),
		},
		{
			format: 'PNG',
			onClick: onClick(BitmapFormat.PNG),
		},
		{
			format: 'JPG',
			onClick: onClick(BitmapFormat.JPG),
		},
		{
			format: 'WebP',
			onClick: onClick(BitmapFormat.WebP),
		},
	].map((x) => ({
		key: x.format,
		label: (
			<Flex key={x.format} onClick={x.onClick}>
				{x.format}
			</Flex>
		),
	}));

	return (
		<Dropdown menu={{items}} placement="bottom">
			<Button
				color="default"
				icon={isShowIcon ? <IconDownload size={16} /> : null}
			>
				{i18n.modal.download}
			</Button>
		</Dropdown>
	);
}

export default DownloadImage;
