import {useTransition} from 'react';
import {IconArrowLeft, IconLoader2} from '@tabler/icons-react';
import {useLocation, useNavigate} from 'react-router';
import {useColorScheme, useI18n} from '#hooks';

export default function BackHome() {
	const navigate = useNavigate();
	const state = useLocation().state as {gallerySearch?: string} | undefined;
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();
	const [isPending, startTransition] = useTransition();

	return (
		<div className="fixed top-0 left-0 p-2.5">
			<button
				aria-busy={isPending}
				aria-label={isPending ? i18n.catalog.loading : 'Simple Icons'}
				className="control"
				disabled={isPending}
				style={{color: iconFg}}
				type="button"
				onClick={() => {
					startTransition(() => {
						void navigate({pathname: '/', search: state?.gallerySearch ?? ''});
					});
				}}
			>
				{isPending ? (
					<IconLoader2 aria-hidden className="motion-safe:animate-spin" />
				) : (
					<IconArrowLeft aria-hidden />
				)}
			</button>
		</div>
	);
}
