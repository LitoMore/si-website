import {type BrightnessMode, type Icon} from '#types';

export type CatalogIcon = Omit<Icon, 'brightness' | 'relativeColor'>;
export type Catalog = {version: string; icons: CatalogIcon[]};
export type LoadedCatalog = {version: string; icons: Icon[]};

export type CatalogTask =
	| {kind: 'load'; brightnessMode: BrightnessMode}
	| {kind: 'search'; query: string};

export type CatalogResult =
	{kind: 'load'; catalog: LoadedCatalog} | {kind: 'search'; indices: number[]};

export type CatalogRequest = {id: number; task: CatalogTask};
export type CatalogResponse = {
	id: number;
	result?: CatalogResult;
	error?: string;
};
