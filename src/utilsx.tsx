// @deno-types="@types/react"
import { ReactNode } from "react";

type Replacer = ((...values: string[]) => ReactNode) | string;
export function gettext(tempalte: string, replacers: string[]): string;
export function gettext(template: string, replacers: Replacer[]): ReactNode[];
export function gettext(
	template: string,
	replacers: string[] | Replacer[],
): string | ReactNode[] {
	const pattern = /({[^}]*})/g;
	const parts = template.split(pattern);
	let i = 0;
	return parts.map((part) => {
		const partMatch = /^{[^}]*}$/.exec(part);
		if (partMatch) {
			const replacer = replacers[i < replacers.length - 1 ? i++ : i];
			if (!replacer) return part;
			if (part.includes("|")) {
				const [...values] = part.slice(1, -1).split("|");
				return typeof replacer === "string" ? replacer : replacer(...values);
			}
			return typeof replacer === "string"
				? replacer
				: replacer(part.slice(1, -1));
		}
		return part;
	}).filter((x) => Boolean(x));
}
