import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'De advertentie wordt mogelijk geblokkeerd of is tijdelijk niet beschikbaar.',
		label: 'Steun Simple Icons',
		loading: 'Een klein plekje voor steun',
		support:
			'Advertenties helpen Simple Icons te ondersteunen. Bedankt voor je begrip.',
		unavailable: 'Hier zou normaal een advertentie staan',
	},
	footer: {
		iconMissing: 'Icoon ontbreekt?',
		iconOutdated: 'Icoon verouderd?',
		line1:
			'Een {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} project onderhouden door {Simple Icons bijdragers|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Gebruik {GitHub|https://github.com/simple-icons/simple-icons} voor verzoeken, correcties en bijdragen.',
		line3:
			'Met dank aan uw donaties op {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Gemaakt met ❤️ op GitHub',
		reportOutdated: 'Verouderd icoon melden',
		submitRequest: 'Verzoek indienen',
	},
	header: {
		iconPreviewer: 'Voorbeeldgenerator',
		openGraphGenerator: 'OpenGraph-generator',
	},
	languageName: 'Nederlands',
	modal: {
		aliases: 'Alternatieve namen',
		color: 'Kleur',
		copied: '{} naar het klembord gekopieerd',
		copy: '{} kopiëren',
		download: 'Downloaden',
		guidelines: 'Merkrichtlijnen',
		license: 'Licentie',
		source: 'Bron',
		sourceAndGuidelines: 'Bron en richtlijnen',
		svgColored: 'gekleurd SVG',
		svgPath: 'Alleen pad',
		svgPlain: 'Eenkleurige SVG',
		title: 'Merk',
	},
	openGraph: {
		apply: 'Wijzigingen toepassen',
		canvas: 'Canvasinstellingen',
		clipboardUnavailable:
			'Deze browser ondersteunt het kopiëren van afbeeldingen niet. Download de afbeelding.',
		copied: 'Afbeelding naar het klembord gekopieerd',
		copy: 'Afbeelding kopiëren',
		copyError:
			'De afbeelding kon niet worden gekopieerd. Controleer de klembordrechten of download de afbeelding.',
		description: 'Maak een afbeelding om te delen met Simple Icons.',
		download: '{} downloaden',
		downloaded: 'Afbeelding gedownload',
		export: 'Afbeelding exporteren',
		exportError:
			'De afbeelding kon niet worden geëxporteerd. Probeer het opnieuw.',
		exportHint:
			'Downloads gebruiken de oorspronkelijke canvasgrootte. Afbeeldingen worden als PNG gekopieerd.',
		format: 'Bestandsindeling',
		gap: 'Afstand',
		height: 'Hoogte',
		invalidSettings:
			'Gebruik afmetingen van 128–4096 px, pictogrammen van 8–256 px en afstanden van 0–256 px. Een pictogram met marges moet op het canvas passen.',
		loadError:
			'De pictogrammen konden niet worden geladen. Probeer het opnieuw.',
		loading: 'Pictogrammen laden…',
		originalSize: 'Exporteren op oorspronkelijke grootte',
		preview: 'Voorbeeld',
		reset: 'Herstellen',
		retry: 'Opnieuw proberen',
		shuffleIcons: 'Willekeurig sorteren',
		size: 'Pictogramgrootte',
		width: 'Breedte',
	},
	preview: {
		brand: 'Merk',
		centered: 'Het pictogram moet gecentreerd zijn op (12, 12).',
		collinear: 'Verwijder het overbodige collineaire lijnsegment.',
		copyScreenshot: 'Voorbeeld kopiëren',
		downloadSvg: 'SVG downloaden',
		exportError:
			'De afbeelding kon niet worden geëxporteerd. Probeer het opnieuw.',
		fix: 'Repareren',
		invalidFile: 'Upload een SVG-bestand dat een pad bevat.',
		invalidPath: 'Voer een geldig SVG-pad in met een grootte groter dan nul.',
		loadError:
			'De pictogrammen konden niet worden geladen. Probeer het opnieuw.',
		moreSuggestions: 'Meer suggesties',
		negativeZero: 'Vervang negatieve nul door nul.',
		path: 'Pad',
		precision: 'Gebruik maximaal drie decimalen.',
		savePreview: 'Voorbeeld opslaan',
		show: 'Tonen',
		size: 'De langste zijde van het pictogram moet 24px zijn.',
		uploadSvg: 'SVG uploaden',
	},
	search: {
		noIconsFound: 'Geen pictogrammen gevonden',
		searchByBrand: 'Zoeken op merk...',
	},
	settings: {
		actual: 'Oorspronkelijke kleuren',
		actualTooltip:
			'Toont de oorspronkelijke kleuren van pictogrammen. Sommige zijn mogelijk moeilijk zichtbaar.',
		contrast: 'Contrast',
		contrastTooltip:
			'Past een contrastfilter toe om pictogrammen beter zichtbaar te maken.',
		language: 'Taal wijzigen',
		reset: 'Herstellen',
		themeAuto: 'Systeem kleurenschema',
		themeDark: 'Donker kleurenschema',
		themeLight: 'Licht kleurenschema',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG iconen voor populaire merken',
		share: 'Deel dit',
		yourMastodonInstance: 'Je Mastodon-instantie',
	},
	thirdParties: {
		extensions: 'Extensies',
		libraries: 'Bibliotheken',
	},
};

export default translation;
