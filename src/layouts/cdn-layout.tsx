import Cdn from '#components/cdn/cdn.js';
import SubpageHeader from '#components/header/subpage-header.js';
import '../components/cdn/cdn.css';

export default function CdnLayout() {
	return (
		<div className="cdn-page">
			<SubpageHeader />
			<main className="cdn-content">
				<Cdn />
			</main>
		</div>
	);
}
