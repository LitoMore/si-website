import {
	IconCaretDownFilled,
	IconEyeglass,
	IconGrid4x4,
	IconMagnet,
} from '@tabler/icons-react';
import {useNavigate} from 'react-router';
import {Dropdown} from '#components/ui/dropdown.js';
import {useColorScheme, useI18n} from '#hooks';
import {PageLayout} from '#types';

export default function Apps() {
	const navigate = useNavigate();
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Dropdown
			items={[
				{
					key: PageLayout.Previewer,
					icon: <IconEyeglass />,
					label: <span>{i18n.header.iconPreviewer}</span>,
					onClick() {
						void navigate('preview');
					},
				},
				{
					key: PageLayout.Magnets,
					icon: <IconMagnet />,
					label: <span>{i18n.header.magnetGenerator}</span>,
					onClick() {
						void navigate('/3d');
					},
				},
				{
					key: PageLayout.OpenGraph,
					icon: <IconGrid4x4 />,
					label: <span>{i18n.header.openGraphGenerator}</span>,
					onClick() {
						void navigate('og');
					},
				},
			]}
		>
			<button
				aria-label="Simple Icons"
				className="flex cursor-pointer items-center justify-center"
				type="button"
			>
				<img
					alt="Simple Icons"
					className="h-6 w-6"
					src={`https://cdn.simpleicons.org/simpleicons/${iconFg.slice(
						1,
					)}?viewbox=auto`}
				/>
				<IconCaretDownFilled className="size-4" />
			</button>
		</Dropdown>
	);
}
