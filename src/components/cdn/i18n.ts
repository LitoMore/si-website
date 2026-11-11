import {useI18n} from '#hooks';
import {LanguageCode} from '#types';

const en = {
	description: 'An icon. A URL. Ready to use.',
	intro:
		'Use Simple Icons anywhere with a URL. Customize colors, adapt to dark mode, and find the right size. No installation needed.',
	github: 'View on GitHub',
	build: 'Build your icon URL',
	buildHint: 'Make it yours, then copy it into your project.',
	slug: 'Icon slug',
	slugHint: 'Search by brand or enter a slug, such as simpleicons.',
	color: 'Light color',
	darkColor: 'Dark color',
	brandColor: 'Brand color',
	sameColor: 'Same as light',
	colorHint:
		'Use hex (without #) or a CSS color name. Leave blank for the brand color.',
	size: 'Size (px)',
	intrinsicSize: 'Default',
	autoViewbox: 'Fit viewBox to the icon',
	viewboxHint: 'Remove empty space for a consistent visual size.',
	preview: 'Preview',
	light: 'Light',
	dark: 'Dark',
	previewHint:
		'Compare both appearances. Your URL switches colors with the viewer’s system theme.',
	loading: 'Loading icon…',
	loadError: 'Could not load this icon. Check the slug or try again.',
	retry: 'Retry',
	invalid:
		'Enter an icon slug using letters and numbers, and a positive whole-number size (or leave size blank).',
	output: 'Use this icon',
	format: 'Code format',
	open: 'Open SVG',
	parameters: 'The URL, explained',
	parametersHint: 'One endpoint, a few optional details.',
	slugDescription:
		'The icon identifier, such as simpleicons or github. Find it by clicking an icon title in the gallery.',
	colorDescription:
		'Optional. A 3, 4, 6, or 8-digit hex value or CSS color name. Omit it for the brand color. Invalid values also fall back to the brand color.',
	darkDescription:
		'Optional. A color for prefers-color-scheme: dark. Use _ in either color position to keep the brand color.',
	viewboxDescription:
		'Optional. Add ?viewbox=auto to fit the viewBox to the icon’s shape instead of the default square.',
	sizeDescription:
		'Optional. Add ?size=24 to set the icon size while preserving its aspect ratio. Combine query parameters with &.',
	examples: 'A few ways to use it',
	examplesHint: 'Choose an example to try it in the builder.',
	defaultExample: 'Brand color',
	customExample: 'CSS color names',
	themeExample: 'Light & dark',
	sizeExample: 'Fit & resize',
	elsewhere: 'Other usages',
	elsewhereHint:
		'Bring brand icons into your everyday tools. Copy a URL from the builder above, or start with one of these examples.',
	usageNavigation: 'Choose a usage guide',
	openScreenshot: 'Open full-size screenshot',
	usages: {
		raycast: {
			description:
				'Find an icon and copy its CDN link without leaving your keyboard.',
			steps: [
				'Install the Brand Icons – simpleicons.org extension from the Raycast Store.',
				'Open Raycast, run Search Brand Icons, and search for a brand.',
				'Open the selected icon’s actions and copy its cdn.simpleicons.org link. Paste it into your app or project.',
			],
			tip: 'The extension also lets you view and copy SVG source and brand colors, and inspect guidelines, sources, and licenses.',
			link: 'Get the Raycast extension',
			imageAlt:
				'The Brand Icons extension showing a searchable grid of brand icons in Raycast.',
		},
		notion: {
			description:
				'Give pages, projects, and callouts a recognizable brand icon.',
			steps: [
				'At the top of a Notion page, choose Add icon or click the existing page icon.',
				'Open the image upload or custom-image tab, then paste a CDN image URL into the link field.',
				'Confirm the image to use it as the page icon. For an image inside the page, type /image and use the same URL.',
				'To update a callout icon, click its icon and use the same custom-image link option.',
			],
			tip: 'This example supplies light and dark colors using prefers-color-scheme. To choose a fixed appearance, use /simpleicons/111 for a dark icon or /simpleicons/eee for a light one.',
			link: 'Notion’s page icon guide',
			imageAlt:
				'Notion’s custom-icon dialog with a Simple Icons CDN URL in the image-link field.',
		},
		kando: {
			description:
				'Customize the brand and color of icons in your radial menus.',
			steps: [
				'Open Kando’s menu editor, select a menu item, and open its icon picker.',
				'Choose Base64 / URL from the icon-theme dropdown.',
				'Paste a CDN URL and confirm. The example below uses a white GitHub icon; change white to a hex color or another CSS color name to match your menu.',
			],
			tip: 'Kando includes plain and colored Simple Icons themes. Use a CDN URL when you want to specify the icon’s color yourself.',
			link: 'Kando’s icon theme guide',
			imageAlt:
				'Kando’s icon picker using Base64 / URL to display a white GitHub icon in a radial menu.',
		},
		terminal: {
			description: 'Display icons inline in iTerm2 using its imgcat utility.',
			steps: [
				'Use iTerm2 and get the imgcat script linked in its official inline-image documentation.',
				'Run one of the commands below. Each fetches an SVG directly from the CDN and displays it in the terminal.',
			],
			tip: 'Keep the URL in quotes so the shell treats & as part of the URL. These examples require a terminal with inline-image support and the imgcat utility.',
			link: 'iTerm2 image support & imgcat',
			imageAlt:
				'Three imgcat commands displaying the Go icon with its default viewBox, a fitted viewBox, and a larger size.',
		},
	},
	terminalBasic: 'Brand color, default viewBox',
	terminalFit: 'Fit the viewBox to the icon',
	terminalSized: 'Fit the viewBox and set a 48 px size',
	legal: 'Before using icons, please read the Simple Icons legal disclaimer.',
	readme: 'Full documentation',
};

