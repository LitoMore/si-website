import { Image, Layer, Rect, Stage, Text } from "react-konva";
import { usePreviewImage } from "#hooks";
import { getSimpleIconsCdnUrl } from "#utils";
import { Icon } from "#types";

const PreviewCanvas = ({ icon }: { icon: Icon }) => {
	const [images] = usePreviewImage(getSimpleIconsCdnUrl(icon.slug));

	return (
		<Stage width={720} height={400}>
			<Layer>
				<Rect
					width={720}
					height={384}
					fill={icon.relativeColor}
					cornerRadius={5}
				/>
				<Text text={icon.title} y={200} fontSize={24} />
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
