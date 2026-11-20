import {useCallback, useEffect, useRef, useState} from 'react';
import {IconX} from '@tabler/icons-react';
import {useSearchParams} from 'react-router';
import {useFilteredIcons, useIcons} from '#atom';
import {useI18n, useSizes} from '#hooks';
import componentLabels from '../../i18n/ui.js';
import {searchIconCatalog} from '../../icon-catalog/client.js';

function Search() {
	const [parameters, setParameters] = useSearchParams();
	const searchText = parameters.get('q') ?? '';
	const setSearchText = useCallback(
		(value: string) => {
			const next = new URLSearchParams(parameters);
			if (value) next.set('q', value);
			else next.delete('q');
			setParameters(next, {replace: true});
		},
		[parameters, setParameters],
	);
	const [icons, setIcons] = useIcons();
	const [, setFilteredIcons] = useFilteredIcons();
	const {isMobileSize} = useSizes();
	const {i18n, languageCode} = useI18n();
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const keyDown = (event: KeyboardEvent) => {
			if (
				event.defaultPrevented ||
				event.isComposing ||
				document.querySelector('[data-ui-overlay][data-open]')
			)
				return;
			if (
				document.activeElement !== inputRef.current &&
				event.key === 'k' &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				inputRef.current?.focus();
				inputRef.current?.select();
			}

			if (event.key !== 'Escape') return;
			event.preventDefault();
			if (inputRef.current?.value) setSearchText('');
			else inputRef.current?.blur();
		};

		document.addEventListener('keydown', keyDown);
		return () => {
			document.removeEventListener('keydown', keyDown);
		};
	}, [setSearchText]);

	useEffect(() => {
		if (!searchText.trim() || icons.data.length === 0) {
			setFilteredIcons(icons.data);
			return;
		}

		let isActive = true;
		void searchIconCatalog(searchText)
			.then((indices) => {
				if (isActive)
					setFilteredIcons(
						indices.map((index) => icons.data[index]!).filter(Boolean),
					);
			})
			.catch(() => {
				if (isActive)
					setIcons((previous) => ({
						...previous,
						error: 'Could not search the icon list. Please try again.',
					}));
			});
		return () => {
			isActive = false;
		};
	}, [searchText, icons.data, setFilteredIcons, setIcons]);

	return (
		<div className="ui-search">
			<input
				ref={inputRef}
				autoFocus
				aria-label={i18n.search.searchByBrand}
				placeholder={i18n.search.searchByBrand}
				value={searchText}
				onBlur={() => {
					setIsInputFocused(false);
				}}
				onChange={(event) => {
					setSearchText(event.target.value);
				}}
				onFocus={() => {
					setIsInputFocused(true);
				}}
			/>
			{searchText ? (
				<button
					aria-label={componentLabels[languageCode].global.clearSearch}
					className="ui-search-clear"
					type="button"
					onClick={() => {
						setSearchText('');
						inputRef.current?.focus();
					}}
				>
					<IconX aria-hidden size={10} />
				</button>
			) : null}
			{!isInputFocused && !isMobileSize && (
				<span
					className="ui-search-shortcut"
					dir="ltr"
				>{`${navigator.platform.includes('Mac') ? '⌘' : 'CTRL + '}K`}</span>
			)}
		</div>
	);
}

export default Search;
