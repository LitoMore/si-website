import {IconLoader2} from '@tabler/icons-react';
import {Col, Image, Row, Tag, Typography} from 'antd';
import {useColorMode} from '#atom';
import {brightThreshold, darkThreshold, linkRel, spinning} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {getAliases, tidyLink} from '#utils';

function ModalContent({icon}: {readonly icon?: Icon}) {
	const {isMobileSize} = useSizes();
	const [colorMode] = useColorMode();
	const {contrast, isLight, isDark} = useColorScheme();
	const {i18n} = useI18n();
	if (!icon) return null;

	const aliases = getAliases(icon);
	const hexColor = `#${icon.hex}`;
	const a11yFriendly =
		(isLight && icon.brightness <= brightThreshold) ||
		(isDark && icon.brightness > darkThreshold);

	const $contrast =
		colorMode === ColorMode.Contrast && !a11yFriendly ? contrast : undefined;

	return (
		<Row gutter={16}>
			<Col sm={16} xs={24}>
				<div className="flex h-full items-center justify-center">
					<Image
						className="h-auto max-h-[300px] p-2.5 transition-[height] duration-500"
						placeholder={
							<div
								className="flex justify-center text-[30px]"
								style={{
									color: hexColor,
								}}
							>
								<IconLoader2 style={spinning} />
							</div>
						}
						preview={false}
						src={`https://cdn.simpleicons.org/${icon.slug}?viewbox=auto`}
						style={{
							filter: $contrast,
						}}
						width="100%"
					/>
				</div>
			</Col>

			<Col sm={8} xs={24}>
				<div className="flex flex-col">
					<div className="modal-title">{i18n.modal.title}</div>
					<Typography.Text copyable className="modal-text">
						{icon.title}
					</Typography.Text>
				</div>

				{aliases.length > 0 && (
					<div className="flex flex-col">
						<Typography.Text copyable className="modal-title">
							{i18n.modal.aliases}
						</Typography.Text>
						<div className="flex gap-2">
							{aliases.map((alias) => (
								<div key={alias} className="modal-text">
									{alias}
								</div>
							))}
						</div>
					</div>
				)}

				<div className="flex flex-col">
					<div className="modal-title">{i18n.modal.color}</div>
					<div>
						<Typography.Text className="modal-text" copyable={{text: hexColor}}>
							<Tag
								className="gray-copy mr-0"
								color={hexColor}
								style={{color: icon.relativeColor}}
							>
								{hexColor}
							</Tag>
						</Typography.Text>
					</div>
				</div>

				<div className="flex flex-col">
					<div className="modal-title">
						{icon.source === icon.guidelines
							? i18n.modal.sourceAndGuidelines
							: i18n.modal.source}
					</div>
					<Typography.Link
						copyable
						className="gray-copy m-0"
						ellipsis={!isMobileSize}
						href={icon.source}
						rel={linkRel}
						target="_blank"
					>
						{tidyLink(icon.source)}
					</Typography.Link>
				</div>

				{icon.source !== icon.guidelines && icon.guidelines ? (
					<div className="flex flex-col">
						<div className="modal-title">{i18n.modal.guidelines}</div>
						<Typography.Link
							copyable
							className="gray-copy m-0"
							ellipsis={!isMobileSize}
							href={icon.guidelines}
							rel={linkRel}
							target="_blank"
						>
							{tidyLink(icon.guidelines)}
						</Typography.Link>
					</div>
				) : null}

				{icon.license ? (
					<div className="flex flex-col">
						<div className="modal-title">{i18n.modal.license}</div>
						<Typography.Link
							copyable
							className="gray-copy m-0"
							ellipsis={!isMobileSize}
							href={
								'url' in icon.license
									? icon.license.url
									: `https://spdx.org/licenses/${icon.license.type}`
							}
							rel={linkRel}
							target="_blank"
						>
							{'url' in icon.license
								? tidyLink(icon.license.url)
								: icon.license.type}
						</Typography.Link>
					</div>
				) : null}
			</Col>
		</Row>
	);
}

export default ModalContent;
