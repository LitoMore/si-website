/*
 * [INFO] We don't use styled-components for this component due to performance reasons.
 */
import {
	type CSSProperties,
	type ReactNode,
	createContext,
	useContext,
} from 'react';
import {useMediaQuery} from '@uidotdev/usehooks';
import {useColorMode, useSelectedIcon} from '#atom';
import {useSurfaceTheme} from '#components/ui/theme.js';
import {useColorScheme, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {getContrastingIconColor} from './icon-color.js';

function useCardSettings() {
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const [colorMode] = useColorMode();
	const {cardPixels} = useSizes();
	const {isLight, galleryFg} = useColorScheme();
	const theme = useSurfaceTheme();
	const isHighContrastPreferred = useMediaQuery('(prefers-contrast: more)');
	return {
		selectedIcon,
		setSelectedIcon,
		colorMode,
		cardPixels,
		isLight,
		galleryFg,
		theme,
		prefersMoreContrast: isHighContrastPreferred,
	};
}

const CardSettings = createContext<
	ReturnType<typeof useCardSettings> | undefined
>(undefined);

export function CardProvider({children}: {readonly children: ReactNode}) {
	// Subscribe once for the gallery, rather than for every mounted card.
	const settings = useCardSettings();
	return <CardSettings value={settings}>{children}</CardSettings>;
}

function Card({
	icon,
	style,
}: {
	readonly icon: Icon;
	readonly style?: CSSProperties;
}) {
	const settings = useContext(CardSettings);
	if (!settings) throw new Error('Cards must be rendered inside CardProvider.');
	const {
		selectedIcon,
		setSelectedIcon,
		colorMode,
		cardPixels,
		isLight,
		galleryFg,
		theme,
		prefersMoreContrast,
	} = settings;
	const hexColor = `#${icon.hex}`;
	const iconColor =
		colorMode === ColorMode.Contrast
			? getContrastingIconColor({color: hexColor, theme, prefersMoreContrast})
			: hexColor;
	const borderColor = isLight ? hexColor : galleryFg;
	const borderWidth = isLight ? 2 : 1;

	return (
		<button
			aria-label={icon.title}
			className="icon"
			style={{
				...style,
				width: cardPixels,
				height: cardPixels,
				borderTop: `${borderWidth}px solid ${borderColor}`,
				borderLeft: `${borderWidth}px solid ${borderColor}`,
				borderRight: `${borderWidth}px solid ${borderColor}`,
				borderBottom: isLight ? 0 : `${borderWidth}px solid ${borderColor}`,
				transform:
					selectedIcon?.slug === icon.slug ? 'translateY(-2px)' : undefined,
			}}
			type="button"
			onClick={() => {
				setSelectedIcon(icon);
			}}
		>
			<svg
				aria-hidden
				className="icon-image"
				fill={iconColor}
				viewBox="0 0 24 24"
			>
				<path d={icon.path} />
			</svg>
			<span className="icon-title" dir="auto">
				{icon.title}
			</span>
			<span
				className="icon-color"
				dir="ltr"
				style={{
					backgroundColor: hexColor,
					color: icon.relativeColor,
					borderTop: isLight ? undefined : `1px dashed ${borderColor}`,
				}}
			>
				{hexColor}
			</span>
		</button>
	);
}

export default Card;
