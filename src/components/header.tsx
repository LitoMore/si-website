import {lazy} from 'react';
import {Flex, Layout} from 'antd';
import {Apps, Search} from '#components';
import {useColorScheme, useSizes} from '#hooks';

const Controls = lazy(async () => import('./controls.js'));

function Header() {
	const {padding} = useSizes();
	const {headerBg} = useColorScheme();

	return (
		<Layout.Header
			style={{
				position: 'sticky',
				top: 0,
				zIndex: 1,
				width: '100%',
				height: 'auto',
				boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
				padding: 0,
				fontSize: 24,
				lineHeight: 1,
			}}
		>
			<Flex
				align="center"
				gap={5}
				justify="center"
				style={{
					background: headerBg,
					padding: `10px ${padding}px`,
				}}
			>
				<Apps />
				<Search />
				<Controls />
			</Flex>
		</Layout.Header>
	);
}

export default Header;
