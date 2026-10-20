import {useColorMode, useIcons} from '#atom';
import {CopyText} from '#components/ui/copy-text.js';
import {brightThreshold, darkThreshold} from '#constants';
import {useColorScheme, useI18n} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {getAliases, getMaskStyles, tidyLink} from '#utils';

function ModalContent({icon}: {readonly icon?: Icon}) {
	const [colorMode] = useColorMode();
	const {contrast, isLight, isDark} = useColorScheme();
	const [{version}] = useIcons();
	const {i18n} = useI18n();
	if (!icon) return null;

	const aliases = getAliases(icon);
	const hexColor = `#${icon.hex}`;
	const isA11yFriendly =
		(isLight && icon.brightness <= brightThreshold) ||
		(isDark && icon.brightness > darkThreshold);

	const $contrast =
		!isA11yFriendly && colorMode === ColorMode.Contrast ? contrast : undefined;

	return (
		<div className="ui-dialog-details">
			<div>
				<div className="flex h-full items-center justify-center">
					<div
						className="ui-dialog-icon"
						style={{
							...getMaskStyles(version, icon, isLight),
							filter: $contrast,
						}}
					/>
				</div>
			</div>

			<div>
				<div className="flex flex-col">
					<div className="modal-title">{i18n.modal.title}</div>
					<CopyText text={icon.title}>
						<bdi>{icon.title}</bdi>
					</CopyText>
				</div>

				{aliases.length > 0 && (
					<div className="flex flex-col">
						<div className="modal-title">{i18n.modal.aliases}</div>
						<div className="flex gap-2">
							{aliases.map((alias) => (
								<div key={alias} className="modal-text">
									<bdi>{alias}</bdi>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="flex flex-col">
					<div className="modal-title">{i18n.modal.color}</div>
					<div>
						<CopyText text={hexColor}>
							<span
								className="ui-brand-color"
								dir="ltr"
								style={{color: icon.relativeColor, backgroundColor: hexColor}}
							>
								{hexColor}
							</span>
						</CopyText>
					</div>
				</div>

				<div className="flex flex-col">
					<div className="modal-title">
						{icon.source === icon.guidelines
							? i18n.modal.sourceAndGuidelines
							: i18n.modal.source}
					</div>
					<CopyText text={icon.source}>
						<a
							className="ui-link"
							href={icon.source}
							rel="noopener nofollow noreferrer"
							target="_blank"
						>
							<bdi>{tidyLink(icon.source)}</bdi>
						</a>
					</CopyText>
				</div>

				{icon.source !== icon.guidelines && icon.guidelines ? (
					<div className="flex flex-col">
						<div className="modal-title">{i18n.modal.guidelines}</div>
						<CopyText text={icon.guidelines}>
							<a
								className="ui-link"
								href={icon.guidelines}
								rel="noopener nofollow noreferrer"
								target="_blank"
							>
								<bdi>{tidyLink(icon.guidelines)}</bdi>
							</a>
						</CopyText>
					</div>
				) : null}

				{icon.license ? (
					<div className="flex flex-col">
						<div className="modal-title">{i18n.modal.license}</div>
						<CopyText
							text={
								'url' in icon.license
									? icon.license.url
									: `https://spdx.org/licenses/${icon.license.type}`
							}
						>
							<a
								className="ui-link"
								href={
									'url' in icon.license
										? icon.license.url
										: `https://spdx.org/licenses/${icon.license.type}`
								}
								rel="noopener nofollow noreferrer"
								target="_blank"
							>
								{'url' in icon.license
									? tidyLink(icon.license.url)
									: icon.license.type}
							</a>
						</CopyText>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ModalContent;
