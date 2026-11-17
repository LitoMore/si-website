import {type ReactNode} from 'react';
import BrandIcon from '#components/common/brand-icon.js';
import {linkRel} from '#constants';
import {useColorScheme} from '#hooks';

function Social({
	icon,
	link,
}: {
	readonly icon: string | ReactNode;
	readonly link: string;
}) {
	const {isLight, iconFg} = useColorScheme();
	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			aria-label={typeof icon === 'string' ? icon : undefined}
			className="box-content! block h-6 w-6 shrink-0 rounded-md p-1.25 hover:bg-black/6"
			href={link}
			rel={linkRel}
			target="_blank"
		>
			{typeof icon === 'string' ? (
				<BrandIcon
					className="h-full w-full"
					color={isLight ? undefined : iconFg}
					slug={icon}
				/>
			) : (
				icon
			)}
		</a>
	);
}

export default function Socials() {
	return (
		<div className="flex">
			<Social
				icon="github"
				link="https://github.com/simple-icons/simple-icons"
			/>
			<Social icon="discord" link="https://discord.gg/vUXFa7t5xJ" />
		</div>
	);
}
