import {useEffect, useMemo, useRef, useState} from 'react';
import {IconCopy, IconDownload, IconRefresh} from '@tabler/icons-react';
import {arrayToShuffled} from 'array-shuffle';
import {type Stage as KonvaStage} from 'konva/lib/Stage.js';
import {Layer, Rect, Stage} from 'react-konva';
import {useIcons, useOpenGraphImage} from '#atom';
import {Button} from '#components/ui/button.js';
import {Alert, Spinner, message} from '#components/ui/feedback.js';
import {Select} from '#components/ui/form.js';
import {Tooltip} from '#components/ui/popover.js';
import {brightThreshold, defaultOpenGraphImage} from '#constants';
import {useColorScheme, useI18n} from '#hooks';
import {getJsdelivrCdnUrl} from '#utils';
import MaskedIcon from '../canvas/masked-icon.js';
import {downloadBlob} from '../download/blob.js';
import OpenGraphSettings from './opengraph-settings.js';
import {
	canCopyOpenGraphImage,
	isValidOpenGraphImage,
	loadOpenGraphImage,
	openGraphFormatLabel,
	openGraphGrid,
	openGraphMimeType,
	supportedOpenGraphFormats,
} from './utils.js';

function OpenGraph() {
	const [settings] = useOpenGraphImage();
	const imageSettings = isValidOpenGraphImage(settings)
		? settings
		: defaultOpenGraphImage;
	const {width, height, size} = imageSettings;
	const {isLight} = useColorScheme();
	const {i18n, gettext} = useI18n();
	const labels = i18n.openGraph;
	const [{data, version}] = useIcons();
	const [seed, setSeed] = useState(0);
	const [loadAttempt, setLoadAttempt] = useState(0);
	const [format, setFormat] = useState('png');
	const formats = useMemo(() => supportedOpenGraphFormats(), []);
	const [busy, setBusy] = useState<'copy' | 'download'>();
	const stageRef = useRef<KonvaStage>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const shuffled = useMemo(
		() => ({
			seed,
			icons: arrayToShuffled(
				data.filter(
					(icon) =>
						icon.slug !== 'simpleicons' &&
						((isLight
							? icon.brightness <= brightThreshold
							: icon.brightness > 0.1) ||
							icon.hex === '000000'),
				),
			),
		}),
		[data, isLight, seed],
	).icons;
	const grid = useMemo(() => openGraphGrid(imageSettings), [imageSettings]);
	const icons = useMemo(
		() =>
			shuffled
				.slice(0, grid.rows * grid.columns)
				.map((icon, index) => ({icon, ...grid.position(index), index}))
				.filter(({index}) => !grid.isCenter(index)),
		[shuffled, grid],
	);
	const sources = useMemo(
		() =>
			version
				? [
						getJsdelivrCdnUrl(version, 'simpleicons'),
						...icons.map(({icon}) => getJsdelivrCdnUrl(version, icon.slug)),
					]
				: [],
		[icons, version],
	);
	const [assets, setAssets] = useState<{
		sources: string[];
		images?: HTMLImageElement[];
		failed?: boolean;
	}>();
	const isReady = assets?.sources === sources && Boolean(assets?.images);
	const failed = assets?.sources === sources && assets?.failed;
	const canCopy = canCopyOpenGraphImage();

	useEffect(() => {
		if (sources.length === 0) return;
		let isActive = true;
		void Promise.all(sources.map(async (source) => loadOpenGraphImage(source)))
			.then((images) => {
				if (isActive) setAssets({sources, images});
			})
			.catch(() => {
				if (isActive) setAssets({sources, failed: true});
			});
		return () => {
			isActive = false;
		};
	}, [sources, loadAttempt]);

	useEffect(() => {
		const element = previewRef.current;
		if (!element) return;
		const observer = new ResizeObserver(([entry]) => {
			if (entry) setScale(Math.min(entry.contentRect.width / width, 1));
		});
		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	}, [width]);

	const exportImage = async (shouldCopy: boolean) => {
		if (!isReady || Boolean(busy) || !stageRef.current) return;
		setBusy(shouldCopy ? 'copy' : 'download');
		try {
			stageRef.current.draw();
			const mimeType = shouldCopy ? 'image/png' : openGraphMimeType(format);
			const canvas = stageRef.current.toCanvas({pixelRatio: 1});
			const blob = new Promise<Blob>((resolve, reject) => {
				canvas.toBlob(
					(result) => {
						if (result?.type === mimeType) resolve(result);
						else reject(new Error('Image export failed'));
					},
					mimeType,
					0.95,
				);
			});
			if (shouldCopy) {
				await navigator.clipboard.write([
					new ClipboardItem({'image/png': blob}),
				]);
				message.success(labels.copied);
			} else {
				downloadBlob(
					await blob,
					`simple-icons-og-${width}x${height}.${format}`,
				);
				message.success(labels.downloaded);
			}
		} catch {
			message.error(shouldCopy ? labels.copyError : labels.exportError);
		} finally {
			setBusy(undefined);
		}
	};

	const fillColor = isLight ? '#fff' : '#000';
	return (
		<section aria-label={i18n.header.openGraphGenerator} className="og-editor">
			<header className="og-heading">
				<h1>{i18n.header.openGraphGenerator}</h1>
				<p>{labels.description}</p>
			</header>
			<div className="og-workspace">
				<div className="og-preview-panel">
					<div className="og-preview-toolbar">
						<h2>{labels.preview}</h2>
						<Button
							disabled={Boolean(busy)}
							icon={<IconRefresh size={16} />}
							onClick={() => {
								setSeed(seed + 1);
							}}
						>
							{labels.shuffleIcons}
						</Button>
					</div>
					<div className="og-preview-area">
						<div
							ref={previewRef}
							aria-busy={!isReady && !failed}
							aria-label={labels.preview}
							className="og-preview"
							role="img"
							style={{aspectRatio: `${width} / ${height}`, maxWidth: width}}
						>
							<div
								className="og-stage"
								style={{width, height, transform: `scale(${scale})`}}
							>
								<Stage ref={stageRef} height={height} width={width}>
									<Layer>
										<Rect fill={fillColor} height={height} width={width} />
									</Layer>
									<Layer>
										{isReady
											? icons.map(({icon, x, y}, index) => (
													<MaskedIcon
														key={icon.slug}
														backgroundColor={fillColor}
														foregroundColor={`#${icon.hex === '000000' ? (isLight ? '222' : 'ddd') : icon.hex}`}
														image={assets?.images?.[index + 1]}
														size={size}
														x={x}
														y={y}
													/>
												))
											: null}
									</Layer>
									<Layer>
										{isReady ? (
											<MaskedIcon
												backgroundColor={fillColor}
												foregroundColor={isLight ? '#000' : '#fff'}
												image={assets?.images?.[0]}
												size={grid.centerSize}
												x={grid.centerX}
												y={grid.centerY}
											/>
										) : null}
									</Layer>
								</Stage>
							</div>
							{!isReady && (
								<div className="og-loading" role="status">
									{failed ? (
										<Alert
											action={
												<Button
													size="small"
													onClick={() => {
														setAssets(undefined);
														setLoadAttempt(loadAttempt + 1);
													}}
												>
													{labels.retry}
												</Button>
											}
											title={labels.loadError}
										/>
									) : (
										<>
											<Spinner />
											<span>{labels.loading}</span>
										</>
									)}
								</div>
							)}
						</div>
					</div>
					<div className="og-preview-caption">
						<span dir="ltr">
							{width} × {height} px
						</span>
						<span>{labels.originalSize}</span>
					</div>
				</div>
				<aside aria-label={labels.canvas} className="og-sidebar">
					<OpenGraphSettings />
					<div className="og-export">
						<h2>{labels.export}</h2>
						<div className="og-field">
							<label htmlFor="og-format">{labels.format}</label>
							<Select
								id="og-format"
								options={formats.map((value) => ({
									value,
									label: openGraphFormatLabel(value),
								}))}
								value={format}
								onChange={setFormat}
							/>
						</div>
						<Button
							isBlock
							disabled={!isReady || Boolean(busy)}
							icon={<IconDownload size={17} />}
							isLoading={busy === 'download'}
							size="large"
							variant="primary"
							onClick={() => {
								void exportImage(false);
							}}
						>
							{gettext(labels.download, [openGraphFormatLabel(format)])}
						</Button>
						<Tooltip title={canCopy ? undefined : labels.clipboardUnavailable}>
							<span className="w-full">
								<Button
									isBlock
									disabled={!isReady || !canCopy || Boolean(busy)}
									icon={<IconCopy size={17} />}
									isLoading={busy === 'copy'}
									size="large"
									onClick={() => {
										void exportImage(true);
									}}
								>
									{labels.copy}
								</Button>
							</span>
						</Tooltip>
						<p className="og-export-note">
							{canCopy ? labels.exportHint : labels.clipboardUnavailable}
						</p>
					</div>
				</aside>
			</div>
		</section>
	);
}

export default OpenGraph;
