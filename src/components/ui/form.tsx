import {type ReactNode} from 'react';
import {NumberField} from '@base-ui/react/number-field';
import {Radio} from '@base-ui/react/radio';
import {RadioGroup} from '@base-ui/react/radio-group';
import {Select as BaseSelect} from '@base-ui/react/select';
import {Slider as BaseSlider} from '@base-ui/react/slider';
import {IconChevronDown} from '@tabler/icons-react';
import {useSurfaceTheme} from './theme.js';

export function SegmentedControl<Value extends string>({
	value,
	onChange,
	options,
	label,
}: {
	readonly value: Value;
	readonly onChange: (value: Value) => void;
	readonly options: Array<{value: Value; label: ReactNode}>;
	readonly label: string;
}) {
	return (
		<RadioGroup
			aria-label={label}
			className="ui-segmented"
			value={value}
			onValueChange={onChange}
		>
			{options.map((option) => (
				<Radio.Root
					key={option.value}
					className="ui-segment"
					value={option.value}
				>
					{option.label}
				</Radio.Root>
			))}
		</RadioGroup>
	);
}

export function Select({
	id,
	options,
	value,
	onChange,
}: {
	readonly id: string;
	readonly options: Array<{value: string; label: string}>;
	readonly value: string;
	readonly onChange: (value: string) => void;
}) {
	const theme = useSurfaceTheme();
	return (
		<BaseSelect.Root
			items={options}
			modal={false}
			value={value}
			onValueChange={(next) => {
				if (next !== null) onChange(next);
			}}
		>
			<BaseSelect.Trigger className="ui-select" id={id}>
				<BaseSelect.Value />
				<BaseSelect.Icon>
					<IconChevronDown size={14} />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					alignItemWithTrigger={false}
					className="ui-positioner"
					sideOffset={4}
				>
					<BaseSelect.Popup
						className="ui-menu ui-select-popup"
						data-ui-overlay="select"
						data-ui-theme={theme}
					>
						<BaseSelect.List>
							{options.map((option) => (
								<BaseSelect.Item
									key={option.value}
									className="ui-menu-item"
									value={option.value}
								>
									<BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
								</BaseSelect.Item>
							))}
						</BaseSelect.List>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
}

export function NumberInput({
	id,
	min,
	max,
	value,
	onChange,
	description,
	locale,
}: {
	readonly id: string;
	readonly min: number;
	readonly max: number;
	readonly value: NumberField.Root.Props['value'];
	readonly onChange: NonNullable<NumberField.Root.Props['onValueChange']>;
	readonly description?: string;
	readonly locale: string;
}) {
	return (
		<NumberField.Root
			className="ui-number"
			format={{useGrouping: false, maximumFractionDigits: 0}}
			id={id}
			locale={locale}
			max={max}
			min={min}
			step={1}
			value={value}
			onValueChange={onChange}
		>
			<NumberField.Group className="ui-number-group">
				<NumberField.Input aria-describedby={description} />
				<span aria-hidden>px</span>
			</NumberField.Group>
		</NumberField.Root>
	);
}

export function Slider({
	value,
	min,
	max,
	step,
	onChange,
	label,
}: {
	readonly value: number;
	readonly min: number;
	readonly max: number;
	readonly step: number;
	readonly onChange: (value: number) => void;
	readonly label: string;
}) {
	return (
		<BaseSlider.Root
			className="ui-slider"
			max={max}
			min={min}
			step={step}
			value={value}
			onValueChange={onChange}
		>
			<BaseSlider.Control className="ui-slider-control">
				<BaseSlider.Track className="ui-slider-track">
					<BaseSlider.Indicator className="ui-slider-indicator" />
					<BaseSlider.Thumb aria-label={label} className="ui-slider-thumb" />
				</BaseSlider.Track>
			</BaseSlider.Control>
		</BaseSlider.Root>
	);
}
