import {type ReactNode, useCallback, useLayoutEffect, useRef} from 'react';
import {useVirtualizer} from '@tanstack/react-virtual';
import {useMeasure} from '@uidotdev/usehooks';
import {type Icon} from '#types';

const gap = 8;
const targetTileSize = 68;

export default function IconGrid({
	icons,
	renderIcon,
}: {
	readonly icons: Icon[];
	readonly renderIcon: (icon: Icon) => ReactNode;
}) {
	// TanStack Virtual exposes a mutable instance; keep its reads out of Compiler caches.
	'use no memo';

	const scrollRef = useRef<HTMLDivElement>(null);
	const [gridRef, {width}] = useMeasure<HTMLDivElement>();
	const gridWidth = width ?? 0;
	const columns = Math.max(
		1,
		Math.round((gridWidth + gap) / (targetTileSize + gap)),
	);
	const rowHeight = (gridWidth - gap * (columns - 1)) / columns;
	const getRowKey = useCallback(
		(index: number) => icons[index * columns]!.slug,
		[icons, columns],
	);
	// eslint-disable-next-line react-hooks/incompatible-library -- Opted out of React Compiler above.
	const virtualizer = useVirtualizer({
		count: gridWidth > 0 ? Math.ceil(icons.length / columns) : 0,
		getScrollElement: () => scrollRef.current,
		getItemKey: getRowKey,
		estimateSize: () => rowHeight,
		gap,
		paddingStart: gap,
		paddingEnd: gap,
		overscan: 2,
	});

	useLayoutEffect(() => {
		virtualizer.measure();
	}, [virtualizer, rowHeight, columns]);

	return (
		<div ref={scrollRef} className="icon-grid-scroller">
			<div
				ref={gridRef}
				style={{height: virtualizer.getTotalSize(), position: 'relative'}}
			>
				{virtualizer.getVirtualItems().map((row) => (
					<div
						key={row.key}
						className="icon-grid"
						data-index={row.index}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
							gap,
							transform: `translateY(${row.start}px)`,
						}}
					>
						{icons
							.slice(row.index * columns, (row.index + 1) * columns)
							.map((icon) => (
								<div key={icon.slug}>{renderIcon(icon)}</div>
							))}
					</div>
				))}
			</div>
		</div>
	);
}
