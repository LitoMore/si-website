import {Image, Rect} from 'react-konva';

function MaskedIcon({
	backgroundColor,
	foregroundColor,
	image,
	size,
	x,
	y,
}: {
	readonly backgroundColor: string;
	readonly foregroundColor: string;
	readonly image?: HTMLImageElement;
	readonly size: number;
	readonly x: number;
	readonly y: number;
}) {
	return (
		<>
			<Rect fill={backgroundColor} height={size} width={size} x={x} y={y} />
			<Image
				globalCompositeOperation="xor"
				height={size}
				image={image}
				width={size}
				x={x}
				y={y}
			/>
			<Rect
				fill={foregroundColor}
				globalCompositeOperation="xor"
				height={size}
				width={size}
				x={x}
				y={y}
			/>
		</>
	);
}

export default MaskedIcon;
