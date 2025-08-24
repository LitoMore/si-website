import {useEffect, useState} from 'react';
import shuffle from 'array-shuffle';
import {Image, Layer, Rect, Stage} from 'react-konva';
import {useIcons, useOpenGraphImage} from '#atom';
import {brightThreshold} from '#constants';
import {useColorScheme} from '#hooks';

function OpenGraph({seed}: {readonly seed: number}) {
	const [{width, height, size, gap}] = useOpenGraphImage();
	const {isDark} = useColorScheme();
	const [{data}] = useIcons();
	const [shuffled, setShuffled] = useState(data);

	const baseRatio = 2;

	useEffect(() => {
		const shuffledData = shuffle(
			data.filter(
				(icon) =>
					icon.slug !== 'simpleicons' &&
					((isDark
						? icon.brightness <= brightThreshold
						: icon.brightness > 0.1) ||
						icon.hex === '000000'),
			),
		);
		setShuffled(shuffledData);
	}, [seed, data, isDark]);

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
	siImage.src = `https://cdn.simpleicons.org/simpleicons/${isDark ? '000' : 'fff'}`;
	siImage.width = size * ratio + gap * (ratio - 1);
	siImage.height = size * ratio + gap * (ratio - 1);

	const images = icons.map((icon) => {
		const image = new globalThis.Image();
		image.src = `https://cdn.simpleicons.org/${icon.slug}${icon.hex === '000000' ? (isDark ? '/222' : '/ddd') : ''}`;
		image.width = size;
		image.height = size;
		return {image, icon};
	});

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div style={{width, height}}>
				<Stage height={height} width={width}>
					<Layer>
						<Rect
							fill={isDark ? '#fff' : '#000'}
							height={height}
							width={width}
						/>
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
