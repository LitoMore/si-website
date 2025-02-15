// @deno-types="@types/react"
import { RefObject, useEffect, useRef, useState } from "react";
import { Button, Flex, FloatButton, Input, Space } from "antd";
import {
	CheckOutlined,
	LinkOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { useLanguageCode } from "#atom";
import { linkRel } from "#constants";
import { useColorScheme, useSizes } from "#hooks";
import { getShareUrl } from "#utils";
import { LanguageCode } from "#types";

const SocialButton = styled(FloatButton).attrs({
	target: "_blank",
	rel: "noopener nofollow noreferrer",
})<{ $iconSize?: number }>`
  .ant-float-btn-icon {
    ${(props) =>
	props.$iconSize ? `width: ${props.$iconSize}px !important;` : ""}
  }
`;

const Icon = ({ slug }: { slug: string }) => {
	const { isLight, iconFg } = useColorScheme();
	return (
		<img
			style={{ transform: "translateY(1px)" }}
			src={`https://cdn.simpleicons.org/${slug}/${
				isLight ? "_" : iconFg.slice(1)
			}`}
		/>
	);
};

type Position = [x: number, y: number];

const MastodonButton = ({ position }: { position: Position }) => {
	const [mastodonInstance, setMastodonInstance] = useState("");
	const { innerWidth } = useSizes();
	const [x] = position;
	const middleX = (innerWidth - 30) / 2;
	const buttonWidth = 250;
	const baseX = buttonWidth / -2;
	const space = 25;
	const expandLeft = x + middleX > 0;
	const moveX = baseX + ((baseX - space) * (expandLeft ? 1 : -1));

	const formatMastodonUrl = (instanceUrl: string) => {
		instanceUrl = instanceUrl.trim().replace(/^https?:\/\//, "");
		const shareUrl = getShareUrl(`https://${instanceUrl}/share`, {
			urlInText: true,
		});
		return shareUrl;
	};

	return (
		<SocialButton
			icon={<Icon slug="mastodon" />}
			description={
				<Flex
					style={{
						position: "absolute",
						width: buttonWidth,
						height: 32,
						transform: `translate(${moveX}px, -18px)`,
						borderRadius: 6,
						boxShadow:
							"0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)",
					}}
				>
					<Space.Compact
						style={{ width: "100%" }}
					>
						<Input
							value={mastodonInstance}
							placeholder="Your Mastodon instance"
							onChange={(event) => setMastodonInstance(event.target.value)}
						/>
						<Button
							style={{ borderRadius: "0 6px 6px 0" }}
							rel={linkRel}
							target="_blank"
							href={formatMastodonUrl(mastodonInstance)}
							type="primary"
						>
							Share
						</Button>
					</Space.Compact>
				</Flex>
			}
		/>
	);
};

const FloatButtons = () => {
	const floatButtonsRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [position, setPosition] = useState<Position>([0, 0]);
	const [languageCode] = useLanguageCode();
	const { innerHeight } = useSizes();

	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => setLinkCopied(false), 1000);
		}
	}, [linkCopied]);

	const headerHeight = 54;
	const middleY = (innerHeight - headerHeight - 30) / 2;
	const expandTop = position[1] + middleY > 0;

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
			<div
				ref={floatButtonsRef}
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
					style={{ position: "relative", top: 0, right: 0, bottom: 0, left: 0 }}
					trigger="click"
					icon={<ShareAltOutlined style={{ transform: "translateX(-1px)" }} />}
					placement={expandTop ? "top" : "bottom"}
				>
					{languageCode === LanguageCode.Chinese
						? (
							<>
								<SocialButton icon={<Icon slug="wechat" />} $iconSize={20} />
								<SocialButton icon={<Icon slug="qq" />} />
								<SocialButton icon={<Icon slug="qzone" />} $iconSize={20} />
								<SocialButton icon={<Icon slug="sinaweibo" />} $iconSize={22} />
								<SocialButton icon={<Icon slug="douban" />} />
								<SocialButton
									icon={<Icon slug="xiaohongshu" />}
									$iconSize={30}
								/>
							</>
						)
						: (
							<>
								<SocialButton
									icon={<Icon slug="x" />}
									href={getShareUrl("https://x.com/intent/tweet")}
								/>
								<SocialButton
									icon={<Icon slug="bluesky" />}
									href={getShareUrl("https://bsky.app/intent/compose", {
										urlInText: true,
									})}
								/>
								<SocialButton
									icon={<Icon slug="threads" />}
									href={getShareUrl("https://www.threads.net/intent/post")}
								/>
								<MastodonButton position={position} />
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
			</div>
		</Draggable>
	);
};

export default FloatButtons;
