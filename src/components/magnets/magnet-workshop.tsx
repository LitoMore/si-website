import {useDeferredValue, useEffect, useMemo, useRef, useState} from 'react';
import {
	ArrowDownToLine,
	ArrowLeftRight,
	ArrowUpRight,
	Box,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	CircleHelp,
	Expand,
	Layers2,
	Magnet,
	Maximize2,
	RotateCcw,
	Search,
	Sparkles,
	X,
} from 'lucide-react';
import Loading from '#components/gallery/loading.js';
import {useColorScheme, useSearcher} from '#hooks';
import {type Icon, LanguageCode} from '#types';
import {colorForBackground, getMaskStyles} from '#utils';
import componentLabels from '../../i18n/ui.js';
import {download, downloadPng, stl, threeMf} from './export.js';
import {
	type MagnetSettings,
	defaults,
	modelSvg,
	polygonsToPath,
} from './geometry.js';
import {type MagnetLabels, useMagnetI18n} from './i18n.js';
import Preview from './preview.js';
import {ShapeControls, Slider} from './shape-controls.js';
import {useIconPath} from './use-icon-path.js';
import {useMagnetModel} from './use-magnet-model.js';
import './magnets.css';

const featured = [
	'fanfou',
	'github',
	'apple',
	'spotify',
	'react',
	'figma',
	'notion',
	'discord',
	'blender',
	'youtube',
	'nintendo',
	'linux',
	'docker',
	'raspberrypi',
	'starbucks',
	'steam',
	'adidas',
	'nike',
	'pinterest',
	'reddit',
	'git',
	'vuedotjs',
	'typescript',
	'python',
	'rust',
	'homeassistant',
	'bilibili',
	'wechat',
	'xiaomi',
	'nasa',
];
const pageSize = 60;

function IconImage({
	icon,
	version,
	color,
	isLight,
}: {
	readonly icon: Icon;
	readonly version: string;
	readonly color?: string;
	readonly isLight: boolean;
}) {
	return (
		<span
			aria-label={icon.title}
			className="brand-icon"
			role="img"
			style={{
				...getMaskStyles(version, icon, isLight),
				...(color && {backgroundColor: color}),
			}}
		/>
	);
}

function localizedModelError(error: string, labels: MagnetLabels) {
	if (!error) return '';
	if (error.includes('no closed contours')) return labels.noContours;
	return error.includes('extends beyond the base')
		? labels.overhang
		: labels.modelError;
}

function initialIcon(icons: Icon[], slug?: string) {
	return (
		icons.find((icon) => icon.slug === slug) ??
		icons.find((icon) => icon.slug === 'fanfou') ??
		icons[0]!
	);
}

