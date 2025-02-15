/*
 * [INFO] We don't use styled-components for child components due to performance reasons.
 */
// @deno-types="@types/react"
import { lazy } from "react";
import { Empty, Flex, Typography } from "antd";
import { useFilteredIcons, useIcons } from "#atom";
import { linkRel } from "#constants";
import { useColorScheme, useI18n, useSizes } from "#hooks";

// const Virutalized = lazy(() => import("./virtualized.tsx"));
const Virtuoso = lazy(() => import("./virtuoso.tsx"));
// const VirutalScroll = lazy(() => import("./virtualscroll.tsx"));

const Link = ({ href, text }: { href: string; text: string }) => {
	return (
		<Typography.Link
			rel={linkRel}
			target="_blank"
			href={href}
		>
			{text}
		</Typography.Link>
	);
};

const linkRenderer = (text: string, href: string) => (
	href ? <Link text={text} href={href} /> : text
);

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
	const { emptyFg } = useColorScheme();
	const { i18n, gettext } = useI18n();

	if (icons.data.length > 0 && filteredIcons.length === 0) {
		return (
			<Flex
				vertical
				justify="center"
				align="center"
				gap={20}
				style={{ height: galleryHeight }}
			>
				<Empty
					style={{ marginBlock: "unset" }}
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={i18n.search.noIconsFound}
				/>
				<Flex wrap justify="center" gap={20}>
					<Flex vertical justify="center" align="center">
						<strong style={{ color: emptyFg }}>
							{i18n.footer.iconMissing}
						</strong>
						<Link
							text={i18n.footer.submitRequest}
							href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=new+icon&template=icon_request.yml"
						/>
					</Flex>

					<Flex vertical justify="center" align="center">
						<strong style={{ color: emptyFg }}>
							{i18n.footer.iconOutdated}
						</strong>
						<Link
							text={i18n.footer.reportOutdated}
							href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=icon+outdated&template=icon_update.yml"
						/>
					</Flex>
				</Flex>
				<Flex
					style={{ maxWidth: 800, padding: 20 }}
					vertical
					justify="center"
					align="center"
				>
					<Flex vertical style={{ color: emptyFg }}>
						<div>
							{gettext(i18n.footer.line1, [linkRenderer])}
						</div>
						<div>
							{gettext(i18n.footer.line2, [linkRenderer])}
						</div>
						<div>
							{gettext(i18n.footer.line3, [linkRenderer])}
						</div>
					</Flex>
				</Flex>
			</Flex>
		);
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
