import assert from 'node:assert/strict';
import {after, afterEach, test} from 'node:test';
import {Window} from 'happy-dom';
import {createServer} from 'vite';

// Exercise the real React components without a browser or external network requests.
const window = new Window({url: 'http://localhost/'});
for (const key of [
	'window',
	'document',
	'navigator',
	'HTMLElement',
	'Element',
	'Node',
	'DocumentFragment',
	'MutationObserver',
	'ResizeObserver',
	'IntersectionObserver',
	'Event',
	'KeyboardEvent',
	'MouseEvent',
	'PointerEvent',
	'FocusEvent',
	'HTMLInputElement',
	'HTMLButtonElement',
	'HTMLSelectElement',
	'SVGElement',
]) {
	Object.defineProperty(globalThis, key, {
		configurable: true,
		writable: true,
		value: key === 'window' ? window : window[key],
	});
}

const {document, KeyboardEvent} = window;
Object.defineProperties(globalThis, {
	getComputedStyle: {
		value: window.getComputedStyle.bind(window),
		configurable: true,
		writable: true,
	},
	requestAnimationFrame: {
		value: window.requestAnimationFrame.bind(window),
		configurable: true,
		writable: true,
	},
	cancelAnimationFrame: {
		value: window.cancelAnimationFrame.bind(window),
		configurable: true,
		writable: true,
	},
	IS_REACT_ACT_ENVIRONMENT: {value: true, configurable: true, writable: true},
});
const {createElement: h, useState, useEffect} = await import('react');
const {render, screen, cleanup, waitFor, act} =
	await import('@testing-library/react');
const {Provider: AtomProvider} = await import('jotai');
const {default: userEvent} = await import('@testing-library/user-event');
const server = await createServer({
	cacheDir: 'node_modules/.vite-tests/ui.test',
	server: {middlewareMode: true, watch: null, hmr: false, ws: false},
	optimizeDeps: {noDiscovery: true, include: []},
	appType: 'custom',
});
const {UiProvider} = await server.ssrLoadModule('/src/components/ui/theme.tsx');
const {Dialog} = await server.ssrLoadModule('/src/components/ui/dialog.tsx');
const {Dropdown} = await server.ssrLoadModule(
	'/src/components/ui/dropdown.tsx',
);
const {Button} = await server.ssrLoadModule('/src/components/ui/button.tsx');
const {SegmentedControl, Select, NumberInput} = await server.ssrLoadModule(
	'/src/components/ui/form.tsx',
);
const {MessageProvider, message} = await server.ssrLoadModule(
	'/src/components/ui/feedback.tsx',
);
const {default: Search} = await server.ssrLoadModule(
	'/src/components/header/search.tsx',
);
const {default: Autocomplete} = await server.ssrLoadModule(
	'/src/components/preview/autocomplete.tsx',
);
const {useIcons} = await server.ssrLoadModule('/src/atom.ts');
const user = () => userEvent.setup({document: window.document});
const wrap = (children) =>
	h(
		AtomProvider,
		{},
		h(UiProvider, {theme: 'light', direction: 'ltr'}, children),
	);
const renderUi = (element) => render(wrap(element));
afterEach(async () => {
	cleanup();
	await act(async () => {
		await window.happyDOM.waitUntilComplete();
	});
});
after(async () => {
	await server.close();
	await window.happyDOM.close();
});

function DialogFixture() {
	const [isOpen, setIsOpen] = useState(false);
	const footer = h(
		Dropdown,
		{isHoverEnabled: false, items: [{key: 'svg', label: 'Plain SVG'}]},
		h(Button, {}, 'Copy SVG'),
	);
	return h(
		'div',
		{},
		h(Search),
		h(
			'button',
			{
				onClick() {
					setIsOpen(true);
				},
			},
			'Open details',
		),
		h(
			Dialog,
			{
				isOpen,
				onOpenChange: setIsOpen,
				title: 'GitHub',
				closeLabel: 'Close',
				footer,
			},
			h('p', {}, 'Icon details'),
		),
	);
}

test('nested Escape closes the menu, then the dialog, and preserves search and return focus', async () => {
	const input = user();
	renderUi(h(DialogFixture));
	const search = screen.getByRole('textbox');
	await input.type(search, 'github');
	const trigger = screen.getByRole('button', {name: 'Open details'});
	await input.click(trigger);
	await waitFor(() => assert.ok(screen.getByRole('dialog', {name: 'GitHub'})));
	await input.click(screen.getByRole('button', {name: 'Copy SVG'}));
	await waitFor(() => assert.ok(screen.getByRole('menu')));
	await input.keyboard('{Escape}');
	assert.equal(screen.queryByRole('menu'), null);
	assert.ok(screen.getByRole('dialog'));
	assert.equal(search.value, 'github');
	await input.keyboard('{Escape}');
	await waitFor(() => assert.equal(screen.queryByRole('dialog'), null));
	assert.equal(search.value, 'github');
	await waitFor(() => assert.equal(window.document.activeElement, trigger));
});

