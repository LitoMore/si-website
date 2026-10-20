import assert from 'node:assert/strict';
import {Buffer} from 'node:buffer';
import {after, test} from 'node:test';
import {createServer} from 'vite';

const server = await createServer({
	server: {middlewareMode: true, watch: null, hmr: false, ws: false},
	appType: 'custom',
});
after(() => server.close());
const {
	iconSvg,
	isValidColor,
	lintPath,
	normalizePreviewColor,
	previewSlug,
	svgBase64,
} = await server.ssrLoadModule('/src/components/preview/utils.ts');
const labels = {
	invalidPath: 'invalid',
	precision: 'precision',
	negativeZero: 'negative',
	size: 'size',
	centered: 'centered',
	collinear: 'collinear',
};

test('pasted CSS colors normalize and incomplete colors remain invalid', () => {
	assert.equal(normalizePreviewColor('#aB12cD'), 'AB12CD');
	assert.equal(normalizePreviewColor('rgb(49, 120, 198)'), '3178C6');
	assert.equal(normalizePreviewColor('rgba(49, 120, 198, 0.5)'), '3178C6');
	assert.deepEqual(
		['ABC', '123456'].map((color) => isValidColor(color)),
		[true, true],
	);
	assert.deepEqual(
		['', 'AB', 'ABCD', '12345G'].map((color) => isValidColor(color)),
		[false, false, false, false],
	);
});

test('custom brand filenames follow Simple Icons slug rules', () => {
	assert.equal(previewSlug('Foo Bar'), 'foobar');
	assert.equal(previewSlug('Node.js'), 'nodedotjs');
	assert.equal(previewSlug('C++'), 'cplusplus');
});

test('exported SVG escapes custom text and path attributes', () => {
	const svg = iconSvg('<Brand & "Co">', 'M0 0"/><script>bad</script>');
	assert.ok(svg.includes('&lt;Brand &amp; &quot;Co&quot;&gt;'));
	assert.ok(!svg.includes('<script>'));
	assert.ok(!svg.includes('fill='));
	const unicodeSvg = iconSvg('品牌', 'M0 0');
	const encoded = svgBase64(unicodeSvg).split(',', 2)[1];
	assert.equal(Buffer.from(encoded, 'base64').toString(), unicodeSvg);
});

test('invalid and zero-area paths report a warning without throwing', () => {
	const invalidPaths = [
		'',
		'M0 0h',
		'L0 0',
		'M0 0',
		'M0 0 rubbish',
		'M0 0LNaN 2',
	];
	const results = invalidPaths.map(
		(path) => lintPath(path, labels)[0]?.message,
	);
	assert.deepEqual(
		results,
		invalidPaths.map(() => 'invalid'),
	);
	assert.deepEqual(lintPath('M0 0h24v24h-24z', labels), []);
});

test('path fixes produce centered 24px geometry and remove formatting problems', () => {
	const size = lintPath('M1 1h10v10h-10z', labels).find(
		(issue) => issue.message === 'size',
	);
	assert.ok(size?.fix);
	assert.deepEqual(lintPath(size.fix, labels), []);
	const centered = lintPath('M1 1h24v24h-24z', labels).find(
		(issue) => issue.message === 'centered',
	);
	assert.ok(centered?.fix);
	assert.deepEqual(lintPath(centered.fix, labels), []);
});

for (const [path, kind] of [
	['M-0 0h24v24h-24z', 'negative'],
	['M0.00001 0h24v24h-24z', 'precision'],
	['M0 0h12h12v24h-24z', 'collinear'],
]) {
	test(`path fixes remove ${kind} warnings`, () => {
		const issue = lintPath(path, labels).find((item) => item.message === kind);
		assert.ok(issue?.fix, kind);
		assert.ok(
			lintPath(issue.fix, labels).every((item) => item.message !== kind),
			kind,
		);
	});
}
