import {useEffect, useState} from 'react';
import {
	type MagnetModel,
	type MagnetSettings,
	createModel,
} from './geometry.js';

export function useMagnetModel(
	path: string | undefined,
	settings: MagnetSettings,
	identity: string,
) {
	const [lastModel, setLastModel] = useState<MagnetModel>();
	const [failure, setFailure] = useState<{key: string; message: string}>();
	const [busy, setBusy] = useState(true);
	const [builtKey, setBuiltKey] = useState('');
	const key = JSON.stringify([identity, settings]);
	useEffect(() => {
		if (!path) return;
		let isCancelled = false;
		const timer = setTimeout(() => {
			setBusy(true);
			setFailure(undefined);
			void createModel(path, settings)
				.then((result) => {
					if (isCancelled) return;
					setLastModel(result);
					setBuiltKey(key);
				})
				.catch((error: unknown) => {
					if (!isCancelled)
						setFailure({
							key,
							message:
								error instanceof Error
									? error.message
									: 'Could not build the model. Adjust the settings and try again.',
						});
				})
				.finally(() => {
					if (!isCancelled) setBusy(false);
				});
		}, 100);
		return () => {
			isCancelled = true;
			clearTimeout(timer);
		};
	}, [path, settings, key]);
	return {
		model: key === builtKey ? lastModel : undefined,
		error: failure?.key === key ? failure.message : '',
		isPending: !path || busy || key !== builtKey,
	};
}
