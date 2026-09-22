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
	'+': 'plus',
	'.': 'dot',
	'&': 'and',
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
	// eslint-disable-next-line regexp/sort-character-class-elements
	`[${Object.keys(titleToSlugReplacements).join('')}]`,
	'g',
);

const titleToSlugChartsRange = /[^\da-z]/g;

const titleToSlug = (title: string) =>
	title
		.toLowerCase()

		.replace(titleToSlugCharsRegex, (char) => titleToSlugReplacements[char]!)
		.normalize('NFD')
		.replaceAll(titleToSlugChartsRange, '');

export const getIconSlug = (icon: IconData) =>
	icon.slug ?? titleToSlug(icon.title);
