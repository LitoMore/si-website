import {type ComponentProps, type ReactNode} from 'react';

export type ButtonProps = ComponentProps<'button'> & {
	readonly variant?: 'default' | 'primary' | 'text';
	readonly size?: 'small' | 'large';
	readonly isBlock?: boolean;
	readonly isLoading?: boolean;
	readonly icon?: ReactNode;
};

export function Button({
	variant = 'default',
	size,
	isBlock = false,
	isLoading = false,
	icon,
	className = '',
	children,
	disabled = false,
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			aria-busy={isLoading}
			className={`ui-button ${className}`}
			data-block={isBlock}
			data-size={size}
			data-variant={variant}
			disabled={disabled || isLoading}
			type={
				type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'
			}
		>
			{isLoading ? <span aria-hidden className="ui-spinner" /> : icon}
			{children}
		</button>
	);
}
