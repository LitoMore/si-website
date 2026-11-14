import {IconScale} from '@tabler/icons-react';
import {Tooltip} from '#components/ui/popover.js';
import {linkRel} from '#constants';
import {useColorScheme, useI18n} from '#hooks';

export default function Legal() {
	const {iconFg} = useColorScheme();
	const {i18n} = useI18n();

	return (
		<Tooltip title={i18n.controls.legalDisclaimer}>
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a
				className="control"
				href="https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md"
				rel={linkRel}
				target="_blank"
			>
				<IconScale stroke={2} style={{color: iconFg}} />
			</a>
		</Tooltip>
	);
}
