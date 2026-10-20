import {useEffect, useRef, useState} from 'react';
import {IconX} from '@tabler/icons-react';
import {useFilteredIcons, useIcons, useSearchText} from '#atom';
import {useI18n, useSearcher, useSizes} from '#hooks';
import componentLabels from '../../i18n/ui.js';

function Search() {
	const [searchText, setSearchText] = useSearchText();
	const [icons] = useIcons();
	const searcher = useSearcher();
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
		setFilteredIcons(searchText ? searcher.search(searchText) : icons.data);
	}, [searchText, icons.data, searcher, setFilteredIcons]);

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
					setSearchText(event.target.value.trim());
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
