import {lazy, useEffect} from 'react';
import {App as Ant, ConfigProvider, theme} from 'antd';
import {Route, Routes, useSearchParams} from 'react-router';
import {
	useBrightnessMode,
	useColorTheme,
	useFilteredIcons,
	useIcons,
	useSelectedIcon,
} from '#atom';
import {useColorScheme, useSizes} from '#hooks';
import {type BrightnessMode, ColorTheme} from '#types';
import {getColorScheme, getIconsData, getLatestVersion} from '#utils';

const DefaultLayout = lazy(async () => import('./layouts/default-layout.js'));
const PreviewLayout = lazy(async () => import('./layouts/preview-layout.js'));
const FloatButtons = lazy(async () => import('./components/floatbuttons.js'));

function App() {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const {colorScheme} = useColorScheme();
	const [colorTheme] = useColorTheme();
	const [brightnessMode] = useBrightnessMode();
	const [icons, setIcons] = useIcons();
	const [, setFilteredIcons] = useFilteredIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const {isMobileSize} = useSizes();

	useEffect(() => {
		const coverElement = document.querySelector<HTMLElement>('#cover')!;
		if (!coverElement) return;
		coverElement.style.opacity = '0';
		globalThis.window.setTimeout(() => {
			document.querySelector('#cover')?.remove();
		}, 500);
	}, []);

	useEffect(() => {
		const loadIconsData = async (brightnessMode: BrightnessMode) => {
			const latestVersion = await getLatestVersion('simple-icons');
			const allIcons = await getIconsData(latestVersion, brightnessMode);
			setIcons({data: allIcons, version: latestVersion});
			setFilteredIcons(allIcons);
		};

		void loadIconsData(brightnessMode);
	}, [brightnessMode, setIcons, setFilteredIcons]);

	useEffect(() => {
		if (icons.data.length > 0 && searchParameters.has('slug')) {
			const slug = searchParameters.get('slug');
			if (slug) {
				const icon = icons.data.find((icon) => icon.slug === slug);
				if (icon) setSelectedIcon(icon);
			}
		}
	}, [icons.data, searchParameters, setSelectedIcon]);

	useEffect(() => {
		if (icons.data.length === 0) return;
		if (selectedIcon) {
			setSearchParameters({slug: selectedIcon.slug});
		} else if (searchParameters.has('slug')) {
			setSearchParameters();
		}
	}, [icons.data, selectedIcon, searchParameters, setSearchParameters]);

	const lightTheme = theme.defaultAlgorithm;
	const darkTheme = theme.darkAlgorithm;

	return (
		<Ant style={{colorScheme: getColorScheme(colorTheme)}}>
			<ConfigProvider
				theme={{
					algorithm: colorScheme === ColorTheme.Dark ? darkTheme : lightTheme,
				}}
			>
				<Routes>
					<Route index element={<DefaultLayout />} />
					<Route element={<PreviewLayout />} path="preview" />
				</Routes>
				{isMobileSize ? null : <FloatButtons />}
			</ConfigProvider>
		</Ant>
	);
}

export default App;
