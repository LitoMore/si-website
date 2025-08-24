import {useEffect, useRef, useState} from 'react';
import type Konva from 'konva';
import {Layer, Rect, Stage, Text} from 'react-konva';
import useImage from 'use-image';
import {useIcons} from '#atom';
import {usePreviewImage} from '#hooks';
import {type Icon} from '#types';
import {getJsdelivrCdnUrl, getSvg, getSvgDataUri} from '#utils';
import MaskedIcon from '#components/canvas/masked-icon.js';

function PreviewCanvas({
	icon,
	color,
}: {
	readonly icon: Icon;
	readonly color: string;
}) {
	const [svg, setSvg] = useState('');
	const [titleHeight, setTitleHeight] = useState(0);
	const textColor = icon.relativeColor === '#fff' ? '#333' : '#fff';
	const [icons] = useIcons();
	const [siSimage] = useImage(getJsdelivrCdnUrl(icons.version, 'simpleicons'));
	const [images] = usePreviewImage(
		svg
			? getSvgDataUri(svg, color)
			: getJsdelivrCdnUrl(icons.version, icon.slug),
	);
	const titleRef = useRef<Konva.default.Text>(null);

	useEffect(() => {
		setTitleHeight(titleRef.current?.height() ?? 0);
	}, [icon.title]);

	useEffect(() => {
		// [TODO] Add loading status
		(async () => {
			const svg = await getSvg(icons.version, icon.slug);
			setSvg(svg);
		})();
	}, [icons.version, icon.slug]);

	useEffect(() => {
		if (siSimage) {
			siSimage.width = 32;
			siSimage.height = 32;
		}
	}, [siSimage]);

	const textBoxWidth = 300;
	const baseTextX = 18;
	const baseTextY = 170;
	const titleFontSize = 24;
	const textFontSize = 14;
	const fontFamily = [
		'--apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'"Noto Sans"',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
		'"Noto Color Emoji"',
	].join(',');

	const textProps = {
		fill: textColor,
		fontSize: textFontSize,
		fontFamily,
		fontStyle: '300',
		letterSpacing: 0,
	};

	return (
		<Stage height={400} id="icon-canvas" width={720}>
			<Layer>
				<Rect
					cornerRadius={5}
					fill={icon.relativeColor}
					height={384}
					width={720}
				/>
				<Text
					ref={titleRef}
					{...textProps}
					fontSize={titleFontSize}
					text={icon.title}
					width={textBoxWidth}
					x={baseTextX}
					y={baseTextY}
				/>
				<Text
					{...textProps}
					lineHeight={1.25}
					text={[
						`${icon.slug}.svg`,
						'',
						`Brand: ${icon.title}`,
						`Color: #${icon.hex}`,
					].join('\n')}
					width={textBoxWidth}
					x={baseTextX}
					y={baseTextY + titleHeight + 2}
				/>

				<Text
					{...textProps}
					lineHeight={1.25}
					text={[
						`${icons.data.length} SVG brand icons`,
						'available at simpleicons.org',
					].join('\n')}
					x={baseTextX + 36}
					y={330}
				/>
			</Layer>
			<Layer>
				<MaskedIcon
					backgroundColor={icon.relativeColor}
					foregroundColor={textColor}
					image={siSimage}
					size={32}
					x={baseTextX - 4}
					y={330}
				/>
			</Layer>
			<Layer>
				{images.map((image) => {
					if (!image) return null;
					return (
						<MaskedIcon
							key={`${icon.slug}-${image.size}`}
							backgroundColor={icon.relativeColor}
							foregroundColor={`#${icon.hex}`}
							image={image.element}
							size={image.size}
							x={image.x}
							y={10}
						/>
					);
				})}
			</Layer>
		</Stage>
	);
}

export default PreviewCanvas;
