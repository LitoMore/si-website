import {Radio} from 'antd';
import {useColorTheme} from '#atom';
import {useI18n} from '#hooks';
import {ColorTheme} from '#types';

function ColorThemes() {
	const [colorTheme, setColorTheme] = useColorTheme();
	const {i18n} = useI18n();

	return (
		<Radio.Group
			block
			buttonStyle="solid"
			defaultValue={ColorTheme.Auto}
			optionType="button"
			value={colorTheme}
			onChange={(event) => {
				setColorTheme(event.target.value as ColorTheme);
			}}
		>
			<Radio.Button value={ColorTheme.Auto}>
				{i18n.settings.themeAuto}
			</Radio.Button>
			<Radio.Button value={ColorTheme.Light}>
				{i18n.settings.themeLight}
			</Radio.Button>
			<Radio.Button value={ColorTheme.Dark}>
				{i18n.settings.themeDark}
			</Radio.Button>
		</Radio.Group>
	);
}

export default ColorThemes;
