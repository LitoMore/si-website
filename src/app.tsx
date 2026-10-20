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
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {type BrightnessMode, ColorTheme, LanguageCode} from '#types';
import {getColorScheme, getIconsData, getLatestVersion} from '#utils';
import locales from './i18n/antd.js';

const DefaultLayout = lazy(async () => import('./layouts/default-layout.js'));
const OpenGraphLayout = lazy(
	async () => import('./layouts/opengraph-layout.js'),
);
const PreviewLayout = lazy(async () => import('./layouts/preview-layout.js'));
const FloatButtons = lazy(
	async () => import('#components/common/floatbuttons.js'),
);

function App() {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const {colorScheme} = useColorScheme();
	const [colorTheme] = useColorTheme();
	const [brightnessMode] = useBrightnessMode();
	const [icons, setIcons] = useIcons();
	const [, setFilteredIcons] = useFilteredIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const {isMobileSize} = useSizes();
	const {languageCode} = useI18n();
	const direction = languageCode === LanguageCode.Arabic ? 'rtl' : 'ltr';

	useEffect(() => {
		document.documentElement.lang =
			languageCode === LanguageCode.Chinese ? 'zh-Hans' : languageCode;
		document.documentElement.dir = direction;
	}, [languageCode, direction]);

	useEffect(() => {
		const coverElement = document.querySelector<HTMLElement>('#cover')!;
		if (!coverElement) return;
		coverElement.style.opacity = '0';
		globalThis.window.setTimeout(() => {
			document.querySelector('#cover')?.remove();
		}, 500);
	}, []);

	useEffect(() => {
		const loadIconsData = async (brightnessMode_: BrightnessMode) => {
			const latestVersion = await getLatestVersion('simple-icons');
			const allIcons = await getIconsData(latestVersion, brightnessMode_);
			setIcons({data: allIcons, version: latestVersion});
			setFilteredIcons(allIcons);
		};

		void loadIconsData(brightnessMode);
	}, [brightnessMode, setIcons, setFilteredIcons]);

	useEffect(() => {
		if (!(icons.data.length > 0 && searchParameters.has('slug'))) {
			return;
		}

		const slug = searchParameters.get('slug');
		if (!slug) return;
		const icon = icons.data.find((icon) => icon.slug === slug);
		if (icon) setSelectedIcon(icon);
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
				direction={direction}
				locale={locales[languageCode]}
				theme={{
					algorithm: colorScheme === ColorTheme.Dark ? darkTheme : lightTheme,
					token:
						colorScheme === ColorTheme.Light ? {colorBgLayout: '#fff'} : {},
				}}
			>
				<Routes>
					<Route index element={<DefaultLayout />} />
					<Route element={<OpenGraphLayout />} path="og" />
					<Route element={<PreviewLayout />} path="preview" />
				</Routes>
				{isMobileSize ? null : <FloatButtons />}
			</ConfigProvider>
		</Ant>
	);
}

export default App;
