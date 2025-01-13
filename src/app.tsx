// @deno-types="@types/react"
import { lazy, useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router";
import { App as Ant } from "antd";
import {
	useBrightnessMode,
	useFilteredIcons,
	useIcons,
	useSelectedIcon,
} from "#atom";
import { useSizes } from "#hooks";
import { getIconsData, getLatestVersion } from "#utils";
import { BrightnessMode } from "#types";
import DefaultLayout from "./layouts/default-layout.tsx";
import PreviewLayout from "./layouts/preview-layout.tsx";

const FloatButtons = lazy(() => import("./components/floatbuttons.tsx"));

const App = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [brightnessMode] = useBrightnessMode();
	const [icons, setIcons] = useIcons();
	const [, setFilteredIcons] = useFilteredIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const { isMobileSize } = useSizes();

	const loadIconsData = async (brightnessMode: BrightnessMode) => {
		const latestVersion = await getLatestVersion("simple-icons");
		const allIcons = await getIconsData(latestVersion, brightnessMode);
		setIcons({ data: allIcons, version: latestVersion });
		setFilteredIcons(allIcons);
	};

	useEffect(() => {
		const coverElement = document.querySelector("#cover") as HTMLDivElement;
		if (!coverElement) return;
		coverElement.style.opacity = "0";
		globalThis.window.setTimeout(() => {
			document.querySelector("#cover")?.remove();
		}, 500);
	}, []);

	useEffect(() => {
		loadIconsData(brightnessMode);
	}, [brightnessMode]);

	useEffect(() => {
		if (
			icons.data.length > 0 &&
			searchParams.has("slug")
		) {
			const slug = searchParams.get("slug");
			if (slug) {
				const icon = icons.data.find((icon) => icon.slug === slug);
				if (icon) setSelectedIcon(icon);
			}
		}
	}, [icons.data]);

	useEffect(() => {
		if (icons.data.length === 0) return;
		if (selectedIcon) {
			setSearchParams({ "slug": selectedIcon.slug });
		} else if (searchParams.has("slug")) {
			setSearchParams();
		}
	}, [icons.data, selectedIcon]);

	return (
		<Ant>
			<Routes>
				<Route index element={<DefaultLayout />} />
				<Route path="preview" element={<PreviewLayout />} />
			</Routes>
			{isMobileSize ? null : <FloatButtons />}
		</Ant>
	);
};

export default App;
