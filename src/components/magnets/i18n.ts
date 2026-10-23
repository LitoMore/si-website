import {useI18n} from '#hooks';
import type {LanguageCode} from '#types';
import translations from '../../i18n/magnets.json' with {type: 'json'};

export type MagnetLabels = {[Key in keyof typeof translations.en]: string};
export const magnetTranslations: Record<LanguageCode, MagnetLabels> =
	translations;
export function useMagnetI18n() {
	const context = useI18n();
	return {...context, labels: magnetTranslations[context.languageCode]};
}
