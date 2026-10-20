import {Fragment, createElement} from 'react';
import assert from 'node:assert/strict';
import {after, test} from 'node:test';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';

const server = await createServer({
	server: {middlewareMode: true, watch: null, hmr: false, ws: false},
	appType: 'custom',
});
after(() => server.close());
const {LanguageCode, resolveLanguageCode, translations} =
	await server.ssrLoadModule('/src/i18n/_index.i18n.ts');
const {gettext} = await server.ssrLoadModule('/src/i18n/_utils.i18n.ts');
const {default: componentLocales} =
	await server.ssrLoadModule('/src/i18n/antd.ts');

function flatten(value, prefix = '') {
	return Object.fromEntries(
		Object.entries(value).flatMap(([key, entry]) => {
			const path = prefix ? `${prefix}.${key}` : key;
			return typeof entry === 'string'
				? [[path, entry]]
				: Object.entries(flatten(entry, path));
		}),
	);
}

const compare = (a, b) => a.localeCompare(b, 'en');
const english = flatten(translations.en);
const signature = (labels) =>
	Object.entries(labels)
		.map(([key, label]) => ({
			key,
			nonempty: Boolean(label.trim()),
			placeholders: (label.match(/\{[^{}]*\}/g) ?? []).length,
			links: (label.match(/https:\/\/[^}]+/g) ?? []).toSorted(compare),
			unconverted: /\{\s*\$/.test(label),
		}))
		.toSorted((a, b) => compare(a.key, b.key));

for (const [code, translation] of Object.entries(translations)) {
	test(`${code}: labels are complete and preserve interpolation and links`, () => {
		assert.deepEqual(signature(flatten(translation)), signature(english));
		const footers = ['line1', 'line2', 'line3'].map((key) =>
			renderToStaticMarkup(
				createElement(
					Fragment,
					null,
					gettext(translation.footer[key], [
						(text, url) => createElement('a', {href: url}, text),
					]),
				),
			),
		);
		assert.ok(footers.every((text) => typeof text === 'string'));
		assert.ok(footers.every((text) => !/[{}]/.test(text)));
		assert.ok(footers.every((text) => /https:\/\//.test(text)));

		const rendered = [
			translation.modal.copy,
			translation.modal.copied,
			translation.openGraph.download,
			translation.share.actionIntentText,
		].map((template) => gettext(template, ['TEST']));
		assert.ok(rendered.every((text) => text.includes('TEST')));
		assert.ok(rendered.every((text) => !/[{}]/.test(text)));
	});
}

test('the language menu has one region-neutral Traditional Chinese option', () => {
	assert.equal(Object.keys(translations).length, 25);
	assert.equal(
		new Set(Object.values(translations).map((t) => t.languageName)).size,
		25,
	);
	assert.equal(translations[LanguageCode.Chinese].languageName, '简体中文');
	assert.equal(
		translations[LanguageCode.ChineseTraditional].languageName,
		'繁體中文',
	);
	assert.deepEqual(
		Object.keys(translations).filter((code) => code.startsWith('zh')),
		['zh', 'zh-Hant'],
	);
	assert.deepEqual(
		Object.keys(componentLocales).toSorted(compare),
		Object.keys(translations).toSorted(compare),
	);
});

test('stored choices remain valid and unsupported values fall back to English', () => {
	const codes = Object.keys(translations);
	assert.deepEqual(
		codes.map((code) => resolveLanguageCode(code)),
		codes,
	);
	const invalid = [
		undefined,
		null,
		'',
		'invalid',
		'__proto__',
		'constructor',
		123,
	];
	assert.deepEqual(
		invalid.map((value) => resolveLanguageCode(value)),
		invalid.map(() => LanguageCode.English),
	);
});

test('component locale exports contain usable translated labels', () => {
	assert.ok(
		Object.values(componentLocales).every(
			(locale) => typeof locale.locale === 'string',
		),
	);
	assert.equal(
		componentLocales[LanguageCode.ChineseTraditional].global.close,
		'關閉',
	);
	assert.equal(componentLocales[LanguageCode.Arabic].global.close, 'إغلاق');
	assert.equal(
		componentLocales[LanguageCode.SerbianCyrillic].global.close,
		'Затвори',
	);
});
