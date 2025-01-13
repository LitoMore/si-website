// @deno-types="@types/react"
import { memo } from "react";
// @deno-types="@types/react-virtualized"
import { AutoSizer, Collection } from "react-virtualized";
import { Card } from "#components";
import { Icon } from "#types";

const Virutalized = memo(
	(
		{
			icons,
			iconsPreRow,
			cardPixels,
			innerWidth,
			galleryHeight,
		}: {
			icons: Icon[];
			iconsPreRow: number;
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
								const isFirstTwoLines = index < (iconsPreRow - 1) * 2;
								const line = Math.floor(
									index / (isFirstTwoLines ? iconsPreRow - 1 : iconsPreRow),
								);
								const column =
									(index % (isFirstTwoLines ? iconsPreRow - 1 : iconsPreRow)) +
									(isFirstTwoLines ? 2 : 0);
								const paddingLeft = Math.floor(
									(innerWidth - (iconsPreRow * (cardPixels + 5) - 5)) / 2,
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
