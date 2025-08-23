import {IconArrowLeft} from '@tabler/icons-react';
import {useNavigate} from 'react-router';

export default function BackHome() {
	const navigate = useNavigate();

	return (
		<div className="fixed top-0 left-0 p-2.5">
			<IconArrowLeft
				className="control"
				onClick={() => {
					void navigate('/');
				}}
			/>
		</div>
	);
}
