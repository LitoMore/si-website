import {useSearchParams} from 'react-router';
import {useIcons, useIconsLoadRequest} from '#atom';
import Controls from '#components/controls/controls.js';
import Loading from '#components/gallery/loading.js';
import BackHome from '#components/header/backhome.js';
import MagnetWorkshop from '#components/magnets/magnet-workshop.js';
import {useColorScheme, useI18n} from '#hooks';

export default function MagnetsLayout() {
	const {i18n} = useI18n();
	const [parameters] = useSearchParams();
	const [catalog] = useIcons();
	const [, requestIcons] = useIconsLoadRequest();
	const {colorScheme, headerBg} = useColorScheme();
	return (
		<div
			className="magnets-page h-dvh overflow-auto pt-[54px]"
			data-theme={colorScheme}
		>
			<header
				className="fixed top-0 right-0 left-0 z-10 h-[54px] border-b border-black/10"
				style={{background: headerBg}}
			>
				<BackHome />
				<div className="fixed top-0 right-0 flex items-center justify-center p-2.5">
					<Controls />
				</div>
			</header>
			{catalog.data.length > 0 && catalog.version ? (
				<MagnetWorkshop
					icons={catalog.data}
					initialSlug={parameters.get('slug') ?? undefined}
					version={catalog.version}
				/>
			) : catalog.error ? (
				<div
					className="flex min-h-60 flex-col items-center justify-center gap-4 p-8 text-center"
					role="alert"
				>
					<p>{i18n.openGraph.loadError}</p>
					{catalog.error ? (
						<button
							className="ui-button"
							type="button"
							onClick={() => {
								requestIcons((value) => value + 1);
							}}
						>
							{i18n.openGraph.retry}
						</button>
					) : null}
				</div>
			) : (
				<Loading height="calc(100dvh - 54px)" label={i18n.openGraph.loading} />
			)}
		</div>
	);
}
