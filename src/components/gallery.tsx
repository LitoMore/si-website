/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
// @deno-types="@types/react"
import { lazy } from "react";
import { useFilteredIcons, useIcons } from "#atom";
import { useSizes } from "#hooks";
import Empty from "./empty.tsx";
import Loading from "./loading.tsx";

const Virtuoso = lazy(() => import("./virtuoso.tsx"));

const Gallery = () => {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const {
		iconsPerRow,
		galleryHeight,
		galleryMargin,
	} = useSizes();

	if (icons.data.length === 0) {
		return <Loading />;
	}

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return <Empty />;
	}

	return (
		<Virtuoso
			icons={filteredIcons}
			galleryHeight={galleryHeight}
			galleryMargin={galleryMargin}
			iconsPerRow={iconsPerRow}
		/>
	);
};

export default Gallery;
