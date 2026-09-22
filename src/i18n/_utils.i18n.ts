import {Fragment, type ReactNode, createElement} from 'react';

type Replacer = ((...values: string[]) => ReactNode) | string;
export function gettext(tempalte: string, replacers: string[]): string;
export function gettext(template: string, replacers: Replacer[]): ReactNode[];
export function gettext(
	template: string,
	replacers: string[] | Replacer[],
): string | ReactNode[] {
	const parts: string[] = [];
	let cursor = 0;
	while (cursor < template.length) {
		const start = template.indexOf('{', cursor);
		if (start === -1) break;
		const end = template.indexOf('}', start + 1);
		if (end === -1) break;
		parts.push(template.slice(cursor, start), template.slice(start, end + 1));
		cursor = end + 1;
	}

	parts.push(template.slice(cursor));
	let i = 0;
	const parsedParts = parts
		.map((part, partIndex) => {
			const partMatch = /^\{[^}]*\}$/.exec(part);
			if (partMatch) {
				const replacer = replacers[i < replacers.length - 1 ? i++ : i];
				if (!replacer) return part;
				if (part.includes('|')) {
					const [...values] = part.slice(1, -1).split('|');
					return typeof replacer === 'string'
						? replacer
						: createElement(
								Fragment,
								{key: `key-${String(partIndex)}`},
								replacer(...values),
							);
				}

				return typeof replacer === 'string'
					? replacer
					: createElement(
							Fragment,
							{key: `key-${String(partIndex)}`},
							replacer(part.slice(1, -1)),
						);
			}

			return part;
		})
		.filter(Boolean);

	return parsedParts.every((part) => typeof part === 'string')
		? parsedParts.join('')
		: parsedParts;
}
