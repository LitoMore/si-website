type SpdxLicense = {
	type: string;
	url: string;
};

type CustomLicense = {
	type: 'custom';
	url: string;
};

type Aliases = {
	aka?: string[];
	dup?: DuplicateAlias[];
	loc?: Record<string, string>;
	old?: string[];
};

type DuplicateAlias = {
	title: string;
	hex?: string;
	guidelines?: string;
	loc?: Record<string, string>;
};

export type IconData = {
	title: string;
	hex: string;
	source: string;
	slug?: string;
	guidelines?: string;
	license?: Omit<SpdxLicense, 'url'> | CustomLicense;
	aliases?: Aliases;
};

const titleToSlugReplacements: Record<string, string> = {
	/* eslint-disable @typescript-eslint/naming-convention */
	'+': 'plus',
	'.': 'dot',
	'&': 'and',
	/* eslint-enable @typescript-eslint/naming-convention */
	đ: 'd',
	ħ: 'h',
	ı: 'i',
	ĸ: 'k',
	ŀ: 'l',
	ł: 'l',
	ß: 'ss',
	ŧ: 't',
};

const titleToSlugCharsRegex = new RegExp(
	`[${Object.keys(titleToSlugReplacements).join('')}]`,
	'g',
);

const titleToSlugChartsRange = /[^a-z\d]/g;

const titleToSlug = (title: string) =>
	title
		.toLowerCase()
		// eslint-disable-next-line unicorn/prefer-string-replace-all
		.replace(titleToSlugCharsRegex, (char) => titleToSlugReplacements[char]!)
		.normalize('NFD')
		.replaceAll(titleToSlugChartsRange, '');

export const getIconSlug = (icon: IconData) =>
	icon.slug ?? titleToSlug(icon.title);
