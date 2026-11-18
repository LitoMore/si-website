import colorString from 'color-string';
import {memoize} from 'es-toolkit';
import getRelativeLuminance from '#vendor/get-relative-luminance.js';
import {type SurfaceTheme} from './theme.js';

// Cards, dialogs, and menus share --ui-bg from ui.css.
const surfaceLuminance = {
	light: getRelativeLuminance('#fff'),
	dark: getRelativeLuminance('#141414'),
};
const lightBrandContrast = 1.4;
const nonTextContrast = 3;

function contrastRatio(a: number, b: number) {
	return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export const getContrastingIconColor = memoize(
	({
		color,
		theme,
		prefersMoreContrast,
	}: {
		color: string;
		theme: SurfaceTheme;
		prefersMoreContrast: boolean;
	}) => {
		const background = surfaceLuminance[theme];
		const minimum =
			theme === 'dark' || prefersMoreContrast
				? nonTextContrast
				: lightBrandContrast;
		if (contrastRatio(getRelativeLuminance(color), background) >= minimum)
			return color;

		const [red, green, blue] = colorString.get.rgb(color) ?? [];
		if (red === undefined || green === undefined || blue === undefined)
			return color;

		const target = theme === 'dark' ? 255 : 0;
		const blend = (amount: number) => {
			const mix = (channel: number) =>
				Math.round(channel + ((target - channel) * amount) / 255);
			return colorString.to.hex(mix(red), mix(green), mix(blue)) ?? color;
		};

		// Find the smallest blend that meets the target after rounding to sRGB bytes.
		let low = 1;
		let high = 255;
		while (low < high) {
			const middle = Math.floor((low + high) / 2);
			if (
				contrastRatio(getRelativeLuminance(blend(middle)), background) >=
				minimum
			)
				high = middle;
			else low = middle + 1;
		}

		return blend(low);
	},
	{
		getCacheKey: ({color, theme, prefersMoreContrast}) =>
			`${color}:${theme}:${prefersMoreContrast}`,
	},
);
