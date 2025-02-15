import { Internationalization } from "#types";

const translation: Internationalization = {
	languageName: "中文",
	modal: {
		aliases: "别名",
		color: "主题色",
		copied: `已复制 {} 到剪贴板`,
		copy: "复制",
		download: "下载图标",
		guidelines: "设计指南",
		license: "版权/许可证",
		source: "出处",
		sourceAndGuidelines: "出处 & 设计指南",
		svgColored: "彩色 SVG",
		svgPlain: "黑白 SVG",
		svgPath: "仅路径",
		title: "名称",
	},
	search: {
		noIconsFound: "暂无数据",
		searchByBrand: "按品牌名称搜索…",
	},
	settings: {
		actual: "原色模式",
		actualTooltip:
			"将以图标真实颜色展示，但可能会存在有些颜色看起来不是很清楚。",
		contrast: "对比度模式",
		contrastTooltip: "颜色会添加一层对比度滤镜，以便浏览。",
		reset: "恢复默认",
		themeAuto: "跟随系统",
		themeDark: "暗色主题",
		themeLight: "亮色主题",
		zoom: "缩放",
	},
	footer: {
		iconMissing: "缺少图标？",
		iconOutdated: "有图标过时了吗？",
		submitRequest: "请求新增图标",
		reportOutdated: "上报过时图标",
		madeWithLove: "在 GitHub 上用 ❤️ 发电",
		line1:
			"此项目基于 {CCO|https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md} 许可证，并由 {Simple Icons 贡献者们|https://github.com/simple-icons/simple-icons/graphs/contributors} 维护。",
		line2:
			"请通过 {GitHub|https://github.com/simple-icons/simple-icons} 来提交图标相关请求、更正及其它贡献。",
		line3:
			"您可以通过 {Open Collective|https://opencollective.com/simple-icons} 来赞助支持我们。",
	},
};

export default translation;
