import {useState} from 'react';
import {Layout} from 'antd';
import Controls from '#components/controls/controls.js';
import BackHome from '#components/header/backhome.js';
import OpenGraphSettings from '#components/opengraph/opengraph-settings.js';
import OpenGraph from '#components/opengraph/opengraph.js';

export default function OgLayout() {
	const [seed, setSeed] = useState(0);

	return (
		<Layout>
			<OpenGraph seed={seed} />
			<BackHome />
			<div className="fixed top-0 right-0 flex items-center justify-center p-[10px]">
				<Controls
					extraSettings={
						<OpenGraphSettings
							onShuffle={() => {
								setSeed(Math.random());
							}}
						/>
					}
				/>
			</div>
		</Layout>
	);
}
