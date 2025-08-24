import {Layout} from 'antd';
import Controls from '#components/controls/controls.js';
import BackHome from '#components/header/backhome.js';
import Preview from '#components/preview/preview.js';

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
