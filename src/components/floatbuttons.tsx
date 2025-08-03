import {type RefObject, useEffect, useRef, useState} from 'react';
import {IconCheck, IconLink, IconShare, IconX} from '@tabler/icons-react';
import {Button, Flex, FloatButton, Input, QRCode, Space} from 'antd';
import Draggable from 'react-draggable';
import {styled} from 'styled-components';
import {useIcons, useLanguageCode} from '#atom';
import {actionIntentUrl, linkRel} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {LanguageCode} from '#types';
import {getShareUrl} from '#utils';
import isPublicDomain from '../vendor/is-public-domain.js';

const SocialButton = styled(FloatButton).attrs({
	target: '_blank',
	rel: 'noopener nofollow noreferrer',
})<{$iconSize?: number; $isDark?: boolean; $hoverActive?: boolean}>`
	.ant-float-btn-icon {
		${(props) =>
			props.$iconSize ? `width: ${props.$iconSize}px !important;` : ''}
	}

	${(props) =>
		props.$hoverActive
			? `color-scheme: only ${props.$isDark ? 'light' : 'dark'};`
			: ''}

	${(props) =>
		props.$hoverActive === undefined
			? ''
			: `
			&:hover { color-scheme: only ${props.$isDark ? 'light' : 'dark'} }
		`}
`; // Deno-fmt-ignore-line

const FloatGroup = styled.div<{$expandTop: boolean}>`
	${(props) =>
		props.$expandTop
			? ''
			: `.ant-float-btn-group-wrap {
		flex-direction: column-reverse;
	}`}
`;

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
	const {isDark, iconFg} = useColorScheme();
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
		<SocialButton
			$hoverActive={showInput}
			description={
				showInput ? (
					<Flex
						style={{
							position: 'absolute',
							width: buttonWidth,
							height: 32,
							transform: `translate(${moveX}px, -18px)`,
							borderRadius: 6,
							boxShadow:
								'0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
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
								disabled={!instanceUrl}
								href={instanceUrl}
								rel={instanceUrl ? linkRel : undefined}
								style={{
									borderRadius: '0 6px 6px 0',
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
					</Flex>
				) : null
			}
			icon={<Icon color={iconFg.slice(1)} colorHover="_" slug="mastodon" />}
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
	const {iconFg} = useColorScheme();
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

	const iconColor = iconFg.slice(1);

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
			<FloatGroup
				ref={floatButtonsRef}
				$expandTop
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
							<SocialButton
								$iconSize={20}
								icon={<Icon slug="wechat" />}
								tooltip={qrcode}
							/>
							<SocialButton
								href={getShareUrl(
									'https://connect.qq.com/widget/shareqq/index.html',
									{title: actionIntentText, url: actionIntentUrl},
								)}
								icon={<Icon slug="qq" />}
							/>
							{/* <SocialButton icon={<Icon slug="qzone" />} $iconSize={20} /> */}
							<SocialButton
								$iconSize={22}
								href={getShareUrl('https://share.weibo.com/share/share.php', {
									title: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="sinaweibo" />}
							/>
							<SocialButton
								href={getShareUrl('https://www.douban.com/recommend/', {
									title: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon slug="douban" />}
							/>
							<SocialButton
								$iconSize={30}
								icon={<Icon slug="xiaohongshu" />}
								tooltip={qrcode}
							/>
						</>
					) : (
						<>
							<SocialButton
								href={getShareUrl('https://x.com/intent/tweet', {
									text: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon color={iconColor} slug="x" />}
							/>
							<SocialButton
								$hoverActive={false}
								href={getShareUrl('https://bsky.app/intent/compose', {
									text: [actionIntentText, actionIntentUrl].join('\n'),
								})}
								icon={<Icon color={iconColor} colorHover="_" slug="bluesky" />}
							/>
							<SocialButton
								href={getShareUrl('https://www.threads.net/intent/post', {
									text: actionIntentText,
									url: actionIntentUrl,
								})}
								icon={<Icon color={iconColor} slug="threads" />}
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
						onClick={async () => {
							await globalThis.navigator.clipboard.writeText(
								globalThis.location.href,
							);
							setLinkCopied(true);
						}}
					/>
				</FloatButton.Group>
			</FloatGroup>
		</Draggable>
	);
}

export default FloatButtons;
