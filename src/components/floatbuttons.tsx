// @deno-types="@types/react"
import { RefObject, useEffect, useRef, useState } from "react";
import { FloatButton } from "antd";
import {
	CheckOutlined,
	LinkOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { useLanguageCode } from "#atom";
import { useColorScheme } from "#hooks";
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

const FloatButtons = () => {
	const floatButtonsRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [languageCode] = useLanguageCode();

	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => setLinkCopied(false), 2000);
		}
	}, [linkCopied]);

	return (
		<Draggable
			bounds="body"
			nodeRef={floatButtonsRef as RefObject<HTMLDivElement>}
			onStart={() => setIsDragging(false)}
			onDrag={() => setIsDragging(true)}
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
