// @deno-types="@types/react"
import { RefObject, useEffect, useRef, useState } from "react";
import { Button, Flex, FloatButton, Input, QRCode, Space } from "antd";
import {
	CheckOutlined,
	LinkOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { useIcons, useLanguageCode } from "#atom";
import { actionIntentUrl, linkRel } from "#constants";
import { useColorScheme, useI18n, useSizes } from "#hooks";
import { getShareUrl } from "#utils";
import { LanguageCode } from "#types";
import isPublicDomain from "../vendor/is-public-domain.ts";

const SocialButton = styled(FloatButton).attrs({
	target: "_blank",
	rel: "noopener nofollow noreferrer",
})<{ $iconSize?: number }>`
  .ant-float-btn-icon {
    ${(props) =>
	props.$iconSize ? `width: ${props.$iconSize}px !important;` : ""}
  }
`;

const FloatGroup = styled.div<{ $expandTop: boolean }>`
	${(props) =>
	props.$expandTop ? "" : `.ant-float-btn-group-wrap {
		flex-direction: column-reverse;
	}`}
`;

const Icon = ({ slug, color }: { slug: string; color?: string }) => {
	const { isDark, iconFg } = useColorScheme();
	return (
		<img
			style={{ transform: "translateY(1px)" }}
			src={`https://cdn.simpleicons.org/${
				[slug, isDark ? iconFg.slice(1) : color].filter((x) => Boolean(x)).join(
					"/",
				)
			}`}
		/>
	);
};

type Position = [x: number, y: number];

const MastodonButton = (
	{ position, actionIntentText }: {
		position: Position;
		actionIntentText: string;
	},
) => {
	const [showInput, setShowInput] = useState(false);
	const [inputVisible, setInputVisible] = useState(false);
	const [mastodonInstance, setMastodonInstance] = useState("");
	const { innerWidth } = useSizes();
	const { isDark, iconFg } = useColorScheme();
	const { i18n } = useI18n();

	const [x] = position;
	const middleX = (innerWidth - 30) / 2;
	const buttonWidth = 250;
	const baseX = buttonWidth / -2;
	const space = 25;
	const expandLeft = x + middleX > 0;
	const moveX = baseX + ((baseX - space) * (expandLeft ? 1 : -1));

	const formatMastodonUrl = (
		instanceUrl: string,
		actionIntentText: string,
	) => {
		let url: URL;
		instanceUrl = "https://" + instanceUrl.trim().replace(/^https?:\/\//, "");
		try {
			url = new URL(instanceUrl);
		} catch {
			return "";
		}
		const { host, hostname } = url;
		if (!isPublicDomain(hostname)) return "";
		const shareUrl = getShareUrl(
			`https://${host}/share`,
			{ text: actionIntentText, url: actionIntentUrl },
		);
		return shareUrl;
	};

	const instanceUrl = formatMastodonUrl(mastodonInstance, actionIntentText);

	return (
		<SocialButton
			icon={<Icon slug="mastodon" color={iconFg.slice(1)} />}
			description={showInput && (
				<Flex
					style={{
						position: "absolute",
						width: buttonWidth,
						height: 32,
						transform: `translate(${moveX}px, -18px)`,
						borderRadius: 6,
						boxShadow:
							"0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
						opacity: inputVisible ? 1 : 0,
						transition: "opacity 0.2s, transform 0.2s",
					}}
				>
					<Space.Compact
						style={{ width: "100%" }}
					>
						<Input
							value={mastodonInstance}
							placeholder={i18n.share.yourMastodonInstance}
							onChange={(event) => setMastodonInstance(event.target.value)}
							onClick={(event) => event.stopPropagation()}
						/>
						<Button
							style={{
								borderRadius: "0 6px 6px 0",
								backgroundColor: instanceUrl
									? undefined
									: isDark
									? "#141414"
									: "#eee",
							}}
							type="primary"
							disabled={!instanceUrl}
							target={instanceUrl ? "_blank" : undefined}
							rel={instanceUrl ? linkRel : undefined}
							href={instanceUrl}
						>
							{i18n.share.share}
						</Button>
					</Space.Compact>
				</Flex>
			)}
			onClick={() => {
				if (showInput) {
					setInputVisible(false);
					setTimeout(() => setShowInput(false), 200);
					return;
				} else {
					setShowInput(true);
					setTimeout(() => setInputVisible(true), 50);
				}
			}}
		/>
	);
};

const FloatButtons = () => {
	const floatButtonsRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [position, setPosition] = useState<Position>([0, 0]);
	const [icons] = useIcons();
	const [languageCode] = useLanguageCode();
	const { iconFg } = useColorScheme();
	const { innerHeight } = useSizes();
	const { i18n, gettext } = useI18n();

	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => setLinkCopied(false), 1000);
		}
	}, [linkCopied]);

	const headerHeight = 54;
	const middleY = (innerHeight - headerHeight - 30) / 2;
	const expandTop = position[1] + middleY > 0;

	const actionIntentText = gettext(i18n.share.actionIntentText, [
		(Math.floor(icons.data.length / 100) * 100).toString(),
	]);

	const qrcode = (
		<QRCode
			style={{ padding: 5 }}
			size={100}
			value={actionIntentUrl}
			color="#fff"
		/>
	);

	const iconColor = iconFg.slice(1);

	return (
		<Draggable
			bounds="body"
			nodeRef={floatButtonsRef as RefObject<HTMLDivElement>}
			onStart={() => setIsDragging(false)}
			onDrag={(_, data) => {
				setPosition([data.x, data.y]);
				setIsDragging(true);
			}}
			onStop={() => setIsDragging(false)}
		>
			<FloatGroup
				ref={floatButtonsRef}
				$expandTop
				style={{
					position: "fixed",
					margin: "64px 10px 10px 10px",
					bottom: 0,
					right: 0,
					pointerEvents: isDragging ? "none" : "auto",
					cursor: "pointer",
					zIndex: 1001,
				}}
			>
				<FloatButton.Group
					style={{
						position: "relative",
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					}}
					trigger="click"
					icon={<ShareAltOutlined style={{ transform: "translateX(-1px)" }} />}
					placement={expandTop ? "top" : "bottom"}
				>
					{languageCode === LanguageCode.Chinese
						? (
							<>
								<SocialButton
									icon={<Icon slug="wechat" />}
									$iconSize={20}
									tooltip={qrcode}
								/>
								<SocialButton
									icon={<Icon slug="qq" />}
									href={getShareUrl(
										"https://connect.qq.com/widget/shareqq/index.html",
										{ title: actionIntentText, url: actionIntentUrl },
									)}
								/>
								{/* <SocialButton icon={<Icon slug="qzone" />} $iconSize={20} /> */}
								<SocialButton
									icon={<Icon slug="sinaweibo" />}
									$iconSize={22}
									href={getShareUrl(
										"https://share.weibo.com/share/share.php",
										{ title: actionIntentText, url: actionIntentUrl },
									)}
								/>
								<SocialButton
									icon={<Icon slug="douban" />}
									href={getShareUrl(
										"https://www.douban.com/recommend/",
										{ title: actionIntentText, url: actionIntentUrl },
									)}
								/>
								<SocialButton
									icon={<Icon slug="xiaohongshu" />}
									$iconSize={30}
									tooltip={qrcode}
								/>
							</>
						)
						: (
							<>
								<SocialButton
									icon={<Icon slug="x" color={iconColor} />}
									href={getShareUrl(
										"https://x.com/intent/tweet",
										{ text: actionIntentText, url: actionIntentUrl },
									)}
								/>
								<SocialButton
									icon={<Icon slug="bluesky" color={iconColor} />}
									href={getShareUrl(
										"https://bsky.app/intent/compose",
										{ text: [actionIntentText, actionIntentUrl].join("\n") },
									)}
								/>
								<SocialButton
									icon={<Icon slug="threads" color={iconColor} />}
									href={getShareUrl(
										"https://www.threads.net/intent/post",
										{ text: actionIntentText, url: actionIntentUrl },
									)}
								/>
								<MastodonButton
									position={position}
									actionIntentText={actionIntentText}
								/>
							</>
						)}
					<FloatButton
						icon={linkCopied
							? <CheckOutlined style={{ color: "green" }} />
							: <LinkOutlined />}
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
};

export default FloatButtons;
