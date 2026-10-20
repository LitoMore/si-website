import Controls from '#components/controls/controls.js';
import BackHome from '#components/header/backhome.js';
import Preview from '#components/preview/preview.js';
import {useColorScheme} from '#hooks';

export default function PreviewLayout() {
	const {colorScheme} = useColorScheme();
	return (
		<main className="preview-page" data-theme={colorScheme}>
			<Preview />
			<BackHome />
			<div className="fixed top-0 right-0 flex items-center justify-center p-2.5">
				<Controls />
			</div>
		</main>
	);
}
