import {useLanguageCode} from '#atom';
import {gettext} from '#utils';
import en from './en.i18n.js';
import zh from './zh.i18n.js';

export type Internationalization = {
	footer: {
		iconMissing: string;
		iconOutdated: string;
		line1: string;
		line2: string;
		line3: string;
		madeWithLove: string;
		reportOutdated: string;
		submitRequest: string;
	};
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
		svgPath: string;
		svgPlain: string;
		title: string;
	};
	openGraph: {
		apply: string;
		gap: string;
		height: string;
		reset: string;
		shuffleIcons: string;
		size: string;
		width: string;
	};
	preview: {
		copyScreenshot: string;
		downloadSvg: string;
		savePreview: string;
		uploadSvg: string;
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
	share: {
		actionIntentText: string;
		share: string;
		yourMastodonInstance: string;
	};
	thirdParties: {
		extensions: string;
		libraries: string;
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
	[LanguageCode.Chinese]: zh,
	[LanguageCode.English]: en,
};

export const useI18n = () => {
	const [languageCode] = useLanguageCode();
	return {gettext, i18n: translations[languageCode]};
};
