import {useEffect, useState} from 'react';
import {getSvg, getSvgPath} from '#utils';

export function useIconPath(version: string, slug: string) {
	const [attempt, setAttempt] = useState(0);
	const [result, setResult] = useState<{
		key: string;
		path?: string;
		error?: string;
	}>();
	const key = JSON.stringify([version, slug, attempt]);
	useEffect(() => {
		let isActive = true;
		void getSvg(version, slug)
			.then((svg) => {
				const path = getSvgPath(svg);
				if (!path) throw new Error('The icon SVG has no valid path.');
				if (isActive) setResult({key, path});
			})
			.catch(() => {
				if (isActive)
					setResult({key, error: 'Could not load the icon. Please try again.'});
			});
		return () => {
			isActive = false;
		};
	}, [version, slug, key]);
	const current = result?.key === key ? result : undefined;
	return {
		path: current?.path,
		error: current?.error ?? '',
		isLoading: !current,
		retry() {
			setAttempt((value) => value + 1);
		},
	};
}
