import {type ReactNode, useEffect, useRef, useState} from 'react';
import {IconCheck, IconCopy} from '@tabler/icons-react';
import copyTextToClipboard from 'copy-text-to-clipboard';
import {useI18n} from '#i18n';

export function CopyText({
	children,
	text,
}: {
	readonly children: ReactNode;
	readonly text: string;
}) {
	const {i18n, gettext} = useI18n();
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	useEffect(
		() => () => {
			clearTimeout(timer.current);
		},
		[],
	);
	return (
		<span className="ui-copy-text">
			{children}
			<button
				aria-label={gettext(copied ? i18n.modal.copied : i18n.modal.copy, [
					text,
				])}
				className="ui-copy-button"
				type="button"
				onClick={() => {
					if (!copyTextToClipboard(text)) return;
					setCopied(true);
					clearTimeout(timer.current);
					timer.current = setTimeout(() => {
						setCopied(false);
					}, 3000);
				}}
			>
				{copied ? (
					<IconCheck aria-hidden size={16} />
				) : (
					<IconCopy aria-hidden size={16} />
				)}
			</button>
		</span>
	);
}
