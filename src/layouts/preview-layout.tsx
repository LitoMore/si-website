import {Flex, Layout} from 'antd';
import Controls from '../components/controls.js';
import Preview from '../components/preview.js';

export default function PreviewLayout() {
	<Layout>
		<Preview />
		<Flex
			align="center"
			justify="center"
			style={{position: 'fixed', top: 0, right: 0, padding: 10}}
		>
			<Controls />
		</Flex>
	</Layout>;
}
