import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Image, Layer, Rect, Stage, Text } from "react-konva";
import useImage from "use-image";
import { useIcons } from "#atom";
import { usePreviewImage } from "#hooks";
import { getSimpleIconsCdnUrl, getSvg, getSvgDataUri } from "#utils";
import { Icon } from "#types";

const PreviewCanvas = ({ icon, color }: { icon: Icon; color: string }) => {
	const [svg, setSvg] = useState("");
	const [titleHeight, setTitleHeight] = useState(0);
	const textColor = icon.relativeColor === "#fff" ? "#333" : "#fff";
	const [icons] = useIcons();
	const [siSimage] = useImage(
		`https://cdn.simpleicons.org/simpleicons/${textColor.slice(1)}`,
	);
	const [images] = usePreviewImage(
		svg ? getSvgDataUri(svg, color) : getSimpleIconsCdnUrl(icon.slug),
	);
	const titleRef = useRef<Konva.default.Text>(null);

	useEffect(() => {
		setTitleHeight(titleRef.current?.height() ?? 0);
	}, [icon.title]);

	useEffect(() => {
		// [TODO] Add loading status
		getSvg(icons.version, icon.slug).then((svg) => setSvg(svg));
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
		"--apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		'"Noto Sans"',
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
		'"Noto Color Emoji"',
	].join(",");

	const textProps = {
		fill: textColor,
		fontSize: textFontSize,
		fontFamily,
		fontStyle: "300",
		letterSpacing: 0,
	};

	return (
		<Stage id="icon-canvas" width={720} height={400}>
			<Layer>
				<Rect
					width={720}
					height={384}
					fill={icon.relativeColor}
					cornerRadius={5}
				/>
				<Text
					ref={titleRef}
					{...textProps}
					fontSize={titleFontSize}
					width={textBoxWidth}
					x={baseTextX}
					y={baseTextY}
					text={icon.title}
				/>
				<Text
					{...textProps}
					width={textBoxWidth}
					x={baseTextX}
					y={baseTextY + titleHeight + 2}
					lineHeight={1.25}
					text={[
						`${icon.slug}.svg`,
						"",
						`Brand: ${icon.title}`,
						`Color: #${icon.hex}`,
					].join("\n")}
				/>
				<Image x={baseTextX - 4} y={330} image={siSimage} />
				<Text
					{...textProps}
					x={baseTextX + 36}
					y={330}
					lineHeight={1.25}
					text={[
						`${icons.data.length} SVG brand icons`,
						"available at simpleicons.org",
					].join("\n")}
				/>
				{images.map((image) => {
					if (!image) return null;
					return (
						<Image key={image.size} image={image.element} x={image.x} y={10} />
					);
				})}
			</Layer>
		</Stage>
	);
};

export default PreviewCanvas;
