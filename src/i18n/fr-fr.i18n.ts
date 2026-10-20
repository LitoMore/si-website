import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'La publicité peut être bloquée ou temporairement indisponible.',
		label: 'Soutenir Simple Icons',
		loading: 'Un petit espace de soutien',
		support:
			'Les publicités contribuent à soutenir Simple Icons. Merci de votre compréhension.',
		unavailable: 'Une publicité apparaîtrait normalement ici',
	},
	footer: {
		iconMissing: 'Icône manquante?',
		iconOutdated: 'Icône périmée?',
		line1:
			'Un projet {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} maintenu par le {contributeurs de Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Utilisez {GitHub|https://github.com/simple-icons/simple-icons} pour les demandes, les corrections et les contributions.',
		line3:
			'Aimablement soutenu par vos dons à {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Fait avec ❤️ sur GitHub',
		reportOutdated: 'Signaler une icône périmée',
		submitRequest: 'Soumettre une demande',
	},
	header: {
		iconPreviewer: "Générateur d'aperçu",
		openGraphGenerator: 'Générateur OpenGraph',
	},
	languageName: 'Français',
	modal: {
		aliases: 'Noms alternatifs',
		color: 'Couleur',
		copied: '{} copié dans le presse-papiers',
		copy: 'Copier {}',
		download: 'Télécharger',
		guidelines: 'Directives de marque',
		license: 'Licence',
		source: 'Source',
		sourceAndGuidelines: 'Source et recommandations',
		svgColored: 'SVG coloré',
		svgPath: 'Tracé uniquement',
		svgPlain: 'SVG monochrome',
		title: 'Marque',
	},
	openGraph: {
		apply: 'Appliquer les modifications',
		canvas: 'Paramètres du canevas',
		clipboardUnavailable:
			'Ce navigateur ne permet pas de copier des images. Téléchargez l’image.',
		copied: 'Image copiée dans le presse-papiers',
		copy: 'Copier l’image',
		copyError:
			'Impossible de copier l’image. Vérifiez les autorisations du presse-papiers ou téléchargez-la.',
		description: 'Créez une image à partager avec Simple Icons.',
		download: 'Télécharger {}',
		downloaded: 'Image téléchargée',
		export: 'Exporter l’image',
		exportError: 'Impossible d’exporter l’image. Veuillez réessayer.',
		exportHint:
			'Les téléchargements utilisent la taille d’origine du canevas. Les images sont copiées au format PNG.',
		format: 'Format du fichier',
		gap: 'Espacement',
		height: 'Hauteur',
		invalidSettings:
			'Utilisez des dimensions de 128–4096 px, des icônes de 8–256 px et un espacement de 0–256 px. L’icône et ses marges doivent tenir dans le canevas.',
		loadError: 'Impossible de charger les icônes. Veuillez réessayer.',
		loading: 'Chargement des icônes…',
		originalSize: 'Exportation à la taille d’origine',
		preview: 'Aperçu',
		reset: 'Réinitialiser',
		retry: 'Réessayer',
		shuffleIcons: 'Trier au hasard',
		size: 'Taille des icônes',
		width: 'Largeur',
	},
	preview: {
		brand: 'Marque',
		centered: 'L’icône doit être centrée en (12, 12).',
		collinear: 'Supprimez le segment colinéaire redondant.',
		copyScreenshot: "Copier l'aperçu",
		downloadSvg: 'Télécharger SVG',
		exportError: 'Impossible d’exporter l’image. Veuillez réessayer.',
		fix: 'Corriger',
		invalidFile: 'Importez un fichier SVG contenant un tracé.',
		invalidPath: 'Saisissez un tracé SVG valide de taille non nulle.',
		loadError: 'Impossible de charger les icônes. Veuillez réessayer.',
		moreSuggestions: 'Plus de suggestions',
		negativeZero: 'Remplacez le zéro négatif par zéro.',
		path: 'Tracé',
		precision: 'Utilisez au maximum trois décimales.',
		savePreview: "Enregistrer l'aperçu",
		show: 'Afficher',
		size: 'Le côté le plus long de l’icône doit mesurer 24px.',
		uploadSvg: 'Charger SVG',
	},
	search: {
		noIconsFound: 'Aucune icône trouvée',
		searchByBrand: 'Rechercher par marque...',
	},
	settings: {
		actual: 'Couleurs d’origine',
		actualTooltip:
			'Affiche les couleurs d’origine des icônes. Certaines peuvent être difficiles à distinguer.',
		contrast: 'Contraste',
		contrastTooltip:
			'Applique un filtre de contraste pour améliorer la visibilité des icônes.',
		language: 'Changer de langue',
		reset: 'Réinitialiser',
		themeAuto: 'Thème du système',
		themeDark: 'Thème foncé',
		themeLight: 'Thème clair',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText: 'Simple Icons: {} icônes SVG pour les marques populaires',
		share: 'Partagez ça',
		yourMastodonInstance: 'Votre instance Mastodon',
	},
	thirdParties: {
		extensions: 'Extensions',
		libraries: 'Bibliothèques',
	},
};

export default translation;
