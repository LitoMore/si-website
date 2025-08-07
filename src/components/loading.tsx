import {IconLoader2} from '@tabler/icons-react';
import {Flex} from 'antd';
import {useSizes} from '#hooks';

function Loading() {
	const {galleryHeight} = useSizes();

	return (
		<Flex
			className="flex flex-col items-center justify-center gap-5"
			style={{height: galleryHeight}}
		>
			<IconLoader2 className="animate-spin" color="#0cf" />
		</Flex>
	);
}

export default Loading;
