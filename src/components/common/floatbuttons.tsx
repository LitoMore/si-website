import {type ReactNode, useEffect, useRef, useState} from 'react';
import {Popover as BasePopover} from '@base-ui/react/popover';
import {IconCheck, IconLink, IconShare, IconX} from '@tabler/icons-react';
import {QRCodeSVG} from 'qrcode.react';
import Draggable from 'react-draggable';
import {useIcons, useLanguageCode} from '#atom';
import {Tooltip} from '#components/ui/popover.js';
import {actionIntentUrl} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {LanguageCode} from '#types';
import {getShareUrl} from '#utils';
import isPublicDomain from '#vendor/is-public-domain.js';
import componentLabels from '../../i18n/ui.js';

function Icon({
	slug,
	color,
	colorHover,
}: {
	readonly slug: string;
	readonly color?: string;
	readonly colorHover?: string;
}) {
	const {isDark, iconFg} = useColorScheme();
	return (
		<img
			alt=""
			src={`https://cdn.simpleicons.org/${[slug, isDark ? iconFg.slice(1) : [color, colorHover]].flat().filter(Boolean).join('/')}`}
		/>
	);
}

function ShareButton({
	label,
	icon,
	href,
	onClick,
	width = 18,
}: {
	readonly label: string;
	readonly icon: ReactNode;
	readonly href?: string;
	readonly onClick?: () => void;
	readonly width?: number;
}) {
	const content = (
		<span className="ui-share-icon" style={{width}}>
			{icon}
		</span>
	);
	return href ? (
		<a
			aria-label={label}
			className="ui-share-item"
			href={href}
			rel="noopener nofollow noreferrer"
			target="_blank"
		>
			{content}
		</a>
	) : (
		<button
			aria-label={label}
			className="ui-share-item"
			type="button"
			onClick={onClick}
		>
			{content}
		</button>
	);
}

