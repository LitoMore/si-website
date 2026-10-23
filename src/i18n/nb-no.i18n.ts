import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Annonsen kan være blokkert eller midlertidig utilgjengelig.',
		label: 'Støtt Simple Icons',
		loading: 'Litt plass til støtte',
		support: 'Annonser bidrar til å støtte Simple Icons. Takk for forståelsen.',
		unavailable: 'Her ville det vanligvis vært en annonse',
	},
	footer: {
		iconMissing: 'Mangler ikon?',
		iconOutdated: 'Ikon utdatert?',
		line1:
			'Et {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}-prosjekt vedlikeholdt av {Simple Icons-bidragsytere|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Bruk {GitHub|https://github.com/simple-icons/simple-icons} for forespørsler, rettelser og bidrag.',
		line3:
			'Vennlig støttet av dine donasjoner på {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Laget med ❤️ på GitHub',
		reportOutdated: 'Rapporter utdatert ikon',
		submitRequest: 'Send inn en forespørsel',
	},
	header: {
		iconPreviewer: 'Forhåndsvisningsgenerator',
		magnetGenerator: '3D-magneter',
		openGraphGenerator: 'OpenGraph-generator',
	},
	languageName: 'Norsk bokmål',
	modal: {
		aliases: 'Alternative navn',
		color: 'Farge',
		copied: '{} kopiert til utklippstavlen',
		copy: 'Kopier {}',
		download: 'Last ned',
		guidelines: 'Merkeretningslinjer',
		license: 'Lisens',
		source: 'Kilde',
		sourceAndGuidelines: 'Kilde og retningslinjer',
		svgColored: 'farget SVG',
		svgPath: 'Bare bane',
		svgPlain: 'Ensfarget SVG',
		title: 'Merke',
	},
	openGraph: {
		apply: 'Bruk endringer',
		canvas: 'Innstillinger for lerret',
		clipboardUnavailable:
			'Denne nettleseren støtter ikke kopiering av bilder. Last ned bildet.',
		copied: 'Bildet er kopiert til utklippstavlen',
		copy: 'Kopier bilde',
		copyError:
			'Kunne ikke kopiere bildet. Sjekk tillatelsene for utklippstavlen eller last det ned.',
		description: 'Lag et bilde for deling med Simple Icons.',
		download: 'Last ned {}',
		downloaded: 'Bildet er lastet ned',
		export: 'Eksporter bilde',
		exportError: 'Kunne ikke eksportere bildet. Prøv igjen.',
		exportHint:
			'Nedlastinger bruker lerretets opprinnelige størrelse. Bilder kopieres som PNG.',
		format: 'Filformat',
		gap: 'Avstand',
		height: 'Høyde',
		invalidSettings:
			'Bruk mål på 128–4096 px, ikoner på 8–256 px og avstand på 0–256 px. Ikonet med marger må få plass på lerretet.',
		loadError: 'Kunne ikke laste ikonene. Prøv igjen.',
		loading: 'Laster ikoner…',
		originalSize: 'Eksporteres i opprinnelig størrelse',
		preview: 'Forhåndsvisning',
		reset: 'Tilbakestill',
		retry: 'Prøv igjen',
		shuffleIcons: 'Sorter tilfeldig',
		size: 'Ikonstørrelse',
		width: 'Bredde',
	},
	preview: {
		brand: 'Merke',
		centered: 'Ikonet må være sentrert ved (12, 12).',
		collinear: 'Fjern det overflødige kollineære linjesegmentet.',
		copyScreenshot: 'Kopier forhåndsvisning',
		downloadSvg: 'Last ned SVG',
		exportError: 'Kunne ikke eksportere bildet. Prøv igjen.',
		fix: 'Fiks',
		invalidFile: 'Last opp en SVG-fil som inneholder en bane.',
		invalidPath: 'Skriv inn en gyldig SVG-bane med størrelse større enn null.',
		loadError: 'Kunne ikke laste ikonene. Prøv igjen.',
		moreSuggestions: 'Flere forslag',
		negativeZero: 'Erstatt negativ null med null.',
		path: 'Sti',
		precision: 'Bruk maksimalt tre desimaler.',
		savePreview: 'Lagre forhåndsvisning',
		show: 'Vis',
		size: 'Den lengste siden av ikonet må være 24px.',
		uploadSvg: 'Last opp SVG',
	},
	search: {
		noIconsFound: 'Ingen ikoner funnet',
		searchByBrand: 'Søk etter merke...',
	},
	settings: {
		actual: 'Opprinnelige farger',
		actualTooltip:
			'Viser ikonenes opprinnelige farger. Noen kan være vanskelige å se.',
		contrast: 'Kontrast',
		contrastTooltip: 'Bruker et kontrastfilter for å gjøre ikonene tydeligere.',
		language: 'Bytt språk',
		reset: 'Tilbakestill',
		themeAuto: 'Systemets fargetema',
		themeDark: 'Mørkt fargetema',
		themeLight: 'Lyst fargetema',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG ikoner for populære merker',
		share: 'Del dette',
		yourMastodonInstance: 'Din Mastodon-instans',
	},
	thirdParties: {
		extensions: 'Utvidelser',
		libraries: 'Biblioteker',
	},
};

export default translation;
