import {useEffect} from 'react';
import {AutoComplete, Flex} from 'antd';
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
			options={filteredIcons.map((icon) => ({
				key: icon.slug,
				label: (
					<Flex align="center" gap={8}>
						<PrefixIcon key={icon.slug} icon={icon} iconStyle="icon" />
						<span>{icon.title}</span>
					</Flex>
				),
				value: icon.title,
				icon,
			}))}
			placeholder={i18n.search.searchByBrand}
			prefix={<PrefixIcon icon={selectedIcon} iconStyle="icon" />}
			style={{width: '100%'}}
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
