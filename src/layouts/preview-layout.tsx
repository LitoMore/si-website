import SubpageHeader from '#components/header/subpage-header.js';
import Preview from '#components/preview/preview.js';
import {useColorScheme} from '#hooks';

export default function PreviewLayout() {
	const {colorScheme} = useColorScheme();
	return (
		<div className="preview-page" data-theme={colorScheme}>
			<SubpageHeader />
			<main>
				<Preview />
			</main>
		</div>
	);
}
