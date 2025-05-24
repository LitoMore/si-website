import { memo } from "react";
import { AutoSizer, Collection } from "react-virtualized";
import { Card } from "#components";
import { Icon } from "#types";

const Virutalized = memo(
	(
		{
			icons,
			iconsPerRow,
			cardPixels,
			innerWidth,
			galleryHeight,
		}: {
			icons: Icon[];
			iconsPerRow: number;
			cardPixels: number;
			innerWidth: number;
			galleryHeight: string;
		},
	) => {
		return (
			<AutoSizer
				className="asb"
				style={{ height: galleryHeight, width: innerWidth }}
			>
				{({ height, width }) => {
					return (
						<Collection
							width={width}
							height={height}
							cellCount={icons.length}
							cellRenderer={({ index, style }) => {
								const icon = icons[index];
								return (
									<Card
										key={icon.slug}
										style={style}
										icon={icon}
									/>
								);
							}}
							cellSizeAndPositionGetter={({ index }) => {
								const isFirstTwoLines = index < (iconsPerRow - 1) * 2;
								const line = Math.floor(
									index / (isFirstTwoLines ? iconsPerRow - 1 : iconsPerRow),
								);
								const column =
									(index % (isFirstTwoLines ? iconsPerRow - 1 : iconsPerRow)) +
									(isFirstTwoLines ? 2 : 0);
								const paddingLeft = Math.floor(
									(innerWidth - (iconsPerRow * (cardPixels + 5) - 5)) / 2,
								);

								if (index === 0) {
									return {
										x: paddingLeft + (cardPixels * 2 + 5),
										y: 10,
										width: innerWidth,
										height: 10,
									};
								}

								return {
									x: paddingLeft + column * (cardPixels + 5),
									y: 10 + line * (cardPixels + 5),
									width: cardPixels,
									height: cardPixels,
								};
							}}
						/>
					);
				}}
			</AutoSizer>
		);
	},
);

export default Virutalized;
