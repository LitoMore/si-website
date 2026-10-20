import {type ReactNode} from 'react';
import {useSizes} from '#hooks';
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
		</div>
	) : (
		<>
			<div className="flex justify-center">
				<Settings extraSettings={extraSettings} />
				<Translations />
				<ThridParty />
			</div>
			<span aria-hidden className="ui-divider" />
			<Socials />
		</>
	);
}

export default Controls;
