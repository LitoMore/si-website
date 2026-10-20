import {IconCheck, IconLanguage} from '@tabler/icons-react';
import {Dropdown} from 'antd';
import {useLanguageCode} from '#atom';
import {useColorScheme, useI18n} from '#hooks';
import {translations} from '#i18n';
import {type LanguageCode} from '#types';

function Translations() {
	const [, setLanguageCode] = useLanguageCode();
	const {i18n, languageCode} = useI18n();
	const {iconFg} = useColorScheme();

	return (
		<Dropdown
			autoFocus
			menu={{
				items: Object.entries(translations).map(([k, v]) => ({
					key: k,
					label: <span dir="auto">{v.languageName}</span>,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
					extra: languageCode === k ? <IconCheck size={16} /> : null,
					onClick() {
						setLanguageCode(k as LanguageCode);
					},
				})),
			}}
			overlayStyle={{maxHeight: 'min(70vh, 480px)', overflowY: 'auto'}}
			trigger={['hover', 'click']}
		>
			<button
				aria-label={i18n.settings.language}
				className="control"
				style={{color: iconFg}}
				title={i18n.settings.language}
				type="button"
			>
				<IconLanguage aria-hidden />
			</button>
		</Dropdown>
	);
}

export default Translations;
