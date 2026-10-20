import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Mainosten esto saattaa estää sen tai se ei ole tilapäisesti saatavilla.',
		label: 'Tue Simple Iconsia',
		loading: 'Pieni tila tukemiselle',
		support:
			'Mainokset auttavat tukemaan Simple Iconsia. Kiitos ymmärryksestäsi.',
		unavailable: 'Tässä olisi tavallisesti mainos',
	},
	footer: {
		iconMissing: 'Puuttuuko kuvake?',
		iconOutdated: 'Kuvake vanhentunut?',
		line1:
			'{CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md}-projekti, jota ylläpitää {Simple Icons -tekijät|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Käytä {GitHub|https://github.com/simple-icons/simple-icons} pyyntöihin, korjauksiin ja osallistumiseen.',
		line3:
			'Ystävällisesti tuettu lahjoituksillasi {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Tehty ❤️ GitHubissa',
		reportOutdated: 'Ilmoita vanhentunut kuvake',
		submitRequest: 'Lähetä pyyntö',
	},
	header: {
		iconPreviewer: 'Esikatselugeneraattori',
		openGraphGenerator: 'OpenGraph-generaattori',
	},
	languageName: 'Suomi',
	modal: {
		aliases: 'Vaihtoehtoiset nimet',
		color: 'Väri',
		copied: '{} kopioitu leikepöydälle',
		copy: 'Kopioi {}',
		download: 'Lataa',
		guidelines: 'Brändin ohjeet',
		license: 'Lisenssi',
		source: 'Lähde',
		sourceAndGuidelines: 'Lähde ja ohjeet',
		svgColored: 'värillinen SVG',
		svgPath: 'Vain polku',
		svgPlain: 'Yksivärinen SVG',
		title: 'Brändi',
	},
	openGraph: {
		apply: 'Käytä muutoksia',
		canvas: 'Piirtoalueen asetukset',
		clipboardUnavailable:
			'Kuvien kopiointi ei ole käytettävissä tässä selaimessa. Lataa kuva.',
		copied: 'Kuva kopioitu leikepöydälle',
		copy: 'Kopioi kuva',
		copyError:
			'Kuvan kopiointi epäonnistui. Tarkista leikepöydän käyttöoikeudet tai lataa kuva.',
		description: 'Luo jaettava kuva Simple Iconsilla.',
		download: 'Lataa {}',
		downloaded: 'Kuva ladattu',
		export: 'Vie kuva',
		exportError: 'Kuvan vienti epäonnistui. Yritä uudelleen.',
		exportHint:
			'Lataukset käyttävät piirtoalueen alkuperäistä kokoa. Kuvat kopioidaan PNG-muodossa.',
		format: 'Tiedostomuoto',
		gap: 'Väli',
		height: 'Korkeus',
		invalidSettings:
			'Käytä mittoja 128–4096 px, kuvakekokoja 8–256 px ja välejä 0–256 px. Kuvakkeen on mahduttava piirtoalueelle marginaaleineen.',
		loadError: 'Kuvakkeiden lataaminen epäonnistui. Yritä uudelleen.',
		loading: 'Ladataan kuvakkeita…',
		originalSize: 'Viedään alkuperäisessä koossa',
		preview: 'Esikatselu',
		reset: 'Palauta oletukset',
		retry: 'Yritä uudelleen',
		shuffleIcons: 'Lajittele satunnaisesti',
		size: 'Kuvakkeen koko',
		width: 'Leveys',
	},
	preview: {
		brand: 'Brändi',
		centered: 'Kuvakkeen on oltava keskitetty pisteeseen (12, 12).',
		collinear: 'Poista tarpeeton samalla suoralla oleva jana.',
		copyScreenshot: 'Kopioi esikatselu',
		downloadSvg: 'Lataa SVG',
		exportError: 'Kuvan vienti epäonnistui. Yritä uudelleen.',
		fix: 'Korjaa',
		invalidFile: 'Lataa SVG-tiedosto, joka sisältää polun.',
		invalidPath: 'Anna kelvollinen SVG-polku, jonka koko ei ole nolla.',
		loadError: 'Kuvakkeiden lataaminen epäonnistui. Yritä uudelleen.',
		moreSuggestions: 'Lisää ehdotuksia',
		negativeZero: 'Korvaa negatiivinen nolla nollalla.',
		path: 'Polku',
		precision: 'Käytä enintään kolmea desimaalia.',
		savePreview: 'Tallenna esikatselu',
		show: 'Näytä',
		size: 'Kuvakkeen pisimmän sivun on oltava 24px.',
		uploadSvg: 'Lataa SVG',
	},
	search: {
		noIconsFound: 'Kuvakkeita ei löytynyt',
		searchByBrand: 'Hae brändin mukaan...',
	},
	settings: {
		actual: 'Alkuperäiset värit',
		actualTooltip:
			'Näyttää kuvakkeiden alkuperäiset värit. Joitakin voi olla vaikea erottaa.',
		contrast: 'Kontrasti',
		contrastTooltip: 'Parantaa kuvakkeiden näkyvyyttä kontrastisuodattimella.',
		language: 'Vaihda kieli',
		reset: 'Palauta oletukset',
		themeAuto: 'Järjestelmän väriteema',
		themeDark: 'Tumma väriteema',
		themeLight: 'Vaalea väriteema',
		zoom: 'Zoomaus',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG kuvaketta suosituille brändeille',
		share: 'Jaa tämä',
		yourMastodonInstance: 'Mastodon-palvelimesi',
	},
	thirdParties: {
		extensions: 'Laajennukset',
		libraries: 'Kirjastot',
	},
};

export default translation;
