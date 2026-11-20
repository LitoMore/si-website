import {lazy, useEffect} from 'react';
import {Route, Routes, useLocation, useMatch} from 'react-router';
import {
	useBrightnessMode,
	useFilteredIcons,
	useIcons,
	useIconsLoadRequest,
} from '#atom';
import {MessageProvider} from '#components/ui/feedback.js';
import {UiProvider} from '#components/ui/theme.js';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {type BrightnessMode, ColorTheme, LanguageCode} from '#types';
import {loadIconCatalog} from './icon-catalog/client.js';
import {findPage, pageMetaTags, siteUrl} from './page-metadata.js';

const DefaultLayout = lazy(async () => import('./layouts/default-layout.js'));
const OpenGraphLayout = lazy(
	async () => import('./layouts/opengraph-layout.js'),
);
const PreviewLayout = lazy(async () => import('./layouts/preview-layout.js'));
const MagnetsLayout = lazy(async () => import('./layouts/magnets-layout.js'));
const CdnLayout = lazy(async () => import('./layouts/cdn-layout.js'));
const FloatButtons = lazy(
	async () => import('#components/common/floatbuttons.js'),
);

function App() {
	const isMagnetPage = Boolean(useMatch('/3d'));
	const {pathname} = useLocation();
	const {colorScheme} = useColorScheme();
	const [brightnessMode] = useBrightnessMode();
	const [, setIcons] = useIcons();
	const [iconsLoadRequest] = useIconsLoadRequest();
	const [, setFilteredIcons] = useFilteredIcons();
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
		let isActive = true;
		setIcons((previous) => ({...previous, error: undefined}));
		const loadIconsData = async (brightnessMode_: BrightnessMode) => {
			try {
				const {version, icons: allIcons} =
					await loadIconCatalog(brightnessMode_);
				if (!isActive) return;
				setIcons({data: allIcons, version});
				setFilteredIcons(allIcons);
			} catch {
				if (isActive)
					setIcons((previous) => ({
						...previous,
						error: 'Could not load the icon list. Please try again.',
					}));
			}
		};

		void loadIconsData(brightnessMode);
		return () => {
			isActive = false;
		};
	}, [brightnessMode, setIcons, setFilteredIcons, iconsLoadRequest]);

	useEffect(() => {
		const page = findPage(pathname);
		if (!page) return;
		document.title = page.title;
		document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href =
			siteUrl + page.path;
		for (const {name, property, content} of pageMetaTags(page)) {
			const selector = name
				? `meta[name="${name}"]`
				: `meta[property="${property}"]`;
			document.querySelector<HTMLMetaElement>(selector)!.content = content;
		}
	}, [pathname]);

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
					<Route element={<MagnetsLayout />} path="3d" />
					<Route element={<CdnLayout />} path="cdn" />
				</Routes>
				{isMobileSize || isMagnetPage ? null : <FloatButtons />}
			</MessageProvider>
		</UiProvider>
	);
}

export default App;
