import {Buffer} from 'node:buffer';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import type {SimpleIcon} from 'simple-icons';
import type {IconData} from 'simple-icons/sdk';
import type {Plugin} from 'vite';

const require = createRequire(import.meta.url);

// The catalog is static UTF-8 data in a standard Wasm memory. Generate the
// small container directly so builds do not require a separate compiler.
function unsigned(value: number): number[] {
	const bytes = [];
	do {
		const byte = value % 128;
		value = Math.floor(value / 128);
		bytes.push(byte + (value ? 128 : 0));
	} while (value);

	return bytes;
}

function section(id: number, data: Uint8Array | number[]) {
	return Buffer.concat([
		Buffer.from([id, ...unsigned(data.length)]),
		Buffer.from(data),
	]);
}

function constant(value: number) {
	const bytes = unsigned(value);
	// Positive i32.const values use signed LEB128.
	if (bytes.at(-1)! >= 64) {
		bytes[bytes.length - 1] = bytes.at(-1)! + 128;
		bytes.push(0);
	}

	const body = [0, 0x41, ...bytes, 0x0b];
	return [...unsigned(body.length), ...body];
}

function exportEntry(name: string, kind: number, index: number) {
	const bytes = Buffer.from(name);
	return [...unsigned(bytes.length), ...bytes, kind, ...unsigned(index)];
}

export function createCatalogModule(data: Uint8Array) {
	const pages = Math.ceil(data.length / 65_536);
	const dataHeader = Buffer.from([
		1,
		0,
		0x41,
		0,
		0x0b,
		...unsigned(data.length),
	]);
	const dataSection = Buffer.concat([dataHeader, Buffer.from(data)]);
	return Buffer.concat([
		Buffer.from([0, 0x61, 0x73, 0x6d, 1, 0, 0, 0]),
		section(1, [1, 0x60, 0, 1, 0x7f]),
		section(3, [2, 0, 0]),
		section(5, [1, 1, ...unsigned(pages), ...unsigned(pages)]),
		section(7, [
			3,
			...exportEntry('memory', 2, 0),
			...exportEntry('catalogOffset', 0, 0),
			...exportEntry('catalogLength', 0, 1),
		]),
		section(10, [2, ...constant(0), ...constant(data.length)]),
		section(11, dataSection),
	]);
}

export function buildCatalog() {
	const directory = dirname(require.resolve('simple-icons'));
	const packageFile = join(directory, 'package.json');
	const metadataFile = join(directory, 'data/simple-icons.json');
	const {version} = JSON.parse(readFileSync(packageFile, 'utf8')) as {
		version: string;
	};
	const metadata = JSON.parse(readFileSync(metadataFile, 'utf8')) as IconData[];
	const icons = Object.values(
		require('simple-icons') as Record<string, SimpleIcon>,
	);
	const {getIconSlug} = require('simple-icons/sdk') as {
		getIconSlug: (icon: IconData) => string;
	};
	const bySlug = new Map(icons.map((icon) => [icon.slug, icon]));
	const catalog = metadata.map((icon, index) => {
		const asset = bySlug.get(getIconSlug(icon));
		if (!asset) throw new Error(`Missing packaged SVG: ${icon.title}`);
		return {...icon, slug: asset.slug, path: asset.path, index};
	});
	return {
		bytes: createCatalogModule(
			Buffer.from(JSON.stringify({version, icons: catalog})),
		),
		files: [packageFile, metadataFile, require.resolve('simple-icons')],
	};
}

export default function iconCatalogPlugin(): Plugin {
	const id = '\0virtual:icon-catalog';
	let isDevelopment = false;
	let catalog: ReturnType<typeof buildCatalog> | undefined;
	const getCatalog = () => {
		catalog ??= buildCatalog();
		return catalog;
	};

	return {
		name: 'icon-catalog',
		configResolved(config) {
			isDevelopment = config.command === 'serve';
		},
		resolveId(source) {
			return source === 'virtual:icon-catalog' ? id : undefined;
		},
		load(source) {
			if (source !== id) return;
			const {bytes, files} = getCatalog();
			for (const file of files) this.addWatchFile(file);
			const sizeExport = `export const catalogByteLength = ${bytes.byteLength};`;
			if (isDevelopment)
				return `${sizeExport} export default import.meta.env.BASE_URL + "@icon-catalog/catalog.wasm"`;
			const reference = this.emitFile({
				type: 'asset',
				name: 'icon-catalog.wasm',
				source: bytes,
			});
			return `${sizeExport} export default import.meta.ROLLUP_FILE_URL_${reference}`;
		},
		configureServer(server) {
			server.middlewares.use((request, response, next) => {
				if (
					!request.url
						?.split('?', 1)[0]
						?.endsWith('/@icon-catalog/catalog.wasm')
				) {
					next();
					return;
				}

				try {
					response.setHeader('Content-Type', 'application/wasm');
					response.setHeader('Cache-Control', 'no-cache');
					response.end(getCatalog().bytes);
				} catch (error: unknown) {
					next(error);
				}
			});
		},
	};
}
