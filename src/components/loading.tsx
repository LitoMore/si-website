import {IconLoader2} from '@tabler/icons-react';
import {Flex} from 'antd';
import {spinning} from '#constants';
import {useSizes} from '#hooks';

function Loading() {
	const {galleryHeight} = useSizes();

	return (
		<Flex
			vertical
			align="center"
			gap={20}
			justify="center"
			style={{height: galleryHeight}}
		>
			<IconLoader2 color="#0cf" style={spinning} />
		</Flex>
	);
}

export default Loading;
