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
		iconOutdated: 'Icon veraltet?',
		line1:
			'Ein {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}-Projekt, betreut von {Simple Icons-Mitwirkenden|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Nutze {GitHub|https://github.com/simple-icons/simple-icons} für Anfragen, Korrekturen und Beiträge.',
		line3:
			'Freundlich unterstützt durch deine Spenden bei {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Mit ❤️ auf GitHub erstellt',
		reportOutdated: 'Veraltetes Icon melden',
		submitRequest: 'Anfrage einreichen',
	},
	header: {
		iconPreviewer: 'Vorschau-Generator',
		openGraphGenerator: 'OpenGraph-Generator',
	},
	languageName: 'Deutsch (Deutschland)',
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
		svgColored: 'farbiges SVG',
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
			'Downloads verwenden die Originalgröße der Leinwand. Bilder werden als PNG kopiert.',
		format: 'Dateiformat',
		gap: 'Abstand',
		height: 'Höhe',
		invalidSettings:
			'Verwende 128–4096 px für die Abmessungen, 8–256 px für Icons und 0–256 px für Abstände. Ein Icon samt Rändern muss auf die Leinwand passen.',
		loadError: 'Icons konnten nicht geladen werden. Bitte versuche es erneut.',
		loading: 'Icons werden geladen…',
		originalSize: 'Export in Originalgröße',
		preview: 'Vorschau',
		reset: 'Zurücksetzen',
		retry: 'Erneut versuchen',
		shuffleIcons: 'Zufällig sortieren',
		size: 'Icon-Größe',
		width: 'Breite',
	},
	preview: {
		brand: 'Marke',
		centered: 'Das Icon muss auf (12, 12) zentriert sein.',
		collinear: 'Entferne das überflüssige kollineare Liniensegment.',
		copyScreenshot: 'Vorschau kopieren',
		downloadSvg: 'SVG herunterladen',
		exportError:
			'Das Bild konnte nicht exportiert werden. Bitte versuche es erneut.',
		fix: 'Beheben',
		invalidFile: 'Lade eine SVG-Datei mit einem Pfad hoch.',
		invalidPath:
			'Gib einen gültigen SVG-Pfad mit einer Größe ungleich null ein.',
		loadError: 'Icons konnten nicht geladen werden. Bitte versuche es erneut.',
		moreSuggestions: 'Weitere Vorschläge',
		negativeZero: 'Ersetze negative Null durch Null.',
		path: 'Pfad',
		precision: 'Verwende höchstens drei Nachkommastellen.',
		savePreview: 'Vorschau speichern',
		show: 'Anzeigen',
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
		themeAuto: 'Systemfarbschema',
		themeDark: 'Dunkles Farbschema',
		themeLight: 'Helles Farbschema',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG-Icons für beliebte Marken',
		share: 'Teilen',
		yourMastodonInstance: 'Deine Mastodon-Instanz',
	},
	thirdParties: {
		extensions: 'Erweiterungen',
		libraries: 'Bibliotheken',
	},
};

export default translation;
