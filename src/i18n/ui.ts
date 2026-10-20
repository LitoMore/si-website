import {LanguageCode} from './_index.i18n.js';

const labels: Record<
	LanguageCode,
	{global: {close: string; settings: string; clearSearch: string}}
> = {
	[LanguageCode.Arabic]: {
		global: {close: 'إغلاق', settings: 'الإعدادات', clearSearch: 'مسح البحث'},
	},
	[LanguageCode.Chinese]: {
		global: {close: '关闭', settings: '设置', clearSearch: '清空搜索'},
	},
	[LanguageCode.ChineseTraditional]: {
		global: {close: '關閉', settings: '設定', clearSearch: '清除搜尋'},
	},
	[LanguageCode.Dutch]: {
		global: {
			close: 'Sluiten',
			settings: 'Instellingen',
			clearSearch: 'Zoekopdracht wissen',
		},
	},
	[LanguageCode.English]: {
		global: {close: 'Close', settings: 'Settings', clearSearch: 'Clear search'},
	},
	[LanguageCode.Finnish]: {
		global: {
			close: 'Sulje',
			settings: 'Asetukset',
			clearSearch: 'Tyhjennä haku',
		},
	},
	[LanguageCode.French]: {
		global: {
			close: 'Fermer',
			settings: 'Paramètres',
			clearSearch: 'Effacer la recherche',
		},
	},
	[LanguageCode.German]: {
		global: {
			close: 'Schließen',
			settings: 'Einstellungen',
			clearSearch: 'Suche löschen',
		},
	},
	[LanguageCode.GermanSwiss]: {
		global: {
			close: 'Schließen',
			settings: 'Einstellungen',
			clearSearch: 'Suche löschen',
		},
	},
	[LanguageCode.Greek]: {
		global: {
			close: 'Κλείσιμο',
			settings: 'Ρυθμίσεις',
			clearSearch: 'Εκκαθάριση αναζήτησης',
		},
	},
	[LanguageCode.Hindi]: {
		global: {close: 'बंद', settings: 'सेटिंग्स', clearSearch: 'खोज साफ़ करें'},
	},
	[LanguageCode.Italian]: {
		global: {
			close: 'Chiudi',
			settings: 'Impostazioni',
			clearSearch: 'Cancella ricerca',
		},
	},
	[LanguageCode.Japanese]: {
		global: {close: '閉じる', settings: '設定', clearSearch: '検索をクリア'},
	},
	[LanguageCode.Korean]: {
		global: {close: '닫기', settings: '설정', clearSearch: '검색 지우기'},
	},
	[LanguageCode.NorwegianBokmal]: {
		global: {close: 'Lukk', settings: 'Innstillinger', clearSearch: 'Tøm søk'},
	},
	[LanguageCode.Polish]: {
		global: {
			close: 'Zamknij',
			settings: 'Ustawienia',
			clearSearch: 'Wyczyść wyszukiwanie',
		},
	},
	[LanguageCode.Portuguese]: {
		global: {
			close: 'Fechar',
			settings: 'Definições',
			clearSearch: 'Limpar pesquisa',
		},
	},
	[LanguageCode.Romanian]: {
		global: {
			close: 'Închide',
			settings: 'Setări',
			clearSearch: 'Șterge căutarea',
		},
	},
	[LanguageCode.Russian]: {
		global: {
			close: 'Закрыть',
			settings: 'Настройки',
			clearSearch: 'Очистить поиск',
		},
	},
	[LanguageCode.SerbianLatin]: {
		global: {
			close: 'Zatvori',
			settings: 'Podešavanja',
			clearSearch: 'Obriši pretragu',
		},
	},
	[LanguageCode.Spanish]: {
		global: {
			close: 'Cerrar',
			settings: 'Ajustes',
			clearSearch: 'Borrar búsqueda',
		},
	},
	[LanguageCode.Swedish]: {
		global: {
			close: 'Stäng',
			settings: 'Inställningar',
			clearSearch: 'Rensa sökning',
		},
	},
	[LanguageCode.Turkish]: {
		global: {
			close: 'Kapat',
			settings: 'Ayarlar',
			clearSearch: 'Aramayı temizle',
		},
	},
	[LanguageCode.Ukrainian]: {
		global: {
			close: 'Закрити',
			settings: 'Налаштування',
			clearSearch: 'Очистити пошук',
		},
	},
	[LanguageCode.SerbianCyrillic]: {
		global: {
			close: 'Затвори',
			settings: 'Подешавања',
			clearSearch: 'Обриши претрагу',
		},
	},
};

export default labels;
