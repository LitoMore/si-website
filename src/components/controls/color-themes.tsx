import {useColorTheme} from '#atom';
import {SegmentedControl} from '#components/ui/form.js';
import {useI18n} from '#hooks';
import {ColorTheme} from '#types';

export default function ColorThemes() {
	const [colorTheme, setColorTheme] = useColorTheme();
	const {i18n} = useI18n();
	return (
		<SegmentedControl
			label={`${i18n.settings.themeAuto} / ${i18n.settings.themeLight} / ${i18n.settings.themeDark}`}
			options={[
				{value: ColorTheme.Auto, label: i18n.settings.themeAuto},
				{value: ColorTheme.Light, label: i18n.settings.themeLight},
				{value: ColorTheme.Dark, label: i18n.settings.themeDark},
			]}
			value={colorTheme}
			onChange={setColorTheme}
		/>
	);
}
