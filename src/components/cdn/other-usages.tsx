import {IconArrowUpRight, IconChevronDown} from '@tabler/icons-react';
import {CopyText} from '#components/ui/copy-text.js';
import {useColorScheme} from '#hooks';
import {getSimpleIconsCdnUrl} from '#utils';
import {useCdnI18n} from './i18n.js';

const media =
	'https://raw.githubusercontent.com/LitoMore/simple-icons-cdn/main/media';
const notionUrl = getSimpleIconsCdnUrl('simpleicons', {
	color: '111',
	darkModeColor: 'eee',
});
const kandoUrl = getSimpleIconsCdnUrl('github', {color: 'white'});

export default function OtherUsages() {
	const {labels} = useCdnI18n();
	const {isDark} = useColorScheme();
	const guides = [
		{
			id: 'raycast',
			title: 'Raycast',
			href: 'https://www.raycast.com/litomore/simple-icons',
			image: 'https://files.raycast.com/ad26y6t5g020vf02p7kc2esbu58c',
			width: 1996,
			height: 1248,
		},
		{
			id: 'notion',
			title: 'Notion',
			href: 'https://www.notion.com/help/customize-and-style-your-content#page-icons-and-emojis',
			image: `${media}/notion-screenshot-${isDark ? 'dark' : 'light'}.webp`,
			width: 820,
			height: 454,
		},
		{
			id: 'kando',
			title: 'Kando',
			href: 'https://kando.menu/icon-themes/',
			image: `${media}/kando-screenshot.webp`,
			width: 2000,
			height: 903,
		},
		{
			id: 'terminal',
			title: 'Terminal · iTerm2',
			href: 'https://iterm2.com/documentation-images.html',
			image: `${media}/imgcat-screenshot.webp`,
			width: 930,
			height: 248,
		},
	] as const;
	const commands = [
		{label: labels.terminalBasic, url: getSimpleIconsCdnUrl('go')},
		{
			label: labels.terminalFit,
			url: getSimpleIconsCdnUrl('go', {autoViewbox: true}),
		},
		{
			label: labels.terminalSized,
			url: getSimpleIconsCdnUrl('go', {autoViewbox: true, size: 48}),
		},
	];

	return (
		<section
			aria-labelledby="cdn-usages-title"
			className="cdn-section cdn-usages"
		>
			<details className="cdn-usages-details">
				<summary className="cdn-usages-summary">
					<h2 id="cdn-usages-title">
						{labels.elsewhere}
						<IconChevronDown
							aria-hidden
							className="cdn-usages-chevron"
							size={20}
						/>
					</h2>
				</summary>
				<div className="cdn-usages-content">
					<div className="cdn-section-heading">
						<p>{labels.elsewhereHint}</p>
					</div>
					<nav
						aria-label={labels.usageNavigation}
						className="cdn-usage-navigation"
					>
						{guides.map((guide) => (
							<a key={guide.id} href={`#cdn-usage-${guide.id}`}>
								{guide.title}
							</a>
						))}
					</nav>
					<div className="cdn-usage-guides">
						{guides.map((guide) => {
							const copy = labels.usages[guide.id];
							const exampleUrl =
								guide.id === 'notion'
									? notionUrl
									: guide.id === 'kando'
										? kandoUrl
										: undefined;
							return (
								<article
									key={guide.id}
									aria-labelledby={`cdn-usage-${guide.id}-title`}
									className="cdn-usage"
									id={`cdn-usage-${guide.id}`}
								>
									<div className="cdn-usage-instructions">
										<h3 id={`cdn-usage-${guide.id}-title`}>{guide.title}</h3>
										<p className="cdn-usage-description">{copy.description}</p>
										<ol>
											{copy.steps.map((step) => (
												<li key={step}>{step}</li>
											))}
										</ol>
										{exampleUrl && (
											<div className="cdn-code" dir="ltr">
												<CopyText text={exampleUrl}>
													<code>{exampleUrl}</code>
												</CopyText>
											</div>
										)}
										{guide.id === 'terminal' && (
											<div className="cdn-terminal-commands">
												{commands.map((command) => (
													<div key={command.url}>
														<p>{command.label}</p>
														<div className="cdn-code" dir="ltr">
															<CopyText text={`imgcat -u '${command.url}'`}>
																<code>{`imgcat -u '${command.url}'`}</code>
															</CopyText>
														</div>
													</div>
												))}
											</div>
										)}
										<p className="cdn-usage-tip">{copy.tip}</p>
										<a
											className="cdn-usage-link"
											href={guide.href}
											rel="noreferrer"
											target="_blank"
										>
											{copy.link}
											<IconArrowUpRight aria-hidden size={15} />
										</a>
									</div>
									<figure className="cdn-usage-figure">
										<a
											aria-label={`${labels.openScreenshot}: ${guide.title}`}
											href={guide.image}
											rel="noreferrer"
											target="_blank"
										>
											<img
												alt={copy.imageAlt}
												decoding="async"
												height={guide.height}
												loading="lazy"
												src={guide.image}
												width={guide.width}
											/>
										</a>
									</figure>
								</article>
							);
						})}
					</div>
				</div>
			</details>
		</section>
	);
}
