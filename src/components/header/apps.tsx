import {
	IconCaretDownFilled,
	IconEyeglass,
	IconGrid4x4,
	IconMagnet,
	IconWorld,
} from '@tabler/icons-react';
import {useLocation, useNavigate} from 'react-router';
import BrandIcon from '#components/common/brand-icon.js';
import {Dropdown} from '#components/ui/dropdown.js';
import {useColorScheme, useI18n} from '#hooks';
import {PageLayout} from '#types';

export default function Apps() {
	const navigate = useNavigate();
	const {search} = useLocation();
	const openPage = (path: string) => {
		void navigate(path, {state: {gallerySearch: search}});
	};

	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Dropdown
			items={[
				{
					key: PageLayout.Cdn,
					icon: <IconWorld />,
					label: <span>Simple Icons CDN</span>,
					onClick() {
						openPage('/cdn');
					},
				},
				{
					key: PageLayout.Previewer,
					icon: <IconEyeglass />,
					label: <span>{i18n.header.iconPreviewer}</span>,
					onClick() {
						openPage('/preview');
					},
				},
				{
					key: PageLayout.Magnets,
					icon: <IconMagnet />,
					label: <span>{i18n.header.magnetGenerator}</span>,
					onClick() {
						openPage('/3d');
					},
				},
				{
					key: PageLayout.OpenGraph,
					icon: <IconGrid4x4 />,
					label: <span>{i18n.header.openGraphGenerator}</span>,
					onClick() {
						openPage('/og');
					},
				},
			]}
		>
			<button
				aria-label="Simple Icons"
				className="flex cursor-pointer items-center justify-center"
				type="button"
			>
				<BrandIcon className="h-6 w-6" color={iconFg} slug="simpleicons" />
				<IconCaretDownFilled className="size-4" />
			</button>
		</Dropdown>
	);
}
