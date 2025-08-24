import {lazy} from 'react';
import {Layout} from 'antd';
import {useColorScheme, useSizes} from '#hooks';
import Apps from './apps.js';
import Search from './search.js';

const Controls = lazy(async () => import('../controls/controls.js'));

function Header() {
	const {padding} = useSizes();
	const {headerBg} = useColorScheme();

	return (
		<Layout.Header className="text-6 sticky top-0 z-1 h-auto! w-full p-0! leading-[1] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
			<div
				className="flex items-center justify-center gap-[5px]"
				style={{
					background: headerBg,
					padding: `10px ${padding}px`,
				}}
			>
				<Apps />
				<Search />
				<Controls />
			</div>
		</Layout.Header>
	);
}

export default Header;
