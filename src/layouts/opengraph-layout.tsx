import SubpageHeader from '#components/header/subpage-header.js';
import OpenGraph from '#components/opengraph/opengraph.js';
import {useColorScheme} from '#hooks';
import '#components/opengraph/opengraph.css';

export default function OgLayout() {
	const {colorScheme} = useColorScheme();
	return (
		<div className="og-page" data-theme={colorScheme}>
			<SubpageHeader />
			<main>
				<OpenGraph />
			</main>
		</div>
	);
}
