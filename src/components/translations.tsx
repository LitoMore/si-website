import { Dropdown } from "antd";
import { CheckOutlined, TranslationOutlined } from "@ant-design/icons";
import { useLanguageCode } from "#atom";
import { Control } from "#components";
import { translations } from "#i18n";
import { LanguageCode } from "#types";

const Translations = () => {
	const [languageCode, setLanguageCode] = useLanguageCode();

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
			<Control as={TranslationOutlined} />
		</Dropdown>
	);
};

export default Translations;
