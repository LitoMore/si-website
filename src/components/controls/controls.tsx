import {type ReactNode} from 'react';
import {useSizes} from '#hooks';
import Legal from './legal.js';
import Settings from './settings.js';
import Socials from './socials.js';
import ThridParty from './thirdparty.js';
import Translations from './translations.js';

function Controls({extraSettings}: {readonly extraSettings?: ReactNode}) {
	const {isMobileSize} = useSizes();
	return isMobileSize ? (
		<div className="flex justify-center">
			<Settings />
			<Translations />
			<ThridParty />
			<Legal />
		</div>
	) : (
		<div className="flex items-center">
			<div className="flex justify-center">
				<Settings extraSettings={extraSettings} />
				<Translations />
				<ThridParty />
				<Legal />
			</div>
			<span aria-hidden className="ui-divider" />
			<Socials />
		</div>
	);
}

export default Controls;
