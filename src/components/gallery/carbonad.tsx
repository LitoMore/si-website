import {type CSSProperties, useEffect, useRef, useState} from 'react';
import {useColorScheme, useI18n} from '#hooks';
import './carbonad.css';

// Adapted from simple-icons/simple-icons-website-rs/components/grid/src/ad.rs.
const carbonAdsScript =
	'https://cdn.carbonads.com/carbon.js?serve=CKYIPK7M&placement=simpleiconsorg';

function hasVisibleContent(container: HTMLDivElement) {
	const image = container.querySelector('img');
	const text = container.querySelector('.carbon-text');
	if (!image?.complete || !image.naturalWidth || !text?.textContent?.trim()) {
		return false;
	}

	return [image, text].every((content) => {
		const {width, height} = content.getBoundingClientRect();
		if (width === 0 || height === 0) {
			return false;
		}

		// Cosmetic filters can hide the creative or any of its parent elements.
		let element: Element | undefined = content;
		while (element && element !== container.parentElement) {
			const {display, visibility, opacity} = getComputedStyle(element);
			if (
				display === 'none' ||
				visibility === 'hidden' ||
				visibility === 'collapse' ||
				opacity === '0'
			) {
				return false;
			}

			element = element.parentElement ?? undefined;
		}

		return true;
	});
}

function CarbonAd({style}: {readonly style: CSSProperties}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>(
		'loading',
	);
	const {cardBg, cardFg} = useColorScheme();
	const {i18n} = useI18n();

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		let hasFailed = false;
		const updateStatus = () => {
			const isVisible = hasVisibleContent(container);
			setStatus((current) => {
				if (isVisible) {
					return 'ready';
				}

				return hasFailed || current === 'ready' ? 'unavailable' : current;
			});
		};

		const handleError = () => {
			hasFailed = true;
			updateStatus();
		};

		const observer = new MutationObserver(updateStatus);
		observer.observe(container, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		container.addEventListener('load', updateStatus, {capture: true});
		container.addEventListener('error', handleError, {capture: true});
		const fallbackTimeout = setTimeout(handleError, 5000);
		// Also catch cosmetic filters applied by stylesheets outside this container.
		const visibilityInterval = setInterval(updateStatus, 1000);

		// Defer loading so Strict Mode's initial cleanup cancels the first request.
		const timeout = setTimeout(() => {
			const script = document.createElement('script');
			script.id = '_carbonads_js';
			script.async = true;
			script.src = carbonAdsScript;
			script.type = 'text/javascript';
			container.append(script);
		}, 0);

		return () => {
			clearTimeout(timeout);
			clearTimeout(fallbackTimeout);
			clearInterval(visibilityInterval);
			observer.disconnect();
			container.removeEventListener('load', updateStatus, {capture: true});
			container.removeEventListener('error', handleError, {capture: true});
			container.replaceChildren();
		};
	}, []);

	return (
		<aside
			aria-label={i18n.advertisement.label}
			className="relative flex items-center justify-center overflow-hidden rounded text-center"
			style={{...style, backgroundColor: cardBg, color: cardFg}}
		>
			<link href="https://cdn.carbonads.com" rel="preconnect" />
			<div ref={containerRef} className="sponsor-content w-full" />
			{status !== 'ready' && (
				<div
					className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded border border-dashed border-current/20 p-3"
					role="status"
					style={{backgroundColor: cardBg}}
				>
					<span className="text-sm font-medium">
						{status === 'loading'
							? i18n.advertisement.loading
							: i18n.advertisement.unavailable}
					</span>
					{status === 'unavailable' && (
						<span className="text-xs leading-4 opacity-70">
							{i18n.advertisement.description}
						</span>
					)}
					<span className="text-xs leading-4 opacity-60">
						{i18n.advertisement.support}
					</span>
				</div>
			)}
		</aside>
	);
}

export default CarbonAd;
