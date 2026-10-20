import Controls from '#components/controls/controls.js';
import BackHome from '#components/header/backhome.js';
import OpenGraph from '#components/opengraph/opengraph.js';
import {useColorScheme} from '#hooks';
import '../components/opengraph/opengraph.css';

export default function OgLayout() {
	const {colorScheme} = useColorScheme();
	return (
		<main className="og-page" data-theme={colorScheme}>
			<OpenGraph />
			<div className="og-navigation">
				<BackHome />
				<div className="fixed top-0 right-0 flex items-center justify-center p-2.5">
					<Controls />
				</div>
			</div>
		</main>
	);
}
