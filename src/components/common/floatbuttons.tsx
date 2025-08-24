import {type RefObject, useEffect, useRef, useState} from 'react';
import {IconCheck, IconLink, IconShare, IconX} from '@tabler/icons-react';
import {Button, FloatButton, Input, QRCode, Space} from 'antd';
import Draggable from 'react-draggable';
import {useIcons, useLanguageCode} from '#atom';
import {actionIntentUrl, linkRel} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {LanguageCode} from '#types';
import {getShareUrl} from '#utils';
import isPublicDomain from '#vendor/is-public-domain.js';

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
			src={`https://cdn.simpleicons.org/${[
				slug,
				isDark ? iconFg.slice(1) : [color, colorHover],
			]
				.flat()
				.filter(Boolean)
				.join('/')}`}
			style={{transform: 'translateY(1px)'}}
		/>
	);
}

type Position = [x: number, y: number];

function MastodonButton({
	position,
	actionIntentText,
}: {
	readonly position: Position;
	readonly actionIntentText: string;
}) {
	const [showInput, setShowInput] = useState(false);
	const [inputVisible, setInputVisible] = useState(false);
	const [mastodonInstance, setMastodonInstance] = useState('');
	const {innerWidth} = useSizes();
	const {isDark} = useColorScheme();
	const {i18n} = useI18n();

	const [x] = position;
	const middleX = (innerWidth - 30) / 2;
	const buttonWidth = 250;
	const baseX = buttonWidth / -2;
	const space = 25;
	const expandLeft = x + middleX > 0;
	const moveX = baseX + (baseX - space) * (expandLeft ? 1 : -1);

	const formatMastodonUrl = (instanceUrl: string, actionIntentText: string) => {
		let url: URL;
		instanceUrl = 'https://' + instanceUrl.trim().replace(/^https?:\/\//, '');
		try {
			url = new URL(instanceUrl);
		} catch {
			return '';
		}

		const {host, hostname} = url;
		if (!isPublicDomain(hostname)) return '';
		const shareUrl = getShareUrl(`https://${host}/share`, {
			text: actionIntentText,
			url: actionIntentUrl,
		});
		return shareUrl;
	};

	const instanceUrl = formatMastodonUrl(mastodonInstance, actionIntentText);

	return (
		<FloatButton
			className={showInput ? (isDark ? 'light' : 'dark') : undefined}
			description={
				showInput ? (
					<div
						className="box-shadow-[0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)] absolute h-8 rounded-md"
						style={{
							width: buttonWidth,
							transform: `translate(${moveX}px, -18px)`,
							opacity: inputVisible ? 1 : 0,
							transition: 'opacity 0.2s, transform 0.2s',
						}}
					>
						<Space.Compact style={{width: '100%'}}>
							<Input
								placeholder={i18n.share.yourMastodonInstance}
								value={mastodonInstance}
								onChange={(event) => {
									setMastodonInstance(event.target.value);
								}}
								onClick={(event) => {
									event.stopPropagation();
								}}
							/>
							<Button
								className="rounded-l-none!"
								disabled={!instanceUrl}
								href={instanceUrl}
								rel={instanceUrl ? linkRel : undefined}
								style={{
									backgroundColor: instanceUrl
										? undefined
										: isDark
											? '#141414'
											: '#eee',
								}}
								target={instanceUrl ? '_blank' : undefined}
								type="primary"
							>
								{i18n.share.share}
							</Button>
						</Space.Compact>
					</div>
				) : null
			}
			icon={<Icon colorHover="_" slug="mastodon" />}
			// @ts-expect-error: Missing type definition for `rel`
			rel={linkRel}
			target="_blank"
			onClick={() => {
				if (showInput) {
					setInputVisible(false);
					setTimeout(() => {
						setShowInput(false);
					}, 200);
				} else {
					setShowInput(true);
					setTimeout(() => {
						setInputVisible(true);
					}, 50);
				}
			}}
		/>
	);
}

function FloatButtons() {
	const floatButtonsRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [position, setPosition] = useState<Position>([0, 0]);
	const [icons] = useIcons();
	const [languageCode] = useLanguageCode();
	const {innerHeight} = useSizes();
	const {i18n, gettext} = useI18n();

	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => {
				setLinkCopied(false);
			}, 1000);
		}
	}, [linkCopied]);

	const tablerIconOffset = {transform: 'translate(-1px, 1px)'};
	const headerHeight = 54;
	const middleY = (innerHeight - headerHeight - 30) / 2;
	const expandTop = position[1] + middleY > 0;

	const actionIntentText = gettext(i18n.share.actionIntentText, [
		(Math.floor(icons.data.length / 100) * 100).toString(),
	]);

	const qrcode = (
		<QRCode
			color="#fff"
			size={100}
			style={{padding: 5}}
			value={actionIntentUrl}
		/>
	);

	return (
		<Draggable
			bounds="body"
			nodeRef={floatButtonsRef as RefObject<HTMLDivElement>}
			onDrag={(_, data) => {
				setPosition([data.x, data.y]);
				setIsDragging(true);
			}}
			onStart={() => {
				setIsDragging(false);
			}}
			onStop={() => {
				setIsDragging(false);
			}}
		>
			<div
				ref={floatButtonsRef}
				className="social-reverse"
				style={{
					position: 'fixed',
					margin: '64px 10px 10px 10px',
					bottom: 0,
					right: 0,
					pointerEvents: isDragging ? 'none' : 'auto',
					cursor: 'pointer',
					zIndex: 1001,
				}}
			>
				<FloatButton.Group
					closeIcon={<IconX size={20} style={tablerIconOffset} />}
					icon={<IconShare size={18} style={tablerIconOffset} />}
					placement={expandTop ? 'top' : 'bottom'}
					style={{
						position: 'relative',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					}}
					trigger="click"
				>
					{languageCode === LanguageCode.Chinese ? (
						<>
							<FloatButton
								className="social-icon [--social-icon-width:20px]"
								icon={<Icon slug="wechat" />}
								tooltip={qrcode}
							/>
							<FloatButton
								href={getShareUrl(
									'https://connect.qq.com/widget/shareqq/index.html',
									{title: actionIntentText, url: actionIntentUrl},
								)}
								icon={<Icon slug="qq" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							{/* <FloatButton icon={<Icon slug="qzone" />} $iconSize={20} /> */}
							<FloatButton
								className="social-icon [--social-icon-width:22px]"
								href={getShareUrl('https://share.weibo.com/share/share.php', {
									title: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="sinaweibo" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							<FloatButton
								href={getShareUrl('https://www.douban.com/recommend/', {
									title: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="douban" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							<FloatButton
								className="social-icon [--social-icon-width:30px]"
								icon={<Icon slug="xiaohongshu" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
								tooltip={qrcode}
							/>
						</>
					) : (
						<>
							<FloatButton
								href={getShareUrl('https://x.com/intent/tweet', {
									text: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="x" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							<FloatButton
								className="color-scheme-only-dark"
								href={getShareUrl('https://bsky.app/intent/compose', {
									text: [actionIntentText, actionIntentUrl].join('\n'),
								})}
								icon={<Icon colorHover="_" slug="bluesky" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							<FloatButton
								href={getShareUrl('https://www.threads.net/intent/post', {
									text: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="threads" />}
								// @ts-expect-error: Missing type definition for `rel`
								rel={linkRel}
								target="_blank"
							/>
							<MastodonButton
								actionIntentText={actionIntentText}
								position={position}
							/>
						</>
					)}
					<FloatButton
						icon={
							linkCopied ? (
								<IconCheck color="green" size={20} style={tablerIconOffset} />
							) : (
								<IconLink size={20} style={tablerIconOffset} />
							)
						}
						// @ts-expect-error: Missing type definition for `rel`
						rel={linkRel}
						target="_blank"
						onClick={async () => {
							await globalThis.navigator.clipboard.writeText(
								globalThis.location.href,
							);
							setLinkCopied(true);
						}}
					/>
				</FloatButton.Group>
			</div>
		</Draggable>
	);
}

export default FloatButtons;
