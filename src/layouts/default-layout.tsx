import {Layout} from 'antd';
import Gallery from '#components/gallery/gallery.js';
import Modal from '#components/gallery/modal.js';
import Header from '#components/header/header.js';

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