export default function MagnetWorkshop({
	icons,
	version,
	initialSlug,
}: {
	readonly icons: Icon[];
	readonly version: string;
	readonly initialSlug?: string;
}) {
	const {labels, i18n, gettext, languageCode} = useMagnetI18n();
	const {colorScheme, isLight} = useColorScheme();
	const closeLabel = componentLabels[languageCode].global.close;
	const styleLabels = {
		outline: labels.outline,
		square: labels.square,
		circle: labels.circle,
	};
	const [selected, setSelected] = useState<Icon>(() =>
		initialIcon(icons, initialSlug),
	);
	const [settings, setSettings] = useState<MagnetSettings>(() => ({
		...defaults,
		iconColor: `#${selected.hex}`,
	}));
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query.trim().toLowerCase());
	const [page, setPage] = useState(0);
	const {
		path,
		error: iconError,
		isLoading: iconLoading,
		retry: retryIcon,
	} = useIconPath(version, selected.slug);
	const {
		model,
		error: modelError,
		isPending,
	} = useMagnetModel(path, settings, JSON.stringify([version, selected.slug]));
	const iconPartCount = model?.logoParts.length ?? 0;
	const error = iconError
		? i18n.preview.loadError
		: localizedModelError(modelError, labels);
	const searcher = useSearcher(icons);
	const [front, setFront] = useState(false);
	const [reset, setReset] = useState(0);
	const [format, setFormat] = useState('3mf');
	const [exporting, setExporting] = useState(false);
	const [message, setMessage] = useState<{format?: string; failed?: boolean}>();
	const [help, setHelp] = useState(false);
	const filtered = useMemo(
		() =>
			deferredQuery.length > 0
				? searcher.search(deferredQuery)
				: [
						...featured.flatMap(
							(slug) => icons.find((icon) => icon.slug === slug) ?? [],
						),
						...icons.filter((icon) => !featured.includes(icon.slug)),
					],
		[deferredQuery, icons, searcher],
	);
	const visibleIcons = filtered.slice(page * pageSize, (page + 1) * pageSize);

	function update<K extends keyof MagnetSettings>(
		key: K,
		value: MagnetSettings[K],
	) {
		setSettings((previous) => ({...previous, [key]: value}));
	}

	function selectIcon(icon: Icon) {
		setSelected(icon);
		update('iconColor', `#${icon.hex}`);
	}

	async function exportFile() {
		if (!model || isPending || error.length > 0) {
			return;
		}

		setExporting(true);
		setMessage(undefined);
		try {
			const filename = `${selected.slug}-${settings.style}-${settings.size}mm.${format}`;
			switch (format) {
				case 'stl': {
					download(stl(model.fused), filename, 'model/stl');
					break;
				}

				case '3mf': {
					download(await threeMf(model, settings), filename, 'model/3mf');
					break;
				}

				case 'svg': {
					download(modelSvg(model, settings), filename, 'image/svg+xml');
					break;
				}

				default: {
					await downloadPng(model, settings, filename);
				}
			}

			setMessage({format: format.toUpperCase()});
		} catch {
			setMessage({failed: true});
		} finally {
			setExporting(false);
		}
	}

	return (
		<div
			className="magnet-workshop app-shell"
			data-theme={colorScheme}
			dir={languageCode === LanguageCode.Arabic ? 'rtl' : 'ltr'}
			lang={languageCode}
		>
			<main aria-label={labels.name}>
				<div className="workbench">
					<section className="icon-panel panel">
						<div className="panel-heading">
							<h2>
								<span className="step">01</span> {labels.chooseIcon}
							</h2>
							<span className="count">
								{icons.length.toLocaleString(languageCode)}
							</span>
						</div>
						<div className="search-box">
							<Search size={17} />
							<input
								aria-label={labels.searchIcons}
								placeholder={i18n.search.searchByBrand}
								value={query}
								onChange={(event) => {
									setQuery(event.target.value);
									setPage(0);
								}}
							/>
							{query.length > 0 && (
								<button
									aria-label={componentLabels[languageCode].global.clearSearch}
									className="icon-button"
									type="button"
									onClick={() => {
										setQuery('');
										setPage(0);
									}}
								>
									<X size={14} />
								</button>
							)}
						</div>
						<div className="collection-label">
							<span>
								{query.length > 0 ? labels.results : labels.favorites}
							</span>
							<span>
								{query.length > 0
									? gettext(labels.iconCount, [
											filtered.length.toLocaleString(languageCode),
										])
									: labels.allIcons}
							</span>
						</div>
						<div className="icon-grid">
							{visibleIcons.map((icon) => (
								<button
									key={icon.slug}
									aria-pressed={selected.slug === icon.slug}
									className={`icon-tile ${selected.slug === icon.slug ? 'selected' : ''}`}
									title={icon.title}
									type="button"
									onClick={() => {
										selectIcon(icon);
									}}
								>
									<IconImage icon={icon} isLight={isLight} version={version} />
									<span>{icon.title}</span>
									{selected.slug === icon.slug && (
										<span className="selection-check">
											<Check size={9} strokeWidth={3} />
										</span>
									)}
								</button>
							))}
							{visibleIcons.length === 0 && (
								<div className="empty-state">
									<Search size={25} />
									<p>{i18n.search.noIconsFound}</p>
									<small>{labels.trySearch}</small>
								</div>
							)}
						</div>
						<div className="pagination">
							<span>
								{page + 1} /{' '}
								{Math.max(1, Math.ceil(filtered.length / pageSize))}
							</span>
							<div>
								<button
									aria-label={labels.previous}
									className="icon-button"
									disabled={page === 0}
									type="button"
									onClick={() => {
										setPage((previous) => previous - 1);
									}}
								>
									<ChevronLeft size={15} />
								</button>
								<button
									aria-label={labels.next}
									className="icon-button"
									disabled={(page + 1) * pageSize >= filtered.length}
									type="button"
									onClick={() => {
										setPage((previous) => previous + 1);
									}}
								>
									<ChevronRight size={15} />
								</button>
							</div>
						</div>
						<div className="source-credit">
							<Layers2 size={14} />
							<span>
								Simple Icons <b>v{version}</b>
							</span>
							<ArrowUpRight size={12} />
						</div>
					</section>
					<section className="preview-panel panel">
						<div className="panel-heading">
							<div className="preview-heading">
								<h2>
									<span className="step">02</span> {i18n.openGraph.preview}
								</h2>
								<button
									aria-label={labels.help}
									className="icon-button"
									title={labels.help}
									type="button"
									onClick={() => {
										setHelp(true);
									}}
								>
									<CircleHelp size={19} />
								</button>
							</div>
							<div className="view-switch">
								<button
									className={front ? '' : 'active'}
									type="button"
									onClick={() => {
										setFront(false);
									}}
								>
									{labels.view3d}
								</button>
								<button
									className={front ? 'active' : ''}
									type="button"
									onClick={() => {
										setFront(true);
									}}
								>
									{labels.front}
								</button>
							</div>
						</div>
						<div className="preview-stage">
							<div className="stage-label">
								<span className="live-dot" /> {i18n.openGraph.preview}
							</div>
							<button
								aria-label={labels.resetView}
								className="stage-reset icon-button"
								type="button"
								onClick={() => {
									setReset((previous) => previous + 1);
								}}
							>
								<Maximize2 size={17} />
							</button>
							{model && error.length === 0 ? (
								front ? (
									<svg
										aria-label={gettext(labels.frontLabel, [selected.title])}
										className="front-preview"
										role="img"
										viewBox={`${-model.width / 2 - 12} ${-model.height / 2 - 12} ${model.width + 24} ${model.height + 24}`}
									>
										<path
											d={polygonsToPath(model.basePolygons)}
											fill={settings.baseColor}
										/>
										<path
											d={polygonsToPath(model.logoPolygons)}
											fill={settings.iconColor}
										/>
									</svg>
								) : (
									<Preview
										isFront={front}
										model={model}
										reset={reset}
										settings={settings}
									/>
								)
							) : null}
							{isPending && error.length === 0 ? (
								<div className="preview-loading">
									<Loading
										height="100%"
										label={
											iconLoading ? i18n.openGraph.loading : labels.building
										}
									/>
								</div>
							) : null}
							{error.length > 0 && (
								<div className="model-error">
									<CircleHelp size={24} />
									<p>{error}</p>
									{iconError ? (
										<button
											className="text-button"
											type="button"
											onClick={retryIcon}
										>
											{i18n.openGraph.retry}
										</button>
									) : null}
								</div>
							)}
							<div className="stage-bottom">
								<span>{front ? labels.frontHint : labels.orbit}</span>
								<span>mm</span>
							</div>
							<div className="dimension-line">
								<span>
									{model && error.length === 0
										? model.width.toFixed(1)
										: settings.size.toFixed(1)}{' '}
									mm
								</span>
							</div>
						</div>
						<div className="preview-details">
							<div className="selected-identity">
								<span
									className="selected-icon"
									style={{
										background:
											colorForBackground(settings.iconColor, true).brightness >
											0.4
												? '#263027'
												: '#f3f5ee',
									}}
								>
									<IconImage
										color={settings.iconColor}
										icon={selected}
										isLight={isLight}
										version={version}
									/>
								</span>
								<div>
									<h3>{selected.title}</h3>
									<span>{styleLabels[settings.style]}</span>
								</div>
							</div>
							<span className="material-tag">PLA</span>
						</div>
						<div className="model-stats">
							<div>
								<Expand size={15} />
								<span>{labels.size}</span>
								<strong>
									{model && error.length === 0
										? `${model.width.toFixed(1)} × ${model.height.toFixed(1)}`
										: '—'}{' '}
									<small>mm</small>
								</strong>
							</div>
							<div>
								<Layers2 size={15} />
								<span>{labels.thickness}</span>
								<strong>
									{(settings.baseHeight + settings.reliefHeight).toFixed(1)}{' '}
									<small>mm</small>
								</strong>
							</div>
							<div>
								<Box size={15} />
								<span>{labels.weight}</span>
								<strong>
									{model && error.length === 0
										? ((model.volume * 1.24) / 1000).toFixed(1)
										: '—'}{' '}
									<small>g</small>
								</strong>
							</div>
						</div>
						<div
							className={`preview-tip ${model && model.components > 1 ? 'warning' : ''}`}
						>
							<Sparkles size={15} />
							<span>
								{model && model.components > 1
									? gettext(labels.components, [
											model.components.toLocaleString(languageCode),
										])
									: labels.filled}
							</span>
						</div>
					</section>
					<section className="settings-panel panel">
						<div className="panel-heading">
							<h2>
								<span className="step">03</span> {labels.customize}
							</h2>
							<button
								aria-label={i18n.settings.reset}
								className="icon-button"
								title={i18n.settings.reset}
								type="button"
								onClick={() => {
									setSettings({...defaults, iconColor: `#${selected.hex}`});
								}}
							>
								<RotateCcw size={15} />
							</button>
						</div>
						<div className="settings-content">
							<ShapeControls settings={settings} onChange={setSettings} />
							<div className="section-divider" />
							<div className="color-heading">
								<span className="field-label">{i18n.modal.color}</span>
								<button
									className="text-button"
									type="button"
									onClick={() => {
										setSettings((previous) => ({
											...previous,
											baseColor: previous.iconColor,
											iconColor: previous.baseColor,
										}));
									}}
								>
									<ArrowLeftRight size={12} /> {labels.swap}
								</button>
							</div>
							<div className="color-fields">
								{(['baseColor', 'iconColor'] as const).map((key, index) => (
									<label key={key} className="color-field">
										<span
											className="color-swatch"
											style={{background: settings[key]}}
										>
											<input
												aria-label={
													index === 0 ? labels.baseColor : labels.iconColor
												}
												type="color"
												value={settings[key]}
												onChange={(event) => {
													update(key, event.target.value);
												}}
											/>
										</span>
										<span>
											<small>
												{index === 0 ? labels.baseBorder : labels.icon}
											</small>
											<strong>{settings[key].toUpperCase()}</strong>
										</span>
									</label>
								))}
							</div>
							<div className="color-presets">
								<button
									aria-label={labels.brandWhite}
									title={labels.brandWhite}
									type="button"
									onClick={() => {
										setSettings((previous) => ({
											...previous,
											baseColor: '#ffffff',
											iconColor: `#${selected.hex}`,
										}));
									}}
								>
									<span style={{background: '#ffffff'}} />
									<span style={{background: `#${selected.hex}`}} />
								</button>
								<button
									aria-label={labels.whiteBrand}
									title={labels.whiteBrand}
									type="button"
									onClick={() => {
										setSettings((previous) => ({
											...previous,
											baseColor: `#${selected.hex}`,
											iconColor: '#ffffff',
										}));
									}}
								>
									<span style={{background: `#${selected.hex}`}} />
									<span style={{background: '#ffffff'}} />
								</button>
								<button
									aria-label={labels.blackWhite}
									title={labels.blackWhite}
									type="button"
									onClick={() => {
										setSettings((previous) => ({
											...previous,
											baseColor: '#ffffff',
											iconColor: '#252525',
										}));
									}}
								>
									<span style={{background: '#ffffff'}} />
									<span style={{background: '#252525'}} />
								</button>
								<span>{labels.presets}</span>
							</div>
							<details className="advanced">
								<summary>
									<span>
										<Layers2 size={14} /> {labels.printThickness}
									</span>
									<ChevronDown size={14} />
								</summary>
								<Slider
									label={labels.baseThickness}
									max={6}
									min={1}
									value={settings.baseHeight}
									onChange={(value) => {
										update('baseHeight', value);
									}}
								/>
								<Slider
									label={labels.reliefHeight}
									max={3}
									min={0.2}
									value={settings.reliefHeight}
									onChange={(value) => {
										update('reliefHeight', value);
									}}
								/>
							</details>
							<div className="export-area">
								<div className="export-format">
									<label htmlFor="format">{i18n.openGraph.format}</label>
									<select
										id="format"
										value={format}
										onChange={(event) => {
											setFormat(event.target.value);
										}}
									>
										<option value="3mf">{labels.format3mf}</option>
										<option value="stl">{labels.formatStl}</option>
										<option value="svg">{labels.formatSvg}</option>
										<option value="png">{labels.formatPng}</option>
									</select>
								</div>
								<button
									className="export-button"
									disabled={!model || isPending || Boolean(error) || exporting}
									type="button"
									onClick={() => {
										void exportFile();
									}}
								>
									<ArrowDownToLine size={17} />
									{exporting ? labels.exporting : labels.exportMagnet}
									<span>.{format}</span>
								</button>
								<div className="export-hint">
									{format === '3mf'
										? gettext(labels.parts, [
												iconPartCount.toLocaleString(languageCode),
											])
										: format === 'stl'
											? labels.stlHint
											: format === 'png'
												? labels.pngHint
												: labels.svgHint}
								</div>
								<ExportStatus message={message} />
							</div>
						</div>
					</section>
				</div>
			</main>
			{help ? (
				<HelpDialog
					onClose={() => {
						setHelp(false);
					}}
				>
					<button
						aria-label={closeLabel}
						className="icon-button close-dialog"
						type="button"
						onClick={() => {
							setHelp(false);
						}}
					>
						<X size={20} />
					</button>
					<Magnet size={28} />
					<h2>{labels.help}</h2>
					<p>{labels.helpIntro}</p>
					<p>{labels.helpOutline}</p>
					<p>{labels.helpExport}</p>
					<p>{labels.helpBack}</p>
					<button
						className="export-button"
						type="button"
						onClick={() => {
							setHelp(false);
						}}
					>
						{closeLabel}
					</button>
				</HelpDialog>
			) : null}
		</div>
	);
}

function HelpDialog({
	children,
	onClose,
}: {
	readonly children: React.ReactNode;
	readonly onClose: () => void;
}) {
	const {labels} = useMagnetI18n();
	const dialogRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const dialog = dialogRef.current;
		dialog?.showModal();
		return () => {
			dialog?.close();
		};
	}, []);
	return (
		<dialog
			ref={dialogRef}
			aria-label={labels.help}
			className="help-dialog"
			onClose={(event) => {
				// StrictMode may reopen the dialog before its queued close event
				// arrives. Only dismiss a live dialog that is actually closed.
				const dialog = event.currentTarget;
				if (dialog.isConnected && !dialog.open) {
					onClose();
				}
			}}
		>
			{children}
		</dialog>
	);
}

function ExportStatus({
	message,
}: {
	readonly message?: {format?: string; failed?: boolean};
}) {
	const {labels, gettext} = useMagnetI18n();
	return (
		<div className="status-message" role="status">
			{message?.failed
				? labels.exportError
				: message?.format
					? gettext(labels.ready, [message.format])
					: ''}
		</div>
	);
}
