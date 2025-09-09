import {type Ref} from 'react';
import type Konva from 'konva';
import {Text} from 'react-konva';
import {type Icon} from '#types';

type TextProps = {
	fill: string;
	fontSize: number;
	fontFamily: string;
	fontStyle: string;
	letterSpacing: number;
};

function PreivewText({
	titleRef,
	textProps,
	titleFontSize,
	titleHeight,
	icon,
	iconsTotal,
	textBoxWidth,
	x,
	y,
}: {
	readonly titleRef: Ref<Konva.Text>;
	readonly textProps: TextProps;
	readonly titleFontSize: number;
	readonly titleHeight: number;
	readonly icon: Icon;
	readonly iconsTotal: number;
	readonly textBoxWidth: number;
	readonly x: number;
	readonly y: number;
}) {
	return (
		<>
			<Text
				ref={titleRef}
				{...textProps}
				fontSize={titleFontSize}
				text={icon.title}
				width={textBoxWidth}
				x={x}
				y={y}
			/>
			<Text
				{...textProps}
				lineHeight={1.25}
				text={[
					`${icon.slug}.svg`,
					'',
					`Brand: ${icon.title}`,
					`Color: #${icon.hex}`,
				].join('\n')}
				width={textBoxWidth}
				x={x}
				y={y + titleHeight + 2}
			/>

			<Text
				{...textProps}
				lineHeight={1.25}
				text={[
					`${iconsTotal} SVG brand icons`,
					'available at simpleicons.org',
				].join('\n')}
				x={x + 36}
				y={330}
			/>
		</>
	);
}

export default PreivewText;
