import {Empty, Flex, Typography} from 'antd';
import {styled} from 'styled-components';
import {linkRel} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';

const Link = styled(Typography.Link).attrs({rel: linkRel, target: '_blank'})<{
	$color?: string;
}>`
	&:not(:hover) {
		${(props) => (props.$color ? `color: ${props.$color};` : '')}
	}
`;

const linkRenderer = (text: string, href: string) =>
	href ? <Link href={href}>{text}</Link> : text;

function EmptyView() {
	const {galleryHeight} = useSizes();
	const {emptyFg, isLight} = useColorScheme();
	const {i18n, gettext} = useI18n();

	return (
		<Flex
			className="flex flex-col items-center justify-center gap-5"
			style={{height: galleryHeight}}
		>
			<Empty
				description={i18n.search.noIconsFound}
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				style={{marginBlock: 'unset'}}
			/>
			<div className="flex flex-wrap justify-center gap-5">
				<div className="flex flex-col items-center justify-center">
					<strong style={{color: emptyFg}}>{i18n.footer.iconMissing}</strong>
					<Link href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=new+icon&template=icon_request.yml">
						{i18n.footer.submitRequest}
					</Link>
				</div>

				<div className="flex flex-col items-center justify-center">
					<strong style={{color: emptyFg}}>{i18n.footer.iconOutdated}</strong>
					<Link href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=icon+outdated&template=icon_update.yml">
						{i18n.footer.reportOutdated}
					</Link>
				</div>
			</div>
			<div className="flex max-w-[800px] flex-col items-center justify-center p-5">
				<div className="flex flex-col text-center" style={{color: emptyFg}}>
					<div>{gettext(i18n.footer.line1, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line2, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line3, [linkRenderer])}</div>
				</div>
				<div className="mt-10 flex">
					<Link
						$color={isLight ? '#878787' : '#737373'}
						href="https://github.com/LitoMore/si-website"
					>
						{i18n.footer.madeWithLove}
					</Link>
				</div>
			</div>
		</Flex>
	);
}

export default EmptyView;
