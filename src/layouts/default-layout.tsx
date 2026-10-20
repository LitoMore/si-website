import Gallery from '#components/gallery/gallery.js';
import Modal from '#components/gallery/modal.js';
import Header from '#components/header/header.js';

export default function DefaultLayout() {
	return (
		<div className="ui-app-layout">
			<Header />
			<main>
				<Gallery />
			</main>
			<Modal />
		</div>
	);
}
