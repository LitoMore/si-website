import {type Internationalization} from '#types';

// Shared labels adapted from simple-icons/simple-icons-website-rs (CC0).
const translation: Internationalization = {
	advertisement: {
		description:
			'広告ブロッカーで非表示になっているか、一時的に利用できません。',
		label: 'Simple Icons を支援',
		loading: '支援のための小さなスペース',
		support:
			'広告は Simple Icons の運営を支えています。ご理解ありがとうございます。',
		unavailable: '通常はここに広告が表示されます',
	},
	footer: {
		iconMissing: 'アイコンがない？',
		iconOutdated: 'アイコンが古い？',
		line1:
			'{CC0|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} によって維持される {Simple Icons の貢献者|https://github.com/simple-icons/simple-icons/graphs/contributors}プロジェクト。',
		line2:
			'リクエスト、修正、貢献には {GitHub|https://github.com/simple-icons/simple-icons} を使用してください。',
		line3:
			'{Open Collective|https://opencollective.com/simple-icons} での寄付により、ご支援をお願いいたします。',
		madeWithLove: 'GitHub の ❤️ で作成',
		reportOutdated: '古いアイコンを報告',
		submitRequest: 'リクエストを送信',
	},
	header: {
		iconPreviewer: 'プレビュー ジェネレーター',
		openGraphGenerator: 'OpenGraph 画像ジェネレーター',
	},
	languageName: '日本語',
	modal: {
		aliases: '別名',
		color: '色',
		copied: '{} をクリップボードにコピーしました',
		copy: '{} をコピー',
		download: 'ダウンロード',
		guidelines: 'ブランドガイドライン',
		license: 'ライセンス',
		source: '出典',
		sourceAndGuidelines: '出典とガイドライン',
		svgColored: '色付きSVG',
		svgPath: 'パスのみ',
		svgPlain: '単色 SVG',
		title: 'ブランド',
	},
	openGraph: {
		apply: '変更を適用',
		canvas: 'キャンバス設定',
		clipboardUnavailable:
			'このブラウザーでは画像をコピーできません。画像をダウンロードしてください。',
		copied: '画像をクリップボードにコピーしました',
		copy: '画像をコピー',
		copyError:
			'画像をコピーできませんでした。クリップボードの権限を確認するか、画像をダウンロードしてください。',
		description: 'Simple Icons で共有用の画像を作成します。',
		download: '{} をダウンロード',
		downloaded: '画像をダウンロードしました',
		export: '画像を書き出す',
		exportError: '画像を書き出せませんでした。もう一度お試しください。',
		exportHint:
			'ダウンロードには元のキャンバスサイズを使用します。画像は PNG 形式でコピーされます。',
		format: 'ファイル形式',
		gap: '間隔',
		height: '高さ',
		invalidSettings:
			'キャンバスは 128–4096 px、アイコンは 8–256 px、間隔は 0–256 px にしてください。アイコンと余白がキャンバス内に収まる必要があります。',
		loadError: 'アイコンを読み込めませんでした。もう一度お試しください。',
		loading: 'アイコンを読み込み中…',
		originalSize: '元のサイズで書き出し',
		preview: 'プレビュー',
		reset: 'リセット',
		retry: '再試行',
		shuffleIcons: 'ランダムに並べ替え',
		size: 'アイコンのサイズ',
		width: '幅',
	},
	preview: {
		brand: 'ブランド',
		centered: 'アイコンの中心を (12, 12) にしてください。',
		collinear: '同一直線上の不要な線分を削除してください。',
		copyScreenshot: 'プレビューをコピー',
		downloadSvg: 'SVG をダウンロード',
		exportError: '画像を書き出せませんでした。もう一度お試しください。',
		fix: '修正',
		invalidFile: 'パスを含む SVG ファイルをアップロードしてください。',
		invalidPath: 'サイズがゼロでない有効な SVG パスを入力してください。',
		loadError: 'アイコンを読み込めませんでした。もう一度お試しください。',
		moreSuggestions: 'その他の候補',
		negativeZero: '負のゼロをゼロに置き換えてください。',
		path: 'パス',
		precision: '小数点以下は 3 桁以内にしてください。',
		savePreview: 'プレビューを保存',
		show: '表示',
		size: 'アイコンの最長辺を 24px にしてください。',
		uploadSvg: 'SVG をアップロード',
	},
	search: {
		noIconsFound: 'アイコンが見つかりません',
		searchByBrand: 'ブランドから探す...',
	},
	settings: {
		actual: '元の色',
		actualTooltip:
			'アイコン本来の色で表示します。一部のアイコンが見えにくくなる場合があります。',
		contrast: 'コントラスト',
		contrastTooltip: 'コントラストフィルターでアイコンを見やすくします。',
		language: '言語を変えてください',
		reset: 'リセット',
		themeAuto: 'システムと同期',
		themeDark: 'ダークモード',
		themeLight: 'ライトモード',
		zoom: 'ズーム',
	},
	share: {
		actionIntentText: 'Simple Icons: 人気ブランドの {} 個の SVG アイコン',
		share: 'シェアする',
		yourMastodonInstance: 'Mastodon インスタンス',
	},
	thirdParties: {
		extensions: '拡張機能',
		libraries: 'ライブラリ',
	},
};

export default translation;
