/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
// @deno-types="@types/react"
import { lazy } from "react";
import { useFilteredIcons, useIcons } from "#atom";
import { useSizes } from "#hooks";
import Empty from "./empty.tsx";
import Loading from "./loading.tsx";

// const Virutalized = lazy(() => import("./virtualized.tsx"));
const Virtuoso = lazy(() => import("./virtuoso.tsx"));
// const VirutalScroll = lazy(() => import("./virtualscroll.tsx"));

const Gallery = (
	// { mode }: { mode?: "virtualized" | "virtuoso" | "virtualscroll" },
) => {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const {
		// innerWidth,
		// iconsPerRow,
		galleryHeight,
		galleryMargin,
		// cardPixels,
	} = useSizes();

	if (icons.data.length === 0) {
		return <Loading />;
	}

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return <Empty />;
	}

	// if (mode === "virtualscroll") {
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
			icons={filteredIcons}
			galleryHeight={galleryHeight}
			galleryMargin={galleryMargin}
		/>
	);
};

export default Gallery;
