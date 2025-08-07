import {Layout} from 'antd';
import {Gallery, Header, Modal} from '#components';

export default function DefaultLayout() {
	return (
		<Layout>
			<Header />
			<Layout.Content>
				<Gallery />
			</Layout.Content>
			<Modal />
		</Layout>
	);
}
