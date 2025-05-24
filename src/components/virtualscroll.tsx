// import { memo } from "react";
// // import { VirtualScroller } from "primereact/virtualscroller";
// import { Card } from "#components";
// import { Icon } from "#types";

// const VirtualScroll = memo(
// 	(
// 		{ icons, innerWidth, cardPixels, galleryHeight, iconsPerRow }: {
// 			icons: Icon[];
// 			innerWidth: number;
// 			cardPixels: number;
// 			galleryHeight: string;
// 			iconsPerRow: number;
// 		},
// 	) => {
// 		// const iconsInRows = getIconsInRows(icons, iconsPerRow);

// 		return (
// 			<VirtualScroller
// 				items={icons}
// 				itemSize={[cardPixels, cardPixels]}
// 				orientation="vertical"
// 				style={{
// 					width: innerWidth,
// 					height: galleryHeight,
// 					backgroundColor: "#222",
// 				}}
// 				// contentTemplate={({ children }) => {
// 				// 	return (
// 				// 		<div
// 				// 			style={{
// 				// 				width: innerWidth,
// 				// 				height: galleryHeight,
// 				// 				display: "flex",
// 				// 				flexWrap: "wrap",
// 				// 			}}
// 				// 		>
// 				// 			{children}
// 				// 		</div>
// 				// 	);
// 				// }}
// 				itemTemplate={(icon: Icon) => {
// 					return <Card key={icon.slug} icon={icon} />;
// 				}}
// 			/>
// 		);
// 	},
// );

// export default VirtualScroll;
