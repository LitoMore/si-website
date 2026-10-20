import {type CSSProperties, type ReactElement, type ReactNode} from 'react';
import {Menu} from '@base-ui/react/menu';
import {useSurfaceTheme} from './theme.js';

export type MenuItem = {
	readonly key: string;
	readonly label: ReactNode;
	readonly icon?: ReactNode;
	readonly extra?: ReactNode;
	readonly href?: string;
	readonly children?: MenuItem[];
	readonly onClick?: () => void;
};

function Items({items}: {readonly items: MenuItem[]}) {
	return items.map((item) =>
		item.children ? (
			<Menu.Group key={item.key}>
				<Menu.GroupLabel className="ui-menu-label">
					{item.label}
				</Menu.GroupLabel>
				<Items items={item.children} />
			</Menu.Group>
		) : item.href ? (
			<Menu.LinkItem
				key={item.key}
				className="ui-menu-item"
				href={item.href}
				rel="noopener nofollow noreferrer"
				target="_blank"
			>
				{item.icon}
				<span className="ui-menu-text">{item.label}</span>
				{item.extra ? (
					<span className="ui-menu-extra">{item.extra}</span>
				) : null}
			</Menu.LinkItem>
		) : (
			<Menu.Item key={item.key} className="ui-menu-item" onClick={item.onClick}>
				{item.icon}
				<span className="ui-menu-text">{item.label}</span>
				{item.extra ? (
					<span className="ui-menu-extra">{item.extra}</span>
				) : null}
			</Menu.Item>
		),
	);
}

export function Dropdown({
	items,
	children,
	isHoverEnabled = true,
	align = 'end',
	style,
}: {
	readonly items: MenuItem[];
	readonly children: ReactElement;
	readonly isHoverEnabled?: boolean;
	readonly align?: 'start' | 'center' | 'end';
	readonly style?: CSSProperties;
}) {
	const theme = useSurfaceTheme();
	return (
		<Menu.Root modal={false}>
			<Menu.Trigger
				closeDelay={100}
				openOnHover={isHoverEnabled}
				render={children}
			/>
			<Menu.Portal>
				<Menu.Positioner align={align} className="ui-positioner" sideOffset={4}>
					<Menu.Popup
						className="ui-menu"
						data-ui-overlay="menu"
						data-ui-theme={theme}
						style={style}
					>
						<Items items={items} />
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}
