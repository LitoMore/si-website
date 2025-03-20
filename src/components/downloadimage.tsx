import { Button, Dropdown, Flex } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useIcons } from "#atom";
import { useI18n } from "#hooks";
import { downloadBitmap, downloadPdf, downloadSvg } from "#utils";
import { BitmapFormat, Icon } from "#types";

const DownloadImage = (
	{ icon, showIcon }: { icon: Icon; showIcon?: boolean },
) => {
	const [{ version }] = useIcons();
	const { i18n } = useI18n();

	const onClick = (format: BitmapFormat) => () =>
		downloadBitmap(version, icon.slug, icon.hex, format);

	const items = [{
		format: i18n.modal.svgPlain,
		onClick: () => downloadSvg(version, icon.slug),
	}, {
		format: i18n.modal.svgColored,
		onClick: () => downloadSvg(version, icon.slug, icon.hex),
	}, {
		format: "PDF",
		onClick: () => downloadPdf(version, icon.slug),
	}, {
		format: "PNG",
		onClick: onClick(BitmapFormat.PNG),
	}, {
		format: "JPG",
		onClick: onClick(BitmapFormat.JPG),
	}, {
		format: "WebP",
		onClick: onClick(BitmapFormat.WebP),
	}].map((x) => ({
		key: x.format,
		label: (
			<Flex key={x.format} onClick={x.onClick}>
				{x.format}
			</Flex>
		),
	}));

	return (
		<Dropdown placement="bottom" menu={{ items }}>
			<Button color="default" icon={showIcon && <DownloadOutlined />}>
				{i18n.modal.download}
			</Button>
		</Dropdown>
	);
};

export default DownloadImage;
