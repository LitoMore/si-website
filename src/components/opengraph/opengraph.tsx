import {useEffect, useState} from 'react';
import shuffle from 'array-shuffle';
import {Layer, Rect, Stage} from 'react-konva';
import {useIcons, useOpenGraphImage} from '#atom';
import {brightThreshold} from '#constants';
import {useColorScheme} from '#hooks';
import {getJsdelivrCdnUrl} from '#utils';
import MaskedIcon from '../canvas/masked-icon.js';

const centerIconRatio = 2;

function OpenGraph({seed}: {readonly seed: number}) {
	const [{width, height, size, gap}] = useOpenGraphImage();
	const {isLight} = useColorScheme();
	const [{data, version}] = useIcons();
	const [shuffled, setShuffled] = useState(data);

	useEffect(() => {
		const shuffledData = shuffle(
			data.filter(
				(icon) =>
					icon.slug !== 'simpleicons' &&
					((isLight
						? icon.brightness <= brightThreshold
						: icon.brightness > 0.1) ||
						icon.hex === '000000'),
			),
		);
		setShuffled(shuffledData);
	}, [seed, data, isLight]);

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

	const ratio = (rows % 2) + centerIconRatio;
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
	const siImageSize = size * ratio + gap * (ratio - 1);
	siImage.src = getJsdelivrCdnUrl(version, 'simpleicons');
	siImage.width = siImageSize;
	siImage.height = siImageSize;

	const images = icons.map((icon) => {
		const image = new globalThis.Image();
		image.src = getJsdelivrCdnUrl(version, icon.slug);
		image.width = size;
		image.height = size;
		return {image, icon};
	});

	const fillColor = isLight ? '#fff' : '#000';
	const centerIconX = mainIconPosition.x - (isOddColumn ? (size + gap) / 2 : 0);
	const centerIconY = mainIconPosition.y;
	const centerIconSize = siImageSize;
	const centerIconColor = isLight ? '#000' : '#fff';

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="box-content! border border-white" style={{width, height}}>
				<Stage height={height} width={width}>
					<Layer>
						<Rect fill={fillColor} height={height} width={width} />
					</Layer>
					<Layer>
						{images.map(({image, icon}, index) => {
							if (ignoredIndexes.has(index)) return null;
							const iconColor = `#${icon.hex === '000000' ? (isLight ? '222' : 'ddd') : icon.hex}`;
							const {x, y} = getIconPosition(index);
							return (
								<MaskedIcon
									key={icon.slug}
									backgroundColor={fillColor}
									foregroundColor={iconColor}
									image={image}
									size={size}
									x={x}
									y={y}
								/>
							);
						})}
					</Layer>
					<Layer>
						<MaskedIcon
							backgroundColor={fillColor}
							foregroundColor={centerIconColor}
							image={siImage}
							size={centerIconSize}
							x={centerIconX}
							y={centerIconY}
						/>
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default OpenGraph;
