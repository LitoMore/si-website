import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Η διαφήμιση ίσως αποκλείεται ή δεν είναι προσωρινά διαθέσιμη.',
		label: 'Υποστηρίξτε το Simple Icons',
		loading: 'Λίγος χώρος για υποστήριξη',
		support:
			'Οι διαφημίσεις βοηθούν το Simple Icons. Ευχαριστούμε για την κατανόηση.',
		unavailable: 'Εδώ συνήθως εμφανίζεται μια διαφήμιση',
	},
	footer: {
		iconMissing: 'Λείπει εικονίδιο;',
		iconOutdated: 'Εικονίδιο ξεπερασμένο;',
		line1:
			'Ένα έργο {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} που συντηρείται από {συνεισφέροντες Simple Icons|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Χρησιμοποιήστε το {GitHub|https://github.com/simple-icons/simple-icons} για αιτήματα, διορθώσεις και συνεισφορές.',
		line3:
			'Υποστηρίζεται ευγενικά από τις δωρεές σας στο {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Φτιαγμένο με ❤️ στο GitHub',
		reportOutdated: 'Αναφορά ξεπερασμένου εικονιδίου',
		submitRequest: 'Υποβολή αιτήματος',
	},
	header: {
		iconPreviewer: 'Γεννήτρια προεπισκόπησης',
		openGraphGenerator: 'Δημιουργία εικόνων OpenGraph',
	},
	languageName: 'Ελληνικά',
	modal: {
		aliases: 'Εναλλακτικά ονόματα',
		color: 'Χρώμα',
		copied: 'Το {} αντιγράφηκε στο πρόχειρο',
		copy: 'Αντιγραφή {}',
		download: 'Λήψη',
		guidelines: 'Οδηγίες μάρκας',
		license: 'Άδεια',
		source: 'Πηγή',
		sourceAndGuidelines: 'Πηγή και οδηγίες',
		svgColored: 'έγχρωμο SVG',
		svgPath: 'Μόνο διαδρομή',
		svgPlain: 'Μονόχρωμο SVG',
		title: 'Μάρκα',
	},
	openGraph: {
		apply: 'Εφαρμογή αλλαγών',
		canvas: 'Ρυθμίσεις καμβά',
		clipboardUnavailable:
			'Η αντιγραφή εικόνων δεν υποστηρίζεται σε αυτό το πρόγραμμα περιήγησης. Κατεβάστε την εικόνα.',
		copied: 'Η εικόνα αντιγράφηκε στο πρόχειρο',
		copy: 'Αντιγραφή εικόνας',
		copyError:
			'Δεν ήταν δυνατή η αντιγραφή. Ελέγξτε τα δικαιώματα του προχείρου ή κατεβάστε την εικόνα.',
		description: 'Δημιουργήστε μια εικόνα για κοινοποίηση με το Simple Icons.',
		download: 'Λήψη {}',
		downloaded: 'Η εικόνα λήφθηκε',
		export: 'Εξαγωγή εικόνας',
		exportError: 'Δεν ήταν δυνατή η εξαγωγή της εικόνας. Δοκιμάστε ξανά.',
		exportHint:
			'Οι λήψεις χρησιμοποιούν το αρχικό μέγεθος καμβά. Οι εικόνες αντιγράφονται ως PNG.',
		format: 'Μορφή αρχείου',
		gap: 'Απόσταση',
		height: 'Ύψος',
		invalidSettings:
			'Χρησιμοποιήστε διαστάσεις 128–4096 px, εικονίδια 8–256 px και αποστάσεις 0–256 px. Το εικονίδιο με τα περιθώριά του πρέπει να χωρά στον καμβά.',
		loadError: 'Δεν ήταν δυνατή η φόρτωση εικονιδίων. Δοκιμάστε ξανά.',
		loading: 'Φόρτωση εικονιδίων…',
		originalSize: 'Εξαγωγή στο αρχικό μέγεθος',
		preview: 'Προεπισκόπηση',
		reset: 'Επαναφορά',
		retry: 'Δοκιμή ξανά',
		shuffleIcons: 'Ταξινόμηση τυχαία',
		size: 'Μέγεθος εικονιδίου',
		width: 'Πλάτος',
	},
	preview: {
		brand: 'Μάρκα',
		centered: 'Το εικονίδιο πρέπει να είναι κεντραρισμένο στο (12, 12).',
		collinear: 'Αφαιρέστε το περιττό συγγραμμικό τμήμα.',
		copyScreenshot: 'Αντιγραφή προεπισκόπησης',
		downloadSvg: 'Λήψη SVG',
		exportError: 'Δεν ήταν δυνατή η εξαγωγή της εικόνας. Δοκιμάστε ξανά.',
		fix: 'Διόρθωση',
		invalidFile: 'Ανεβάστε ένα αρχείο SVG που περιέχει διαδρομή.',
		invalidPath: 'Εισαγάγετε έγκυρη διαδρομή SVG με μη μηδενικό μέγεθος.',
		loadError: 'Δεν ήταν δυνατή η φόρτωση εικονιδίων. Δοκιμάστε ξανά.',
		moreSuggestions: 'Περισσότερες προτάσεις',
		negativeZero: 'Αντικαταστήστε το αρνητικό μηδέν με μηδέν.',
		path: 'Διαδρομή',
		precision: 'Χρησιμοποιήστε έως τρία δεκαδικά ψηφία.',
		savePreview: 'Αποθήκευση προεπισκόπησης',
		show: 'Εμφάνιση',
		size: 'Η μεγαλύτερη πλευρά του εικονιδίου πρέπει να είναι 24px.',
		uploadSvg: 'Μεταφόρτωση SVG',
	},
	search: {
		noIconsFound: 'Δεν βρέθηκαν εικονίδια',
		searchByBrand: 'Αναζήτηση κατά μάρκα...',
	},
	settings: {
		actual: 'Αρχικά χρώματα',
		actualTooltip:
			'Εμφανίζει τα αρχικά χρώματα των εικονιδίων. Ορισμένα ίσως δεν διακρίνονται καλά.',
		contrast: 'Αντίθεση',
		contrastTooltip: 'Εφαρμόζει φίλτρο αντίθεσης για καλύτερη ορατότητα.',
		language: 'Αλλαγή γλώσσας',
		reset: 'Επαναφορά',
		themeAuto: 'Σχήμα χρωμάτων συστήματος',
		themeDark: 'Σκουρόχρωμο σχήμα',
		themeLight: 'Ανοιχτόχρωμο σχήμα',
		zoom: 'Μεγέθυνση',
	},
	share: {
		actionIntentText: 'Simple Icons: {} SVG εικονίδια για δημοφιλείς μάρκες',
		share: 'Κοινοποίηση',
		yourMastodonInstance: 'Ο διακομιστής σας στο Mastodon',
	},
	thirdParties: {
		extensions: 'Επεκτάσεις',
		libraries: 'Βιβλιοθήκες',
	},
};

export default translation;
