import { useEffect, useMemo, useState } from "react";
import { App } from "antd";
import copyTextToClipboard from "copy-text-to-clipboard";
import { useMediaQuery, useWindowSize } from "@uidotdev/usehooks";
import { Searcher } from "fast-fuzzy";
// @deno-types="./vendor/types/use-image.d.ts"
import useImage from "use-image";
import { useCardSize, useColorTheme, useIcons } from "#atom";
import { mobileWidth } from "#constants";
import { useI18n } from "#i18n";
import {
	cardSizeToPixels,
	cloneImagetoSize,
	getColorVariables,
	searcherKeySelector,
} from "#utils";
import { CardSize, ColorTheme, ImageElement, ImageState } from "#types";

export { useI18n } from "#i18n";

export const useCopyText = () => {
	const { message } = App.useApp();
	const { i18n, gettext } = useI18n();
	return (title: string, text: string) => {
		copyTextToClipboard(text);
		message.success(gettext(i18n.modal.copied, [title]));
	};
};

export const useSizes = () => {
	const [cardSize] = useCardSize();
	const { width, height } = useWindowSize();
	const innerWidth = width || globalThis.window.innerWidth;
	const innerHeight = height || globalThis.window.innerHeight;
	const gap = 5;
	const padding = 10;
	const isMobileSize = innerWidth < mobileWidth;
	const containerWidth = innerWidth - padding * 2 + gap;
	const cardPixels = cardSizeToPixels(
		containerWidth,
		gap,
		isMobileSize ? "33.3%" : cardSize,
	);
	const galleryMargin = Math.floor((containerWidth % (cardPixels + gap)) / 2) +
		padding;
	const iconsPerRow = Math.floor(containerWidth / (cardPixels + gap));
	return {
		isMobileSize,
		iconsPerRow,
		cardPixels,
		zoom: cardPixels / CardSize.Small,
		innerWidth,
		innerHeight,
		containerWidth,
		galleryHeight: "calc(100vh - 54px)",
		galleryMargin,
		padding,
	};
};

export const useSearcher = () => {
	const [icons] = useIcons();
	return useMemo(() =>
		new Searcher(icons.data, {
			keySelector: searcherKeySelector,
		}), [icons.data]);
};

export const usePreviewImage = (
	source: string,
): [[ImageElement, ImageElement, ImageElement, ImageElement], ImageState] => {
	const [image, state] = useImage(source);
	const [image24, setImage24] = useState<HTMLImageElement>();
	const [image78, setImage78] = useState<HTMLImageElement>();
	const [image134, setImage134] = useState<HTMLImageElement>();
	const [image364, setImage364] = useState<HTMLImageElement>();

	useEffect(() => {
		if (image) {
			setImage24(cloneImagetoSize(image, 24));
			setImage78(cloneImagetoSize(image, 64));
			setImage134(cloneImagetoSize(image, 134));
			setImage364(cloneImagetoSize(image, 364));
		}
	}, [image]);

	return [
		[
			{ element: image24, size: 24, x: 10 },
			{ element: image78, size: 64, x: 10 + 24 + 38 },
			{ element: image134, size: 134, x: 10 + 24 + 64 + 38 * 2 },
			{ element: image364, size: 364, x: 10 + 24 + 64 + 134 + 38 * 3 },
		],
		state,
	];
};

export const useColorScheme = () => {
	const [colorTheme] = useColorTheme();
	const isDark = useMediaQuery("(prefers-color-scheme: dark)");
	if (colorTheme === ColorTheme.Auto) {
		return {
			isLight: !isDark,
			isDark,
			colorScheme: isDark ? ColorTheme.Dark : ColorTheme.Light,
			...getColorVariables(isDark),
		};
	}
	return {
		isLight: colorTheme === ColorTheme.Light,
		isDark: colorTheme === ColorTheme.Dark,
		colorScheme: colorTheme,
		...getColorVariables(colorTheme === ColorTheme.Dark),
	};
};
