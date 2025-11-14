import {useEffect, useRef, useState} from 'react';
import {
	IconCopy,
	IconDownload,
	IconLoader2,
	IconUpload,
} from '@tabler/icons-react';
import {App, Button, Divider, Input} from 'antd';
import type Konva from 'konva';
import {useIcons, useSelectedIcon} from '#atom';
import {useI18n} from '#hooks';
import {BitmapFormat} from '#types';
import {
	copyFromCanvas,
	downloadFromCanvas,
	getImageCanvas,
	pixelRatio,
} from '#utils';
import DownloadImage from '../download/downloadimage.js';
import AutoComplete from './autocomplete.js';
import PrefixIcon from './prefixicon.js';
import Canvas from './preview-canvas.js';

function Preview() {
	const {message} = App.useApp();
	const [color, setColor] = useState('000000');
	const [icons] = useIcons();
	const [selectedIcon] = useSelectedIcon();
	const {i18n} = useI18n();
	const stageRef = useRef<Konva.Stage>(null);

	const fallbackIcon = icons.data.find((icon) => icon.slug === 'simpleicons');
	const icon = selectedIcon ?? fallbackIcon;

	useEffect(() => {
		if (!icon?.hex) return;
		setColor(icon.hex);
	}, [icon]);

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col gap-2 rounded-[5px] bg-white p-5 shadow-xl">
				<div className="flex gap-8">
					<AutoComplete />
					<Input
						className="input-uppercase w-[150px] pl-[5px]"
						placeholder="Color"
						prefix={<PrefixIcon color={color} icon={icon} iconStyle="color" />}
						value={color}
						onChange={(event) => {
							setColor(event.target.value);
						}}
					/>
				</div>
				{icon ? (
					<>
						<Canvas color={color} icon={icon} stageRef={stageRef} />
						<Divider className="m-0" />
						<div className="flex gap-2">
							<Button icon={<IconUpload size={16} />} type="default">
								{i18n.preview.uploadSvg}
							</Button>
							<div className="flex-1" />
							<DownloadImage isShowIcon icon={icon} />
							<Button
								icon={<IconDownload size={16} />}
								type="default"
								onClick={async () => {
									if (stageRef.current) {
										const dataUrl = stageRef.current.toDataURL({pixelRatio});
										const {canvas} = await getImageCanvas(dataUrl, 720, 400);
										downloadFromCanvas(canvas, BitmapFormat.PNG);
									}
								}}
							>
								{i18n.preview.savePreview}
							</Button>
							<Button
								icon={<IconCopy size={16} />}
								type="default"
								onClick={async () => {
									if (stageRef.current) {
										const dataUrl = stageRef.current.toDataURL({pixelRatio});
										const {canvas} = await getImageCanvas(dataUrl, 720, 400);
										copyFromCanvas(canvas, BitmapFormat.PNG);
										void message.success('Copied to clipboard');
									}
								}}
							>
								{i18n.preview.copyScreenshot}
							</Button>
						</div>
					</>
				) : (
					<div className="flex h-[400px] w-[720px] animate-spin items-center justify-center">
						<IconLoader2 className="opacity-50" size={32} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Preview;
