import shuffle from 'array-shuffle';
import {Image, Layer, Rect, Stage} from 'react-konva';
import {
	useIcons,
	useOpenGraphGap,
	useOpenGraphHeight,
	useOpenGraphSize,
	useOpenGraphWidth,
} from '#atom';

function OpenGraph({onSubmit}: {readonly onSubmit?: () => void}) {
	const [width] = useOpenGraphWidth();
	const [height] = useOpenGraphHeight();
	const [size] = useOpenGraphSize();
	const [gap] = useOpenGraphGap();

	const baseRatio = 2;

	const [{data}] = useIcons();
	const shuffled = shuffle(
		data.filter(
			(icon) =>
				icon.slug !== 'simpleicons' &&
				(icon.brightness > 0.1 || icon.hex === '000000'),
		),
	);

	const rows = Math.floor((height - gap) / (size + gap));
	const columns = Math.floor((width - gap) / (size + gap));
	const icons = shuffled.slice(0, rows * columns);
	const paddingLeft = Math.floor(
		(width - gap * 2 - (columns * size + (columns - 1) * gap)) / 2,
	);
	const paddingTop = Math.floor(
		(height - gap * 2 - (rows * size + (rows - 1) * gap)) / 2,
	);

	const getIconPosition = (index: number) => {
		const iconRowIndex = Math.floor(index / columns);
		const iconColumnIndex = index % columns;
		const x = gap + paddingLeft + iconColumnIndex * (size + gap);
		const y = gap + paddingTop + iconRowIndex * (size + gap);
		if (index === 0) console.log({x, y});
		return {x, y};
	};

	const ratio = (rows % 2) + baseRatio;
	const isOddColumn = (columns - ratio) % 2 === 1;
	const mainIconPositionRow = Math.ceil((rows - ratio) / 2);
	const mainIconPositionColumn = Math.ceil((columns - ratio) / 2);
	const mainIconIndex = mainIconPositionRow * columns + mainIconPositionColumn;
	const mainIconPosition = getIconPosition(mainIconIndex);

	const ignoredIndexes = new Set(
		Array.from({length: ratio}, (_, i) => i + mainIconPositionRow).flatMap(
			(x) =>
				Array.from(
					{length: ratio + (isOddColumn ? 1 : 0)},
					(_, i) =>
						i + columns * x + mainIconPositionColumn - (isOddColumn ? 1 : 0),
				),
		),
	);

	const siImage = new globalThis.Image();
	siImage.src = 'https://cdn.simpleicons.org/simpleicons/fff';
	siImage.width = size * ratio + gap * (ratio - 1);
	siImage.height = size * ratio + gap * (ratio - 1);

	const images = icons.map((icon) => {
		const image = new globalThis.Image();
		image.src = `https://cdn.simpleicons.org/${icon.slug}${icon.hex === '000000' ? '/ddd' : ''}`;
		image.width = size;
		image.height = size;
		return {image, icon};
	});

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div style={{width, height}}>
				<Stage height={height} width={width}>
					<Layer>
						<Rect fill="#000" height={height} width={width} />
						{images.map(({image, icon}, index) => {
							if (ignoredIndexes.has(index)) return null;
							const {x, y} = getIconPosition(index);
							return <Image key={icon.slug} image={image} x={x} y={y} />;
						})}
						<Image
							height={size * ratio + gap * (ratio - 1)}
							image={siImage}
							width={size * ratio + gap * (ratio - 1)}
							x={mainIconPosition.x - (isOddColumn ? (size + gap) / 2 : 0)}
							y={mainIconPosition.y}
						/>
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default OpenGraph;
