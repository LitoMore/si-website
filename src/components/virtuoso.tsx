import { ComponentPropsWithoutRef, forwardRef, memo } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { Card } from "#components";
import { Icon } from "#types";

const Virtuoso = memo((
	{ icons, galleryHeight, galleryMargin }: {
		icons: Icon[];
		galleryHeight: string;
		galleryMargin: number;
	},
) => {
	return (
		<VirtuosoGrid
			style={{
				height: galleryHeight,
				margin: `0 ${galleryMargin}px`,
			}}
			data={icons}
			overscan={200}
			components={{
				List: forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>((
					{ children, style, ...props },
					ref,
				) => (
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

export default Virtuoso;
