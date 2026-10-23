import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Annonsen kan vara blockerad eller tillfälligt otillgänglig.',
		label: 'Stöd Simple Icons',
		loading: 'Lite utrymme för stöd',
		support:
			'Annonser hjälper till att stödja Simple Icons. Tack för din förståelse.',
		unavailable: 'Här skulle det vanligtvis visas en annons',
	},
	footer: {
		iconMissing: 'Saknas en ikon?',
		iconOutdated: 'Ikon är föråldrad?',
		line1:
			'Ett {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}-projekt som underhålls av {Simple Icons-bidragsgivare|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Använd {GitHub|https://github.com/simple-icons/simple-icons} för förfrågningar, rättelser och bidrag.',
		line3:
			'Vänligt stödd av dina donationer på {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Gjord med ❤️ på GitHub',
		reportOutdated: 'Rapportera föråldrad ikon',
		submitRequest: 'Skicka in en förfrågan',
	},
	header: {
		iconPreviewer: 'Förhandsvisningsgenerator',
		magnetGenerator: '3D-magneter',
		openGraphGenerator: 'OpenGraph-generator',
	},
	languageName: 'Svenska',
	modal: {
		aliases: 'Alternativa namn',
		color: 'Färg',
		copied: '{} kopierat till urklipp',
		copy: 'Kopiera {}',
		download: 'Ladda ner',
		guidelines: 'Varumärkesriktlinjer',
		license: 'Licens',
		source: 'Källa',
		sourceAndGuidelines: 'Källa och riktlinjer',
		svgColored: 'färgad SVG',
		svgPath: 'Endast sökväg',
		svgPlain: 'Enfärgad SVG',
		title: 'Varumärke',
	},
	openGraph: {
		apply: 'Tillämpa ändringar',
		canvas: 'Inställningar för arbetsytan',
		clipboardUnavailable:
			'Den här webbläsaren stöder inte kopiering av bilder. Ladda ner bilden.',
		copied: 'Bilden har kopierats till urklipp',
		copy: 'Kopiera bild',
		copyError:
			'Bilden kunde inte kopieras. Kontrollera behörigheterna för urklipp eller ladda ner bilden.',
		description: 'Skapa en bild att dela med Simple Icons.',
		download: 'Ladda ner {}',
		downloaded: 'Bilden har laddats ner',
		export: 'Exportera bild',
		exportError: 'Bilden kunde inte exporteras. Försök igen.',
		exportHint:
			'Nedladdningar använder arbetsytans ursprungliga storlek. Bilder kopieras som PNG.',
		format: 'Filformat',
		gap: 'Avstånd',
		height: 'Höjd',
		invalidSettings:
			'Använd mått på 128–4096 px, ikoner på 8–256 px och avstånd på 0–256 px. Ikonen med marginaler måste rymmas på arbetsytan.',
		loadError: 'Ikonerna kunde inte läsas in. Försök igen.',
		loading: 'Läser in ikoner…',
		originalSize: 'Exporteras i ursprunglig storlek',
		preview: 'Förhandsvisning',
		reset: 'Återställ',
		retry: 'Försök igen',
		shuffleIcons: 'Sortera slumpmässigt',
		size: 'Ikonstorlek',
		width: 'Bredd',
	},
	preview: {
		brand: 'Varumärke',
		centered: 'Ikonen måste vara centrerad vid (12, 12).',
		collinear: 'Ta bort det överflödiga kollineära linjesegmentet.',
		copyScreenshot: 'Kopiera förhandsvisning',
		downloadSvg: 'Ladda ner SVG',
		exportError: 'Bilden kunde inte exporteras. Försök igen.',
		fix: 'Fixa',
		invalidFile: 'Ladda upp en SVG-fil som innehåller en sökväg.',
		invalidPath: 'Ange en giltig SVG-sökväg med en storlek större än noll.',
		loadError: 'Ikonerna kunde inte läsas in. Försök igen.',
		moreSuggestions: 'Fler förslag',
		negativeZero: 'Ersätt negativ nolla med noll.',
		path: 'Sökväg',
		precision: 'Använd högst tre decimaler.',
		savePreview: 'Spara förhandsvisning',
		show: 'Visa',
		size: 'Ikonens längsta sida måste vara 24px.',
		uploadSvg: 'Ladda upp SVG',
	},
	search: {
		noIconsFound: 'Inga ikoner hittades',
		searchByBrand: 'Sök efter varumärke...',
	},
	settings: {
		actual: 'Ursprungliga färger',
		actualTooltip:
			'Visar ikonernas ursprungliga färger. Vissa kan vara svåra att se.',
		contrast: 'Kontrast',
		contrastTooltip:
			'Tillämpar ett kontrastfilter för att göra ikonerna tydligare.',
		language: 'Byt språk',
		reset: 'Återställ',
		themeAuto: 'Systemets färgschema',
		themeDark: 'Mörkt färgschema',
		themeLight: 'Ljust färgschema',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG ikoner för populära varumärken',
		share: 'Dela detta',
		yourMastodonInstance: 'Din Mastodon-instans',
	},
	thirdParties: {
		extensions: 'Tillägg',
		libraries: 'Bibliotek',
	},
};

export default translation;
