import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import test from 'node:test';
import {buildCatalog, createCatalogModule} from './icon-catalog.ts';

async function readModule(bytes) {
	assert.ok(WebAssembly.validate(bytes));
	const {instance} = await WebAssembly.instantiate(bytes);
	const {memory, catalogOffset, catalogLength} = instance.exports;
	assert.ok(memory instanceof WebAssembly.Memory);
	assert.equal(typeof catalogOffset, 'function');
	assert.equal(typeof catalogLength, 'function');
	return Buffer.from(memory.buffer, catalogOffset(), catalogLength());
}

test('Wasm payload round-trips across signed LEB128 and memory page boundaries', async () => {
	const inputs = [
		0, 1, 63, 64, 127, 128, 8191, 8192, 16_383, 16_384, 65_535, 65_536, 65_537,
	].map((length) =>
		Buffer.from(Array.from({length}, (_, index) => index % 256)),
	);
	const unicode = Buffer.from('图标 & aliases — Český 🐈');
	inputs.push(unicode);
	const outputs = await Promise.all(
		inputs.map(async (data) => readModule(createCatalogModule(data))),
	);
	assert.deepEqual(outputs, inputs);
});

test('catalog contains the installed package version, metadata and exact paths', async () => {
	const require = createRequire(import.meta.url);
	const directory = path.dirname(require.resolve('simple-icons'));
	const {version} = JSON.parse(
		readFileSync(path.join(directory, 'package.json'), 'utf8'),
	);
	const metadata = JSON.parse(
		readFileSync(path.join(directory, 'data/simple-icons.json'), 'utf8'),
	);
	const assets = new Map(
		Object.values(require('simple-icons')).map((icon) => [icon.slug, icon]),
	);
	const {getIconSlug} = require('simple-icons/sdk');
	const bytes = await readModule(buildCatalog().bytes);
	const catalog = JSON.parse(bytes.toString());
	assert.equal(catalog.version, version);
	assert.equal(catalog.icons.length, metadata.length);
	assert.equal(
		new Set(catalog.icons.map((icon) => icon.slug)).size,
		metadata.length,
	);
	assert.deepEqual(
		catalog.icons.map((icon) => icon.slug),
		metadata.map((icon) => getIconSlug(icon)),
	);
	assert.deepEqual(
		catalog.icons.map((icon) => icon.index),
		metadata.map((_, index) => index),
	);
	assert.ok(
		catalog.icons.every((icon) => icon.path === assets.get(icon.slug).path),
	);
	const actualMetadata = catalog.icons.map(
		({path: _path, slug: _slug, index: _index, ...data}) => data,
	);
	const expectedMetadata = metadata.map(({slug: _slug, ...data}) => data);
	assert.deepEqual(actualMetadata, expectedMetadata);
});
