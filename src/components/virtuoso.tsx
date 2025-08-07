import {type ComponentPropsWithoutRef, forwardRef} from 'react';
import {VirtuosoGrid} from 'react-virtuoso';
import {Card} from '#components';
import {type Icon} from '#types';

function Virtuoso({
	icons,
	galleryHeight,
	galleryMargin,
}: {
	readonly icons: Icon[];
	readonly galleryHeight: string;
	readonly galleryMargin: number;
}) {
	return (
		<VirtuosoGrid
			components={{
				List: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
					({children, style, ...props}, ref) => (
						<div
							ref={ref}
							{...props}
							style={{
								...style,
								display: 'flex',
								flexWrap: 'wrap',
								gap: 5,
								margin: `10px 0`,
							}}
						>
							{children}
						</div>
					),
				),
			}}
			data={icons}
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
