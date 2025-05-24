import { Dropdown } from "antd";
import { IconCheck } from "@tabler/icons-react";
import { IconLanguage } from "@tabler/icons-react";
import { useLanguageCode } from "#atom";
import { useColorScheme } from "#hooks";
import { translations } from "#i18n";
import { LanguageCode } from "#types";
import { Control } from "./controls.tsx";

const Translations = () => {
	const [languageCode, setLanguageCode] = useLanguageCode();
	const { iconFg } = useColorScheme();

	return (
		<Dropdown
			menu={{
				items: Object.entries(translations).map(([k, v]) => ({
					key: k,
					label: v.languageName,
					extra: languageCode === k ? <IconCheck size={16} /> : null,
					onClick: () => {
						setLanguageCode(k as LanguageCode);
					},
				})),
			}}
		>
			<Control as={IconLanguage} style={{ color: iconFg }} />
		</Dropdown>
	);
};

export default Translations;
