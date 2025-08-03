import colorString from 'color-string';

/**
 * Calculate relative luminance.
 *
 * Use relative luminance definition from W3C
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * https://github.com/misund/get-relative-luminance/blob/master/src/index.ts
 */
const getRelativeLuminance = (
	color: string,
	{ignoreTransparency = false} = {},
) => {
	if (!color) {
		throw new TypeError(
			'getRelativeLuminance() needs you to pass the color parameter.',
		);
		// Return 0;
	}

	const [r = 0, g = 0, b = 0, a = 1] = colorString.get.rgb(color) ?? [
		0, 0, 0, 1,
	];

	// @TODO: account for alpha values (rgba etc)
	// Lea Verou has a good looking approach:
	// https://github.com/LeaVerou/contrast-ratio
	if (a < 1 && !ignoreTransparency) {
		throw new TypeError(
			'getRelativeLuminance() does not now how to handle transparency.',
		);
	}

	const srgb = [r, g, b].map((value) => value / 255);
	const [r_ = 0, g_ = 0, b_ = 0] = srgb.map((value) =>
		value <= 0.039_28 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
	);
	const l = 0.2126 * r_ + 0.7152 * g_ + 0.0722 * b_;
	return l;
};

export default getRelativeLuminance;
