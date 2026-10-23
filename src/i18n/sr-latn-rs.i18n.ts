import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description: 'Oglas je možda blokiran ili privremeno nedostupan.',
		label: 'Podržite Simple Icons',
		loading: 'Malo prostora za podršku',
		support: 'Oglasi pomažu da podržimo Simple Icons. Hvala na razumevanju.',
		unavailable: 'Ovde bi se obično prikazao oglas',
	},
	footer: {
		iconMissing: 'Nedostaje ikonica?',
		iconOutdated: 'Zastarela ikonica?',
		line1:
			'{CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} licenciran projekat održavaju {saradnici Simple Icons-a|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Koristi {GitHub|https://github.com/simple-icons/simple-icons} za zahteve, ispravke i doprinose.',
		line3:
			'Ljubazno podržano vašim donacijama na {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Napravljeno ❤️ na GitHub-u',
		reportOutdated: 'Prijavi zastarelu ikonicu',
		submitRequest: 'Pošalji pull request',
	},
	header: {
		iconPreviewer: 'Generator pregleda',
		magnetGenerator: '3D magneti',
		openGraphGenerator: 'OpenGraph generator',
	},
	languageName: 'Srpski (latinica)',
	modal: {
		aliases: 'Drugi nazivi',
		color: 'Boja',
		copied: '{} je kopirano u privremenu memoriju',
		copy: 'Kopiraj {}',
		download: 'Preuzmi',
		guidelines: 'Smernice brenda',
		license: 'Licenca',
		source: 'Izvor',
		sourceAndGuidelines: 'Izvor i smernice',
		svgColored: 'obojen SVG',
		svgPath: 'Samo putanja',
		svgPlain: 'Jednobojni SVG',
		title: 'Brend',
	},
	openGraph: {
		apply: 'Primeni izmene',
		canvas: 'Podešavanja platna',
		clipboardUnavailable:
			'Ovaj pregledač ne podržava kopiranje slika. Preuzmite sliku.',
		copied: 'Slika je kopirana u privremenu memoriju',
		copy: 'Kopiraj sliku',
		copyError:
			'Kopiranje slike nije uspelo. Proverite dozvole za privremenu memoriju ili preuzmite sliku.',
		description: 'Napravite sliku za deljenje uz Simple Icons.',
		download: 'Preuzmi {}',
		downloaded: 'Slika je preuzeta',
		export: 'Izvezi sliku',
		exportError: 'Izvoz slike nije uspeo. Pokušajte ponovo.',
		exportHint:
			'Preuzimanja koriste izvornu veličinu platna. Slike se kopiraju u PNG formatu.',
		format: 'Format datoteke',
		gap: 'Razmak',
		height: 'Visina',
		invalidSettings:
			'Koristite dimenzije 128–4096 px, ikonice 8–256 px i razmake 0–256 px. Ikonica sa marginama mora da stane na platno.',
		loadError: 'Učitavanje ikonica nije uspelo. Pokušajte ponovo.',
		loading: 'Učitavanje ikonica…',
		originalSize: 'Izvoz u izvornoj veličini',
		preview: 'Pregled',
		reset: 'Vrati na početno',
		retry: 'Pokušaj ponovo',
		shuffleIcons: 'Sortiraj nasumično',
		size: 'Veličina ikonica',
		width: 'Širina',
	},
	preview: {
		brand: 'Brend',
		centered: 'Ikonica mora biti centrirana na (12, 12).',
		collinear: 'Uklonite suvišni kolinearni segment.',
		copyScreenshot: 'Kopiraj pregled',
		downloadSvg: 'Preuzmi SVG',
		exportError: 'Izvoz slike nije uspeo. Pokušajte ponovo.',
		fix: 'Popravi',
		invalidFile: 'Otpremite SVG datoteku koja sadrži putanju.',
		invalidPath: 'Unesite ispravnu SVG putanju čija veličina nije nula.',
		loadError: 'Učitavanje ikonica nije uspelo. Pokušajte ponovo.',
		moreSuggestions: 'Još predloga',
		negativeZero: 'Zamenite negativnu nulu nulom.',
		path: 'Putanja',
		precision: 'Koristite najviše tri decimalna mesta.',
		savePreview: 'Sačuvaj pregled',
		show: 'Prikaži',
		size: 'Najduža stranica ikonice mora biti 24px.',
		uploadSvg: 'Otpremi SVG',
	},
	search: {
		noIconsFound: 'Ikonice nisu pronađene',
		searchByBrand: 'Pretraži po brendu...',
	},
	settings: {
		actual: 'Izvorne boje',
		actualTooltip:
			'Prikazuje izvorne boje ikonica. Neke mogu biti slabo vidljive.',
		contrast: 'Kontrast',
		contrastTooltip:
			'Primenjuje filter kontrasta radi bolje vidljivosti ikonica.',
		language: 'Promeni jezik',
		reset: 'Vrati na početno',
		themeAuto: 'Sistemska tema',
		themeDark: 'Tamna tema',
		themeLight: 'Svetla tema',
		zoom: 'Uvećanje',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG ikonica za popularne brendove',
		share: 'Podeli',
		yourMastodonInstance: 'Vaša Mastodon instanca',
	},
	thirdParties: {
		extensions: 'Proširenja',
		libraries: 'Biblioteke',
	},
};

export default translation;
