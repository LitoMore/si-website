import {useEffect, useRef, useState} from 'react';
import {Input, type InputRef} from 'antd';
import {useFilteredIcons, useIcons, useSearchText} from '#atom';
import {useColorScheme, useI18n, useSearcher, useSizes} from '#hooks';

function Search() {
	const [searchText, setSearchText] = useSearchText();
	const [icons] = useIcons();
	const searcher = useSearcher();
	const [, setFilteredIcons] = useFilteredIcons();
	const {isMobileSize} = useSizes();
	const {isDark} = useColorScheme();
	const {i18n} = useI18n();
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputRef = useRef<InputRef>(null);

	useEffect(() => {
		const keyDown = (event: KeyboardEvent) => {
			if (
				globalThis.document.activeElement !== inputRef.current?.input &&
				event.key === 'k' &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				inputRef.current?.focus({cursor: 'all'});
			}

			if (event.key === 'Escape') {
				event.preventDefault();
				if (inputRef.current?.input?.value) {
					setSearchText('');
				} else {
					inputRef.current?.blur();
				}
			}
		};

		globalThis.document.addEventListener('keydown', keyDown);
		return () => {
			globalThis.document.removeEventListener('keydown', keyDown);
		};
	}, [setSearchText]);

	useEffect(() => {
		const searchIcon = () => {
			const filteredIcons = searchText
				? searcher.search(searchText)
				: icons.data;
			setFilteredIcons(filteredIcons);
		};

		searchIcon();
	}, [searchText, icons.data, searcher, setFilteredIcons]);

	return (
		<Input
			ref={inputRef}
			allowClear
			autoFocus
			placeholder={i18n.search.searchByBrand}
			suffix={
				isInputFocused || isMobileSize ? null : (
					<span
						className="rounded-1 mr-[-7px] bg-black/6 p-1 leading-[1] text-black/45"
						style={{
							filter: isDark ? 'invert(1)' : undefined,
						}}
					>
						{`${
							// eslint-disable-next-line @typescript-eslint/no-deprecated
							globalThis.navigator.platform.includes('Mac') ? '⌘' : 'CTRL + '
						}K`}
					</span>
				)
			}
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
	);
}

export default Search;
