import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Reklama może być blokowana lub tymczasowo niedostępna.',
		label: 'Wesprzyj Simple Icons',
		loading: 'Małe miejsce na wsparcie',
		support:
			'Reklamy pomagają wspierać Simple Icons. Dziękujemy za zrozumienie.',
		unavailable: 'Tutaj zwykle pojawia się reklama',
	},
	footer: {
		iconMissing: 'Brakuje ikony?',
		iconOutdated: 'Ikona nieaktualna?',
		line1:
			'Projekt {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} utrzymywany przez {współtwórców Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Użyj {GitHub|https://github.com/simple-icons/simple-icons} do zgłoszeń, poprawek i wkładu.',
		line3:
			'Wspierany przez Twoje darowizny na {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Stworzone z ❤️ na GitHub',
		reportOutdated: 'Zgłoś nieaktualną ikonę',
		submitRequest: 'Wyślij zgłoszenie',
	},
	header: {
		iconPreviewer: 'Generator podglądu',
		magnetGenerator: 'Magnesy 3D',
		openGraphGenerator: 'Generator OpenGraph',
	},
	languageName: 'Polski',
	modal: {
		aliases: 'Alternatywne nazwy',
		color: 'Kolor',
		copied: 'Skopiowano {} do schowka',
		copy: 'Kopiuj {}',
		download: 'Pobierz',
		guidelines: 'Wytyczne dotyczące marki',
		license: 'Licencja',
		source: 'Źródło',
		sourceAndGuidelines: 'Źródło i wytyczne',
		svgColored: 'kolorowy SVG',
		svgPath: 'Tylko ścieżka',
		svgPlain: 'Jednokolorowy SVG',
		title: 'Marka',
	},
	openGraph: {
		apply: 'Zastosuj zmiany',
		canvas: 'Ustawienia płótna',
		clipboardUnavailable:
			'Ta przeglądarka nie obsługuje kopiowania obrazów. Pobierz obraz.',
		copied: 'Obraz skopiowano do schowka',
		copy: 'Kopiuj obraz',
		copyError:
			'Nie udało się skopiować obrazu. Sprawdź uprawnienia schowka lub pobierz obraz.',
		description: 'Utwórz obraz do udostępnienia za pomocą Simple Icons.',
		download: 'Pobierz {}',
		downloaded: 'Obraz pobrany',
		export: 'Eksportuj obraz',
		exportError: 'Nie udało się wyeksportować obrazu. Spróbuj ponownie.',
		exportHint:
			'Pobierane obrazy mają oryginalny rozmiar płótna. Obrazy są kopiowane jako PNG.',
		format: 'Format pliku',
		gap: 'Odstęp',
		height: 'Wysokość',
		invalidSettings:
			'Użyj wymiarów 128–4096 px, ikon 8–256 px i odstępów 0–256 px. Ikona wraz z marginesami musi mieścić się na płótnie.',
		loadError: 'Nie udało się wczytać ikon. Spróbuj ponownie.',
		loading: 'Wczytywanie ikon…',
		originalSize: 'Eksport w oryginalnym rozmiarze',
		preview: 'Podgląd',
		reset: 'Resetuj',
		retry: 'Spróbuj ponownie',
		shuffleIcons: 'Sortuj losowo',
		size: 'Rozmiar ikon',
		width: 'Szerokość',
	},
	preview: {
		brand: 'Marka',
		centered: 'Ikona musi być wyśrodkowana w punkcie (12, 12).',
		collinear: 'Usuń zbędny współliniowy odcinek.',
		copyScreenshot: 'Kopiuj podgląd',
		downloadSvg: 'Pobierz SVG',
		exportError: 'Nie udało się wyeksportować obrazu. Spróbuj ponownie.',
		fix: 'Napraw',
		invalidFile: 'Prześlij plik SVG zawierający ścieżkę.',
		invalidPath: 'Wprowadź poprawną ścieżkę SVG o niezerowym rozmiarze.',
		loadError: 'Nie udało się wczytać ikon. Spróbuj ponownie.',
		moreSuggestions: 'Więcej sugestii',
		negativeZero: 'Zastąp ujemne zero zerem.',
		path: 'Ścieżka',
		precision: 'Użyj najwyżej trzech miejsc po przecinku.',
		savePreview: 'Zapisz podgląd',
		show: 'Pokaż',
		size: 'Najdłuższy bok ikony musi mieć 24px.',
		uploadSvg: 'Prześlij SVG',
	},
	search: {
		noIconsFound: 'Nie znaleziono ikon',
		searchByBrand: 'Szukaj według marki...',
	},
	settings: {
		actual: 'Oryginalne kolory',
		actualTooltip:
			'Wyświetla oryginalne kolory ikon. Niektóre mogą być słabo widoczne.',
		contrast: 'Kontrast',
		contrastTooltip: 'Stosuje filtr kontrastu, aby poprawić widoczność ikon.',
		language: 'Zmień język',
		reset: 'Resetuj',
		themeAuto: 'Systemowy schemat kolorów',
		themeDark: 'Ciemny schemat kolorów',
		themeLight: 'Jasny schemat kolorów',
		zoom: 'Powiększenie',
	},
	share: {
		actionIntentText: 'Simple Icons: {} ikon SVG dla popularnych marek',
		share: 'Udostępnij to',
		yourMastodonInstance: 'Twoja instancja Mastodona',
	},
	thirdParties: {
		extensions: 'Rozszerzenia',
		libraries: 'Biblioteki',
	},
};

export default translation;
