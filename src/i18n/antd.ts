import {type Locale} from 'antd/es/locale/index.js';
import arEG from 'antd/locale/ar_EG.js';
import deDE from 'antd/locale/de_DE.js';
import elGR from 'antd/locale/el_GR.js';
import enUS from 'antd/locale/en_US.js';
import esES from 'antd/locale/es_ES.js';
import fiFI from 'antd/locale/fi_FI.js';
import frFR from 'antd/locale/fr_FR.js';
import hiIN from 'antd/locale/hi_IN.js';
import itIT from 'antd/locale/it_IT.js';
import jaJP from 'antd/locale/ja_JP.js';
import koKR from 'antd/locale/ko_KR.js';
import nbNO from 'antd/locale/nb_NO.js';
import nlNL from 'antd/locale/nl_NL.js';
import plPL from 'antd/locale/pl_PL.js';
import ptPT from 'antd/locale/pt_PT.js';
import roRO from 'antd/locale/ro_RO.js';
import ruRU from 'antd/locale/ru_RU.js';
import srRS from 'antd/locale/sr_RS.js';
import svSE from 'antd/locale/sv_SE.js';
import trTR from 'antd/locale/tr_TR.js';
import ukUA from 'antd/locale/uk_UA.js';
import zhCN from 'antd/locale/zh_CN.js';
import zhTW from 'antd/locale/zh_TW.js';
import {LanguageCode} from './_index.i18n.js';

// Support both CommonJS package exports and Vite's ES module interop.
function normalizeLocale(value: Locale | {default: Locale}): Locale {
	return 'default' in value ? value.default : value;
}

const locales: Record<LanguageCode, Locale> = {
	[LanguageCode.Arabic]: normalizeLocale(arEG),
	[LanguageCode.Chinese]: normalizeLocale(zhCN),
	[LanguageCode.ChineseTraditional]: normalizeLocale(zhTW),
	[LanguageCode.Dutch]: normalizeLocale(nlNL),
	[LanguageCode.English]: normalizeLocale(enUS),
	[LanguageCode.Finnish]: normalizeLocale(fiFI),
	[LanguageCode.French]: normalizeLocale(frFR),
	[LanguageCode.German]: normalizeLocale(deDE),
	[LanguageCode.GermanSwiss]: normalizeLocale(deDE),
	[LanguageCode.Greek]: normalizeLocale(elGR),
	[LanguageCode.Hindi]: normalizeLocale(hiIN),
	[LanguageCode.Italian]: normalizeLocale(itIT),
	[LanguageCode.Japanese]: normalizeLocale(jaJP),
	[LanguageCode.Korean]: normalizeLocale(koKR),
	[LanguageCode.NorwegianBokmal]: normalizeLocale(nbNO),
	[LanguageCode.Polish]: normalizeLocale(plPL),
	[LanguageCode.Portuguese]: normalizeLocale(ptPT),
	[LanguageCode.Romanian]: normalizeLocale(roRO),
	[LanguageCode.Russian]: normalizeLocale(ruRU),
	[LanguageCode.SerbianCyrillic]: {
		...normalizeLocale(srRS),
		global: {placeholder: 'Изабери', close: 'Затвори'},
		// eslint-disable-next-line @typescript-eslint/naming-convention -- Ant Design locale key.
		Modal: {okText: 'У реду', cancelText: 'Откажи', justOkText: 'У реду'},
		// eslint-disable-next-line @typescript-eslint/naming-convention -- Ant Design locale key.
		Empty: {description: 'Нема података'},
		// eslint-disable-next-line @typescript-eslint/naming-convention -- Ant Design locale key.
		Text: {
			edit: 'Уреди',
			copy: 'Копирај',
			copied: 'Копирано',
			expand: 'Прошири',
		},
	},
	[LanguageCode.SerbianLatin]: normalizeLocale(srRS),
	[LanguageCode.Spanish]: normalizeLocale(esES),
	[LanguageCode.Swedish]: normalizeLocale(svSE),
	[LanguageCode.Turkish]: normalizeLocale(trTR),
	[LanguageCode.Ukrainian]: normalizeLocale(ukUA),
};

export default locales;
