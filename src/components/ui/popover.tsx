import {type ReactElement, type ReactNode} from 'react';
import {Popover as BasePopover} from '@base-ui/react/popover';
import {Tooltip as BaseTooltip} from '@base-ui/react/tooltip';
import {useSurfaceTheme} from './theme.js';

export function Popover({
	children,
	content,
	label,
}: {
	readonly children: ReactElement;
	readonly content: ReactNode;
	readonly label: string;
}) {
	const theme = useSurfaceTheme();
	return (
		<BasePopover.Root>
			<BasePopover.Trigger
				openOnHover
				closeDelay={100}
				delay={100}
				render={children}
			/>
			<BasePopover.Portal>
				<BasePopover.Positioner
					align="end"
					className="ui-positioner"
					sideOffset={8}
				>
					<BasePopover.Popup
						aria-label={label}
						className="ui-popover"
						data-ui-overlay="popover"
						data-ui-theme={theme}
					>
						{content}
					</BasePopover.Popup>
				</BasePopover.Positioner>
			</BasePopover.Portal>
		</BasePopover.Root>
	);
}

export function Tooltip({
	children,
	title,
}: {
	readonly children: ReactNode;
	readonly title?: ReactNode;
}) {
	const theme = useSurfaceTheme();
	if (!title) return <span className="ui-tooltip-trigger">{children}</span>;
	return (
		<BaseTooltip.Root>
			<BaseTooltip.Trigger
				render={<span className="ui-tooltip-trigger" tabIndex={0} />}
			>
				{children}
			</BaseTooltip.Trigger>
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner className="ui-positioner" sideOffset={6}>
					<BaseTooltip.Popup className="ui-tooltip" data-ui-theme={theme}>
						{title}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
}
