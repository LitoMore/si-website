import {memo} from 'react';
import {Layout} from 'antd';
import {Gallery, Header, Modal} from '#components';

export default memo(() => {
	return (
		<Layout>
			<Header />
			<Layout.Content>
				<Gallery />
			</Layout.Content>
			<Modal />
		</Layout>
	);
});
