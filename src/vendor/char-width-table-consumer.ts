// Badge-maker only needs in-memory font tables in the browser.
// Avoid the upstream consumer's Node.js filesystem imports.
export const createConsumer = (table: Array<[number, number, number]>) => ({
	widthOf(text: string, {guess = true}: {guess?: boolean} = {}): number {
		const widthOfCode = (code: number): number | undefined => {
			if (code === 127 || code <= 31) return 0;
			let left = 0;
			let right = table.length - 1;
			while (left <= right) {
				const middle = Math.floor((left + right) / 2);
				const [start, end, width] = table[middle]!;
				if (code < start) right = middle - 1;
				else if (code > end) left = middle + 1;
				else return width;
			}

			return undefined;
		};

		let width = 0;
		for (const character of text) {
			const characterWidth = widthOfCode(character.codePointAt(0)!);
			if (characterWidth !== undefined) width += characterWidth;
			else if (guess) width += widthOfCode(109) ?? 0;
			else throw new Error(`No width available for character ${character}`);
		}

		return width;
	},
});
