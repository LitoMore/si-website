import {type Icon} from '#types';
import {normalizeColor} from '#utils';

function PrefixIcon({
	icon,
	color,
	iconStyle,
}: {
	readonly icon?: Icon;
	readonly color?: string;
	readonly iconStyle: 'color' | 'icon';
}) {
	if (!icon) return null;

	const borderRadius = iconStyle === 'color' ? 4 : undefined;
	const boxShadow =
		iconStyle === 'color' ? '0 0 5px 0 rgba(0, 0, 0, 0.25)' : undefined;
	const backgroundColor =
		iconStyle === 'color'
			? `#${normalizeColor(color) ?? icon.hex ?? '000000'}`
			: 'currentColor';

	return (
		<div
			className="h-[21px] w-[21px] shrink-0"
			style={{
				borderRadius,
				boxShadow,
				backgroundColor: iconStyle === 'color' ? backgroundColor : undefined,
			}}
		>
			{iconStyle === 'icon' ? (
				<svg
					aria-hidden
					className="h-full w-full"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d={icon.path} />
				</svg>
			) : null}
		</div>
	);
}

export default PrefixIcon;
