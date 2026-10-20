import {type ReactNode} from 'react';
import {Dialog as BaseDialog} from '@base-ui/react/dialog';
import {IconX} from '@tabler/icons-react';
import {
	type SurfaceTheme,
	SurfaceThemeContext,
	useSurfaceTheme,
} from './theme.js';

export function Dialog({
	isOpen,
	onOpenChange,
	title,
	closeLabel,
	children,
	footer,
	isCloseVisible,
	theme,
}: {
	readonly isOpen: boolean;
	readonly onOpenChange: (isOpen: boolean) => void;
	readonly title: string;
	readonly closeLabel: string;
	readonly children: ReactNode;
	readonly footer: ReactNode;
	readonly isCloseVisible?: boolean;
	readonly theme?: SurfaceTheme;
}) {
	const inheritedTheme = useSurfaceTheme();
	const surfaceTheme = theme ?? inheritedTheme;
	return (
		<SurfaceThemeContext value={surfaceTheme}>
			<BaseDialog.Root open={isOpen} onOpenChange={onOpenChange}>
				<BaseDialog.Portal>
					<BaseDialog.Backdrop className="ui-dialog-backdrop" />
					<BaseDialog.Viewport className="ui-dialog-viewport">
						<BaseDialog.Popup
							aria-describedby={undefined}
							className="ui-dialog"
							data-ui-overlay="dialog"
							data-ui-theme={surfaceTheme}
						>
							<BaseDialog.Title className="sr-only">{title}</BaseDialog.Title>
							{isCloseVisible ? (
								<BaseDialog.Close
									aria-label={closeLabel}
									className="ui-dialog-close"
								>
									<IconX size={18} />
								</BaseDialog.Close>
							) : null}
							{children}
							<div className="ui-dialog-footer">{footer}</div>
						</BaseDialog.Popup>
					</BaseDialog.Viewport>
				</BaseDialog.Portal>
			</BaseDialog.Root>
		</SurfaceThemeContext>
	);
}
