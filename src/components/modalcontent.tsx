import {IconLoader2} from '@tabler/icons-react';
import {
	Image as AntImage,
	Tag as AntTag,
	Col,
	Flex,
	Row,
	Typography,
} from 'antd';
import {styled} from 'styled-components';
import {useColorMode} from '#atom';
import {brightThreshold, darkThreshold, spinning} from '#constants';
import {useColorScheme, useI18n, useSizes} from '#hooks';
import {ColorMode, type Icon} from '#types';
import {getAliases, tidyLink} from '#utils';

const previewImageSize = 300;

const Image = styled(AntImage).attrs<{$color?: string}>((props) => ({
	width: '100%',
	preview: false,
	placeholder: (
		<Flex
			justify="center"
			style={{
				fontSize: 30,
				color: props.$color,
			}}
		>
			<IconLoader2 style={spinning} />
		</Flex>
	),
}))<{$contrast?: string}>`
	padding: 10px;
	max-height: ${previewImageSize}px;
	height: auto;
	transition: height 0.5s;
	${(props) => (props.$contrast ? `filter: ${props.$contrast};` : '')}
`;

const Title = styled.div`
	color: #aaa;
	margin-top: 10px;
`;

const Text = styled(Typography.Text).attrs((props) => ({
	copyable: props.copyable ?? true,
}))`
	margin: 0;
	& [data-icon='copy'] {
		color: #aaa;
	}
`;

const Tag = styled(AntTag)<{$textColor?: string}>`
	margin-right: 0;
	color: ${(props) => props.$textColor} !important;
	& [data-icon='copy'] {
		color: #aaa;
	}
`;

const Link = styled(Typography.Link).attrs({
	copyable: true,
	target: '_blank',
	rel: 'noopener nofollow noreferrer',
})`
	margin: 0;
	& [data-icon='copy'] {
		color: #aaa;
	}
`;

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
				<Flex align="center" justify="center" style={{height: '100%'}}>
					<Image
						$color={hexColor}
						$contrast={$contrast}
						src={`https://cdn.simpleicons.org/${icon.slug}?viewbox=auto`}
					/>
				</Flex>
			</Col>

			<Col sm={8} xs={24}>
				<Flex vertical>
					<Title>{i18n.modal.title}</Title>
					<Text>{icon.title}</Text>
				</Flex>

				{aliases.length > 0 && (
					<Flex vertical>
						<Title>{i18n.modal.aliases}</Title>
						<Flex gap="small">
							{aliases.map((alias) => (
								<Text key={alias}>{alias}</Text>
							))}
						</Flex>
					</Flex>
				)}

				<Flex vertical>
					<Title>{i18n.modal.color}</Title>
					<div>
						<Text copyable={{text: hexColor}}>
							<Tag $textColor={icon.relativeColor} color={hexColor}>
								{hexColor}
							</Tag>
						</Text>
					</div>
				</Flex>

				<Flex vertical>
					<Title>
						{icon.source === icon.guidelines
							? i18n.modal.sourceAndGuidelines
							: i18n.modal.source}
					</Title>
					<Link ellipsis={!isMobileSize} href={icon.source}>
						{tidyLink(icon.source)}
					</Link>
				</Flex>

				{icon.source !== icon.guidelines && icon.guidelines ? (
					<Flex vertical>
						<Title>{i18n.modal.guidelines}</Title>
						<Link ellipsis={!isMobileSize} href={icon.guidelines}>
							{tidyLink(icon.guidelines)}
						</Link>
					</Flex>
				) : null}

				{icon.license ? (
					<Flex vertical>
						<Title>{i18n.modal.license}</Title>
						<Link
							ellipsis={!isMobileSize}
							href={
								'url' in icon.license
									? icon.license.url
									: `https://spdx.org/licenses/${icon.license.type}`
							}
						>
							{'url' in icon.license
								? tidyLink(icon.license.url)
								: icon.license.type}
						</Link>
					</Flex>
				) : null}
			</Col>
		</Row>
	);
}

export default ModalContent;
