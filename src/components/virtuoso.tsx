// @deno-types="@types/react"
import { memo } from "react";
import { VirtuosoMasonry } from "@virtuoso.dev/masonry";
import { Card } from "#components";
import { Icon } from "#types";

const Virtuoso = memo((
	{ icons, galleryHeight, galleryMargin, iconsPerRow }: {
		icons: Icon[];
		galleryHeight: string;
		galleryMargin: number;
		iconsPerRow: number;
	},
) => {
	return (
		<VirtuosoMasonry
			columnCount={iconsPerRow}
			data={icons}
			style={{ height: galleryHeight, margin: `0 ${galleryMargin}px` }}
			ItemContent={({ data }) => (
				data
					? (
						<Card
							key={data.slug}
							icon={data}
							style={{ marginBottom: 5 }}
						/>
					)
					: null
			)}
		/>
	);
});

export default Virtuoso;
