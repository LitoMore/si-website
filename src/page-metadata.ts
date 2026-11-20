export const siteUrl = 'https://simpleicons.org';

export const pages = [
	{
		path: '/',
		title: 'Simple Icons',
		description:
			'Browse, customize, and download free SVG icons for popular brands.',
	},
	{
		path: '/preview',
		title: 'Icon Previewer | Simple Icons',
		description:
			'Preview brand icons at different sizes and colors and export a preview image.',
	},
	{
		path: '/3d',
		title: '3D Magnet Generator | Simple Icons',
		description:
			'Turn a brand icon into a 3D-printable magnet and download the model.',
	},
	{
		path: '/cdn',
		title: 'Simple Icons CDN',
		description:
			'Build CDN URLs to embed brand icons with custom colors and dark mode support.',
	},
	{
		path: '/og',
		title: 'Open Graph Image Generator | Simple Icons',
		description:
			'Create and download an Open Graph image using icons from the Simple Icons collection.',
	},
];

export function findPage(pathname: string) {
	return pages.find(
		(page) => page.path === (pathname.replace(/\/$/, '') || '/'),
	);
}

export function pageMetaTags(page: (typeof pages)[number]) {
	const url = siteUrl + page.path;
	return [
		{name: 'description', content: page.description},
		{property: 'og:title', content: page.title},
		{property: 'og:description', content: page.description},
		{property: 'og:url', content: url},
		{name: 'twitter:title', content: page.title},
		{name: 'twitter:description', content: page.description},
		{name: 'twitter:url', content: url},
	];
}
