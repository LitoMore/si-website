import { Empty, Flex, Typography } from "antd";
import { styled } from "styled-components";
import { linkRel } from "#constants";
import { useColorScheme, useI18n, useSizes } from "#hooks";

const Link = styled(Typography.Link).attrs({ rel: linkRel, target: "_blank" })<
	{ $color?: string }
>`
	&:not(:hover) {
		${(props) => props.$color ? `color: ${props.$color};` : ""}
	}
`;

const linkRenderer = (text: string, href: string) => (
	href ? <Link href={href}>{text}</Link> : text
);

const EmptyView = () => {
	const { galleryHeight } = useSizes();
	const { emptyFg, isLight } = useColorScheme();
	const { i18n, gettext } = useI18n();

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
					<Link href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=new+icon&template=icon_request.yml">
						{i18n.footer.submitRequest}
					</Link>
				</Flex>

				<Flex vertical justify="center" align="center">
					<strong style={{ color: emptyFg }}>
						{i18n.footer.iconOutdated}
					</strong>
					<Link href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=icon+outdated&template=icon_update.yml">
						{i18n.footer.reportOutdated}
					</Link>
				</Flex>
			</Flex>
			<Flex
				style={{ maxWidth: 800, padding: 20 }}
				vertical
				justify="center"
				align="center"
			>
				<Flex vertical style={{ color: emptyFg, textAlign: "center" }}>
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
				<Flex style={{ marginTop: 40 }}>
					<Link
						$color={isLight ? "#878787" : "#737373"}
						href="https://github.com/LitoMore/si-website"
					>
						{i18n.footer.madeWithLove}
					</Link>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default EmptyView;
