import {useLanguageCode} from '#atom';
import {gettext} from '#utils';
import en from './en.i18n.js';
import zh from './zh.i18n.js';

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
		svgPath: string;
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
	thirdParties: {
		extensions: string;
		libraries: string;
	};
	footer: {
		iconMissing: string;
		iconOutdated: string;
		submitRequest: string;
		reportOutdated: string;
		madeWithLove: string;
		line1: string;
		line2: string;
		line3: string;
	};
	preview: {
		uploadSvg: string;
		downloadSvg: string;
		savePreview: string;
		copyScreenshot: string;
	};
	share: {
		actionIntentText: string;
		share: string;
		yourMastodonInstance: string;
	};
};

export enum LanguageCode {
	Chinese = 'zh',
	English = 'en',
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
	return {i18n: translations[languageCode], gettext};
};
