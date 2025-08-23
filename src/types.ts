import {type IconData} from './vendor/simple-icons-sdk.js';

export type {IconData} from './vendor/simple-icons-sdk.js';
export {type Internationalization, LanguageCode} from '#i18n';

export enum PageLayout {
	Default = 'default',
	Previewer = 'previewer',
}

export enum CardSize {
	Small = 100,
	Medium = 150,
	Large = 200,
}

export enum ColorTheme {
	Auto = 'auto',
	Light = 'light',
	Dark = 'dark',
}

export enum ColorMode {
	Actual = 'actual',
	Contrast = 'contrast',
}

export enum BrightnessMode {
	SimpleIcons = 'simpleicons',
	ShieldsIo = 'shieldsio',
}

export enum BitmapFormat {
	PNG = 'png',
	JPG = 'jpg',
	WebP = 'webp',
}

export type JsDelivrNpmResponse = {
	type: string;
	name: string;
	tags: Record<string, string>;
	versions: Array<{
		version: string;
		links: Record<string, string>;
	}>;
	links: Record<string, string>;
};

export type Icon = IconData & {
	index: number;
	slug: string;
	relativeColor: string;
	brightness: number;
};

export type IconsData = {
	allIcons: Icon[];
	version: string;
};

export enum BadgeStyle {
	Flat = 'flat',
	Social = 'social',
	Plastic = 'plastic',
	FlatSquare = 'flat-square',
	ForTheBadge = 'for-the-badge',
}

export type ImageElement = {
	element?: HTMLImageElement;
	size: number;
	x: number;
};

export type ImageState = 'loaded' | 'loading' | 'failed';

export type OpenGraphImage = {
	width: number;
	height: number;
	size: number;
	gap: number;
};
