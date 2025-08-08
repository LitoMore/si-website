import {type ReactNode} from 'react';
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
			className="box-content! block h-6 w-6 shrink-0 rounded-md p-[5px] hover:bg-black/6"
			href={link}
			rel={linkRel}
			target="_blank"
		>
			{typeof icon === 'string' ? (
				<img
					alt={icon}
					src={`https://cdn.simpleicons.org/${icon}/${
						isLight ? '_' : iconFg.slice(1)
					}`}
				/>
			) : (
				icon
			)}
		</a>
	);
}

function Socials() {
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

export default Socials;
