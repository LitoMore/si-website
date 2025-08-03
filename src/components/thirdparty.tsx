import {IconPuzzle} from '@tabler/icons-react';
import {Dropdown} from 'antd';
import {useColorTheme} from '#atom';
import {thirdParties} from '#data';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {getColorScheme} from '#utils';
import {Control} from './controls.js';

function Icon({url}: {readonly url: string}) {
	return (
		<img
			src={url}
			style={{
				width: 20,
				height: 20,
			}}
		/>
	);
}

function Item({
	icon,
	label,
	url,
}: {
	readonly icon: string;
	readonly label: string;
	readonly url: string;
}) {
	return (
		<a
			href={url}
			rel="noopener nofollow noreferrer"
			style={{display: 'flex', alignItems: 'center', gap: 8}}
			target="_blank"
		>
			<Icon url={icon} />
			{label}
		</a>
	);
}

function ThirdParty() {
	const {isMobileSize} = useSizes();
	const [colorTheme] = useColorTheme();
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Dropdown
			menu={{
				items: [
					{
						key: 'extensions',
						type: 'group',
						label: i18n.thirdParties.extensions,
						children: thirdParties.extensions.map((x) => ({
							key: x.name,
							label: <Item icon={x.icon} label={x.name} url={x.url} />,
							extra: isMobileSize ? undefined : x.authorName,
						})),
					},
					{
						key: 'libraries',
						type: 'group',
						label: i18n.thirdParties.libraries,
						children: thirdParties.libraries.map((x) => ({
							key: x.name,
							label: <Item icon={x.icon} label={x.name} url={x.url} />,
							extra: isMobileSize ? undefined : x.authorName,
						})),
					},
				],
			}}
			overlayStyle={{
				colorScheme: getColorScheme(colorTheme),
			}}
		>
			<Control as={IconPuzzle} style={{color: iconFg}} />
		</Dropdown>
	);
}

export default ThirdParty;
