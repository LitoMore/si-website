import {type CSSProperties} from 'react';
import {IconLoader2} from '@tabler/icons-react';
import {useI18n, useSizes} from '#hooks';

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
