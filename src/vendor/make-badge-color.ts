/**
 * https://github.com/badges/shields/blob/master/badge-maker/lib/color.js
 * CC0-1.0 license
 */
import colorString from "color-string";
import { memoize } from "es-toolkit";
// @deno-types="./types/get-relative-luminance.d.ts"
import getRelativeLuminance from "get-relative-luminance";
import { brightThreshold } from "#constants";

function brightness(color: string) {
	if (!color) return 0;
	const [r, g, b] = colorString.get.rgb(color) ?? [0, 0, 0];
	return +((r * 299 + g * 587 + b * 114) / 255000).toFixed(2);
}

const memoizedGetRelativeLuminance = memoize(getRelativeLuminance);
const memoizedBrightness = memoize(brightness);

export function colorForBackground(color: string, luminance?: boolean) {
	if (luminance) {
		const luminance = memoizedGetRelativeLuminance(color);
		return {
			brightness: luminance,
			relativeColor: luminance < 0.4 ? "#fff" : "#333",
		};
	}

	const actualBrightness = memoizedBrightness(color);
	return {
		brightness: actualBrightness,
		relativeColor: actualBrightness < brightThreshold ? "#fff" : "#333",
	};
}
