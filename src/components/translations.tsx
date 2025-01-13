import { Dropdown } from "antd";
import { CheckOutlined, TranslationOutlined } from "@ant-design/icons";
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
					extra: languageCode === k ? <CheckOutlined /> : null,
					onClick: () => {
						setLanguageCode(k as LanguageCode);
					},
				})),
			}}
		>
			<Control as={TranslationOutlined} style={{ color: iconFg }} />
		</Dropdown>
	);
};

export default Translations;
