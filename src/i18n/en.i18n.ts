import {type Internationalization} from '#types';

const translation: Internationalization = {
	languageName: 'English',
	modal: {
		aliases: 'Aliases',
		color: 'Color',
		copied: `Copied {} to clipboard`,
		copy: 'Copy',
		download: 'Download',
		guidelines: 'Guidelines',
		license: 'License',
		source: 'Source',
		sourceAndGuidelines: 'Source & Guidelines',
		svgColored: 'Colored SVG',
		svgPlain: 'Plain SVG',
		svgPath: 'Path Only',
		title: 'Title',
	},
	search: {
		noIconsFound: 'No icons found',
		searchByBrand: 'Search by brand...',
	},
	settings: {
		actual: 'Actual',
		actualTooltip:
			'This displays the actual of the icon, but some icons might not have good visual.',
		contrast: 'Contrast',
		contrastTooltip:
			'This applies a contrast filter to icons for better visual.',
		reset: 'Reset',
		themeAuto: 'Auto',
		themeDark: 'Dark',
		themeLight: 'Light',
		zoom: 'Zoom',
	},
	thirdParties: {
		extensions: 'Extensions',
		libraries: 'Libraries',
	},
	footer: {
		iconMissing: 'Icon missing?',
		iconOutdated: 'Icon outdated?',
		submitRequest: 'Submit a request',
		reportOutdated: 'Report outdated icon',
		madeWithLove: 'Made with ❤️ on GitHub',
		line1:
			'A {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} project maintained by the {Simple Icons contributors|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Use {GitHub|https://github.com/simple-icons/simple-icons} for requests, corrections and contributions.',
		line3:
			'Kindly supported by your donations at {Open Collective|https://opencollective.com/simple-icons}.',
	},
	preview: {
		uploadSvg: 'Upload SVG',
		downloadSvg: 'Download SVG',
		savePreview: 'Save Preview',
		copyScreenshot: 'Copy Screenshot',
	},
	openGraph: {
		width: 'W',
		height: 'H',
		size: 'Size',
		gap: 'Gap',
		shuffleIcons: 'Shuffle Icons',
		apply: 'Apply',
		reset: 'Reset',
	},
	share: {
		share: 'Share',
		actionIntentText:
			'Simple Icons: More than {} SVG icons for popular brands.',
		yourMastodonInstance: 'Your Mastodon instance',
	},
};

export default translation;
