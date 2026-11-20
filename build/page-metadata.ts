import type {Plugin} from 'vite';
import {findPage, pages, siteUrl} from '../src/page-metadata.js';

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function renderPage(template: string, page: (typeof pages)[number]) {
	return template
		.replaceAll('{{pageTitle}}', () => escapeHtml(page.title))
		.replaceAll('{{pageDescription}}', () => escapeHtml(page.description))
		.replaceAll('{{pagePath}}', () => page.path);
}

export default function pageMetadataPlugin(): Plugin {
	return {
		name: 'page-metadata',
		enforce: 'post',
		transformIndexHtml(html, context) {
			if (!context.server) return;
			const {pathname} = new URL(context.originalUrl ?? context.path, siteUrl);
			return renderPage(html, findPage(pathname) ?? pages[0]!);
		},
		generateBundle: {
			order: 'post',
			handler(_options, bundle) {
				const index = bundle['index.html'];
				if (index?.type !== 'asset' || typeof index.source !== 'string')
					throw new Error('Expected the Vite index.html template.');
				const template = index.source;
				for (const page of pages) {
					const source = renderPage(template, page);
					if (page.path === '/') index.source = source;
					else
						this.emitFile({
							type: 'asset',
							fileName: page.path.slice(1) + '.html',
							source,
						});
				}

				const urls = pages.map(
					({path}) => `  <url><loc>${siteUrl}${path}</loc></url>`,
				);
				this.emitFile({
					type: 'asset',
					fileName: 'sitemap.xml',
					source: [
						'<?xml version="1.0" encoding="UTF-8"?>',
						'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
						...urls,
						'</urlset>',
						'',
					].join('\n'),
				});
			},
		},
	};
}
