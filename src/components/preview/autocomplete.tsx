import {useEffect} from 'react';
import {AutoComplete} from 'antd';
import {
	useFilteredIcons,
	useIcons,
	useSearchText,
	useSelectedIcon,
} from '#atom';
import {useI18n, useSearcher} from '#hooks';
import PrefixIcon from './prefixicon.js';

function Autocomplete() {
	const [icons] = useIcons();
	const [searchText, setSearchText] = useSearchText();
	const searcher = useSearcher();
	const [filteredIcons, setFilteredIcons] = useFilteredIcons();
	const [selectedIcon, setSelectedIcon] = useSelectedIcon();
	const {i18n} = useI18n();

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
		<AutoComplete
			allowClear
			className="w-full"
			options={filteredIcons.map((icon) => ({
				key: icon.slug,
				label: (
					<div className="flex justify-center gap-2">
						<PrefixIcon key={icon.slug} icon={icon} iconStyle="icon" />
						<span>{icon.title}</span>
					</div>
				),
				value: icon.title,
				icon,
			}))}
			placeholder={i18n.search.searchByBrand}
			prefix={<PrefixIcon icon={selectedIcon} iconStyle="icon" />}
			value={searchText}
			onChange={(value) => {
				setSearchText(value.trim());
			}}
			onSelect={(value, option) => {
				setSearchText(value.trim());
				setSelectedIcon(option.icon);
			}}
		/>
	);
}

export default Autocomplete;
