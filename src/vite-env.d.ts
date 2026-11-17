// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

declare module 'virtual:icon-catalog' {
	const url: string;
	export default url;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
