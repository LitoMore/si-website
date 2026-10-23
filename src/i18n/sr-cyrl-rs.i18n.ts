import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Оглас је можда блокиран или привремено недоступан.',
		label: 'Подржите Simple Icons',
		loading: 'Мало простора за подршку',
		support: 'Огласи помажу да подржимо Simple Icons. Хвала на разумевању.',
		unavailable: 'Овде би се обично приказао оглас',
	},
	footer: {
		iconMissing: 'Недостаје иконица?',
		iconOutdated: 'Застарела иконица?',
		line1:
			'{CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} лиценциран пројекат одржавају {сарадници Simple Icons-а|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Користи {GitHub|https://github.com/simple-icons/simple-icons} за захтеве, исправке и доприносе.',
		line3:
			'Љубазно подржано вашим донацијама на {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Направљено ❤️ на GitHub-у',
		reportOutdated: 'Пријави застарелу иконицу',
		submitRequest: 'Пошаљи pull request',
	},
	header: {
		iconPreviewer: 'Генератор прегледа',
		magnetGenerator: '3D магнети',
		openGraphGenerator: 'OpenGraph генератор',
	},
	languageName: 'Српски (ћирилица)',
	modal: {
		aliases: 'Други називи',
		color: 'Боја',
		copied: '{} је копирано у привремену меморију',
		copy: 'Копирај {}',
		download: 'Преузми',
		guidelines: 'Смернице бренда',
		license: 'Лиценца',
		source: 'Извор',
		sourceAndGuidelines: 'Извор и смернице',
		svgColored: 'обојен SVG',
		svgPath: 'Само путања',
		svgPlain: 'Једнобојни SVG',
		title: 'Бренд',
	},
	openGraph: {
		apply: 'Примени измене',
		canvas: 'Подешавања платна',
		clipboardUnavailable:
			'Овај прегледач не подржава копирање слика. Преузмите слику.',
		copied: 'Слика је копирана у привремену меморију',
		copy: 'Копирај слику',
		copyError:
			'Копирање слике није успело. Проверите дозволе за привремену меморију или преузмите слику.',
		description: 'Направите слику за дељење уз Simple Icons.',
		download: 'Преузми {}',
		downloaded: 'Слика је преузета',
		export: 'Извези слику',
		exportError: 'Извоз слике није успео. Покушајте поново.',
		exportHint:
			'Преузимања користе изворну величину платна. Слике се копирају у PNG формату.',
		format: 'Формат датотеке',
		gap: 'Размак',
		height: 'Висина',
		invalidSettings:
			'Користите димензије 128–4096 px, иконице 8–256 px и размаке 0–256 px. Иконица са маргинама мора да стане на платно.',
		loadError: 'Учитавање иконица није успело. Покушајте поново.',
		loading: 'Учитавање иконица…',
		originalSize: 'Извоз у изворној величини',
		preview: 'Преглед',
		reset: 'Врати на почетно',
		retry: 'Покушај поново',
		shuffleIcons: 'Сортирај насумично',
		size: 'Величина иконица',
		width: 'Ширина',
	},
	preview: {
		brand: 'Бренд',
		centered: 'Иконица мора бити центрирана на (12, 12).',
		collinear: 'Уклоните сувишни колинеарни сегмент.',
		copyScreenshot: 'Копирај преглед',
		downloadSvg: 'Преузми SVG',
		exportError: 'Извоз слике није успео. Покушајте поново.',
		fix: 'Поправи',
		invalidFile: 'Отпремите SVG датотеку која садржи путању.',
		invalidPath: 'Унесите исправну SVG путању чија величина није нула.',
		loadError: 'Учитавање иконица није успело. Покушајте поново.',
		moreSuggestions: 'Још предлога',
		negativeZero: 'Замените негативну нулу нулом.',
		path: 'Путања',
		precision: 'Користите највише три децимална места.',
		savePreview: 'Сачувај преглед',
		show: 'Прикажи',
		size: 'Најдужа страница иконице мора бити 24px.',
		uploadSvg: 'Отпреми SVG',
	},
	search: {
		noIconsFound: 'Иконице нису пронађене',
		searchByBrand: 'Претражи по бренду...',
	},
	settings: {
		actual: 'Изворне боје',
		actualTooltip:
			'Приказује изворне боје иконица. Неке могу бити слабо видљиве.',
		contrast: 'Контраст',
		contrastTooltip: 'Примењује филтер контраста ради боље видљивости иконица.',
		language: 'Промени језик',
		reset: 'Врати на почетно',
		themeAuto: 'Системска тема',
		themeDark: 'Тамна тема',
		themeLight: 'Светла тема',
		zoom: 'Увећање',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG иконица за популарне брендове',
		share: 'Подели',
		yourMastodonInstance: 'Ваша Mastodon инстанца',
	},
	thirdParties: {
		extensions: 'Проширења',
		libraries: 'Библиотеке',
	},
};

export default translation;
