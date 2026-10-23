import {lazy, useEffect} from 'react';
import {Route, Routes, useMatch, useSearchParams} from 'react-router';
import {
	useBrightnessMode,
	useFilteredIcons,
	useIcons,
	useIconsLoadRequest,
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
const MagnetsLayout = lazy(async () => import('./layouts/magnets-layout.js'));
const FloatButtons = lazy(
	async () => import('#components/common/floatbuttons.js'),
);

function App() {
	const isMagnetPage = Boolean(useMatch('/3d'));
	const [searchParameters, setSearchParameters] = useSearchParams();
	const {colorScheme} = useColorScheme();
	const [brightnessMode] = useBrightnessMode();
	const [icons, setIcons] = useIcons();
	const [iconsLoadRequest] = useIconsLoadRequest();
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
		let isActive = true;
		setIcons((previous) => ({...previous, error: undefined}));
		const loadIconsData = async (brightnessMode_: BrightnessMode) => {
			try {
				const latestVersion = await getLatestVersion('simple-icons');
				const allIcons = await getIconsData(latestVersion, brightnessMode_);
				if (!isActive) return;
				setIcons({data: allIcons, version: latestVersion});
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
		if (
			isMagnetPage ||
			!(icons.data.length > 0 && searchParameters.has('slug'))
		) {
			return;
		}

		const slug = searchParameters.get('slug');
		if (!slug) return;
		const icon = icons.data.find((icon) => icon.slug === slug);
		if (icon) setSelectedIcon(icon);
	}, [icons.data, searchParameters, setSelectedIcon, isMagnetPage]);

	useEffect(() => {
		if (isMagnetPage || icons.data.length === 0) return;
		if (selectedIcon) {
			setSearchParameters({slug: selectedIcon.slug});
		} else if (searchParameters.has('slug')) {
			setSearchParameters();
		}
	}, [
		icons.data,
		selectedIcon,
		searchParameters,
		setSearchParameters,
		isMagnetPage,
	]);

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
				</Routes>
				{isMobileSize || isMagnetPage ? null : <FloatButtons />}
			</MessageProvider>
		</UiProvider>
	);
}

export default App;
