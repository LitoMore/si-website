import {
	type Components,
	type ContextProp,
	Virtuoso as VirtualList,
} from 'react-virtuoso';
import {galleryAdvertisement} from '#constants';
import {type Icon} from '#types';
import CarbonAd from './carbonad.js';
import Card from './card.js';

type GalleryContext = {
	readonly headerIcons: Icon[];
	readonly iconsPerRow: number;
	readonly cardPixels: number;
	readonly advertisement: typeof galleryAdvertisement | undefined;
};

function GalleryHeader({context}: ContextProp<GalleryContext>) {
	if (!context?.advertisement) {
		return <div className="h-2.5" />;
	}

	const {headerIcons, iconsPerRow, cardPixels, advertisement} = context;
	return (
		<div
			className="grid gap-1.25 pt-2.5 pb-1.25"
			style={{
				gridTemplateColumns: `repeat(${iconsPerRow}, ${cardPixels}px)`,
				gridTemplateRows: `repeat(${advertisement.rows}, ${cardPixels}px)`,
			}}
		>
			{headerIcons.map((icon) => (
				<Card key={icon.slug} icon={icon} />
			))}
			<CarbonAd
				style={{
					gridColumn: `${iconsPerRow - advertisement.columns + 1} / span ${advertisement.columns}`,
					gridRow: `1 / span ${advertisement.rows}`,
				}}
			/>
		</div>
	);
}

function GalleryFooter() {
	// Keep outer spacing in measured components, not margins on recycled items.
	return <div className="h-2.5" />;
}

const components: Components<Icon[], GalleryContext> = {
	Header: GalleryHeader,
	Footer: GalleryFooter,
};

function Virtuoso({
	icons,
	galleryHeight,
	galleryMargin,
	iconsPerRow,
	cardPixels,
	advertisement = galleryAdvertisement,
}: {
	readonly icons: Icon[];
	readonly galleryHeight: string;
	readonly galleryMargin: number;
	readonly iconsPerRow: number;
	readonly cardPixels: number;
	readonly advertisement?: typeof galleryAdvertisement;
}) {
	// Hide ads that cannot fit instead of changing their configured dimensions.
	const activeAdvertisement =
		advertisement.enabled &&
		Number.isSafeInteger(advertisement.columns) &&
		Number.isSafeInteger(advertisement.rows) &&
		advertisement.columns > 0 &&
		advertisement.rows > 0 &&
		advertisement.columns <= iconsPerRow
			? advertisement
			: undefined;
	// Only the rows next to the advertisement stay outside the virtualized grid.
	const headerCount = activeAdvertisement
		? activeAdvertisement.rows * (iconsPerRow - activeAdvertisement.columns)
		: 0;
	const headerIcons = icons.slice(0, headerCount);
	const remainingIcons = headerCount > 0 ? icons.slice(headerCount) : icons;
	const rows = Array.from(
		{length: Math.ceil(remainingIcons.length / iconsPerRow)},
		(_, index) =>
			remainingIcons.slice(index * iconsPerRow, (index + 1) * iconsPerRow),
	);
	// Keep two rows ready at both ends, but avoid mounting several rows of SVG
	// paths as one large chunk in a single scroll frame.
	const rowHeight = cardPixels + 5;

	return (
		<VirtualList
			components={components}
			computeItemKey={(_index, row) => row[0]!.slug}
			context={{
				headerIcons,
				iconsPerRow,
				cardPixels,
				advertisement: activeAdvertisement,
			}}
			data={rows}
			fixedItemHeight={rowHeight}
			increaseViewportBy={rowHeight * 2}
			itemContent={(_index, row) => (
				<div
					className="grid gap-1.25 pb-1.25"
					style={{
						gridTemplateColumns: `repeat(${iconsPerRow}, ${cardPixels}px)`,
						height: rowHeight,
					}}
				>
					{row.map((icon) => (
						<Card key={icon.slug} icon={icon} />
					))}
				</div>
			)}
			overscan={0}
			style={{
				height: galleryHeight,
				margin: `0 ${galleryMargin}px`,
				overflowAnchor: 'none',
			}}
		/>
	);
}

export default Virtuoso;
