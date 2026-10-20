import {useState} from 'react';
import {Autocomplete as BaseAutocomplete} from '@base-ui/react/autocomplete';
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
		<BaseAutocomplete.Root
			autoHighlight
			filter={null}
			itemToStringValue={(icon) => icon.title}
			items={visible}
			value={title}
			onValueChange={(value, details) => {
				if (details.reason === 'item-press') {
					const icon = visible.find((icon) => icon.title === value);
					if (icon) onSelect(icon);
				} else {
					onChange(value);
				}

				setShowMore(false);
			}}
		>
			<BaseAutocomplete.Input
				className="preview-brand-input"
				id="preview-brand"
			/>
			<BaseAutocomplete.Portal>
				<BaseAutocomplete.Positioner className="ui-positioner" sideOffset={4}>
					<BaseAutocomplete.Popup
						className="ui-menu ui-autocomplete-popup"
						data-ui-overlay="autocomplete"
					>
						<BaseAutocomplete.List className="ui-autocomplete-list">
							{(icon: Icon) => (
								<BaseAutocomplete.Item
									key={icon.slug}
									className="ui-menu-item"
									value={icon}
								>
									<span className="preview-suggestion">
										<PrefixIcon icon={icon} iconStyle="icon" />
										<bdi>{icon.title}</bdi>
									</span>
								</BaseAutocomplete.Item>
							)}
						</BaseAutocomplete.List>
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
					</BaseAutocomplete.Popup>
				</BaseAutocomplete.Positioner>
			</BaseAutocomplete.Portal>
		</BaseAutocomplete.Root>
	);
}
