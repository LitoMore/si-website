import {useEffect, useState} from 'react';
import {
	IconCopy,
	IconDownload,
	IconLoader2,
	IconUpload,
} from '@tabler/icons-react';
import {Button, Divider, Flex, Input} from 'antd';
import {styled} from 'styled-components';
import {useIcons, useSelectedIcon} from '#atom';
import {spinning} from '#constants';
import {useI18n} from '#hooks';
import AutoComplete from './autocomplete.js';
import DownloadImage from './downloadimage.js';
import PrefixIcon from './prefixicon.js';
import Canvas from './previewcanvas.js';

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

function Preview() {
	const [color, setColor] = useState('000000');
	const [icons] = useIcons();
	const [selectedIcon] = useSelectedIcon();
	const {i18n} = useI18n();

	const fallbackIcon = icons.data.find((icon) => icon.slug === 'simpleicons');
	const icon = selectedIcon ?? fallbackIcon;

	useEffect(() => {
		if (!icon?.hex) return;
		setColor(icon.hex);
	}, [icon]);

	return (
		<Flex align="center" justify="center" style={{height: '100vh'}}>
			<Card vertical gap={8}>
				<Flex gap={8}>
					<AutoComplete />
					<ColorInput
						placeholder="Color"
						prefix={<PrefixIcon color={color} icon={icon} iconStyle="color" />}
						value={color}
						onChange={(event) => {
							setColor(event.target.value);
						}}
					/>
				</Flex>
				{icon ? (
					<>
						<Canvas color={color} icon={icon} />
						<Divider style={{margin: 0}} />
						<Flex gap={8}>
							<Button icon={<IconUpload size={16} />} type="default">
								{i18n.preview.uploadSvg}
							</Button>
							<div style={{flex: 1}} />
							<DownloadImage isShowIcon icon={icon} />
							<Button
								icon={<IconDownload size={16} />}
								type="default"
								onClick={() => {
									const canvas = globalThis.document.querySelector('canvas');
									if (!canvas) return;
									canvas.toBlob((blob) => {
										if (!blob) return;
										// eslint-disable-next-line @typescript-eslint/naming-convention
										const item = new ClipboardItem({'image/png': blob});
										void navigator.clipboard.write([item]);
									});
								}}
							>
								{i18n.preview.savePreview}
							</Button>
							<Button icon={<IconCopy size={16} />} type="default">
								{i18n.preview.copyScreenshot}
							</Button>
						</Flex>
					</>
				) : (
					<Flex
						align="center"
						justify="center"
						style={{width: 720, height: 400}}
					>
						<IconLoader2 size={32} style={{...spinning, opacity: 0.5}} />
					</Flex>
				)}
			</Card>
		</Flex>
	);
}

export default Preview;
