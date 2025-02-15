// @deno-types="@types/react"
import { useEffect, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import { useFilteredIcons, useIcons, useSearchText } from "#atom";
import { useColorScheme, useI18n, useSearcher, useSizes } from "#hooks";

const Search = () => {
	const [searchText, setSearchText] = useSearchText();
	const [icons] = useIcons();
	const searcher = useSearcher();
	const [, setFilteredIcons] = useFilteredIcons();
	const { isMobileSize } = useSizes();
	const { isDark } = useColorScheme();
	const { i18n } = useI18n();
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputRef = useRef<InputRef>(null);

	const searchIcon = () => {
		const filteredIcons = searchText ? searcher.search(searchText) : icons.data;
		setFilteredIcons(filteredIcons);
	};

	useEffect(() => {
		const keyDown = (e: KeyboardEvent) => {
			if (
				globalThis.document.activeElement !== inputRef.current?.input &&
				e.key === "k" && (e.metaKey || e.ctrlKey)
			) {
				e.preventDefault();
				inputRef.current?.focus({ cursor: "all" });
			}

			if (e.key === "Escape") {
				e.preventDefault();
				if (inputRef.current?.input?.value) {
					setSearchText("");
				} else {
					inputRef.current?.blur();
				}
			}
		};
		globalThis.document.addEventListener("keydown", keyDown);
		return () => globalThis.document.removeEventListener("keydown", keyDown);
	}, []);

	useEffect(() => {
		searchIcon();
	}, [searchText]);

	return (
		<Input
			ref={inputRef}
			allowClear
			autoFocus
			value={searchText}
			suffix={isInputFocused || isMobileSize ? null : (
				<span
					style={{
						padding: 4,
						marginRight: -7,
						borderRadius: 4,
						color: "rgba(0, 0, 0, 0.45)",
						backgroundColor: "rgba(0,0,0,0.06)",
						lineHeight: 1,
						filter: isDark ? "invert(1)" : undefined,
					}}
				>
					{`${
						globalThis.navigator.platform.indexOf("Mac") === -1
							? "CTRL + "
							: "⌘"
					}K`}
				</span>
			)}
			placeholder={i18n.search.searchByBrand}
			onChange={(event) => setSearchText(event.target.value.trim())}
			onFocus={() => setIsInputFocused(true)}
			onBlur={() => setIsInputFocused(false)}
		/>
	);
};

export default Search;
