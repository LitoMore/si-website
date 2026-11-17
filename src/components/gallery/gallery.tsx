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
import Loading from './loading.js';

// Const Virutalized = lazy(() => import("./virtualized.tsx"));
const Virtuoso = lazy(async () => import('./virtuoso.js'));
// Const VirutalScroll = lazy(() => import("./virtualscroll.tsx"));

export default function Gallery() {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const [, requestReload] = useIconsLoadRequest();
	const {i18n} = useI18n();
	const {
		// InnerWidth,
		iconsPerRow,
		galleryHeight,
		galleryMargin,
		cardPixels,
	} = useSizes();

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
		return <Loading />;
	}

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return <Empty />;
	}

	// If (mode === "virtualscroll") {
	// 	return (
	// 		<VirutalScroll
	// 			icons={filteredIcons}
	// 			innerWidth={innerWidth}
	// 			cardPixels={cardPixels}
	// 			galleryHeight={galleryHeight}
	// 			iconsPerRow={iconsPerRow}
	// 		/>
	// 	);
	// }

	// if (mode === "virtualized") {
	// 	return (
	// 		<Virutalized
	// 			icons={filteredIcons}
	// 			innerWidth={innerWidth}
	// 			galleryHeight={galleryHeight}
	// 			cardPixels={cardPixels}
	// 			iconsPerRow={iconsPerRow}
	// 		/>
	// 	);
	// }

	return (
		<CardProvider>
			<Virtuoso
				cardPixels={cardPixels}
				galleryHeight={galleryHeight}
				galleryMargin={galleryMargin}
				icons={filteredIcons}
				iconsPerRow={iconsPerRow}
			/>
		</CardProvider>
	);
}
