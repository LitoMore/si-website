import assert from 'node:assert/strict';
import {after, test} from 'node:test';
import {createServer} from 'vite';

const server = await createServer({
	server: {middlewareMode: true, watch: null, hmr: false, ws: false},
	appType: 'custom',
});
after(() => server.close());
const {isValidOpenGraphImage, loadOpenGraphImage, openGraphGrid} =
	await server.ssrLoadModule('/src/components/opengraph/utils.ts');
const defaults = {width: 800, height: 600, size: 24, gap: 24};

test('canvas validation rejects unsafe dimensions and impossible spacing', () => {
	assert.ok(isValidOpenGraphImage(defaults));
	assert.ok(
		isValidOpenGraphImage({width: 128, height: 128, size: 128, gap: 0}),
	);
	assert.ok(isValidOpenGraphImage({...defaults, width: 4096, height: 4096}));
	const invalidSettings = [
		{width: 0},
		{width: 4097},
		{height: -1},
		{height: NaN},
		{size: 0},
		{size: 257},
		{gap: -1},
		{gap: 257},
		{width: 800.5},
		{width: 128, height: 128, size: 128, gap: 1},
	];
	assert.deepEqual(
		invalidSettings.map((invalid) =>
			isValidOpenGraphImage({...defaults, ...invalid}),
		),
		invalidSettings.map(() => false),
	);
});

test('compositions stay centered and reserve space for the main icon', () => {
	const compositions = [
		defaults,
		{...defaults, width: 1200, height: 630},
		{width: 128, height: 256, size: 128, gap: 0},
		{width: 256, height: 128, size: 128, gap: 0},
		{width: 128, height: 128, size: 128, gap: 0},
		{width: 128, height: 128, size: 8, gap: 0},
	];
	const results = compositions.map((settings) => {
		const grid = openGraphGrid(settings);
		const positions = Array.from(
			{length: grid.rows * grid.columns},
			(_, index) => {
				const {x, y} = grid.position(index);
				return (
					x >= 0 &&
					y >= 0 &&
					x + settings.size <= settings.width &&
					y + settings.size <= settings.height &&
					(grid.isCenter(index) ||
						x + settings.size <= grid.centerX ||
						x >= grid.centerX + grid.centerSize ||
						y + settings.size <= grid.centerY ||
						y >= grid.centerY + grid.centerSize)
				);
			},
		);
		return {
			centered:
				grid.centerX + grid.centerSize / 2 === settings.width / 2 &&
				grid.centerY + grid.centerSize / 2 === settings.height / 2,
			validPositions: positions.every(Boolean),
		};
	});
	assert.deepEqual(
		results,
		compositions.map(() => ({centered: true, validPositions: true})),
	);
});

test('icons opt into CORS before loading and report failed requests', async (t) => {
	class TestImage extends EventTarget {
		get src() {
			return this.source;
		}

		set src(source) {
			this.source = source;
			this.corsAtRequest = this.crossOrigin;
			this.dispatchEvent(new Event(source === 'bad.svg' ? 'error' : 'load'));
		}
	}

	const original = Object.getOwnPropertyDescriptor(globalThis, 'Image');
	Object.defineProperty(globalThis, 'Image', {
		value: TestImage,
		configurable: true,
	});
	t.after(() => {
		if (original) Object.defineProperty(globalThis, 'Image', original);
		else Reflect.deleteProperty(globalThis, 'Image');
	});
	const image = await loadOpenGraphImage('icon.svg');
	t.assert.ok(image instanceof TestImage);
	t.assert.strictEqual(image.corsAtRequest, 'anonymous');
	await t.assert.rejects(loadOpenGraphImage('bad.svg'), /Icon loading failed/);
});
