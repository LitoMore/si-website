import {useEffect, useRef, useState} from 'react';
import {
	type MagnetGeometrySettings,
	type MagnetModel,
	type MagnetSettings,
	geometrySettings,
} from './geometry.js';
import {buildModel} from './model-client.js';

export function useMagnetModel(
	path: string | undefined,
	settings: MagnetSettings,
	identity: string,
) {
	const [lastModel, setLastModel] = useState<MagnetModel>();
	const [failure, setFailure] = useState<{key: string; message: string}>();
	const [busy, setBusy] = useState(true);
	const [builtKey, setBuiltKey] = useState('');
	const previousIdentity = useRef<string>(undefined);
	const shapeKey = JSON.stringify(geometrySettings(settings));
	const key = JSON.stringify([identity, path, shapeKey]);
	useEffect(() => {
		if (!path) return;
		let isCancelled = false;
		const delay = previousIdentity.current === identity ? 100 : 0;
		previousIdentity.current = identity;
		const timer = setTimeout(() => {
			setBusy(true);
			setFailure(undefined);
			void buildModel(key, path, JSON.parse(shapeKey) as MagnetGeometrySettings)
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
		}, delay);
		return () => {
			isCancelled = true;
			clearTimeout(timer);
		};
	}, [path, identity, shapeKey, key]);
	return {
		model: key === builtKey ? lastModel : undefined,
		error: failure?.key === key ? failure.message : '',
		isPending: !path || busy || key !== builtKey,
	};
}
