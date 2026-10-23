import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Реклама может быть заблокирована или временно недоступна.',
		label: 'Поддержать Simple Icons',
		loading: 'Немного места для поддержки',
		support:
			'Реклама помогает поддерживать Simple Icons. Спасибо за понимание.',
		unavailable: 'Обычно здесь показывается реклама',
	},
	footer: {
		iconMissing: 'Значок отсутствует?',
		iconOutdated: 'Значок устарел?',
		line1:
			'Проект {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}, поддерживаемый {Aвторы Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Используйте {GitHub|https://github.com/simple-icons/simple-icons} для запросов, исправлений и дополнений.',
		line3:
			'Будем признательны за поддержку в виде пожертвований на {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Сделано с ❤️ на GitHub',
		reportOutdated: 'Сообщить об устаревшей иконке',
		submitRequest: 'Подать запрос',
	},
	header: {
		iconPreviewer: 'Генератор предварительного просмотра',
		magnetGenerator: '3D-магниты',
		openGraphGenerator: 'Генератор OpenGraph',
	},
	languageName: 'Русский',
	modal: {
		aliases: 'Другие названия',
		color: 'Цвет',
		copied: '{} скопировано в буфер обмена',
		copy: 'Копировать {}',
		download: 'Скачать',
		guidelines: 'Руководство по использованию бренда',
		license: 'Лицензия',
		source: 'Источник',
		sourceAndGuidelines: 'Источник и рекомендации',
		svgColored: 'цветной SVG',
		svgPath: 'Только путь',
		svgPlain: 'Одноцветный SVG',
		title: 'Бренд',
	},
	openGraph: {
		apply: 'Применить изменения',
		canvas: 'Настройки холста',
		clipboardUnavailable:
			'Этот браузер не поддерживает копирование изображений. Скачайте изображение.',
		copied: 'Изображение скопировано в буфер обмена',
		copy: 'Копировать изображение',
		copyError:
			'Не удалось скопировать изображение. Проверьте разрешения буфера обмена или скачайте его.',
		description: 'Создайте изображение для публикации с Simple Icons.',
		download: 'Скачать {}',
		downloaded: 'Изображение скачано',
		export: 'Экспорт изображения',
		exportError: 'Не удалось экспортировать изображение. Попробуйте ещё раз.',
		exportHint:
			'Изображения скачиваются в исходном размере холста и копируются в формате PNG.',
		format: 'Формат файла',
		gap: 'Интервал',
		height: 'Высота',
		invalidSettings:
			'Используйте размеры 128–4096 px, значки 8–256 px и интервалы 0–256 px. Значок с отступами должен помещаться на холсте.',
		loadError: 'Не удалось загрузить значки. Попробуйте ещё раз.',
		loading: 'Загрузка значков…',
		originalSize: 'Экспорт в исходном размере',
		preview: 'Предпросмотр',
		reset: 'Сбросить',
		retry: 'Повторить',
		shuffleIcons: 'Сортировать случайным образом',
		size: 'Размер значков',
		width: 'Ширина',
	},
	preview: {
		brand: 'Бренд',
		centered: 'Значок должен быть отцентрирован в точке (12, 12).',
		collinear: 'Удалите лишний коллинеарный отрезок.',
		copyScreenshot: 'Копировать предварительный просмотр',
		downloadSvg: 'Скачать SVG',
		exportError: 'Не удалось экспортировать изображение. Попробуйте ещё раз.',
		fix: 'Исправить',
		invalidFile: 'Загрузите SVG-файл, содержащий путь.',
		invalidPath: 'Введите корректный SVG-путь с ненулевым размером.',
		loadError: 'Не удалось загрузить значки. Попробуйте ещё раз.',
		moreSuggestions: 'Другие предложения',
		negativeZero: 'Замените отрицательный ноль на ноль.',
		path: 'Путь',
		precision: 'Используйте не более трёх знаков после запятой.',
		savePreview: 'Сохранить предварительный просмотр',
		show: 'Показывать',
		size: 'Самая длинная сторона значка должна быть 24px.',
		uploadSvg: 'Загрузить SVG',
	},
	search: {
		noIconsFound: 'Значки не найдены',
		searchByBrand: 'Поиск по бренду...',
	},
	settings: {
		actual: 'Исходные цвета',
		actualTooltip:
			'Показывает исходные цвета значков. Некоторые могут быть плохо видны.',
		contrast: 'Контраст',
		contrastTooltip:
			'Применяет фильтр контрастности для улучшения видимости значков.',
		language: 'Изменить язык',
		reset: 'Сбросить',
		themeAuto: 'Цветовая схема системы',
		themeDark: 'Темная цветовая гамма',
		themeLight: 'Светлая цветовая гамма',
		zoom: 'Масштаб',
	},
	share: {
		actionIntentText: 'Simple Icons: {} иконок SVG для популярных брендов',
		share: 'Поделитесь этим',
		yourMastodonInstance: 'Ваш сервер Mastodon',
	},
	thirdParties: {
		extensions: 'Расширения',
		libraries: 'Библиотеки',
	},
};

export default translation;