function MastodonButton({
	actionIntentText,
	isExpandLeft,
}: {
	readonly actionIntentText: string;
	readonly isExpandLeft: boolean;
}) {
	const [instance, setInstance] = useState('');
	const {i18n} = useI18n();
	const {colorScheme} = useColorScheme();
	let href = '';
	try {
		const url = new URL(
			'https://' + instance.trim().replace(/^https?:\/\//, ''),
		);
		if (isPublicDomain(url.hostname))
			href = getShareUrl(`https://${url.host}/share`, {
				text: actionIntentText,
				url: actionIntentUrl,
			});
	} catch {
		/*
		The field may contain an incomplete hostname while typing.
		*/
	}

	return (
		<BasePopover.Root>
			<BasePopover.Trigger
				render={
					<button
						aria-label="Mastodon"
						className="ui-share-item"
						type="button"
					/>
				}
			>
				<span className="ui-share-icon">
					<Icon colorHover="_" slug="mastodon" />
				</span>
			</BasePopover.Trigger>
			<BasePopover.Portal>
				<BasePopover.Positioner
					className="ui-positioner"
					side={isExpandLeft ? 'left' : 'right'}
					sideOffset={25}
				>
					<BasePopover.Popup
						aria-label="Mastodon"
						className="ui-mastodon-popup"
						data-ui-overlay="mastodon"
						data-ui-theme={colorScheme}
					>
						<input
							aria-label={i18n.share.yourMastodonInstance}
							placeholder={i18n.share.yourMastodonInstance}
							value={instance}
							onChange={(event) => {
								setInstance(event.target.value);
							}}
						/>
						<a
							aria-disabled={!href}
							className="ui-button"
							data-variant="primary"
							href={href || undefined}
							rel="noopener nofollow noreferrer"
							target="_blank"
							onClick={(event) => {
								if (!href) event.preventDefault();
							}}
						>
							{i18n.share.share}
						</a>
					</BasePopover.Popup>
				</BasePopover.Positioner>
			</BasePopover.Portal>
		</BasePopover.Root>
	);
}

export default function FloatButtons() {
	const floatButtonsRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef(false);
	const [open, setOpen] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [position, setPosition] = useState<[number, number]>([0, 0]);
	const [icons] = useIcons();
	const [languageCode] = useLanguageCode();
	const {innerHeight, innerWidth} = useSizes();
	const {i18n, gettext} = useI18n();
	const {colorScheme} = useColorScheme();
	useEffect(() => {
		if (!linkCopied) return;
		const timer = setTimeout(() => {
			setLinkCopied(false);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [linkCopied]);
	const actionIntentText = gettext(i18n.share.actionIntentText, [
		(Math.floor(icons.data.length / 100) * 100).toString(),
	]);
	const isExpandTop = position[1] + (innerHeight - 54 - 30) / 2 > 0;
	const isExpandLeft = position[0] + (innerWidth - 30) / 2 > 0;
	const shareUrl = (url: string) =>
		getShareUrl(url, {title: actionIntentText, url: actionIntentUrl});
	return (
		<Draggable
			bounds="body"
			cancel="input"
			nodeRef={floatButtonsRef}
			onDrag={(_, data) => {
				setPosition([data.x, data.y]);
				dragRef.current = true;
			}}
			onStart={() => {
				dragRef.current = false;
			}}
		>
			<div
				ref={floatButtonsRef}
				style={{
					position: 'fixed',
					margin: '64px 10px 10px',
					bottom: 0,
					right: 0,
					zIndex: 1001,
				}}
				onClickCapture={(event) => {
					if (!dragRef.current) {
						return;
					}

					event.preventDefault();
					event.stopPropagation();
					dragRef.current = false;
				}}
			>
				<BasePopover.Root open={open} onOpenChange={setOpen}>
					<BasePopover.Trigger
						aria-label={
							open
								? componentLabels[languageCode].global.close
								: i18n.share.share
						}
						className="ui-share-toggle"
					>
						{open ? (
							<IconX aria-hidden size={20} />
						) : (
							<IconShare aria-hidden size={18} />
						)}
					</BasePopover.Trigger>
					<BasePopover.Portal>
						<BasePopover.Positioner
							align="end"
							className="ui-positioner"
							side={isExpandTop ? 'top' : 'bottom'}
							sideOffset={16}
						>
							<BasePopover.Popup
								aria-label={i18n.share.share}
								className="ui-share-popup"
								data-ui-overlay="share"
								data-ui-theme={colorScheme}
							>
								{languageCode === LanguageCode.Chinese ? (
									<>
										<Tooltip
											title={
												<QRCodeSVG
													bgColor="transparent"
													fgColor="#fff"
													marginSize={1}
													size={100}
													value={actionIntentUrl}
												/>
											}
										>
											<ShareButton
												icon={<Icon slug="wechat" />}
												label="WeChat"
												width={20}
											/>
										</Tooltip>
										<ShareButton
											href={shareUrl(
												'https://connect.qq.com/widget/shareqq/index.html',
											)}
											icon={<Icon slug="qq" />}
											label="QQ"
										/>
										<ShareButton
											href={shareUrl('https://share.weibo.com/share/share.php')}
											icon={<Icon slug="sinaweibo" />}
											label="Weibo"
											width={22}
										/>
										<ShareButton
											href={shareUrl('https://www.douban.com/recommend/')}
											icon={<Icon slug="douban" />}
											label="Douban"
										/>
										<Tooltip
											title={
												<QRCodeSVG
													bgColor="transparent"
													fgColor="#fff"
													marginSize={1}
													size={100}
													value={actionIntentUrl}
												/>
											}
										>
											<ShareButton
												icon={<Icon slug="xiaohongshu" />}
												label="Xiaohongshu"
												width={30}
											/>
										</Tooltip>
									</>
								) : (
									<>
										<ShareButton
											href={getShareUrl('https://x.com/intent/tweet', {
												text: actionIntentText,
												url: actionIntentUrl,
											})}
											icon={<Icon slug="x" />}
											label="X"
										/>
										<ShareButton
											href={getShareUrl('https://bsky.app/intent/compose', {
												text: [actionIntentText, actionIntentUrl].join('\n'),
											})}
											icon={<Icon colorHover="_" slug="bluesky" />}
											label="Bluesky"
										/>
										<ShareButton
											href={getShareUrl('https://www.threads.net/intent/post', {
												text: actionIntentText,
												url: actionIntentUrl,
											})}
											icon={<Icon slug="threads" />}
											label="Threads"
										/>
										<MastodonButton
											actionIntentText={actionIntentText}
											isExpandLeft={isExpandLeft}
										/>
									</>
								)}
								<ShareButton
									icon={
										linkCopied ? (
											<IconCheck color="green" size={20} />
										) : (
											<IconLink size={20} />
										)
									}
									label={gettext(i18n.modal.copy, ['URL'])}
									onClick={() => {
										void navigator.clipboard
											.writeText(globalThis.location.href)
											.then(() => {
												setLinkCopied(true);
											});
									}}
								/>
							</BasePopover.Popup>
						</BasePopover.Positioner>
					</BasePopover.Portal>
				</BasePopover.Root>
			</div>
		</Draggable>
	);
}
