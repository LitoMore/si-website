// @deno-types="@types/react"
import { useMemo } from "react";
import { App } from "antd";
import { useWindowSize } from "@uidotdev/usehooks";
import { Searcher } from "fast-fuzzy";
import { useCardSize, useIcons } from "#atom";
import { mobileWidth } from "#constants";
import { cardSizeToPixels, searcherKeySelector } from "#utils";
import { CardSize } from "#types";

export { useI18n } from "#i18n";

export const useCopyText = () => {
	const { message } = App.useApp();
	return async (title: string, text: string) => {
		await globalThis.navigator.clipboard.writeText(text);
		message.success(`Copied ${title} to clipboard`);
	};
};

export const useSizes = () => {
	const [cardSize] = useCardSize();
	const { width } = useWindowSize();
	const innerWidth = width || globalThis.window.innerWidth;
	const gap = 5;
	const padding = 10;
	const isMobileSize = innerWidth < mobileWidth;
	// [TODO] Refactor wit CSS `calc()`
	const containerWidth = innerWidth - padding * 2 + gap;
	const cardPixels = cardSizeToPixels(
		containerWidth,
		gap,
		isMobileSize ? "33.3%" : cardSize,
	);
	const galleryMargin = Math.floor((containerWidth % (cardPixels + gap)) / 2) +
		padding;
	return {
		isMobileSize,
		cardPixels,
		zoom: cardPixels / CardSize.Small,
		innerWidth,
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
