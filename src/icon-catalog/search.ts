import {type IconData} from '#types';

export const searcherKeySelector = (
	icon: IconData & {slug: string},
): string[] =>
	[
		icon.title,
		icon.slug,
		icon.aliases?.aka,
		icon.aliases?.old,
		icon.aliases?.dup?.map((duplicate) => duplicate.title),
		Object.values(icon.aliases?.loc ?? {}),
		icon.license?.type && icon.license.type !== 'custom'
			? icon.license.type
			: undefined,
	]
		.flat()
		.filter(Boolean) as string[];
