import {useState} from 'react';
import {AutoComplete} from 'antd';
import {useI18n, useSearcher} from '#hooks';
import {type Icon} from '#types';
import PrefixIcon from './prefixicon.js';

export default function Autocomplete({
	title,
	slug,
	onChange,
	onSelect,
}: {
	readonly title: string;
	readonly slug: string;
	readonly onChange: (title: string) => void;
	readonly onSelect: (icon: Icon) => void;
}) {
	const searcher = useSearcher();
	const {i18n} = useI18n();
	const [showMore, setShowMore] = useState(false);
	const matches =
		title.trim().length < 2
			? []
			: searcher.search(title).filter((icon) => icon.slug !== slug);
	const visible = showMore ? matches : matches.slice(0, 3);
	return (
		<AutoComplete
			className="preview-brand-input"
			id="preview-brand"
			options={visible.map((icon) => ({
				value: icon.title,
				icon,
				label: (
					<span className="preview-suggestion">
						<PrefixIcon icon={icon} iconStyle="icon" />
						{icon.title}
					</span>
				),
			}))}
			popupRender={(menu) => (
				<>
					{menu}
					{!showMore && matches.length > 3 && (
						<button
							aria-label={i18n.preview.moreSuggestions}
							className="preview-more"
							type="button"
							onClick={() => {
								setShowMore(true);
							}}
							onMouseDown={(event) => {
								event.preventDefault();
							}}
						>
							+
						</button>
					)}
				</>
			)}
			value={title}
			onChange={(value) => {
				onChange(value);
				setShowMore(false);
			}}
			onSelect={(_value, option) => {
				onSelect(option.icon);
			}}
		/>
	);
}
