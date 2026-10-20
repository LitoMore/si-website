import {IconInbox} from '@tabler/icons-react';
import {useColorScheme, useI18n, useSizes} from '#hooks';

const linkRenderer = (text: string, href: string) =>
	href ? (
		<a
			className="ui-link"
			href={href}
			rel="noopener nofollow noreferrer"
			target="_blank"
		>
			{text}
		</a>
	) : (
		text
	);

export default function EmptyView() {
	const {galleryHeight} = useSizes();
	const {emptyFg, isLight} = useColorScheme();
	const {i18n, gettext} = useI18n();

	return (
		<div
			className="flex flex-col items-center justify-center gap-5"
			style={{height: galleryHeight}}
		>
			<div className="ui-empty">
				<IconInbox aria-hidden size={48} stroke={1} />
				<span>{i18n.search.noIconsFound}</span>
			</div>
			<div className="flex flex-wrap justify-center gap-5">
				<div className="flex flex-col items-center justify-center">
					<strong style={{color: emptyFg}}>{i18n.footer.iconMissing}</strong>
					<a
						className="ui-link"
						href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=new+icon&template=icon_request.yml"
						rel="noopener nofollow noreferrer"
						target="_blank"
					>
						{i18n.footer.submitRequest}
					</a>
				</div>

				<div className="flex flex-col items-center justify-center">
					<strong style={{color: emptyFg}}>{i18n.footer.iconOutdated}</strong>
					<a
						className="ui-link"
						href="https://github.com/simple-icons/simple-icons/issues/new?assignees=&labels=icon+outdated&template=icon_update.yml"
						rel="noopener nofollow noreferrer"
						target="_blank"
					>
						{i18n.footer.reportOutdated}
					</a>
				</div>
			</div>
			<div className="flex max-w-200 flex-col items-center justify-center p-5">
				<div className="flex flex-col text-center" style={{color: emptyFg}}>
					<div>{gettext(i18n.footer.line1, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line2, [linkRenderer])}</div>
					<div>{gettext(i18n.footer.line3, [linkRenderer])}</div>
				</div>
				<div className="mt-10 flex">
					<a
						className={
							isLight
								? 'ui-link not-hover:text-[#878787]!'
								: 'ui-link not-hover:text-[#737373]!'
						}
						href="https://github.com/LitoMore/si-website"
						rel="noopener nofollow noreferrer"
						target="_blank"
					>
						{i18n.footer.madeWithLove}
					</a>
				</div>
			</div>
		</div>
	);
}
