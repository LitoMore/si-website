import {type Internationalization} from '#types';

const translation: Internationalization = {
	advertisement: {
		description:
			'It may be blocked by an ad blocker or temporarily unavailable.',
		label: 'Support Simple Icons',
		loading: 'A little space for support',
		support: 'Ads help support Simple Icons. Thanks for understanding.',
		unavailable: 'An ad would normally be here',
	},
	footer: {
		iconMissing: 'Icon missing?',
		iconOutdated: 'Icon outdated?',
		line1:
			'A {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} project maintained by the {Simple Icons contributors|https://github.com/simple-icons/simple-icons/graphs/contributors}.',
		line2:
			'Use {GitHub|https://github.com/simple-icons/simple-icons} for requests, corrections and contributions.',
		line3:
			'Kindly supported by your donations at {Open Collective|https://opencollective.com/simple-icons}.',
		madeWithLove: 'Made with ❤️ on GitHub',
		reportOutdated: 'Report outdated icon',
		submitRequest: 'Submit a request',
	},
	header: {
		iconPreviewer: 'Icon Previewer',
		magnetGenerator: '3D Magnets',
		openGraphGenerator: 'OpenGraph Generator',
	},
	languageName: 'English',
	modal: {
		aliases: 'Aliases',
		color: 'Color',
		copied: `Copied {} to clipboard`,
		copy: 'Copy {}',
		download: 'Download',
		guidelines: 'Guidelines',
		license: 'License',
		source: 'Source',
		sourceAndGuidelines: 'Source & Guidelines',
		svgColored: 'Colored SVG',
		svgPath: 'Path Only',
		svgPlain: 'Plain SVG',
		title: 'Title',
	},
	openGraph: {
		apply: 'Apply changes',
		canvas: 'Canvas settings',
		clipboardUnavailable:
			'Image copying is unavailable in this browser. Download the image instead.',
		copied: 'Image copied to clipboard',
		copy: 'Copy image',
		copyError:
			'Could not copy the image. Check clipboard permissions or download it instead.',
		description: 'Create a share image with Simple Icons.',
		download: 'Download {}',
		downloaded: 'Image downloaded',
		export: 'Export image',
		exportError: 'Could not export the image. Please try again.',
		exportHint:
			'Downloads use the original canvas size. Images are copied as PNG.',
		format: 'File format',
		gap: 'Gap',
		height: 'Height',
		invalidSettings:
			'Use 128–4096 px dimensions, 8–256 px icons and 0–256 px gaps. An icon with its margins must fit inside the canvas.',
		loadError: 'Could not load icons. Please try again.',
		loading: 'Loading icons…',
		originalSize: 'Exported at original size',
		preview: 'Preview',
		reset: 'Reset',
		retry: 'Retry',
		shuffleIcons: 'Shuffle icons',
		size: 'Icon size',
		width: 'Width',
	},
	preview: {
		brand: 'Brand',
		centered: 'The icon must be centered at (12, 12).',
		collinear: 'Remove the redundant collinear line segment.',
		copyScreenshot: 'Copy Preview',
		downloadSvg: 'Download SVG',
		exportError: 'Could not export the preview. Please try again.',
		fix: 'Fix',
		invalidFile: 'Please upload an SVG file containing a path.',
		invalidPath: 'Enter a valid SVG path with a nonzero size.',
		loadError: 'Could not load the icon. Please try again.',
		moreSuggestions: 'More suggestions',
		negativeZero: 'Replace negative zero with zero.',
		path: 'Path',
		precision: 'Use no more than three decimal places.',
		savePreview: 'Save Preview',
		show: 'Show',
		size: 'The longest side of the icon must be 24px.',
		uploadSvg: 'Upload SVG',
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
		language: 'Change language',
		reset: 'Reset',
		themeAuto: 'Auto',
		themeDark: 'Dark',
		themeLight: 'Light',
		zoom: 'Zoom',
	},
	share: {
		actionIntentText:
			'Simple Icons: More than {} SVG icons for popular brands.',
		share: 'Share',
		yourMastodonInstance: 'Your Mastodon instance',
	},
	thirdParties: {
		extensions: 'Extensions',
		libraries: 'Libraries',
	},
};

export default translation;
