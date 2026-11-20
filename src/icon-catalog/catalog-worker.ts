import {Searcher} from 'fast-fuzzy';
import catalogUrl, {catalogByteLength} from 'virtual:icon-catalog';
import {BrightnessMode} from '#types';
import {colorForBackground} from '#vendor/make-badge-color.js';
import {searcherKeySelector} from './search.js';
import type {
	Catalog,
	CatalogRequest,
	CatalogResponse,
	LoadedCatalog,
} from './types.js';

type CatalogExports = {
	memory: WebAssembly.Memory;
	catalogOffset(): number;
	catalogLength(): number;
};

let catalog: Promise<Catalog> | undefined;
let searcher: ReturnType<typeof createSearcher> | undefined;
const prepared = new Map<BrightnessMode, LoadedCatalog>();

function createSearcher(icons: Catalog['icons']) {
	return new Searcher(icons, {keySelector: searcherKeySelector});
}

function reportProgress(progress: number) {
	globalThis.postMessage({progress} satisfies CatalogResponse);
}

async function downloadCatalog() {
	const response = await fetch(catalogUrl);
	if (!response.ok || !response.body)
		throw new Error('Could not load the bundled icon catalog.');

	// Fetch exposes decoded bytes even when the server compresses the response.
	const bytes = new Uint8Array(catalogByteLength);
	let loaded = 0;
	let lastProgress = 0;
	await response.body.pipeTo(
		new WritableStream<Uint8Array>({
			write(chunk) {
				bytes.set(chunk, loaded);
				loaded += chunk.byteLength;
				const progress = Math.floor((loaded / catalogByteLength) * 100);
				if (progress === lastProgress) return;
				reportProgress(progress);
				lastProgress = progress;
			},
		}),
	);

	if (loaded !== catalogByteLength) throw new Error('Incomplete icon catalog.');
	return bytes;
}

async function getCatalog() {
	catalog ??= (async () => {
		const {instance} = await WebAssembly.instantiate(await downloadCatalog());
		const exports = instance.exports as unknown as CatalogExports;
		const bytes = new Uint8Array(
			exports.memory.buffer,
			exports.catalogOffset(),
			exports.catalogLength(),
		);
		const data = JSON.parse(new TextDecoder().decode(bytes)) as Catalog;
		searcher = createSearcher(data.icons);
		return data;
	})().catch((error: unknown) => {
		reportProgress(0);
		catalog = undefined;
		throw error;
	});
	return catalog;
}

async function processTask({data: {id, task}}: MessageEvent<CatalogRequest>) {
	try {
		const source = await getCatalog();
		if (task.kind === 'search') {
			const matches = task.query ? searcher!.search(task.query) : source.icons;
			globalThis.postMessage({
				id,
				result: {kind: 'search', indices: matches.map((icon) => icon.index)},
			} satisfies CatalogResponse);
			return;
		}

		let result = prepared.get(task.brightnessMode);
		if (!result) {
			result = {
				version: source.version,
				icons: source.icons.map((icon) => ({
					...icon,
					...colorForBackground(
						`#${icon.hex}`,
						task.brightnessMode === BrightnessMode.SimpleIcons,
					),
				})),
			};
			prepared.set(task.brightnessMode, result);
		}

		globalThis.postMessage({
			id,
			result: {kind: 'load', catalog: result},
		} satisfies CatalogResponse);
	} catch (error: unknown) {
		globalThis.postMessage({
			id,
			error:
				error instanceof Error
					? error.message
					: 'Could not prepare the icon catalog.',
		} satisfies CatalogResponse);
	}
}

globalThis.addEventListener(
	'message',
	(event: MessageEvent<CatalogRequest>) => {
		void processTask(event);
	},
);
