import Controls from '#components/controls/controls.js';
import {useColorScheme} from '#hooks';
import BackHome from './backhome.js';

export default function SubpageHeader() {
	const {headerBg} = useColorScheme();
	return (
		<header
			className="fixed top-0 right-0 left-0 z-10 h-[54px] border-b border-black/10"
			style={{background: headerBg}}
		>
			<BackHome />
			<div className="fixed top-0 right-0 flex items-center justify-center p-2.5">
				<Controls />
			</div>
		</header>
	);
}
