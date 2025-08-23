import {Layout} from 'antd';
import BackHome from '../components/backhome.js';
import Controls from '../components/controls.js';
import Preview from '../components/preview.js';

export default function PreviewLayout() {
	return (
		<Layout>
			<Preview />
			<BackHome />
			<div className="fixed top-0 right-0 flex items-center justify-center p-[10px]">
				<Controls />
			</div>
		</Layout>
	);
}
