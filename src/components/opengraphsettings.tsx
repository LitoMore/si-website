import {Input} from 'antd';
import {
	useOpenGraphGap,
	useOpenGraphHeight,
	useOpenGraphSize,
	useOpenGraphWidth,
} from '#atom';

function OpenGraphSettings() {
	const [width, setWidth] = useOpenGraphWidth();
	const [height, setHeight] = useOpenGraphHeight();
	const [size, setSize] = useOpenGraphSize();
	const [gap, setGap] = useOpenGraphGap();

	return (
		<>
			<div className="flex gap-1">
				<Input
					className="w-[100px]!"
					placeholder="Width"
					type="number"
					value={width}
					onChange={(event) => {
						setWidth(Number(event.target.value));
					}}
				/>
				<Input
					className="w-[100px]!"
					placeholder="Height"
					type="number"
					value={height}
					onChange={(event) => {
						setHeight(Number(event.target.value));
					}}
				/>
			</div>
			<div className="flex gap-1">
				<Input
					className="w-[100px]!"
					placeholder="Width"
					type="number"
					value={size}
					onChange={(event) => {
						setSize(Number(event.target.value));
					}}
				/>
				<Input
					className="w-[100px]!"
					placeholder="Height"
					type="number"
					value={gap}
					onChange={(event) => {
						setGap(Number(event.target.value));
					}}
				/>
			</div>
		</>
	);
}

export default OpenGraphSettings;
