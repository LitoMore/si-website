import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Potrebbe essere bloccato da un blocco pubblicità o temporaneamente non disponibile.',
		label: 'Sostieni Simple Icons',
		loading: 'Un piccolo spazio per il sostegno',
		support:
			'Gli annunci aiutano a sostenere Simple Icons. Grazie per la comprensione.',
		unavailable: 'Qui normalmente apparirebbe un annuncio',
	},
	footer: {
		iconMissing: "Manca un'icona?",
		iconOutdated: 'Icona obsoleta?',
		line1:
			'Un progetto {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} mantenuto da {contributori di Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Usa {GitHub|https://github.com/simple-icons/simple-icons} per richieste, correzioni e contributi.',
		line3:
			'Grazie alle vostre donazioni su {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Fatto con ❤️ su GitHub',
		reportOutdated: "Segnala un'icona obsoleta",
		submitRequest: 'Invia una richiesta',
	},
	header: {
		iconPreviewer: 'Generatore di anteprime',
		magnetGenerator: 'Magneti 3D',
		openGraphGenerator: 'Generatore OpenGraph',
	},
	languageName: 'Italiano',
	modal: {
		aliases: 'Nomi alternativi',
		color: 'Colore',
		copied: '{} copiato negli appunti',
		copy: 'Copia {}',
		download: 'Scarica',
		guidelines: 'Linee guida',
		license: 'Licenza',
		source: 'Fonte',
		sourceAndGuidelines: 'Fonte e linee guida',
		svgColored: 'Scarica SVG colorato',
		svgPath: 'Solo tracciato',
		svgPlain: 'SVG monocromatico',
		title: 'Marca',
	},
	openGraph: {
		apply: 'Applica modifiche',
		canvas: 'Impostazioni dell’area di disegno',
		clipboardUnavailable:
			'Questo browser non consente di copiare immagini. Scarica l’immagine.',
		copied: 'Immagine copiata negli appunti',
		copy: 'Copia immagine',
		copyError:
			'Impossibile copiare l’immagine. Controlla i permessi degli appunti o scaricala.',
		description: 'Crea un’immagine da condividere con Simple Icons.',
		download: 'Scarica {}',
		downloaded: 'Immagine scaricata',
		export: 'Esporta immagine',
		exportError: 'Impossibile esportare l’immagine. Riprova.',
		exportHint:
			'I download usano le dimensioni originali dell’area di disegno. Le immagini vengono copiate come PNG.',
		format: 'Formato del file',
		gap: 'Spaziatura',
		height: 'Altezza',
		invalidSettings:
			'Usa dimensioni di 128–4096 px, icone di 8–256 px e spaziature di 0–256 px. L’icona con i suoi margini deve rientrare nell’area di disegno.',
		loadError: 'Impossibile caricare le icone. Riprova.',
		loading: 'Caricamento delle icone…',
		originalSize: 'Esportazione alle dimensioni originali',
		preview: 'Anteprima',
		reset: 'Ripristina',
		retry: 'Riprova',
		shuffleIcons: 'Ordina casualmente',
		size: 'Dimensione delle icone',
		width: 'Larghezza',
	},
	preview: {
		brand: 'Marca',
		centered: 'L’icona deve essere centrata in (12, 12).',
		collinear: 'Rimuovi il segmento collineare ridondante.',
		copyScreenshot: 'Copia anteprima',
		downloadSvg: 'Scarica SVG',
		exportError: 'Impossibile esportare l’immagine. Riprova.',
		fix: 'Correggi',
		invalidFile: 'Carica un file SVG contenente un tracciato.',
		invalidPath:
			'Inserisci un tracciato SVG valido con dimensioni diverse da zero.',
		loadError: 'Impossibile caricare le icone. Riprova.',
		moreSuggestions: 'Altri suggerimenti',
		negativeZero: 'Sostituisci lo zero negativo con zero.',
		path: 'Tracciato',
		precision: 'Usa al massimo tre cifre decimali.',
		savePreview: 'Salva anteprima',
		show: 'Mostra',
		size: 'Il lato più lungo dell’icona deve misurare 24px.',
		uploadSvg: 'Carica SVG',
	},
	search: {
		noIconsFound: 'Nessuna icona trovata',
		searchByBrand: 'Ricerca per marchio...',
	},
	settings: {
		actual: 'Colori originali',
		actualTooltip:
			'Mostra i colori originali delle icone. Alcuni potrebbero essere poco visibili.',
		contrast: 'Contrasto',
		contrastTooltip:
			'Applica un filtro di contrasto per migliorare la visibilità delle icone.',
		language: 'Cambia lingua',
		reset: 'Ripristina',
		themeAuto: 'Combinazione di colori del sistema',
		themeDark: 'Tema scuro',
		themeLight: 'Tema leggero',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} icone SVG per i marchi più popolari',
		share: 'Condividi questo',
		yourMastodonInstance: 'La tua istanza Mastodon',
	},
	thirdParties: {
		extensions: 'Estensioni',
		libraries: 'Librerie',
	},
};

export default translation;
