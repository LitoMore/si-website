import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Рекламу може бути заблоковано або вона тимчасово недоступна.',
		label: 'Підтримати Simple Icons',
		loading: 'Трохи місця для підтримки',
		support:
			'Реклама допомагає підтримувати Simple Icons. Дякуємо за розуміння.',
		unavailable: 'Зазвичай тут відображається реклама',
	},
	footer: {
		iconMissing: 'Немає значка?',
		iconOutdated: 'Значок застарів?',
		line1:
			'Проєкт є суспільним надбанням {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} та підтримується {учасниками Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Використовуйте {GitHub|https://github.com/simple-icons/simple-icons} для надсилання запитів на покращення та участі.',
		line3:
			'Підтримується за рахунок ваших донатів через {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Зроблено з ❤️ на GitHub',
		reportOutdated: 'Повідомте про застарілий значок',
		submitRequest: 'Зробіть запит',
	},
	header: {
		iconPreviewer: 'Генератор попереднього перегляду',
		magnetGenerator: '3D-магніти',
		openGraphGenerator: 'Генератор OpenGraph',
	},
	languageName: 'Українська',
	modal: {
		aliases: 'Інші назви',
		color: 'Колір',
		copied: '{} скопійовано до буфера обміну',
		copy: 'Копіювати {}',
		download: 'Завантажити',
		guidelines: 'Настанови бренду',
		license: 'Ліцензія',
		source: 'Джерело',
		sourceAndGuidelines: 'Джерело та настанови',
		svgColored: 'кольоровий SVG',
		svgPath: 'Лише шлях',
		svgPlain: 'Одноколірний SVG',
		title: 'Бренд',
	},
	openGraph: {
		apply: 'Застосувати зміни',
		canvas: 'Налаштування полотна',
		clipboardUnavailable:
			'Цей браузер не підтримує копіювання зображень. Завантажте зображення.',
		copied: 'Зображення скопійовано до буфера обміну',
		copy: 'Копіювати зображення',
		copyError:
			'Не вдалося скопіювати зображення. Перевірте дозволи буфера обміну або завантажте його.',
		description: 'Створіть зображення для поширення за допомогою Simple Icons.',
		download: 'Завантажити {}',
		downloaded: 'Зображення завантажено',
		export: 'Експортувати зображення',
		exportError: 'Не вдалося експортувати зображення. Спробуйте ще раз.',
		exportHint:
			'Завантаження використовують початковий розмір полотна. Зображення копіюються у форматі PNG.',
		format: 'Формат файлу',
		gap: 'Проміжок',
		height: 'Висота',
		invalidSettings:
			'Використовуйте розміри 128–4096 px, значки 8–256 px і проміжки 0–256 px. Значок із відступами має вміщуватися на полотні.',
		loadError: 'Не вдалося завантажити значки. Спробуйте ще раз.',
		loading: 'Завантаження значків…',
		originalSize: 'Експорт у початковому розмірі',
		preview: 'Попередній перегляд',
		reset: 'Скинути',
		retry: 'Повторити',
		shuffleIcons: 'Випадково',
		size: 'Розмір значків',
		width: 'Ширина',
	},
	preview: {
		brand: 'Бренд',
		centered: 'Значок має бути відцентрований у точці (12, 12).',
		collinear: 'Видаліть зайвий колінеарний відрізок.',
		copyScreenshot: 'Копіювати превью',
		downloadSvg: 'Завантажити SVG',
		exportError: 'Не вдалося експортувати зображення. Спробуйте ще раз.',
		fix: 'Виправити',
		invalidFile: 'Завантажте файл SVG, що містить шлях.',
		invalidPath: 'Введіть коректний шлях SVG з ненульовим розміром.',
		loadError: 'Не вдалося завантажити значки. Спробуйте ще раз.',
		moreSuggestions: 'Більше пропозицій',
		negativeZero: 'Замініть від’ємний нуль на нуль.',
		path: 'Шлях',
		precision: 'Використовуйте не більше трьох знаків після коми.',
		savePreview: 'Зберегти превью',
		show: 'Показати',
		size: 'Найдовша сторона значка має бути 24px.',
		uploadSvg: 'Надіслати SVG',
	},
	search: {
		noIconsFound: 'Значків не знайдено',
		searchByBrand: 'Шукати бренд…',
	},
	settings: {
		actual: 'Початкові кольори',
		actualTooltip:
			'Показує початкові кольори значків. Деякі можуть бути погано помітними.',
		contrast: 'Контраст',
		contrastTooltip:
			'Застосовує фільтр контрастності для кращої видимості значків.',
		language: 'Змінити мову',
		reset: 'Скинути',
		themeAuto: 'Системна',
		themeDark: 'Темна тема',
		themeLight: 'Світла тема',
		zoom: 'Масштаб',
	},
	share: {
		actionIntentText: 'Simple Icons: {} значки SVG популярних брендів',
		share: 'Поділіться цим',
		yourMastodonInstance: 'Ваш сервер Mastodon',
	},
	thirdParties: {
		extensions: 'Розширення',
		libraries: 'Бібліотеки',
	},
};

export default translation;
