import {Layout} from 'antd';
import Controls from '../components/controls.js';
import OpenGraph from '../components/opengraph.js';

export default function OgLayout() {
	return (
		<Layout>
			<OpenGraph />
			<div className="fixed top-0 right-0 flex items-center justify-center p-[10px]">
				<Controls />
			</div>
		</Layout>
	);
}
