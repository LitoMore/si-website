import { useLanguageCode } from "#atom";
import en from "./en.i18n.ts";
import zh from "./zh.i18n.ts";

export enum LanguageCode {
	Chinese = "zh",
	English = "en",
	// French = "fr",
	// Japanese = "ja",
	// Ukrainian = "uk",
	// Portuguese = "pt",
	// Russian = "ru",
	// Spanish = "es",
}

export type Internationalization = {
	actual: string;
	actualTooltip: string;
	contrast: string;
	contrastTooltip: string;
	languageName: string;
	noIconsFound: string;
	reset: string;
	searchByBrand: string;
	themeAuto: string;
	themeDark: string;
	themeLight: string;
	zoom: string;
};

export const translations: Record<LanguageCode, Internationalization> = {
	[LanguageCode.English]: en,
	[LanguageCode.Chinese]: zh,
};

export const useI18n = () => {
	const [languageCode] = useLanguageCode();
	return translations[languageCode];
};
