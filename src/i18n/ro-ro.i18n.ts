import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Reclama poate fi blocată sau indisponibilă temporar.',
		label: 'Susține Simple Icons',
		loading: 'Un mic spațiu pentru susținere',
		support:
			'Reclamele ajută la susținerea Simple Icons. Mulțumim pentru înțelegere.',
		unavailable: 'În mod normal, aici ar apărea o reclamă',
	},
	footer: {
		iconMissing: 'Lipsește o pictogramă?',
		iconOutdated: 'Pictogramă depășită?',
		line1:
			'Un proiect {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} întreținut de {colaboratorii Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Folosește {GitHub|https://github.com/simple-icons/simple-icons} pentru solicitări, corecții și contribuții.',
		line3:
			'Susținut amabil de donațiile tale pe {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Făcut cu ❤️ pe GitHub',
		reportOutdated: 'Raportează pictogramă depășită',
		submitRequest: 'Trimite o solicitare',
	},
	header: {
		iconPreviewer: 'Generator de previzualizare',
		magnetGenerator: 'Magneți 3D',
		openGraphGenerator: 'Generator OpenGraph',
	},
	languageName: 'Română',
	modal: {
		aliases: 'Nume alternative',
		color: 'Culoare',
		copied: '{} copiat în clipboard',
		copy: 'Copiază {}',
		download: 'Descarcă',
		guidelines: 'Ghiduri de brand',
		license: 'Licență',
		source: 'Sursă',
		sourceAndGuidelines: 'Sursă și îndrumări',
		svgColored: 'SVG colorat',
		svgPath: 'Doar calea',
		svgPlain: 'SVG monocrom',
		title: 'Brand',
	},
	openGraph: {
		apply: 'Aplică modificările',
		canvas: 'Setările pânzei',
		clipboardUnavailable:
			'Acest browser nu permite copierea imaginilor. Descarcă imaginea.',
		copied: 'Imagine copiată în clipboard',
		copy: 'Copiază imaginea',
		copyError:
			'Imaginea nu a putut fi copiată. Verifică permisiunile clipboardului sau descarcă imaginea.',
		description: 'Creează o imagine de distribuit cu Simple Icons.',
		download: 'Descarcă {}',
		downloaded: 'Imagine descărcată',
		export: 'Exportă imaginea',
		exportError: 'Imaginea nu a putut fi exportată. Încearcă din nou.',
		exportHint:
			'Descărcările folosesc dimensiunea originală a pânzei. Imaginile sunt copiate ca PNG.',
		format: 'Formatul fișierului',
		gap: 'Spațiere',
		height: 'Înălțime',
		invalidSettings:
			'Folosește dimensiuni de 128–4096 px, pictograme de 8–256 px și spațiere de 0–256 px. Pictograma cu marginile sale trebuie să încapă pe pânză.',
		loadError: 'Pictogramele nu au putut fi încărcate. Încearcă din nou.',
		loading: 'Se încarcă pictogramele…',
		originalSize: 'Export la dimensiunea originală',
		preview: 'Previzualizare',
		reset: 'Resetează',
		retry: 'Încearcă din nou',
		shuffleIcons: 'Sortează aleatoriu',
		size: 'Dimensiunea pictogramelor',
		width: 'Lățime',
	},
	preview: {
		brand: 'Brand',
		centered: 'Pictograma trebuie centrată la (12, 12).',
		collinear: 'Elimină segmentul coliniar redundant.',
		copyScreenshot: 'Copiază previzualizarea',
		downloadSvg: 'Descarcă SVG',
		exportError: 'Imaginea nu a putut fi exportată. Încearcă din nou.',
		fix: 'Repară',
		invalidFile: 'Încarcă un fișier SVG care conține o cale.',
		invalidPath: 'Introdu o cale SVG validă cu dimensiune nenulă.',
		loadError: 'Pictogramele nu au putut fi încărcate. Încearcă din nou.',
		moreSuggestions: 'Mai multe sugestii',
		negativeZero: 'Înlocuiește zero negativ cu zero.',
		path: 'Cale',
		precision: 'Folosește cel mult trei zecimale.',
		savePreview: 'Salvează previzualizarea',
		show: 'Arată',
		size: 'Cea mai lungă latură a pictogramei trebuie să fie de 24px.',
		uploadSvg: 'Încarcă SVG',
	},
	search: {
		noIconsFound: 'Nu s-au găsit pictograme',
		searchByBrand: 'Caută după brand...',
	},
	settings: {
		actual: 'Culori originale',
		actualTooltip:
			'Afișează culorile originale ale pictogramelor. Unele pot fi greu de distins.',
		contrast: 'Contrast',
		contrastTooltip:
			'Aplică un filtru de contrast pentru o vizibilitate mai bună.',
		language: 'Schimbă limba',
		reset: 'Resetează',
		themeAuto: 'Schemă de culori a sistemului',
		themeDark: 'Schemă de culori închisă',
		themeLight: 'Schemă de culori deschisă',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText:
			'Simple Icons: {} SVG pictograme pentru branduri populare',
		share: 'Distribuie',
		yourMastodonInstance: 'Instanța ta Mastodon',
	},
	thirdParties: {
		extensions: 'Extensii',
		libraries: 'Biblioteci',
	},
};

export default translation;
