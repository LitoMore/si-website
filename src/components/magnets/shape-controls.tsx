import {
	Check,
	ChevronDown,
	Circle,
	Move,
	RotateCcw,
	Shapes,
	SlidersHorizontal,
	Square,
} from 'lucide-react';
import type {MagnetSettings} from './geometry.js';
import {useMagnetI18n} from './i18n.js';

const styles = [
	{value: 'outline', description: 'outlineDesc', Icon: Shapes},
	{value: 'square', description: 'squareDesc', Icon: Square},
	{value: 'circle', description: 'circleDesc', Icon: Circle},
] as const;

export function Slider({
	label,
	value,
	min,
	max,
	step = 0.1,
	unit = 'mm',
	onChange,
	hint,
}: {
	readonly label: string;
	readonly value: number;
	readonly min: number;
	readonly max: number;
	readonly step?: number;
	readonly unit?: string;
	readonly onChange: (value: number) => void;
	readonly hint?: string;
}) {
	const {labels, gettext} = useMagnetI18n();
	return (
		<label className="slider-field">
			<span className="field-heading">
				<span>{label}</span>
				<span className="number-value">
					<input
						aria-label={gettext(labels.value, [label])}
						max={max}
						min={min}
						step={step}
						type="number"
						value={value}
						onChange={(event) => {
							const next = event.target.valueAsNumber;
							if (Number.isFinite(next)) {
								onChange(Math.min(max, Math.max(min, next)));
							}
						}}
					/>
					<span>{unit}</span>
				</span>
			</span>
			<input
				aria-label={label}
				max={max}
				min={min}
				step={step}
				style={
					{
						'--range-progress': `${((value - min) / (max - min)) * 100}%`,
					} as React.CSSProperties
				}
				type="range"
				value={value}
				onChange={(event) => {
					onChange(Number(event.target.value));
				}}
			/>
			{hint !== undefined && hint.length > 0 && <small>{hint}</small>}
		</label>
	);
}

export function ShapeControls({
	settings,
	onChange,
}: {
	readonly settings: MagnetSettings;
	readonly onChange: (settings: MagnetSettings) => void;
}) {
	const {labels} = useMagnetI18n();
	const styleLabels = {
		outline: labels.outline,
		square: labels.square,
		circle: labels.circle,
	};
	function update<K extends keyof MagnetSettings>(
		key: K,
		value: MagnetSettings[K],
	) {
		onChange({...settings, [key]: value});
	}

	const scaleKey =
		settings.style === 'circle' ? 'circleIconScale' : 'iconScale';
	const offsetLimit = settings.size / 4;
	return (
		<>
			<div className="field-label">{labels.magnetStyle}</div>
			<div className="style-options">
				{styles.map(({value, description, Icon}) => (
					<button
						key={value}
						aria-pressed={settings.style === value}
						className={settings.style === value ? 'active' : ''}
						type="button"
						onClick={() => {
							update('style', value);
						}}
					>
						<Icon size={25} strokeWidth={1.4} />
						<strong>{styleLabels[value]}</strong>
						<small>{labels[description]}</small>
						{settings.style === value && (
							<Check className="style-check" size={12} />
						)}
					</button>
				))}
			</div>
			<div className="section-divider" />
			<div className="section-label">
				<SlidersHorizontal size={14} /> {labels.sizeShape}
			</div>
			<Slider
				label={
					settings.style === 'circle' ? labels.diameter : labels.longestSide
				}
				max={100}
				min={20}
				step={1}
				value={settings.size}
				onChange={(value) => {
					const limit = value / 4;
					onChange({
						...settings,
						size: value,
						border: Math.min(settings.border, limit),
						radius: Math.min(settings.radius, value / 2),
						offsetX: Math.min(limit, Math.max(-limit, settings.offsetX)),
						offsetY: Math.min(limit, Math.max(-limit, settings.offsetY)),
					});
				}}
			/>
			{settings.style === 'outline' ? (
				<Slider
					hint={labels.outlineHint}
					label={labels.outlineWidth}
					max={Math.min(10, settings.size / 4)}
					min={0.5}
					value={settings.border}
					onChange={(value) => {
						update('border', value);
					}}
				/>
			) : (
				<>
					{settings.style === 'square' && (
						<Slider
							label={labels.radius}
							max={settings.size / 2}
							min={0}
							value={settings.radius}
							onChange={(value) => {
								update('radius', value);
							}}
						/>
					)}
					<Slider
						label={labels.iconScale}
						max={90}
						min={35}
						step={1}
						unit="%"
						value={settings[scaleKey]}
						onChange={(value) => {
							update(scaleKey, value);
						}}
					/>
					<details className="advanced placement-controls">
						<summary>
							<span>
								<Move size={14} /> {labels.position}
							</span>
							<ChevronDown size={14} />
						</summary>
						<div className="placement-heading">
							<span>{labels.positionHint}</span>
							<button
								aria-label={labels.resetOffsets}
								className="text-button"
								disabled={settings.offsetX === 0 && settings.offsetY === 0}
								type="button"
								onClick={() => {
									onChange({...settings, offsetX: 0, offsetY: 0});
								}}
							>
								<RotateCcw size={12} /> {labels.recenter}
							</button>
						</div>
						<Slider
							hint={labels.horizontalHint}
							label={labels.horizontal}
							max={offsetLimit}
							min={-offsetLimit}
							value={settings.offsetX}
							onChange={(value) => {
								update('offsetX', value);
							}}
						/>
						<Slider
							hint={labels.verticalHint}
							label={labels.vertical}
							max={offsetLimit}
							min={-offsetLimit}
							value={settings.offsetY}
							onChange={(value) => {
								update('offsetY', value);
							}}
						/>
					</details>
				</>
			)}
		</>
	);
}
