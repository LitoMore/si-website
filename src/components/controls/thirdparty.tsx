import {IconPuzzle} from '@tabler/icons-react';
import {useMediaQuery} from '@uidotdev/usehooks';
import {Dropdown} from '#components/ui/dropdown.js';
import {getContrastingIconColor} from '#components/ui/icon-color.js';
import {useSurfaceTheme} from '#components/ui/theme.js';
import {thirdParties} from '#data';
import {useColorScheme, useI18n, useSizes} from '#hooks';

export default function ThirdParty() {
	const {isMobileSize} = useSizes();
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();
	const theme = useSurfaceTheme();
	const isHighContrastPreferred = useMediaQuery('(prefers-contrast: more)');

	return (
		<Dropdown
			items={(['extensions', 'libraries'] as const).map((group) => ({
				key: group,
				label: i18n.thirdParties[group],
				children: thirdParties[group].map(({name, url, icon, authorName}) => ({
					key: name,
					href: url,
					icon: (
						<svg
							aria-hidden
							fill={getContrastingIconColor({
								color: `#${icon.hex}`,
								theme,
								prefersMoreContrast: isHighContrastPreferred,
							})}
							viewBox="0 0 24 24"
						>
							<path d={icon.path} />
						</svg>
					),
					label: name,
					extra: isMobileSize ? undefined : authorName,
				})),
			}))}
			popupClassName="third-party-menu"
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
