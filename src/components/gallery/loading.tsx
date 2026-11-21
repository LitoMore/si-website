import {type CSSProperties} from 'react';
import {IconLoader2} from '@tabler/icons-react';
import {useAtomValue} from 'jotai';
import {createPortal} from 'react-dom';
import {useI18n, useSizes} from '#hooks';
import {catalogProgress} from '#icon-catalog/client.js';

export function CatalogLoading() {
	const progress = useAtomValue(catalogProgress);
	const {i18n, languageCode} = useI18n();
	return createPortal(
		<div className="flex flex-col items-center gap-2">
			<div className="flex items-baseline gap-2 text-sm">
				<span role="status">{i18n.catalog.loading}</span>
				<span aria-hidden className="tabular-nums">
					{new Intl.NumberFormat(languageCode, {style: 'percent'}).format(
						progress / 100,
					)}
				</span>
			</div>
			<progress
				aria-label={i18n.catalog.loading}
				className="h-1 w-48 accent-sky-500"
				max={100}
				value={progress}
			/>
		</div>,
		document.querySelector('#catalog-loading-status')!,
	);
}

export default function Loading({
	height,
	label,
}: {
	readonly height?: CSSProperties['height'];
	readonly label?: string;
}) {
	const {galleryHeight} = useSizes();
	const {i18n} = useI18n();
	return (
		<div
			aria-label={label ?? i18n.openGraph.loading}
			className="flex flex-col items-center justify-center gap-5"
			role="status"
			style={{height: height ?? galleryHeight}}
		>
			<IconLoader2
				aria-hidden
				className="animate-spin motion-reduce:animate-none"
				color="#0cf"
			/>
		</div>
	);
}
