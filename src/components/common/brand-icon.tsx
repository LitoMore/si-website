import {type SVGProps} from 'react';
import {useIconBySlug} from '#atom';

export default function BrandIcon({
	slug,
	color,
	...props
}: SVGProps<SVGSVGElement> & {readonly slug: string}) {
	const icon = useIconBySlug(slug);
	return (
		<svg
			{...props}
			aria-hidden
			fill={color ?? (icon ? `#${icon.hex}` : 'currentColor')}
			viewBox="0 0 24 24"
		>
			{icon ? <path d={icon.path} /> : null}
		</svg>
	);
}
