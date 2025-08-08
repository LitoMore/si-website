import {Empty, Typography} from 'antd';
import {linkRel} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';

const linkRenderer = (text: string, href: string) =>
	href ? (
		<Typography.Link
			className="link-not-hover"
			href={href}
			rel={linkRel}
			target="_blank"
		>
			{text}
		</Typography.Link>
	) : (
		text
	);

function EmptyView() {
	const {galleryHeight} = useSizes();
	const {emptyFg, isLight} = useColorScheme();
	const {i18n, gettext} = useI18n();

	return (
		<div
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
					<Typography.Link
						href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=new+icon&template=icon_request.yml"
						rel={linkRel}
						target="_blank"
					>
						{i18n.footer.submitRequest}
					</Typography.Link>
				</div>

				<div className="flex flex-col items-center justify-center">
					<strong style={{color: emptyFg}}>{i18n.footer.iconOutdated}</strong>
					<Typography.Link
						href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=icon+outdated&template=icon_update.yml"
						rel={linkRel}
						target="_blank"
					>
						{i18n.footer.reportOutdated}
					</Typography.Link>
				</div>
			</div>
			<div className="flex max-w-[800px] flex-col items-center justify-center p-5">
				<div className="flex flex-col text-center" style={{color: emptyFg}}>
					<div>{gettext(i18n.footer.line1, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line2, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line3, [linkRenderer])}</div>
				</div>
				<div className="mt-10 flex">
					<Typography.Link
						className={
							isLight
								? 'not-hover:text-[#878787]!'
								: 'not-hover:text-[#737373]!'
						}
						href="https://github.com/LitoMore/si-website"
						rel={linkRel}
						target="_blank"
					>
						{i18n.footer.madeWithLove}
					</Typography.Link>
				</div>
			</div>
		</div>
	);
}

export default EmptyView;
