/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
// @deno-types="@types/react"
import { forwardRef, memo } from "react";
import { Empty, Flex } from "antd";
// // @deno-types="@types/react-virtualized"
// import { AutoSizer, Collection } from "react-virtualized";
import { VirtuosoGrid } from "react-virtuoso";
import { useCardSize, useFilteredIcons, useIcons } from "#atom";
import { Card } from "#components";
import { useI18n, useSizes } from "#hooks";
import { Icon } from "#types";

// const Virutalized = memo(
// 	(
// 		{ icons, galleryHeight, galleryMargin }: {
// 			icons: Icon[];
// 			galleryHeight: number;
// 			galleryMargin: number;
// 		},
// 	) => {
// 		return (
// 			<AutoSizer>
// 				{({ height, width }) => (
// 					<Collection
// 						cellCount={icons.length}
// 						cellRenderer={({ index }) => {
// 							const icon = icons[index];
// 							return (
// 								<Card
// 									key={icon.slug}
// 									icon={icon}
// 								/>
// 							);
// 						}}
// 					/>
// 				)}
// 			</AutoSizer>
// 		);
// 	},
// );

const Virtuoso = memo((
	{ icons, galleryHeight, galleryMargin }: {
		icons: Icon[];
		galleryHeight: string;
		galleryMargin: number;
	},
) => {
	const [cardSize] = useCardSize();

	return (
		<VirtuosoGrid
			style={{
				height: galleryHeight,
				margin: `0 ${galleryMargin}px`,
			}}
			data={icons}
			overscan={200}
			components={{
				List: forwardRef(({ children, style, ...props }, ref) => (
					<div
						ref={ref}
						{...props}
						style={{
							...style,
							display: "flex",
							flexWrap: "wrap",
							gap: 5,
							margin: `10px 0`,
						}}
					>
						{children}
					</div>
				)),
			}}
			itemContent={(_index, icon) => (
				<Card
					key={icon.slug}
					icon={icon}
				/>
			)}
		/>
	);
});

const Gallery = () => {
	const [icons] = useIcons();
	const [filteredIcons] = useFilteredIcons();
	const { galleryHeight, galleryMargin } = useSizes();
	const i18n = useI18n();

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return (
			<Flex vertical justify="center" style={{ height: galleryHeight }}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={i18n.noIconsFound}
				/>
			</Flex>
		);
	}

	return (
		<Virtuoso
			icons={filteredIcons}
			galleryHeight={galleryHeight}
			galleryMargin={galleryMargin}
		/>
	);
};

export default Gallery;
