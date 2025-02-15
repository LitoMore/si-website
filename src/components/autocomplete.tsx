// @deno-types="@types/react"
import { useEffect } from "react";
import { AutoComplete, Flex } from "antd";
import {
	useFilteredIcons,
	useIcons,
	useSearchText,
	useSelectedIcon,
} from "#atom";
import { useI18n, useSearcher } from "#hooks";
import PrefixIcon from "./prefixicon.tsx";

const Autocomplete = () => {
	const [icons] = useIcons();
	const [searchText, setSearchText] = useSearchText();
	const searcher = useSearcher();
	const [filteredIcons, setFilteredIcons] = useFilteredIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const { i18n } = useI18n();

	const searchIcon = () => {
		const filteredIcons = searchText ? searcher.search(searchText) : icons.data;
		setFilteredIcons(filteredIcons);
	};

	useEffect(() => {
		searchIcon();
	}, [searchText]);

	return (
		<AutoComplete
			allowClear
			prefix={<PrefixIcon icon={selectedIcon} style="icon" />}
			style={{ width: "100%" }}
			value={searchText}
			options={filteredIcons.map((icon) => ({
				key: icon.slug,
				label: (
					<Flex align="center" gap={8}>
						<PrefixIcon key={icon.slug} icon={icon} style="icon" />
						<span>{icon.title}</span>
					</Flex>
				),
				value: icon.title,
				icon,
			}))}
			placeholder={i18n.search.searchByBrand}
			onChange={(value) => setSearchText(value.trim())}
			onSelect={(value, option) => {
				setSearchText(value.trim());
				setSelectedIcon(option.icon);
			}}
		/>
	);
};

export default Autocomplete;
