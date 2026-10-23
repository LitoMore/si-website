import {
	type MagnetGeometrySettings,
	type MagnetMesh,
	type MagnetModel,
	prepareIcon,
} from './geometry.js';
import type {
	GeometryRequest,
	GeometryResponse,
	GeometryTask,
} from './model-worker.js';

let worker: Worker | undefined;
let nextId = 0;
const requests = new Map<
	number,
	{
		resolve: (result: MagnetModel | MagnetMesh) => void;
		reject: (error: Error) => void;
	}
>();

function getWorker() {
	if (!worker) {
		worker = new Worker(new URL('model-worker.ts', import.meta.url), {
			type: 'module',
		});
		worker.addEventListener(
			'message',
			({data}: MessageEvent<GeometryResponse>) => {
				const request = requests.get(data.id);
				requests.delete(data.id);
				if (data.result) request?.resolve(data.result);
				else
					request?.reject(
						new Error(data.error ?? 'Could not build the model.'),
					);
			},
		);

		worker.addEventListener('error', () => {
			worker?.terminate();
			worker = undefined;
			for (const request of requests.values()) {
				request.reject(new Error('Could not start the geometry worker.'));
			}

			requests.clear();
		});
	}

	return worker;
}

async function runTask(task: GeometryTask) {
	const activeWorker = getWorker();
	const id = nextId++;
	return new Promise<MagnetModel | MagnetMesh>((resolve, reject) => {
		requests.set(id, {resolve, reject});
		try {
			// Keep the cached model's buffers intact when requesting an STL union.
			activeWorker.postMessage({id, task} satisfies GeometryRequest);
		} catch (error: unknown) {
			requests.delete(id);
			reject(
				error instanceof Error
					? error
					: new Error('Could not build the model.'),
			);
		}
	});
}

const models = new Map<string, Promise<MagnetModel>>();

export async function buildModel(
	key: string,
	path: string,
	settings: MagnetGeometrySettings,
) {
	const cached = models.get(key);
	if (cached) {
		models.delete(key);
		models.set(key, cached);
		return cached;
	}

	const pending = (async () => {
		const result = await runTask({
			kind: 'build',
			icon: prepareIcon(path),
			settings,
		});
		if (!('base' in result)) throw new Error('Invalid model response.');
		return result;
	})().catch((error: unknown) => {
		if (models.get(key) === pending) models.delete(key);
		throw error;
	});
	models.set(key, pending);
	// Bound retained meshes and share builds still in flight, including StrictMode.
	if (models.size > 8) models.delete(models.keys().next().value!);
	return pending;
}

export async function fuseForExport(model: MagnetModel) {
	const result = await runTask({
		kind: 'fuse',
		base: model.base,
		logo: model.logo,
	});
	if ('base' in result) throw new Error('Invalid mesh response.');
	return result;
}
