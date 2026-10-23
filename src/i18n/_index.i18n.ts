import {useLanguageCode} from '#atom';
import {gettext} from './_utils.i18n.js';
import ar from './ar.i18n.js';
import deCH from './de-ch.i18n.js';
import deDE from './de-de.i18n.js';
import elGR from './el-gr.i18n.js';
import en from './en.i18n.js';
import esES from './es-es.i18n.js';
import fiFI from './fi-fi.i18n.js';
import frFR from './fr-fr.i18n.js';
import hiIN from './hi-in.i18n.js';
import itIT from './it-it.i18n.js';
import jaJP from './ja-jp.i18n.js';
import koKR from './ko-kr.i18n.js';
import nbNO from './nb-no.i18n.js';
import nlNL from './nl-nl.i18n.js';
import plPL from './pl-pl.i18n.js';
import ptPT from './pt-pt.i18n.js';
import roRO from './ro-ro.i18n.js';
import ruRU from './ru-ru.i18n.js';
import srCyrlRS from './sr-cyrl-rs.i18n.js';
import srLatnRS from './sr-latn-rs.i18n.js';
import svSE from './sv-se.i18n.js';
import trTR from './tr-tr.i18n.js';
import ukUA from './uk-ua.i18n.js';
import zhHant from './zh-hant.i18n.js';
import zh from './zh.i18n.js';

export type Internationalization = {
	advertisement: {
		description: string;
		label: string;
		loading: string;
		support: string;
		unavailable: string;
	};
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
	header: {
		iconPreviewer: string;
		magnetGenerator: string;
		openGraphGenerator: string;
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
		canvas: string;
		clipboardUnavailable: string;
		copied: string;
		copy: string;
		copyError: string;
		description: string;
		download: string;
		downloaded: string;
		export: string;
		exportError: string;
		exportHint: string;
		format: string;
		gap: string;
		height: string;
		invalidSettings: string;
		loadError: string;
		loading: string;
		originalSize: string;
		preview: string;
		reset: string;
		retry: string;
		shuffleIcons: string;
		size: string;
		width: string;
	};
	preview: {
		brand: string;
		centered: string;
		collinear: string;
		copyScreenshot: string;
		downloadSvg: string;
		exportError: string;
		fix: string;
		invalidFile: string;
		invalidPath: string;
		loadError: string;
		moreSuggestions: string;
		negativeZero: string;
		path: string;
		precision: string;
		savePreview: string;
		show: string;
		size: string;
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
		language: string;
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
	Arabic = 'ar',
	Chinese = 'zh',
	ChineseTraditional = 'zh-Hant',
	Dutch = 'nl-NL',
	English = 'en',
	Finnish = 'fi-FI',
	French = 'fr-FR',
	German = 'de-DE',
	GermanSwiss = 'de-CH',
	Greek = 'el-GR',
	Hindi = 'hi-IN',
	Italian = 'it-IT',
	Japanese = 'ja-JP',
	Korean = 'ko-KR',
	NorwegianBokmal = 'nb-NO',
	Polish = 'pl-PL',
	Portuguese = 'pt-PT',
	Romanian = 'ro-RO',
	Russian = 'ru-RU',
	SerbianCyrillic = 'sr-Cyrl-RS',
	SerbianLatin = 'sr-Latn-RS',
	Spanish = 'es-ES',
	Swedish = 'sv-SE',
	Turkish = 'tr-TR',
	Ukrainian = 'uk-UA',
}

export const translations: Record<LanguageCode, Internationalization> = {
	// The order here decides the order in the language switcher.
	/* eslint-disable perfectionist/sort-objects -- The order here decides the order in the language switcher. */
	[LanguageCode.English]: en,
	[LanguageCode.Chinese]: zh,
	[LanguageCode.ChineseTraditional]: zhHant,
	[LanguageCode.Arabic]: ar,
	[LanguageCode.Dutch]: nlNL,
	[LanguageCode.Finnish]: fiFI,
	[LanguageCode.French]: frFR,
	[LanguageCode.German]: deDE,
	[LanguageCode.GermanSwiss]: deCH,
	[LanguageCode.Greek]: elGR,
	[LanguageCode.Hindi]: hiIN,
	[LanguageCode.Italian]: itIT,
	[LanguageCode.Japanese]: jaJP,
	[LanguageCode.Korean]: koKR,
	[LanguageCode.NorwegianBokmal]: nbNO,
	[LanguageCode.Polish]: plPL,
	[LanguageCode.Portuguese]: ptPT,
	[LanguageCode.Romanian]: roRO,
	[LanguageCode.Russian]: ruRU,
	[LanguageCode.SerbianCyrillic]: srCyrlRS,
	[LanguageCode.SerbianLatin]: srLatnRS,
	[LanguageCode.Spanish]: esES,
	[LanguageCode.Swedish]: svSE,
	[LanguageCode.Turkish]: trTR,
	[LanguageCode.Ukrainian]: ukUA,
	/* eslint-enable perfectionist/sort-objects */
};

export function resolveLanguageCode(value: unknown): LanguageCode {
	return typeof value === 'string' && Object.hasOwn(translations, value)
		? (value as LanguageCode)
		: LanguageCode.English;
}

export const useI18n = () => {
	const [storedLanguageCode] = useLanguageCode();
	const languageCode = resolveLanguageCode(storedLanguageCode);
	return {gettext, i18n: translations[languageCode], languageCode};
};
