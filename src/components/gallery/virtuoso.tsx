import {type ComponentPropsWithoutRef, forwardRef} from 'react';
import {
	type ContextProp,
	type GridComponents,
	VirtuosoGrid,
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
		return null;
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

const GalleryList = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<'div'> & ContextProp<GalleryContext>
>(({children, style, context, ...props}, ref) => (
	<div
		ref={ref}
		{...props}
		className={
			context?.advertisement
				? 'mb-2.5 flex flex-wrap gap-1.25'
				: 'my-2.5 flex flex-wrap gap-1.25'
		}
		style={style}
	>
		{children}
	</div>
));

const components: GridComponents<GalleryContext> = {
	Header: GalleryHeader,
	List: GalleryList,
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

	return (
		<VirtuosoGrid
			components={components}
			computeItemKey={(_index, icon) => icon.slug}
			context={{
				headerIcons,
				iconsPerRow,
				cardPixels,
				advertisement: activeAdvertisement,
			}}
			data={remainingIcons}
			itemContent={(_index, icon) => <Card key={icon.slug} icon={icon} />}
			overscan={200}
			style={{
				height: galleryHeight,
				margin: `0 ${galleryMargin}px`,
			}}
		/>
	);
}

export default Virtuoso;
