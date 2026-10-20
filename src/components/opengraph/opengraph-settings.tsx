import {useState} from 'react';
import {Button, InputNumber} from 'antd';
import {useOpenGraphImage} from '#atom';
import {defaultOpenGraphImage} from '#constants';
import {useI18n} from '#hooks';
import {isValidOpenGraphImage} from './utils.js';

function OpenGraphSettings() {
	const [openGraphImage, setOpenGraphImage] = useOpenGraphImage();
	const [og, setOg] = useState(openGraphImage);
	const {i18n} = useI18n();
	const labels = i18n.openGraph;
	const isValid = isValidOpenGraphImage(og);
	const fields = [
		{key: 'width', label: labels.width, min: 128, max: 4096},
		{key: 'height', label: labels.height, min: 128, max: 4096},
		{key: 'size', label: labels.size, min: 8, max: 256},
		{key: 'gap', label: labels.gap, min: 0, max: 256},
	] as const;

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				if (isValid) setOpenGraphImage(og);
			}}
		>
			<h2>{labels.canvas}</h2>
			<div className="og-fields">
				{fields.map(({key, label, min, max}) => (
					<div key={key} className="og-field">
						<label htmlFor={`og-${key}`}>{label}</label>
						<InputNumber
							aria-describedby={isValid ? undefined : 'og-validation'}
							id={`og-${key}`}
							max={max}
							min={min}
							precision={0}
							suffix="px"
							value={og[key] || (key === 'gap' ? 0 : null)}
							onChange={(value) => {
								setOg({...og, [key]: value ?? NaN});
							}}
						/>
					</div>
				))}
			</div>
			{!isValid && (
				<p className="og-error" id="og-validation" role="alert">
					{labels.invalidSettings}
				</p>
			)}
			<div className="og-settings-actions">
				<Button autoInsertSpace={false} disabled={!isValid} htmlType="submit">
					{labels.apply}
				</Button>
				<Button
					autoInsertSpace={false}
					type="text"
					onClick={() => {
						setOg(defaultOpenGraphImage);
						setOpenGraphImage(defaultOpenGraphImage);
					}}
				>
					{labels.reset}
				</Button>
			</div>
		</form>
	);
}

export default OpenGraphSettings;