test('search shortcuts select existing text and Escape clears then blurs, excluding IME composition', async () => {
	const input = user();
	renderUi(h(Search));
	const search = screen.getByRole('textbox');
	await input.type(search, 'github');
	await act(async () => {
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'Escape',
				isComposing: true,
				bubbles: true,
			}),
		);
	});
	assert.equal(search.value, 'github');
	await input.keyboard('{Escape}');
	assert.equal(search.value, '');
	await input.type(search, 'react');
	await act(async () => {
		search.blur();
	});
	await input.keyboard('{Control>}k{/Control}');
	assert.equal(document.activeElement, search);
	assert.equal(search.selectionStart, 0);
	assert.equal(search.selectionEnd, 5);
	await input.keyboard('{Escape}{Escape}');
	assert.notEqual(document.activeElement, search);
});

test('menu actions work through keyboard navigation and return focus to the trigger', async () => {
	const input = user();
	let selected = '';
	const downloadButton = h(Button, {}, 'Download');
	renderUi(
		h(
			Dropdown,
			{
				isHoverEnabled: false,
				items: [
					{
						key: 'plain',
						label: 'Plain SVG',
						onClick() {
							selected = 'plain';
						},
					},
					{
						key: 'colored',
						label: 'Colored SVG',
						onClick() {
							selected = 'colored';
						},
					},
				],
			},
			downloadButton,
		),
	);
	const trigger = screen.getByRole('button', {name: 'Download'});
	await input.tab();
	await input.keyboard('{ArrowDown}');
	await waitFor(() => assert.ok(screen.getByRole('menu')));
	await input.keyboard('{ArrowDown}{Enter}');
	await waitFor(() => assert.equal(selected, 'colored'));
	assert.equal(screen.queryByRole('menu'), null);
	await waitFor(() => assert.equal(document.activeElement, trigger));
});

function SettingsFixture() {
	const [theme, setTheme] = useState('auto');
	const [format, setFormat] = useState('png');
	const [width, setWidth] = useState(800);
	return h(
		'div',
		{},
		h(SegmentedControl, {
			label: 'Theme',
			value: theme,
			onChange: setTheme,
			options: [
				{value: 'auto', label: 'Auto'},
				{value: 'light', label: 'Light'},
				{value: 'dark', label: 'Dark'},
			],
		}),
		h('label', {htmlFor: 'format'}, 'File format'),
		h(Select, {
			id: 'format',
			value: format,
			onChange: setFormat,
			options: [
				{value: 'png', label: 'PNG'},
				{value: 'jpg', label: 'JPG'},
			],
		}),
		h('label', {htmlFor: 'width'}, 'Width'),
		h(NumberInput, {
			id: 'width',
			min: 128,
			max: 4096,
			value: width,
			onChange: setWidth,
			locale: 'en',
		}),
		h('output', {}, `${theme}:${format}:${width === null ? 'invalid' : width}`),
	);
}

test('settings support radio arrows, select keyboard input and empty numeric validation', async () => {
	const input = user();
	renderUi(h(SettingsFixture));
	await input.click(screen.getByRole('radio', {name: 'Auto'}));
	await input.keyboard('{ArrowRight}{ArrowRight}');
	assert.equal(
		screen.getByRole('radio', {name: 'Dark'}).getAttribute('aria-checked'),
		'true',
	);
	await input.click(screen.getByRole('combobox', {name: 'File format'}));
	await input.keyboard('{ArrowDown}{Enter}');
	await waitFor(() =>
		assert.ok(screen.getByRole('status').textContent.includes('dark:jpg')),
	);
	await input.clear(screen.getByRole('textbox', {name: 'Width'}));
	assert.equal(screen.getByRole('status').textContent, 'dark:jpg:invalid');
});

const icons = [
	'GitHub',
	'GitHub Pages',
	'GitHub Actions',
	'GitHub Copilot',
	'GitHub Sponsors',
].map((title, index) => ({
	title,
	slug: title.toLowerCase().replaceAll(' ', ''),
	hex: '181717',
	source: 'https://github.com/logos',
	index,
	relativeColor: '#fff',
	brightness: 0.1,
}));
function AutocompleteFixture() {
	const [, setIcons] = useIcons();
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	useEffect(() => {
		setIcons({data: icons, version: '16.9.0'});
	}, [setIcons]);
	return h(
		'div',
		{},
		h('label', {htmlFor: 'preview-brand'}, 'Brand'),
		h(Autocomplete, {
			title,
			slug,
			onChange: setTitle,
			onSelect(icon) {
				setTitle(icon.title);
				setSlug(icon.slug);
			},
		}),
		h('output', {}, slug),
	);
}

test('brand autocomplete retains custom text, expands suggestions and selects with Enter', async () => {
	const input = user();
	renderUi(h(AutocompleteFixture));
	const brand = screen.getByRole('combobox', {name: 'Brand'});
	await input.type(brand, 'github');
	await waitFor(() => assert.equal(screen.getAllByRole('option').length, 3));
	await input.click(screen.getByRole('button', {name: 'More suggestions'}));
	assert.equal(screen.getAllByRole('option').length, 5);
	await input.click(brand);
	await input.keyboard('{ArrowDown}{Enter}');
	await waitFor(() =>
		assert.ok(screen.getByRole('status').textContent.startsWith('github')),
	);
	await input.clear(brand);
	await input.type(brand, 'My custom brand');
	assert.equal(brand.value, 'My custom brand');
});

test('copy and export feedback is available through the shared notification provider', async () => {
	const page = h('div', {}, 'Page');
	renderUi(h(MessageProvider, {}, page));
	await act(async () => {
		message.success('Copied SVG to clipboard');
	});
	await waitFor(() => assert.ok(screen.getByText('Copied SVG to clipboard')));
});
