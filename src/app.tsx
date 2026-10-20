import {lazy, useEffect} from 'react';
import {Route, Routes, useSearchParams} from 'react-router';
import {
	useBrightnessMode,
	useFilteredIcons,
	useIcons,
	useSelectedIcon,
} from '#atom';
import {MessageProvider} from '#components/ui/feedback.js';
import {UiProvider} from '#components/ui/theme.js';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {type BrightnessMode, ColorTheme, LanguageCode} from '#types';
import {getIconsData, getLatestVersion} from '#utils';

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
		document.documentElement.dataset['uiTheme'] = colorScheme;
	}, [languageCode, direction, colorScheme]);

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

	return (
		<UiProvider
			direction={direction}
			theme={colorScheme === ColorTheme.Dark ? 'dark' : 'light'}
		>
			<MessageProvider>
				<Routes>
					<Route index element={<DefaultLayout />} />
					<Route element={<OpenGraphLayout />} path="og" />
					<Route element={<PreviewLayout />} path="preview" />
				</Routes>
				{isMobileSize ? null : <FloatButtons />}
			</MessageProvider>
		</UiProvider>
	);
}

export default App;
