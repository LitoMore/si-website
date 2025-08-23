import {useState} from 'react';
import {Button, Input} from 'antd';
import {useOpenGraphImage} from '#atom';
import {defaultOpenGraphImage} from '#constants';
import {useI18n} from '#hooks';

function OpenGraphSettings({onShuffle}: {readonly onShuffle?: () => void}) {
	const [openGraphImage, setOpenGraphImage] = useOpenGraphImage();
	const [og, setOg] = useState(openGraphImage);
	const {i18n} = useI18n();

	return (
		<>
			<div className="flex gap-1">
				<Input
					className="max-w-[150px]!"
					placeholder="Width"
					suffix={
						<span className="text-gray-400 select-none">
							{i18n.openGraph.width}
						</span>
					}
					type="number"
					value={og.width}
					onChange={(event) => {
						setOg({...og, width: Number(event.target.value)});
					}}
				/>
				<Input
					className="max-w-[150px]!"
					placeholder="Height"
					suffix={
						<span className="text-gray-400 select-none">
							{i18n.openGraph.height}
						</span>
					}
					type="number"
					value={og.height}
					onChange={(event) => {
						setOg({...og, height: Number(event.target.value)});
					}}
				/>
			</div>
			<div className="flex gap-1">
				<Input
					className="max-w-[150px]!"
					placeholder="Width"
					suffix={
						<span className="text-gray-400 select-none">
							{i18n.openGraph.size}
						</span>
					}
					type="number"
					value={og.size}
					onChange={(event) => {
						setOg({...og, size: Number(event.target.value)});
					}}
				/>
				<Input
					className="max-w-[150px]!"
					placeholder="Height"
					suffix={
						<span className="text-gray-400 select-none">
							{i18n.openGraph.gap}
						</span>
					}
					type="number"
					value={og.gap}
					onChange={(event) => {
						setOg({...og, gap: Number(event.target.value)});
					}}
				/>
			</div>
			<Button
				autoInsertSpace
				className="border-0! bg-linear-to-r! from-cyan-500! to-blue-500!"
				type="primary"
				onClick={onShuffle}
			>
				{i18n.openGraph.shuffleIcons}
			</Button>
			<Button
				autoInsertSpace={false}
				type="primary"
				onClick={() => {
					setOpenGraphImage(og);
				}}
			>
				{i18n.openGraph.apply}
			</Button>
			<Button
				autoInsertSpace={false}
				type="default"
				onClick={() => {
					setOg(defaultOpenGraphImage);
					setOpenGraphImage(defaultOpenGraphImage);
				}}
			>
				{i18n.openGraph.reset}
			</Button>
		</>
	);
}

export default OpenGraphSettings;
