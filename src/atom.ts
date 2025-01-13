/**
 * [INFO] Here used the `value as EnumType` as a workaround to fix a possibly undefined issue.
 */
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
	BadgeStyle,
	BrightnessMode,
	CardSize,
	ColorMode,
	ColorTheme,
	Icon,
	LanguageCode,
	PageLayout,
} from "#types";

const icons = atom({ data: [] as Icon[], version: "" });
export const useIcons = () => useAtom(icons);

const searchText = atom("");
export const useSearchText = () => useAtom(searchText);

const filteredIcons = atom([] as Icon[]);
export const useFilteredIcons = () => useAtom(filteredIcons);

const selectedIcon = atom<Icon | undefined>(undefined);
export const useSelectedIcon = () => useAtom(selectedIcon);

const pageLayout = atom("default" as PageLayout);
export const usePageLayout = () => useAtom(pageLayout);

const cardSize = atom(100 as CardSize);
export const useCardSize = () => useAtom(cardSize);

const colorMode = atom("contrast" as ColorMode);
export const useColorMode = () => useAtom(colorMode);

const brightnessMode = atom("simpleicons" as BrightnessMode);
export const useBrightnessMode = () => useAtom(brightnessMode);

const iconStyle = atom<"icon" | "badge">("icon");
export const useIconStyle = () => useAtom(iconStyle);

const badgeStyle = atom("flat" as BadgeStyle);
export const useBadgeStyle = () => useAtom(badgeStyle);

const languageCode = atomWithStorage("languageCode", "en" as LanguageCode);
export const useLanguageCode = () => useAtom(languageCode);

const colorTheme = atomWithStorage("colorTheme", "auto" as ColorTheme);
export const useColorTheme = () => useAtom(colorTheme);
