import {Divider} from 'antd';
import {Socials} from '#components';
import {useSizes} from '#hooks';
import Settings from './settings.js';
import ThridParty from './thirdparty.js';
import Translations from './translations.js';

function Controls() {
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
				<Settings />
				<Translations />
				<ThridParty />
			</div>
			<Divider type="vertical" />
			<Socials />
		</>
	);
}

export default Controls;
