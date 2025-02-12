import { Internationalization } from "#types";

const translation: Internationalization = {
	languageName: "中文",
	modal: {
		aliases: "别名",
		color: "主题色",
		copied: (name: string) => `已复制 ${name} 到剪贴板`,
		copy: "复制",
		download: "下载图标",
		guidelines: "设计指南",
		license: "版权/许可证",
		source: "出处",
		sourceAndGuidelines: "出处 & 设计指南",
		svgColored: "彩色 SVG",
		svgPlain: "黑白 SVG",
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
};

export default translation;
