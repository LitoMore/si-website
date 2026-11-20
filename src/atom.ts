import {atom, useAtom, useAtomValue} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import {useSearchParams} from 'react-router';
import {defaultOpenGraphImage} from '#constants';
import {
	type BadgeStyle,
	type BrightnessMode,
	type CardSize,
	type ColorMode,
	type ColorTheme,
	type Icon,
	type LanguageCode,
	type PageLayout,
} from '#types';

const icons = atom<{data: Icon[]; version: string; error?: string}>({
	data: [],
	version: '',
});
const iconsLoadRequest = atom(0);
export const useIconsLoadRequest = () => useAtom(iconsLoadRequest);
export const useIcons = () => useAtom(icons);
const iconsBySlug = atom(
	(get) => new Map(get(icons).data.map((icon) => [icon.slug, icon])),
);
export const useIconBySlug = (slug: string) =>
	useAtomValue(iconsBySlug).get(slug);

const filteredIcons = atom([] as Icon[]);
export const useFilteredIcons = () => useAtom(filteredIcons);

export function useSelectedIcon() {
	const [parameters, setParameters] = useSearchParams();
	const icon = useIconBySlug(parameters.get('slug') ?? '');
	const select = (nextIcon: Icon | undefined) => {
		const next = new URLSearchParams(parameters);
		if (nextIcon) next.set('slug', nextIcon.slug);
		else next.delete('slug');
		setParameters(next);
	};

	return [icon, select] as const;
}

const pageLayout = atom('default' as PageLayout);
export const usePageLayout = () => useAtom(pageLayout);

const cardSize = atom(100 as CardSize);
export const useCardSize = () => useAtom(cardSize);

const colorMode = atom('contrast' as ColorMode);
export const useColorMode = () => useAtom(colorMode);

const brightnessMode = atom('simpleicons' as BrightnessMode);
export const useBrightnessMode = () => useAtom(brightnessMode);

const iconStyle = atom<'icon' | 'badge'>('icon');
export const useIconStyle = () => useAtom(iconStyle);

const badgeStyle = atom('flat' as BadgeStyle);
export const useBadgeStyle = () => useAtom(badgeStyle);

const languageCode = atomWithStorage('languageCode', 'en' as LanguageCode);
export const useLanguageCode = () => useAtom(languageCode);

const colorTheme = atomWithStorage('colorTheme', 'auto' as ColorTheme);
export const useColorTheme = () => useAtom(colorTheme);

const openGraphImage = atomWithStorage('openGraph', defaultOpenGraphImage);
export const useOpenGraphImage = () => useAtom(openGraphImage);
