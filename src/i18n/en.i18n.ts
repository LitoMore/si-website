import { Internationalization } from "#types";

const translation: Internationalization = {
	languageName: "English",
	modal: {
		aliases: "Aliases",
		color: "Color",
		copied: `Copied {} to clipboard`,
		copy: "Copy",
		download: "Download",
		guidelines: "Guidelines",
		license: "License",
		source: "Size",
		sourceAndGuidelines: "Source & Guidelines",
		svgColored: "Colored SVG",
		svgPlain: "Plain SVG",
		title: "Title",
	},
	search: {
		noIconsFound: "No icons found",
		searchByBrand: "Search by brand...",
	},
	settings: {
		actual: "Actual",
		actualTooltip:
			"This displays the actual of the icon, but some icons might not have good visual.",
		contrast: "Contrast",
		contrastTooltip:
			"This applies a contrast filter to icons for better visual.",
		reset: "Reset",
		themeAuto: "Auto",
		themeDark: "Dark",
		themeLight: "Light",
		zoom: "Zoom",
	},
	footer: {
		iconMissing: "Icon missing?",
		iconOutdated: "Icon outdated?",
		submitRequest: "Submit a request",
		reportOutdated: "Report outdated icon",
		line1:
			"A {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} project maintained by the {Simple Icons contributors|https://github.com/simple-icons/simple-icons/graphs/contributors}.",
		line2:
			"Use {GitHub|https://github.com/simple-icons/simple-icons} for requests, corrections and contributions.",
		line3:
			"Kindly supported by your donations at {Open Collective|https://opencollective.com/simple-icons}.",
	},
};

export default translation;
