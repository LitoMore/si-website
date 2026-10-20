import {IconPuzzle} from '@tabler/icons-react';
import {Dropdown} from '#components/ui/dropdown.js';
import {thirdParties} from '#data';
import {useColorScheme, useI18n, useSizes} from '#hooks';

function Icon({url}: {readonly url: string}) {
	return <img className="h-5 w-5" src={url} />;
}

export default function ThirdParty() {
	const {isMobileSize} = useSizes();
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Dropdown
			items={[
				{
					key: 'extensions',
					label: i18n.thirdParties.extensions,
					children: thirdParties.extensions.map((x) => ({
						key: x.name,
						href: x.url,
						icon: <Icon url={x.icon} />,
						label: x.name,
						extra: isMobileSize ? undefined : x.authorName,
					})),
				},
				{
					key: 'libraries',
					label: i18n.thirdParties.libraries,
					children: thirdParties.libraries.map((x) => ({
						key: x.name,
						href: x.url,
						icon: <Icon url={x.icon} />,
						label: x.name,
						extra: isMobileSize ? undefined : x.authorName,
					})),
				},
			]}
		>
			<button
				aria-label={`${i18n.thirdParties.extensions} / ${i18n.thirdParties.libraries}`}
				className="control"
				type="button"
			>
				<IconPuzzle aria-hidden style={{color: iconFg}} />
			</button>
		</Dropdown>
	);
}