const zh: typeof en = {
	description: '一个图标，一个链接，即刻使用。',
	intro:
		'通过 URL 随处使用 Simple Icons。自定义颜色、适配深色模式、调整尺寸，无需安装。',
	github: '在 GitHub 上查看',
	build: '生成图标链接',
	buildHint: '调整到喜欢的效果，复制到你的项目中。',
	slug: '图标标识（slug）',
	slugHint: '搜索品牌或输入图标标识，例如 simpleicons。',
	color: '浅色模式颜色',
	darkColor: '深色模式颜色',
	brandColor: '品牌原色',
	sameColor: '与浅色模式相同',
	colorHint: '支持十六进制颜色（不含 #）或 CSS 颜色名称，留空使用品牌原色。',
	size: '尺寸（px）',
	intrinsicSize: '默认',
	autoViewbox: '让 viewBox 贴合图标',
	viewboxHint: '去除留白，让不同图标的视觉尺寸更一致。',
	preview: '预览',
	light: '浅色',
	dark: '深色',
	previewHint: '对比两种外观。生成的链接会根据浏览者的系统主题切换颜色。',
	loading: '正在加载图标…',
	loadError: '无法加载图标，请检查图标标识或重试。',
	retry: '重试',
	invalid: '请输入由英文字母和数字组成的图标标识，尺寸须为正整数或留空。',
	output: '使用这个图标',
	format: '代码格式',
	open: '打开 SVG',
	parameters: '读懂这个 URL',
	parametersHint: '一个接口，几个可选参数。',
	slugDescription:
		'图标标识，例如 simpleicons 或 github。在首页点击图标名称即可复制。',
	colorDescription:
		'可选。支持 3、4、6、8 位十六进制颜色或 CSS 颜色名称。省略或使用无效值时，回退到品牌原色。',
	darkDescription:
		'可选。在 prefers-color-scheme: dark 下使用的颜色。在任一颜色位置填写 _ 可保留品牌原色。',
	viewboxDescription:
		'可选。添加 ?viewbox=auto，让 viewBox 贴合图标形状，替代默认的正方形。',
	sizeDescription:
		'可选。添加 ?size=24 调整图标尺寸，并保持宽高比。多个查询参数用 & 连接。',
	examples: '从这些例子开始',
	examplesHint: '点击示例，在上方生成器中试一试。',
	defaultExample: '品牌原色',
	customExample: 'CSS 颜色名称',
	themeExample: '明暗自适应',
	sizeExample: '贴合与缩放',
	elsewhere: '更多使用方式',
	elsewhereHint:
		'把品牌图标带进日常工具。复制上方生成器中的链接，或从下面的示例开始。',
	usageNavigation: '选择使用指南',
	openScreenshot: '查看完整截图',
	usages: {
		raycast: {
			description: '通过键盘搜索品牌图标，直接复制 CDN 链接。',
			steps: [
				'在 Raycast 商店安装 Brand Icons – simpleicons.org 扩展。',
				'打开 Raycast，运行 Search Brand Icons 命令，搜索需要的品牌。',
				'打开所选图标的操作菜单，复制 cdn.simpleicons.org 链接，粘贴到你的应用或项目中。',
			],
			tip: '扩展也支持查看和复制 SVG 源码、品牌颜色，以及查看品牌使用规范、来源和许可证。',
			link: '获取 Raycast 扩展',
			imageAlt: 'Raycast 的 Brand Icons 扩展，以可搜索的网格展示品牌图标。',
		},
		notion: {
			description: '为页面、项目和 Callout 添加易于识别的品牌图标。',
			steps: [
				'在 Notion 页面顶部点击“添加图标”，或点击已有的页面图标。',
				'打开上传图片或自定义图片选项，在图片链接输入框中粘贴 CDN URL。',
				'确认后即可将图片设为页面图标。若要在正文中插入图片，输入 /image 并使用同一个链接。',
				'若要更换 Callout 图标，点击它的现有图标，再通过相同的自定义图片链接选项设置。',
			],
			tip: '此示例通过 prefers-color-scheme 提供明暗两种颜色。如需固定外观，使用 /simpleicons/111 显示深色图标，或 /simpleicons/eee 显示浅色图标。',
			link: 'Notion 页面图标指南',
			imageAlt:
				'Notion 的自定义图标窗口，在图片链接输入框中填写 Simple Icons CDN URL。',
		},
		kando: {
			description: '为径向菜单中的项目自定义品牌图标和颜色。',
			steps: [
				'打开 Kando 菜单编辑器，选中一个菜单项目，打开图标选择器。',
				'在图标主题下拉菜单中选择 Base64 / URL。',
				'粘贴 CDN 链接并确认。下面的示例使用白色 GitHub 图标；将 white 改为十六进制颜色或其他 CSS 颜色名称，即可搭配你的菜单主题。',
			],
			tip: 'Kando 已内置单色和彩色 Simple Icons 图标集。需要自行指定图标颜色时，可以使用 CDN 链接。',
			link: 'Kando 图标主题指南',
			imageAlt:
				'Kando 的图标选择器通过 Base64 / URL，为径向菜单设置白色 GitHub 图标。',
		},
		terminal: {
			description: '借助 imgcat 工具，在 iTerm2 终端中直接显示图标。',
			steps: [
				'使用 iTerm2，并从其官方内联图片文档中获取 imgcat 脚本。',
				'运行下面任意一条命令，即可从 CDN 获取 SVG 并在终端中显示。',
			],
			tip: '请保留链接两侧的引号，让 Shell 将 & 视为 URL 的一部分。这些示例需要支持内联图片的终端和 imgcat 工具。',
			link: 'iTerm2 图片支持与 imgcat',
			imageAlt:
				'三条 imgcat 命令，分别展示 Go 图标的默认 viewBox、贴合 viewBox 和放大后的尺寸。',
		},
	},
	terminalBasic: '品牌原色，默认 viewBox',
	terminalFit: '让 viewBox 贴合图标',
	terminalSized: '贴合图标，并设置 48 px 尺寸',
	legal: '使用图标前，请阅读 Simple Icons 法律免责声明。',
	readme: '完整文档',
};

