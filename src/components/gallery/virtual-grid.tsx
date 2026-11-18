import {useCallback, useLayoutEffect, useRef} from 'react';
import {useVirtualizer} from '@tanstack/react-virtual';
import {galleryAdvertisement} from '#constants';
import {type Icon} from '#types';
import CarbonAd from './carbonad.js';
import Card from './card.js';

function VirtualGrid({
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
	// TanStack Virtual exposes a mutable instance; keep its reads out of Compiler caches.
	'use no memo';

	const scrollRef = useRef<HTMLDivElement>(null);
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
	const rowCount = Math.ceil(
		Math.max(0, icons.length - headerCount) / iconsPerRow,
	);
	const rowHeight = cardPixels + 5;
	const headerHeight = activeAdvertisement
		? activeAdvertisement.rows * rowHeight + 10
		: 10;
	const getRowKey = useCallback(
		(index: number) => icons[headerCount + index * iconsPerRow]!.slug,
		[icons, headerCount, iconsPerRow],
	);
	// eslint-disable-next-line react-hooks/incompatible-library -- Opted out of React Compiler above.
	const virtualizer = useVirtualizer({
		count: rowCount,
		getScrollElement: () => scrollRef.current,
		getItemKey: getRowKey,
		estimateSize: () => rowHeight,
		paddingStart: headerHeight,
		paddingEnd: 10,
		overscan: 2,
	});

	useLayoutEffect(() => {
		// Discard cached row sizes after zooming or changing the responsive layout.
		virtualizer.measure();
	}, [virtualizer, rowHeight, iconsPerRow]);

	return (
		<div
			ref={scrollRef}
			className="gallery-scroller"
			style={{
				height: galleryHeight,
				margin: `0 ${galleryMargin}px`,
				overflow: 'auto',
				overflowAnchor: 'none',
			}}
		>
			<div style={{height: virtualizer.getTotalSize(), position: 'relative'}}>
				{activeAdvertisement ? (
					<div
						className="grid gap-1.25 pt-2.5 pb-1.25"
						style={{
							gridTemplateColumns: `repeat(${iconsPerRow}, ${cardPixels}px)`,
							gridTemplateRows: `repeat(${activeAdvertisement.rows}, ${cardPixels}px)`,
						}}
					>
						{icons.slice(0, headerCount).map((icon) => (
							<Card key={icon.slug} icon={icon} />
						))}
						<CarbonAd
							style={{
								gridColumn: `${iconsPerRow - activeAdvertisement.columns + 1} / span ${activeAdvertisement.columns}`,
								gridRow: `1 / span ${activeAdvertisement.rows}`,
							}}
						/>
					</div>
				) : null}
				{virtualizer.getVirtualItems().map((row) => {
					const start = headerCount + row.index * iconsPerRow;
					return (
						<div
							key={row.key}
							className="absolute top-0 left-0 grid gap-1.25 pb-1.25"
							data-index={row.index}
							style={{
								gridTemplateColumns: `repeat(${iconsPerRow}, ${cardPixels}px)`,
								height: rowHeight,
								transform: `translateY(${row.start}px)`,
							}}
						>
							{icons.slice(start, start + iconsPerRow).map((icon) => (
								<Card key={icon.slug} icon={icon} />
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VirtualGrid;
