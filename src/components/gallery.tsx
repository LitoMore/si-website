/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
import {lazy} from 'react';
import {useFilteredIcons, useIcons} from '#atom';
import {useSizes} from '#hooks';
import Empty from './empty.js';
import Loading from './loading.js';

// Const Virutalized = lazy(() => import("./virtualized.tsx"));
const Virtuoso = lazy(async () => import('./virtuoso.tsx'));
// Const VirutalScroll = lazy(() => import("./virtualscroll.tsx"));

function Gallery() {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const {
		// InnerWidth,
		// iconsPerRow,
		galleryHeight,
		galleryMargin,
		// CardPixels,
	} = useSizes();

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
		<Virtuoso
			galleryHeight={galleryHeight}
			galleryMargin={galleryMargin}
			icons={filteredIcons}
		/>
	);
}

export default Gallery;
