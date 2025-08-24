import {
	IconCaretDownFilled,
	IconEyeglass,
	IconGrid4x4,
} from '@tabler/icons-react';
import {Dropdown} from 'antd';
import {useNavigate} from 'react-router';
import {useColorScheme, useI18n} from '#hooks';
import {PageLayout} from '#types';

function Apps() {
	const navigate = useNavigate();
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Dropdown
			menu={{
				items: [
					{
						key: PageLayout.Previewer,
						icon: <IconEyeglass />,
						label: <span>{i18n.header.iconPreviewer}</span>,
						onClick: async () => navigate('preview'),
					},
					{
						key: PageLayout.OpenGraph,
						icon: <IconGrid4x4 />,
						label: <span>{i18n.header.openGraphGenerator}</span>,
						onClick: async () => navigate('og'),
					},
				],
			}}
		>
			<div className="flex cursor-pointer items-center justify-center">
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
