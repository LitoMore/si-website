import { useLanguageCode } from "#atom";
import { formatString } from "#utils";
import en from "./en.i18n.ts";
import zh from "./zh.i18n.ts";

export type Internationalization = {
	languageName: string;
	modal: {
		aliases: string;
		color: string;
		copied: string;
		copy: string;
		download: string;
		guidelines: string;
		license: string;
		source: string;
		sourceAndGuidelines: string;
		svgColored: string;
		svgPlain: string;
		title: string;
	};
	search: {
		noIconsFound: string;
		searchByBrand: string;
	};
	settings: {
		actual: string;
		actualTooltip: string;
		contrast: string;
		contrastTooltip: string;
		reset: string;
		themeAuto: string;
		themeDark: string;
		themeLight: string;
		zoom: string;
	};
};

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

export const translations: Record<LanguageCode, Internationalization> = {
	[LanguageCode.English]: en,
	[LanguageCode.Chinese]: zh,
};

export const useI18n = () => {
	const [languageCode] = useLanguageCode();
	return { i18n: translations[languageCode], format: formatString };
};
