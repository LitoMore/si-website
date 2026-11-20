/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
import {lazy} from 'react';
import {useFilteredIcons, useIcons, useIconsLoadRequest} from '#atom';
import {Button} from '#components/ui/button.js';
import {Alert} from '#components/ui/feedback.js';
import {useI18n, useSizes} from '#hooks';
import {CardProvider} from './card.js';
import Empty from './empty.js';
import {CatalogLoading} from './loading.js';

const VirtualGrid = lazy(async () => import('./virtual-grid.js'));

export default function Gallery() {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const [, requestReload] = useIconsLoadRequest();
	const {i18n} = useI18n();
	const {iconsPerRow, galleryHeight, galleryMargin, cardPixels} = useSizes();

	if (icons.error) {
		return (
			<div className="p-2.5">
				<Alert
					action={
						<Button
							onClick={() => {
								requestReload((request) => request + 1);
							}}
						>
							{i18n.openGraph.retry}
						</Button>
					}
					title={icons.error}
				/>
			</div>
		);
	}

	if (icons.data.length === 0) {
		return <CatalogLoading />;
	}

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return <Empty />;
	}

	return (
		<CardProvider>
			<VirtualGrid
				cardPixels={cardPixels}
				galleryHeight={galleryHeight}
				galleryMargin={galleryMargin}
				icons={filteredIcons}
				iconsPerRow={iconsPerRow}
			/>
		</CardProvider>
	);
}
