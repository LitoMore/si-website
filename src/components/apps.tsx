import {
	IconCaretDownFilled,
	IconEyeglass,
	IconGrid4x4,
} from '@tabler/icons-react';
import {Dropdown} from 'antd';
import {useNavigate} from 'react-router';
import {useColorScheme} from '#hooks';
import {PageLayout} from '#types';

function Apps() {
	const navigate = useNavigate();
	const {iconFg} = useColorScheme();

	return (
		<Dropdown
			menu={{
				items: [
					{
						key: PageLayout.Previewer,
						icon: <IconEyeglass />,
						label: <span>Icon Previewer</span>,
						onClick: async () => navigate('preview'),
					},
					{
						key: PageLayout.OpenGraph,
						icon: <IconGrid4x4 />,
						label: <span>OpenGraph Generator</span>,
						onClick: async () => navigate('og'),
					},
				],
			}}
		>
			<div className="flex items-center justify-center">
				<img
					alt="Simple Icons"
					className="h-6 w-6"
					src={`https://cdn.simpleicons.org/simpleicons/${iconFg.slice(
						1,
					)}?viewbox=auto`}
				/>
				<IconCaretDownFilled className="size-4" />
			</div>
		</Dropdown>
	);
}

export default Apps;
