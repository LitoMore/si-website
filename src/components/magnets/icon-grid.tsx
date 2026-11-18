import {type ReactNode, useCallback, useLayoutEffect, useRef} from 'react';
import {useVirtualizer} from '@tanstack/react-virtual';
import {useMediaQuery} from '@uidotdev/usehooks';
import {type Icon} from '#types';

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
	// Match the column, tile height and gap breakpoints in magnets.css.
	const isMobile = useMediaQuery('(max-width: 600px)');
	const isCompact = useMediaQuery('(max-width: 1150px)');
	const columns = isMobile ? 4 : 3;
	const rowHeight = isCompact && !isMobile ? 84 : 88;
	const gap = isCompact ? 6 : 8;
	const getRowKey = useCallback(
		(index: number) => icons[index * columns]!.slug,
		[icons, columns],
	);
	// eslint-disable-next-line react-hooks/incompatible-library -- Opted out of React Compiler above.
	const virtualizer = useVirtualizer({
		count: Math.ceil(icons.length / columns),
		getScrollElement: () => scrollRef.current,
		getItemKey: getRowKey,
		estimateSize: () => rowHeight,
		gap,
		overscan: 2,
	});

	useLayoutEffect(() => {
		virtualizer.measure();
	}, [virtualizer, rowHeight, columns]);

	return (
		<div ref={scrollRef} className="icon-grid-scroller">
			<div style={{height: virtualizer.getTotalSize(), position: 'relative'}}>
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
