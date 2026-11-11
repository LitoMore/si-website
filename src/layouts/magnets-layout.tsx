import {useSearchParams} from 'react-router';
import {useIcons, useIconsLoadRequest} from '#atom';
import Loading from '#components/gallery/loading.js';
import SubpageHeader from '#components/header/subpage-header.js';
import MagnetWorkshop from '#components/magnets/magnet-workshop.js';
import {useColorScheme, useI18n} from '#hooks';

export default function MagnetsLayout() {
	const {i18n} = useI18n();
	const [parameters, setParameters] = useSearchParams();
	const [catalog] = useIcons();
	const [, requestIcons] = useIconsLoadRequest();
	const {colorScheme} = useColorScheme();
	return (
		<div
			className="magnets-page h-dvh overflow-auto pt-[54px]"
			data-theme={colorScheme}
		>
			<SubpageHeader />
			{catalog.data.length > 0 && catalog.version ? (
				<MagnetWorkshop
					icons={catalog.data}
					slug={parameters.get('slug') ?? undefined}
					version={catalog.version}
					onSelectIcon={(icon) => {
						setParameters(
							(previous) => {
								const next = new URLSearchParams(previous);
								next.set('slug', icon.slug);
								return next;
							},
							{replace: true},
						);
					}}
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
