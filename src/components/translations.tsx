import {IconCheck, IconLanguage} from '@tabler/icons-react';
import {Dropdown} from 'antd';
import {useLanguageCode} from '#atom';
import {useColorScheme} from '#hooks';
import {translations} from '#i18n';
import {type LanguageCode} from '#types';

function Translations() {
	const [languageCode, setLanguageCode] = useLanguageCode();
	const {iconFg} = useColorScheme();

	return (
		<Dropdown
			menu={{
				items: Object.entries(translations).map(([k, v]) => ({
					key: k,
					label: v.languageName,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
					extra: languageCode === k ? <IconCheck size={16} /> : null,
					onClick() {
						setLanguageCode(k as LanguageCode);
					},
				})),
			}}
		>
			<IconLanguage className="control" style={{color: iconFg}} />
		</Dropdown>
	);
}

export default Translations;
