import {
	type MagnetGeometrySettings,
	type MagnetMesh,
	type MagnetModel,
	createModel,
	fuseModel,
	type prepareIcon,
} from './geometry.js';

export type GeometryTask =
	| {
			kind: 'build';
			icon: ReturnType<typeof prepareIcon>;
			settings: MagnetGeometrySettings;
	  }
	| {kind: 'fuse'; base: MagnetMesh; logo: MagnetMesh};

export type GeometryRequest = {id: number; task: GeometryTask};
export type GeometryResponse = {
	id: number;
	result?: MagnetModel | MagnetMesh;
	error?: string;
};

async function processTask({data}: MessageEvent<GeometryRequest>) {
	const {id, task} = data;
	try {
		const result =
			task.kind === 'build'
				? await createModel(task.icon, task.settings)
				: await fuseModel(task.base, task.logo);
		const meshes =
			'base' in result
				? [result.base, result.logo, ...result.logoParts]
				: [result];
		const buffers = new Set<ArrayBuffer>();
		for (const mesh of meshes) {
			for (const value of Object.values(mesh)) {
				if (ArrayBuffer.isView(value) && value.buffer instanceof ArrayBuffer) {
					buffers.add(value.buffer);
				}
			}
		}

		globalThis.postMessage({id, result} satisfies GeometryResponse, {
			transfer: [...buffers],
		});
	} catch (error: unknown) {
		globalThis.postMessage({
			id,
			error:
				error instanceof Error ? error.message : 'Could not build the model.',
		} satisfies GeometryResponse);
	}
}

globalThis.addEventListener(
	'message',
	(event: MessageEvent<GeometryRequest>) => {
		void processTask(event);
	},
);
