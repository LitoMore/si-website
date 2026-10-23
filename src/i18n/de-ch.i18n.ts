import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Die Anzeige wird möglicherweise blockiert oder ist vorübergehend nicht verfügbar.',
		label: 'Simple Icons unterstützen',
		loading: 'Ein kleiner Platz zur Unterstützung',
		support:
			'Werbung hilft, Simple Icons zu unterstützen. Danke für dein Verständnis.',
		unavailable: 'Hier würde normalerweise eine Anzeige stehen',
	},
	footer: {
		iconMissing: 'Icon fehlt?',
		iconOutdated: 'Icon nicht mehr aktuell?',
		line1:
			'Ein {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}-Projekt verwaltet von {Simple Icons Mitwirkenden|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Verwende {GitHub|https://github.com/simple-icons/simple-icons} für Anfragen, korrekturen und Beiträge.',
		line3:
			'Freundlich unterstützt durch Spenden von dir auf {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Mit ❤️ auf GitHub produziert',
		reportOutdated: 'Melde es',
		submitRequest: 'Reich eine Anfrage ein',
	},
	header: {
		iconPreviewer: 'Vorschau-Generator',
		magnetGenerator: '3D-Magnete',
		openGraphGenerator: 'OpenGraph-Generator',
	},
	languageName: 'Deutsch (Schweiz)',
	modal: {
		aliases: 'Alternative Namen',
		color: 'Farbe',
		copied: '{} in die Zwischenablage kopiert',
		copy: '{} kopieren',
		download: 'Herunterladen',
		guidelines: 'Markenrichtlinien',
		license: 'Lizenz',
		source: 'Quelle',
		sourceAndGuidelines: 'Quelle und Richtlinien',
		svgColored: 'Farbiges SVG',
		svgPath: 'Nur Pfad',
		svgPlain: 'Einfarbiges SVG',
		title: 'Marke',
	},
	openGraph: {
		apply: 'Änderungen anwenden',
		canvas: 'Leinwandeinstellungen',
		clipboardUnavailable:
			'Dieser Browser unterstützt das Kopieren von Bildern nicht. Lade das Bild herunter.',
		copied: 'Bild in die Zwischenablage kopiert',
		copy: 'Bild kopieren',
		copyError:
			'Das Bild konnte nicht kopiert werden. Prüfe die Zwischenablageberechtigungen oder lade es herunter.',
		description: 'Erstelle ein Bild zum Teilen mit Simple Icons.',
		download: '{} herunterladen',
		downloaded: 'Bild heruntergeladen',
		export: 'Bild exportieren',
		exportError:
			'Das Bild konnte nicht exportiert werden. Bitte versuche es erneut.',
		exportHint:
			'Downloads verwenden die Originalgrösse der Leinwand. Bilder werden als PNG kopiert.',
		format: 'Dateiformat',
		gap: 'Abstand',
		height: 'Höhe',
		invalidSettings:
			'Verwende 128–4096 px für die Abmessungen, 8–256 px für Icons und 0–256 px für Abstände. Ein Icon samt Rändern muss auf die Leinwand passen.',
		loadError: 'Icons konnten nicht geladen werden. Bitte versuche es erneut.',
		loading: 'Icons werden geladen…',
		originalSize: 'Export in Originalgrösse',
		preview: 'Vorschau',
		reset: 'Zurücksetzen',
		retry: 'Erneut versuchen',
		shuffleIcons: 'Zufällig sortieren',
		size: 'Icon-Grösse',
		width: 'Breite',
	},
	preview: {
		brand: 'Marke',
		centered: 'Das Icon muss auf (12, 12) zentriert sein.',
		collinear: 'Entferne das überflüssige kollineare Liniensegment.',
		copyScreenshot: 'Kopieren',
		downloadSvg: 'SVG herunterladen',
		exportError:
			'Das Bild konnte nicht exportiert werden. Bitte versuche es erneut.',
		fix: 'Korrigieren',
		invalidFile: 'Lade eine SVG-Datei mit einem Pfad hoch.',
		invalidPath:
			'Gib einen gültigen SVG-Pfad mit einer Grösse ungleich null ein.',
		loadError: 'Icons konnten nicht geladen werden. Bitte versuche es erneut.',
		moreSuggestions: 'Weitere Vorschläge',
		negativeZero: 'Ersetze negative Null durch Null.',
		path: 'Pfad',
		precision: 'Verwende höchstens drei Nachkommastellen.',
		savePreview: 'Speichern',
		show: 'Zeigen',
		size: 'Die längste Seite des Icons muss 24px betragen.',
		uploadSvg: 'SVG hochladen',
	},
	search: {
		noIconsFound: 'Keine Icons gefunden',
		searchByBrand: 'Nach Marke suchen...',
	},
	settings: {
		actual: 'Originalfarben',
		actualTooltip:
			'Zeigt die Originalfarben der Icons an. Einige sind möglicherweise schwer erkennbar.',
		contrast: 'Kontrast',
		contrastTooltip:
			'Wendet einen Kontrastfilter an, um Icons besser sichtbar zu machen.',
		language: 'Sprache ändern',
		reset: 'Zurücksetzen',
		themeAuto: 'System Farbschema',
		themeDark: 'Dunkles Farbschema',
		themeLight: 'Helles Farbschema',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG icons für populäre Marken',
		share: 'Teilen',
		yourMastodonInstance: 'Deine Mastodon-Instanz',
	},
	thirdParties: {
		extensions: 'Erweiterungen',
		libraries: 'Bibliotheken',
	},
};

export default translation;
