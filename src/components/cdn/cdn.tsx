import {useEffect, useRef, useState} from 'react';
import {
	IconArrowUpRight,
	IconBrandGithub,
	IconMoon,
	IconSun,
} from '@tabler/icons-react';
import {useIcons} from '#atom';
import {CopyText} from '#components/ui/copy-text.js';
import {SegmentedControl} from '#components/ui/form.js';
import {useColorScheme, useSearcher} from '#hooks';
import {getSimpleIconsCdnUrl} from '#utils';
import {useCdnI18n} from './i18n.js';
import OtherUsages from './other-usages.js';

const repository = 'https://github.com/LitoMore/simple-icons-cdn';
const endpoint =
	'https://cdn.simpleicons.org/:icon_slug/:color?/:dark_mode_color?';
type Format = 'URL' | 'HTML' | 'Markdown' | 'Terminal';
type IconOptions = {
	slug: string;
	color: string;
	darkModeColor: string;
	size: string;
	autoViewbox: boolean;
};
const defaults: IconOptions = {
	slug: 'simpleicons',
	color: '',
	darkModeColor: 'eee',
	size: '',
	autoViewbox: false,
};

function iconUrl(options: IconOptions, preview?: 'light' | 'dark') {
	return getSimpleIconsCdnUrl(options.slug, {
		color:
			preview === 'dark'
				? options.darkModeColor || options.color
				: options.color,
		darkModeColor: preview ? undefined : options.darkModeColor,
		size: options.size ? Number(options.size) : undefined,
		autoViewbox: options.autoViewbox,
	});
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function RemoteIcon({
	url,
	title,
	size,
}: {
	readonly url: string;
	readonly title: string;
	readonly size: string;
}) {
	const {labels} = useCdnI18n();
	const [state, setState] = useState<'loading' | 'loaded' | 'failed'>(
		'loading',
	);
	return (
		<div className="cdn-remote-icon" aria-busy={state === 'loading'}>
			{state === 'failed' ? (
				<div className="cdn-preview-status" role="status">
					<p>{labels.loadError}</p>
					<button
						type="button"
						onClick={() => {
							setState('loading');
						}}
					>
						{labels.retry}
					</button>
				</div>
			) : (
				<>
					{state === 'loading' && (
						<span className="cdn-preview-status" role="status">
							{labels.loading}
						</span>
					)}
					<img
						alt={title}
						src={url}
						style={{
							opacity: state === 'loaded' ? 1 : 0,
							width: size ? undefined : 80,
							height: size ? undefined : 80,
						}}
						onError={() => {
							setState('failed');
						}}
						onLoad={() => {
							setState('loaded');
						}}
					/>
				</>
			)}
		</div>
	);
}

export default function Cdn() {
	const {labels} = useCdnI18n();
	const {isDark} = useColorScheme();
	const [icons] = useIcons();
	const searcher = useSearcher();
	const [options, setOptions] = useState(defaults);
	const [previewOptions, setPreviewOptions] = useState(defaults);
	const [format, setFormat] = useState<Format>('URL');
	const builderRef = useRef<HTMLElement>(null);
	const validSlug = /^[a-z\d]+$/.test(options.slug);
	const validSize =
		!options.size ||
		(Number.isSafeInteger(Number(options.size)) && Number(options.size) > 0);
	const valid = validSlug && validSize;
	const url = valid ? iconUrl(options) : '';
	const title =
		icons.data.find((icon) => icon.slug === options.slug)?.title ??
		options.slug;
	const suggestions = searcher.search(options.slug).slice(0, 10);
	const snippets: Record<Format, string> = {
		URL: url,
		HTML: `<img src="${escapeHtml(url)}" alt="${escapeHtml(title)}" />`,
		Markdown: `![${title.replaceAll(/[\[\]\\]/g, '\\$&')}](${url})`,
		Terminal: `imgcat -u '${url}'`,
	};
	const previewUrls = {
		light: iconUrl(previewOptions, 'light'),
		dark: iconUrl(previewOptions, 'dark'),
	};
	useEffect(() => {
		if (!valid) return;
		const timer = setTimeout(() => {
			setPreviewOptions(options);
		}, 350);
		return () => {
			clearTimeout(timer);
		};
	}, [options, valid]);

	const examples = [
		{
			label: labels.defaultExample,
			options: {...defaults, slug: 'react', darkModeColor: ''},
		},
		{
			label: labels.customExample,
			options: {
				...defaults,
				slug: 'github',
				color: 'hotpink',
				darkModeColor: '',
			},
		},
		{
			label: labels.themeExample,
			options: {...defaults, color: '111', darkModeColor: 'eee'},
		},
		{
			label: labels.sizeExample,
			options: {
				...defaults,
				slug: 'go',
				darkModeColor: '',
				size: '48',
				autoViewbox: true,
			},
		},
	];
	const parameters = [
		['icon_slug', labels.slugDescription],
		['color', labels.colorDescription],
		['dark_mode_color', labels.darkDescription],
		['viewbox', labels.viewboxDescription],
		['size', labels.sizeDescription],
	];

	return (
		<>
			<div className="cdn-heading">
				<div className="cdn-heading-brand">
					<img
						alt=""
						height={44}
						width={44}
						src="https://cdn.simpleicons.org/simpleiconscdn/111/eee"
					/>
					<h1>Simple Icons CDN</h1>
				</div>
				<p className="cdn-tagline">{labels.description}</p>
				<p className="cdn-intro">{labels.intro}</p>
				<a
					className="cdn-repository"
					href={repository}
					rel="noreferrer"
					target="_blank"
				>
					<IconBrandGithub aria-hidden size={18} />
					{labels.github}
					<IconArrowUpRight aria-hidden size={15} />
				</a>
			</div>
			<section
				ref={builderRef}
				aria-labelledby="cdn-builder-title"
				className="cdn-builder"
			>
				<div className="cdn-section-heading">
					<h2 id="cdn-builder-title">{labels.build}</h2>
					<p>{labels.buildHint}</p>
				</div>
				<div className="cdn-workspace">
					<div className="cdn-fields">
						<div className="cdn-field">
							<label htmlFor="cdn-slug">{labels.slug}</label>
							<input
								aria-describedby="cdn-slug-hint"
								aria-invalid={!validSlug}
								autoComplete="off"
								dir="ltr"
								id="cdn-slug"
								list="cdn-slugs"
								spellCheck={false}
								value={options.slug}
								onChange={(event) => {
									setOptions({
										...options,
										slug: event.target.value.trim().toLowerCase(),
									});
								}}
							/>
							<datalist id="cdn-slugs">
								{suggestions.map((icon) => (
									<option
										key={icon.slug}
										label={icon.title}
										value={icon.slug}
									/>
								))}
							</datalist>
							<p id="cdn-slug-hint">{labels.slugHint}</p>
						</div>
						<div className="cdn-color-fields">
							{(['color', 'darkModeColor'] as const).map((key) => (
								<div key={key} className="cdn-field">
									<label htmlFor={`cdn-${key}`}>
										{key === 'color' ? labels.color : labels.darkColor}
									</label>
									<input
										aria-describedby="cdn-color-hint"
										autoComplete="off"
										dir="ltr"
										id={`cdn-${key}`}
										placeholder={
											key === 'color' ? labels.brandColor : labels.sameColor
										}
										spellCheck={false}
										value={options[key]}
										onChange={(event) => {
											setOptions({
												...options,
												[key]: event.target.value.trim().replace(/^#/, ''),
											});
										}}
									/>
								</div>
							))}
						</div>
						<p className="cdn-field-hint" id="cdn-color-hint">
							{labels.colorHint}
						</p>
						<div className="cdn-field cdn-size-field">
							<label htmlFor="cdn-size">{labels.size}</label>
							<input
								aria-invalid={!validSize}
								dir="ltr"
								id="cdn-size"
								min={1}
								placeholder={labels.intrinsicSize}
								step={1}
								type="number"
								value={options.size}
								onChange={(event) => {
									setOptions({...options, size: event.target.value});
								}}
							/>
						</div>
						<label className="cdn-checkbox" htmlFor="cdn-viewbox">
							<input
								checked={options.autoViewbox}
								id="cdn-viewbox"
								type="checkbox"
								onChange={(event) => {
									setOptions({...options, autoViewbox: event.target.checked});
								}}
							/>
							<span>{labels.autoViewbox}</span>
						</label>
						<p className="cdn-field-hint">{labels.viewboxHint}</p>
					</div>
					<div className="cdn-previews" aria-label={labels.preview}>
						<div className="cdn-preview-pair">
							{(['light', 'dark'] as const).map((mode) => (
								<div
									key={mode}
									className="cdn-preview"
									data-preview-theme={mode}
								>
									<span className="cdn-preview-label">
										{mode === 'light' ? (
											<IconSun aria-hidden size={15} />
										) : (
											<IconMoon aria-hidden size={15} />
										)}
										{labels[mode]}
									</span>
									<RemoteIcon
										key={previewUrls[mode]}
										size={previewOptions.size}
										title={previewOptions.slug}
										url={previewUrls[mode]}
									/>
								</div>
							))}
						</div>
						<p className="cdn-preview-hint">{labels.previewHint}</p>
					</div>
				</div>
				<div className="cdn-output">
					<div className="cdn-output-heading">
						<h3>{labels.output}</h3>
						<SegmentedControl
							label={labels.format}
							options={(['URL', 'HTML', 'Markdown', 'Terminal'] as const).map(
								(value) => ({value, label: value}),
							)}
							value={format}
							onChange={setFormat}
						/>
					</div>
					{valid ? (
						<div className="cdn-code" dir="ltr">
							<CopyText text={snippets[format]}>
								<code>{snippets[format]}</code>
							</CopyText>
							<a
								aria-label={labels.open}
								href={url}
								rel="noreferrer"
								target="_blank"
							>
								<IconArrowUpRight aria-hidden size={18} />
							</a>
						</div>
					) : (
						<p className="cdn-invalid" role="alert">
							{labels.invalid}
						</p>
					)}
				</div>
			</section>
			<section aria-labelledby="cdn-examples-title" className="cdn-section">
				<div className="cdn-section-heading">
					<h2 id="cdn-examples-title">{labels.examples}</h2>
					<p>{labels.examplesHint}</p>
				</div>
				<div className="cdn-examples">
					{examples.map((example) => (
						<button
							key={example.label}
							className="cdn-example"
							type="button"
							onClick={() => {
								setOptions(example.options);
								builderRef.current?.scrollIntoView({
									behavior: globalThis.matchMedia(
										'(prefers-reduced-motion: reduce)',
									).matches
										? 'instant'
										: 'smooth',
									block: 'start',
								});
							}}
						>
							<span className="cdn-example-heading">
								<img
									alt=""
									height={24}
									loading="lazy"
									src={iconUrl(example.options, isDark ? 'dark' : 'light')}
									width={24}
								/>
								<IconArrowUpRight aria-hidden size={16} />
							</span>
							<strong>{example.label}</strong>
							<code dir="ltr">
								{iconUrl(example.options).replace(
									'https://cdn.simpleicons.org',
									'',
								)}
							</code>
						</button>
					))}
				</div>
			</section>
			<section
				aria-labelledby="cdn-parameters-title"
				className="cdn-section cdn-documentation"
			>
				<div className="cdn-section-heading">
					<h2 id="cdn-parameters-title">{labels.parameters}</h2>
					<p>{labels.parametersHint}</p>
				</div>
				<div className="cdn-endpoint" dir="ltr">
					<span>GET</span>
					<code>{endpoint}</code>
				</div>
				<dl className="cdn-parameters">
					{parameters.map(([name, description]) => (
						<div key={name}>
							<dt>
								<code>{name}</code>
							</dt>
							<dd>{description}</dd>
						</div>
					))}
				</dl>
			</section>
			<OtherUsages />
			<footer className="cdn-footer">
				<a
					href="https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md"
					rel="noreferrer"
					target="_blank"
				>
					{labels.legal}
				</a>
				<a href={`${repository}#readme`} rel="noreferrer" target="_blank">
					{labels.readme}
					<IconArrowUpRight aria-hidden size={14} />
				</a>
			</footer>
		</>
	);
}
