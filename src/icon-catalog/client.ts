import {type BrightnessMode} from '#types';
import type {
	CatalogRequest,
	CatalogResponse,
	CatalogResult,
	CatalogTask,
	LoadedCatalog,
} from './types.js';

let worker: Worker | undefined;
let nextId = 0;
const pending = new Map<
	number,
	{resolve: (result: CatalogResult) => void; reject: (error: Error) => void}
>();
const catalogs = new Map<BrightnessMode, Promise<LoadedCatalog>>();

function getWorker() {
	if (!worker) {
		worker = new Worker(new URL('catalog-worker.ts', import.meta.url), {
			type: 'module',
		});
		const activeWorker = worker;
		worker.addEventListener(
			'message',
			({data}: MessageEvent<CatalogResponse>) => {
				const request = pending.get(data.id);
				pending.delete(data.id);
				if (data.result) request?.resolve(data.result);
				else
					request?.reject(
						new Error(data.error ?? 'Could not read the icon catalog.'),
					);
			},
		);
		const fail = () => {
			if (worker !== activeWorker) return;
			activeWorker.terminate();
			worker = undefined;
			catalogs.clear();
			for (const request of pending.values())
				request.reject(new Error('Could not start the icon worker.'));
			pending.clear();
		};

		worker.addEventListener('error', fail);
		worker.addEventListener('messageerror', fail);
	}

	return worker;
}

async function runTask(task: CatalogTask) {
	const activeWorker = getWorker();
	const id = nextId++;
	return new Promise<CatalogResult>((resolve, reject) => {
		pending.set(id, {resolve, reject});
		try {
			activeWorker.postMessage({id, task} satisfies CatalogRequest);
		} catch (error: unknown) {
			pending.delete(id);
			reject(
				error instanceof Error
					? error
					: new Error('Could not send the icon request.'),
			);
		}
	});
}

export async function loadIconCatalog(brightnessMode: BrightnessMode) {
	let catalog = catalogs.get(brightnessMode);
	if (!catalog) {
		catalog = runTask({kind: 'load', brightnessMode})
			.then((result) => {
				if (result.kind !== 'load')
					throw new Error('Invalid icon catalog response.');
				return result.catalog;
			})
			.catch((error: unknown) => {
				if (catalogs.get(brightnessMode) === catalog)
					catalogs.delete(brightnessMode);
				throw error;
			});
		catalogs.set(brightnessMode, catalog);
	}

	return catalog;
}

export async function searchIconCatalog(query: string) {
	const result = await runTask({kind: 'search', query});
	if (result.kind !== 'search')
		throw new Error('Invalid icon search response.');
	return result.indices;
}
