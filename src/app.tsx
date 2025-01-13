// @deno-types="@types/react"
import { lazy, useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router";
import { App as Ant, ConfigProvider, theme } from "antd";
import {
	useBrightnessMode,
	useColorTheme,
	useFilteredIcons,
	useIcons,
	useSelectedIcon,
} from "#atom";
import { useColorScheme, useSizes } from "#hooks";
import { getColorScheme, getIconsData, getLatestVersion } from "#utils";
import { BrightnessMode, ColorTheme } from "#types";

const DefaultLayout = lazy(() => import("./layouts/default-layout.tsx"));
const PreviewLayout = lazy(() => import("./layouts/preview-layout.tsx"));

const FloatButtons = lazy(() => import("./components/floatbuttons.tsx"));

const App = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { colorScheme } = useColorScheme();
	const [colorTheme] = useColorTheme();
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

	const lightTheme = theme.defaultAlgorithm;
	const darkTheme = theme.darkAlgorithm;

	return (
		<Ant style={{ colorScheme: getColorScheme(colorTheme) }}>
			<ConfigProvider
				theme={{
					algorithm: colorScheme === ColorTheme.Dark ? darkTheme : lightTheme,
				}}
			>
				<Routes>
					<Route index element={<DefaultLayout />} />
					<Route path="preview" element={<PreviewLayout />} />
				</Routes>
				{isMobileSize ? null : <FloatButtons />}
			</ConfigProvider>
		</Ant>
	);
};

export default App;
