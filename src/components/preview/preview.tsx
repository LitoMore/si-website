import {useEffect, useRef, useState} from 'react';
import {
	IconCheck,
	IconCopy,
	IconDeviceFloppy,
	IconDownload,
	IconUpload,
} from '@tabler/icons-react';
import {siSimpleicons} from 'simple-icons';
import {useIcons, useSelectedIcon} from '#atom';
import {message} from '#components/ui/feedback.js';
import {useI18n, useSearcher} from '#hooks';
import {type Icon} from '#types';
import {getSvg} from '#utils';
import AutoComplete from './autocomplete.js';
import PreviewCanvas from './preview-canvas.js';
import {
	downloadBlob,
	iconSvg,
	isValidColor,
	lintPath,
	normalizePreviewColor,
	previewPng,
	previewSlug,
} from './utils.js';
import './preview.css';

export default function Preview() {
	const [selectedIcon] = useSelectedIcon();
	const searcher = useSearcher();
	const query = new URLSearchParams(globalThis.location.search).get('q');
	const initialIcon =
		selectedIcon ?? (query ? searcher.search(query)[0] : undefined);
	return (
		<PreviewEditor
			key={initialIcon?.slug ?? 'simpleicons'}
			initialIcon={initialIcon}
		/>
	);
}

function PreviewEditor({initialIcon}: {readonly initialIcon?: Icon}) {
	const {i18n} = useI18n();
	const labels = i18n.preview;
	const [icons] = useIcons();
	const [title, setTitle] = useState(initialIcon?.title ?? 'Simple Icons');
	const [color, setColor] = useState(initialIcon?.hex ?? '111111');
	const [path, setPath] = useState(initialIcon ? '' : siSimpleicons.path);
	const [slug, setSlug] = useState(initialIcon?.slug ?? 'simpleicons');
	const [loading, setLoading] = useState(Boolean(initialIcon));
	const [dragging, setDragging] = useState(false);
	const [invalidFile, setInvalidFile] = useState(false);
	const [copied, setCopied] = useState(false);
	const [showIssues, setShowIssues] = useState(false);
	const svgRef = useRef<SVGSVGElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const pathRef = useRef<HTMLInputElement>(null);
	const requestRef = useRef(0);
	const issues = lintPath(path, labels);

	useEffect(() => {
		if (!initialIcon || !icons.version || requestRef.current > 0) return;
		let isActive = true;
		const request = requestRef.current;
		void getSvg(icons.version, initialIcon.slug)
			.then((svg) => {
				if (!isActive || request !== requestRef.current) return;
				const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml');
				const nextPath = parsed.querySelector('path')?.getAttribute('d');
				if (!nextPath) throw new Error('Missing SVG path');
				setPath(nextPath);
				++requestRef.current;
				setLoading(false);
			})
			.catch(() => {
				if (!(isActive && request === requestRef.current)) {
					return;
				}

				setLoading(false);
				message.error(labels.loadError);
			});
		return () => {
			isActive = false;
		};
	}, [initialIcon, icons.version, labels.loadError]);

	const selectIcon = async (icon: Icon) => {
		const request = ++requestRef.current;
		setTitle(icon.title);
		setColor(icon.hex);
		setSlug(icon.slug);
		setLoading(true);
		try {
			const svg = await getSvg(icons.version, icon.slug);
			const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml');
			const nextPath = parsed.querySelector('path')?.getAttribute('d');
			if (!nextPath) throw new Error('Missing SVG path');
			if (request === requestRef.current) setPath(nextPath);
		} catch {
			if (request === requestRef.current) message.error(labels.loadError);
		} finally {
			if (request === requestRef.current) setLoading(false);
		}
	};

	const upload = async (file: File) => {
		try {
			if (!(
				file.name.toLowerCase().endsWith('.svg') ||
				file.type === 'image/svg+xml'
			))
				throw new Error('Invalid SVG');
			const svg = new DOMParser().parseFromString(
				await file.text(),
				'image/svg+xml',
			);
			const paths = [...svg.querySelectorAll('path')]
				.map((element) => element.getAttribute('d'))
				.filter(Boolean)
				.join(' ');
			if (
				!paths ||
				svg.documentElement.localName !== 'svg' ||
				svg.querySelector('parsererror')
			)
				throw new Error('Invalid SVG');
			++requestRef.current;
			const brand = svg.querySelector('title')?.textContent.trim();
			const fill = svg.querySelector('[fill]')?.getAttribute('fill');
			const normalized = fill ? normalizePreviewColor(fill) : undefined;
			const matchedIcon = icons.data.find((icon) => icon.title === brand);
			if (normalized !== undefined && isValidColor(normalized))
				setColor(normalized);
			else if (!fill && matchedIcon) setColor(matchedIcon.hex);
			if (brand) setTitle(brand);
			setPath(paths);
			setLoading(false);
			setInvalidFile(false);
		} catch {
			setInvalidFile(true);
			message.error(labels.invalidFile);
			setTimeout(() => {
				setInvalidFile(false);
			}, 1500);
		}
	};

	const exportPreview = async (shouldCopy: boolean) => {
		if (loading || !svgRef.current) return;
		try {
			const blob = previewPng(svgRef.current);
			if (shouldCopy) {
				await navigator.clipboard.write([
					new ClipboardItem({'image/png': blob}),
				]);
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 1000);
			} else downloadBlob(await blob, `${previewSlug(title)}.png`);
		} catch {
			message.error(labels.exportError);
		}
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				!(event.ctrlKey || event.metaKey) ||
				event.altKey ||
				event.shiftKey ||
				event.repeat
			)
				return;
			const key = event.key.toLowerCase();
			const {target} = event;
			if (
				key === 'c' &&
				((target instanceof HTMLInputElement &&
					target.selectionStart !== target.selectionEnd) ||
					Boolean(globalThis.getSelection()?.toString()) ||
					(target instanceof HTMLElement && target.isContentEditable))
			)
				return;
			const buttons: Record<string, string> = {
				arrowup: 'preview-upload-trigger',
				arrowdown: 'preview-download-svg-button',
				s: 'preview-save-button',
				c: 'preview-copy-button',
			};
			const id = buttons[key];
			if (!id) {
				return;
			}

			event.preventDefault();
			document.querySelector<HTMLButtonElement>(`#${id}`)?.click();
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return (
		<section
			aria-label={i18n.header.iconPreviewer}
			className={[
				'icon-previewer',
				dragging && 'dragging-file',
				invalidFile && 'invalid-file',
			]
				.filter(Boolean)
				.join(' ')}
			onDragEnter={(event) => {
				if (!event.dataTransfer.types.includes('Files')) {
					return;
				}

				event.preventDefault();
				setDragging(true);
			}}
			onDragLeave={(event) => {
				if (!(
					event.relatedTarget instanceof Node &&
					event.currentTarget.contains(event.relatedTarget)
				))
					setDragging(false);
			}}
			onDragOver={(event) => {
				if (!event.dataTransfer.types.includes('Files')) {
					return;
				}

				event.preventDefault();
				event.dataTransfer.dropEffect = 'copy';
			}}
			onDrop={(event) => {
				if (!event.dataTransfer.types.includes('Files')) return;
				event.preventDefault();
				setDragging(false);
				const file = event.dataTransfer.files[0];
				if (file) void upload(file);
			}}
		>
			<div className="preview-inputs">
				<div className="preview-input-group preview-brand-group">
					<label htmlFor="preview-brand">{labels.brand}</label>
					<AutoComplete
						slug={slug}
						title={title}
						onChange={setTitle}
						onSelect={(icon) => {
							void selectIcon(icon);
						}}
					/>
				</div>
				<div className="preview-input-group preview-color-group">
					<label htmlFor="preview-color">{i18n.modal.color}</label>
					<input
						aria-invalid={!isValidColor(color)}
						autoComplete="off"
						dir="ltr"
						id="preview-color"
						spellCheck={false}
						value={color}
						onChange={(event) => {
							setColor(normalizePreviewColor(event.target.value));
						}}
					/>
				</div>
			</div>
			<div
				className="preview-input-group preview-path-group"
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget))
						setShowIssues(false);
				}}
			>
				<label htmlFor="preview-path">{labels.path}</label>
				<input
					ref={pathRef}
					aria-describedby={
						showIssues && issues.length > 0 ? 'preview-path-issues' : undefined
					}
					autoComplete="off"
					className={issues.length > 0 ? 'warn' : ''}
					dir="ltr"
					id="preview-path"
					spellCheck={false}
					value={path}
					onChange={(event) => {
						++requestRef.current;
						setPath(event.target.value);
						setLoading(false);
					}}
					onFocus={() => {
						setShowIssues(true);
					}}
				/>
				{showIssues && issues.length > 0 ? (
					<ul
						className="preview-path-issues"
						id="preview-path-issues"
						onMouseDown={(event) => {
							event.preventDefault();
						}}
					>
						{issues.map((issue) => (
							<li key={issue.message}>
								<span>{issue.message}</span>
								<div>
									{issue.start !== undefined && (
										<button
											type="button"
											onClick={() => {
												pathRef.current?.focus();
												pathRef.current?.setSelectionRange(
													issue.start!,
													issue.end!,
												);
											}}
										>
											{labels.show}
										</button>
									)}
									{issue.fix !== undefined && (
										<button
											type="button"
											onClick={() => {
												setPath(issue.fix!);
												pathRef.current?.focus();
											}}
										>
											{labels.fix}
										</button>
									)}
								</div>
							</li>
						))}
					</ul>
				) : null}
			</div>
			<PreviewCanvas
				color={color}
				iconsTotal={icons.data.length}
				path={path}
				svgRef={svgRef}
				title={title}
			/>
			<div className="preview-buttons">
				<input
					ref={fileRef}
					accept=".svg,image/svg+xml"
					aria-label={labels.uploadSvg}
					className="preview-file-input"
					id="preview-upload-svg-button"
					type="file"
					onChange={(event) => {
						const file = event.target.files?.[0];
						if (file) void upload(file);
						event.target.value = '';
					}}
				/>
				<button
					id="preview-upload-trigger"
					title={`${labels.uploadSvg} (Ctrl+↑)`}
					type="button"
					onClick={() => {
						fileRef.current?.click();
					}}
				>
					<IconUpload />
					{labels.uploadSvg}
				</button>
				<div className="preview-export-buttons">
					<button
						disabled={loading}
						id="preview-download-svg-button"
						title={`${labels.downloadSvg} (Ctrl+↓)`}
						type="button"
						onClick={() => {
							downloadBlob(
								new Blob([iconSvg(title, path)], {type: 'image/svg+xml'}),
								`${previewSlug(title)}.svg`,
							);
						}}
					>
						<IconDownload />
						{labels.downloadSvg}
					</button>
					<button
						disabled={loading}
						id="preview-save-button"
						title={`${labels.savePreview} (Ctrl+S)`}
						type="button"
						onClick={() => {
							void exportPreview(false);
						}}
					>
						<IconDeviceFloppy />
						{labels.savePreview}
					</button>
					<button
						disabled={loading}
						id="preview-copy-button"
						title={`${labels.copyScreenshot} (Ctrl+C)`}
						type="button"
						onClick={() => {
							void exportPreview(true);
						}}
					>
						{copied ? <IconCheck /> : <IconCopy />}
						{labels.copyScreenshot}
					</button>
				</div>
			</div>
		</section>
	);
}
