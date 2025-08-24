import {IconArrowLeft} from '@tabler/icons-react';
import {useNavigate} from 'react-router';
import {useColorScheme} from '#hooks';

export default function BackHome() {
	const navigate = useNavigate();
	const {iconFg} = useColorScheme();

	return (
		<div className="fixed top-0 left-0 p-2.5">
			<IconArrowLeft
				className="control"
				style={{color: iconFg}}
				onClick={() => {
					void navigate('/');
				}}
			/>
		</div>
	);
}
