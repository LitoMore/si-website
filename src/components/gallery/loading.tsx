import {IconLoader2} from '@tabler/icons-react';
import {useSizes} from '#hooks';

function Loading() {
	const {galleryHeight} = useSizes();

	return (
		<div
			className="flex flex-col items-center justify-center gap-5"
			style={{height: galleryHeight}}
		>
			<IconLoader2 className="animate-spin" color="#0cf" />
		</div>
	);
}

export default Loading;
