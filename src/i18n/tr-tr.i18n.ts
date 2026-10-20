import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'Reklam engelleyici tarafından engellenmiş veya geçici olarak kullanılamıyor olabilir.',
		label: 'Simple Icons’u destekleyin',
		loading: 'Destek için küçük bir alan',
		support:
			'Reklamlar Simple Icons’u desteklemeye yardımcı olur. Anlayışınız için teşekkürler.',
		unavailable: 'Normalde burada bir reklam görünür',
	},
	footer: {
		iconMissing: 'İkon eksik mi?',
		iconOutdated: 'İkon güncel değil mi?',
		line1:
			'{Simple Icons katkıda bulunanlar|https://github.com/simple-icons/simple-icons/graphs/contributors} tarafından sürdürülen {CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} projesi.',
		line2:
			'İstekler, düzeltmeler ve katkılar için {GitHub|https://github.com/simple-icons/simple-icons} kullanın.',
		line3:
			'{Open Collective|https://opencollective.com/simple-icons} üzerindeki bağışlarınızla desteklenmektedir.',
		madeWithLove: "GitHub'da ❤️ ile yapıldı",
		reportOutdated: 'Güncel olmayan ikonu bildir',
		submitRequest: 'Talep gönder',
	},
	header: {
		iconPreviewer: 'Önizleme oluşturucu',
		openGraphGenerator: 'OpenGraph Oluşturucu',
	},
	languageName: 'Türkçe',
	modal: {
		aliases: 'Diğer adlar',
		color: 'Renk',
		copied: '{} panoya kopyalandı',
		copy: '{} kopyala',
		download: 'İndir',
		guidelines: 'Marka yönergeleri',
		license: 'Lisans',
		source: 'Kaynak',
		sourceAndGuidelines: 'Kaynak ve yönergeler',
		svgColored: 'renkli SVG',
		svgPath: 'Yalnızca yol',
		svgPlain: 'Tek renkli SVG',
		title: 'Marka',
	},
	openGraph: {
		apply: 'Değişiklikleri uygula',
		canvas: 'Tuval ayarları',
		clipboardUnavailable:
			'Bu tarayıcıda görüntü kopyalama kullanılamıyor. Görüntüyü indirin.',
		copied: 'Görüntü panoya kopyalandı',
		copy: 'Görüntüyü kopyala',
		copyError:
			'Görüntü kopyalanamadı. Pano izinlerini kontrol edin veya görüntüyü indirin.',
		description: 'Simple Icons ile paylaşılacak bir görüntü oluşturun.',
		download: '{} indir',
		downloaded: 'Görüntü indirildi',
		export: 'Görüntüyü dışa aktar',
		exportError: 'Görüntü dışa aktarılamadı. Lütfen yeniden deneyin.',
		exportHint:
			'İndirmeler tuvalin özgün boyutunu kullanır. Görüntüler PNG olarak kopyalanır.',
		format: 'Dosya biçimi',
		gap: 'Aralık',
		height: 'Yükseklik',
		invalidSettings:
			'128–4096 px boyutlar, 8–256 px simgeler ve 0–256 px aralıklar kullanın. Simge ve kenar boşlukları tuvale sığmalıdır.',
		loadError: 'Simgeler yüklenemedi. Lütfen yeniden deneyin.',
		loading: 'Simgeler yükleniyor…',
		originalSize: 'Özgün boyutta dışa aktarılır',
		preview: 'Önizleme',
		reset: 'Sıfırla',
		retry: 'Yeniden dene',
		shuffleIcons: 'Rastgele sırala',
		size: 'Simge boyutu',
		width: 'Genişlik',
	},
	preview: {
		brand: 'Marka',
		centered: 'Simge (12, 12) noktasında ortalanmalıdır.',
		collinear: 'Gereksiz eşdoğrusal çizgi parçasını kaldırın.',
		copyScreenshot: 'Önizlemeyi kopyala',
		downloadSvg: 'SVG indir',
		exportError: 'Görüntü dışa aktarılamadı. Lütfen yeniden deneyin.',
		fix: 'Düzelt',
		invalidFile: 'Yol içeren bir SVG dosyası yükleyin.',
		invalidPath: 'Boyutu sıfır olmayan geçerli bir SVG yolu girin.',
		loadError: 'Simgeler yüklenemedi. Lütfen yeniden deneyin.',
		moreSuggestions: 'Diğer öneriler',
		negativeZero: 'Negatif sıfırı sıfırla değiştirin.',
		path: 'Yol',
		precision: 'En fazla üç ondalık basamak kullanın.',
		savePreview: 'Önizlemeyi kaydet',
		show: 'Göster',
		size: 'Simgenin en uzun kenarı 24px olmalıdır.',
		uploadSvg: 'SVG yükle',
	},
	search: {
		noIconsFound: 'Simge bulunamadı',
		searchByBrand: 'Markaya göre ara...',
	},
	settings: {
		actual: 'Özgün renkler',
		actualTooltip:
			'Simgelerin özgün renklerini gösterir. Bazıları zor görülebilir.',
		contrast: 'Kontrast',
		contrastTooltip:
			'Simgelerin görünürlüğünü artırmak için kontrast filtresi uygular.',
		language: 'Dili değiştir',
		reset: 'Sıfırla',
		themeAuto: 'Sistem renk şeması',
		themeDark: 'Koyu renk şeması',
		themeLight: 'Açık renk şeması',
		zoom: 'Yakınlaştırma',
	},
	share: {
		actionIntentText: 'Simple Icons: Popüler markalar için {} SVG ikon',
		share: 'Bunu paylaş',
		yourMastodonInstance: 'Mastodon sunucunuz',
	},
	thirdParties: {
		extensions: 'Eklentiler',
		libraries: 'Kütüphaneler',
	},
};

export default translation;
