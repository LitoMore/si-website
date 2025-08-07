import {VirtuosoMasonry} from '@virtuoso.dev/masonry';
import {Card} from '#components';
import {type Icon} from '#types';

function Virtuoso({
	icons,
	galleryHeight,
	galleryMargin,
	iconsPerRow,
}: {
	readonly icons: Icon[];
	readonly galleryHeight: string;
	readonly galleryMargin: number;
	readonly iconsPerRow: number;
}) {
	return (
		<VirtuosoMasonry
			ItemContent={({data}) =>
				data ? (
					<Card key={data.slug} icon={data} style={{marginBottom: 5}} />
				) : null
			}
			columnCount={iconsPerRow}
			data={icons}
			style={{height: galleryHeight, margin: `0 ${galleryMargin}px`}}
		/>
	);
}

export default Virtuoso;