const zhHant: typeof en = {
	description: '一個圖示，一個連結，即刻使用。',
	intro:
		'透過 URL 隨處使用 Simple Icons。自訂顏色、適配深色模式、調整尺寸，無需安裝。',
	github: '在 GitHub 上檢視',
	build: '產生圖示連結',
	buildHint: '調整到喜歡的效果，複製到你的專案中。',
	slug: '圖示識別碼（slug）',
	slugHint: '搜尋品牌或輸入圖示識別碼，例如 simpleicons。',
	color: '淺色模式顏色',
	darkColor: '深色模式顏色',
	brandColor: '品牌原色',
	sameColor: '與淺色模式相同',
	colorHint: '支援十六進位顏色（不含 #）或 CSS 顏色名稱，留空使用品牌原色。',
	size: '尺寸（px）',
	intrinsicSize: '預設',
	autoViewbox: '讓 viewBox 貼合圖示',
	viewboxHint: '去除留白，讓不同圖示的視覺尺寸更一致。',
	preview: '預覽',
	light: '淺色',
	dark: '深色',
	previewHint: '對比兩種外觀。產生的連結會根據瀏覽者的系統主題切換顏色。',
	loading: '正在載入圖示…',
	loadError: '無法載入圖示，請檢查圖示識別碼或重試。',
	retry: '重試',
	invalid: '請輸入由英文字母和數字組成的圖示識別碼，尺寸須為正整數或留空。',
	output: '使用這個圖示',
	format: '程式碼格式',
	open: '開啟 SVG',
	parameters: '讀懂這個 URL',
	parametersHint: '一個介面，幾個可選參數。',
	slugDescription:
		'圖示識別碼，例如 simpleicons 或 github。在首頁點擊圖示名稱即可複製。',
	colorDescription:
		'可選。支援 3、4、6、8 位十六進位顏色或 CSS 顏色名稱。省略或使用無效值時，回退到品牌原色。',
	darkDescription:
		'可選。在 prefers-color-scheme: dark 下使用的顏色。在任一顏色位置填寫 _ 可保留品牌原色。',
	viewboxDescription:
		'可選。加入 ?viewbox=auto，讓 viewBox 貼合圖示形狀，取代預設的正方形。',
	sizeDescription:
		'可選。加入 ?size=24 調整圖示尺寸，並保持長寬比。多個查詢參數用 & 連接。',
	examples: '從這些範例開始',
	examplesHint: '點擊範例，在上方產生器中試一試。',
	defaultExample: '品牌原色',
	customExample: 'CSS 顏色名稱',
	themeExample: '明暗自適應',
	sizeExample: '貼合與縮放',
	elsewhere: '更多使用方式',
	elsewhereHint:
		'把品牌圖示帶進日常工具。複製上方產生器中的連結，或從下面的範例開始。',
	usageNavigation: '選擇使用指南',
	openScreenshot: '檢視完整截圖',
	usages: {
		raycast: {
			description: '透過鍵盤搜尋品牌圖示，直接複製 CDN 連結。',
			steps: [
				'在 Raycast 商店安裝 Brand Icons – simpleicons.org 擴充功能。',
				'開啟 Raycast，執行 Search Brand Icons 指令，搜尋需要的品牌。',
				'開啟所選圖示的操作選單，複製 cdn.simpleicons.org 連結，貼到你的應用程式或專案中。',
			],
			tip: '擴充功能也支援檢視與複製 SVG 原始碼、品牌顏色，以及檢視品牌使用規範、來源與授權條款。',
			link: '取得 Raycast 擴充功能',
			imageAlt: 'Raycast 的 Brand Icons 擴充功能，以可搜尋的網格展示品牌圖示。',
		},
		notion: {
			description: '為頁面、專案與 Callout 加入易於辨識的品牌圖示。',
			steps: [
				'在 Notion 頁面頂部點擊「加入圖示」，或點擊現有的頁面圖示。',
				'開啟上傳圖片或自訂圖片選項，在圖片連結欄位中貼上 CDN URL。',
				'確認後即可將圖片設為頁面圖示。若要在內文中插入圖片，輸入 /image 並使用同一個連結。',
				'若要更換 Callout 圖示，點擊它現有的圖示，再透過相同的自訂圖片連結選項設定。',
			],
			tip: '此範例透過 prefers-color-scheme 提供明暗兩種顏色。如需固定外觀，使用 /simpleicons/111 顯示深色圖示，或 /simpleicons/eee 顯示淺色圖示。',
			link: 'Notion 頁面圖示指南',
			imageAlt:
				'Notion 的自訂圖示視窗，在圖片連結欄位中填入 Simple Icons CDN URL。',
		},
		kando: {
			description: '為徑向選單中的項目自訂品牌圖示與顏色。',
			steps: [
				'開啟 Kando 選單編輯器，選取一個選單項目，開啟圖示選擇器。',
				'在圖示主題下拉選單中選擇 Base64 / URL。',
				'貼上 CDN 連結並確認。下面的範例使用白色 GitHub 圖示；將 white 改為十六進位顏色或其他 CSS 顏色名稱，即可搭配你的選單主題。',
			],
			tip: 'Kando 已內建單色與彩色 Simple Icons 圖示集。需要自行指定圖示顏色時，可以使用 CDN 連結。',
			link: 'Kando 圖示主題指南',
			imageAlt:
				'Kando 的圖示選擇器透過 Base64 / URL，為徑向選單設定白色 GitHub 圖示。',
		},
		terminal: {
			description: '透過 imgcat 工具，在 iTerm2 終端機中直接顯示圖示。',
			steps: [
				'使用 iTerm2，並從其官方內嵌圖片文件中取得 imgcat 腳本。',
				'執行下面任意一條指令，即可從 CDN 取得 SVG 並在終端機中顯示。',
			],
			tip: '請保留連結兩側的引號，讓 Shell 將 & 視為 URL 的一部分。這些範例需要支援內嵌圖片的終端機與 imgcat 工具。',
			link: 'iTerm2 圖片支援與 imgcat',
			imageAlt:
				'三條 imgcat 指令，分別展示 Go 圖示的預設 viewBox、貼合 viewBox 和放大後的尺寸。',
		},
	},
	terminalBasic: '品牌原色，預設 viewBox',
	terminalFit: '讓 viewBox 貼合圖示',
	terminalSized: '貼合圖示，並設定 48 px 尺寸',
	legal: '使用圖示前，請閱讀 Simple Icons 法律免責聲明。',
	readme: '完整文件',
};

export function useCdnI18n() {
	const context = useI18n();
	const labels =
		context.languageCode === LanguageCode.Chinese
			? zh
			: context.languageCode === LanguageCode.ChineseTraditional
				? zhHant
				: en;
	return {...context, labels};
}
