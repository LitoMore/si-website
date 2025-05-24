import { Divider, Flex } from "antd";
import { styled } from "styled-components";
import { Socials } from "#components";
import { useSizes } from "#hooks";
import Settings from "./settings.tsx";
import ThridParty from "./thirdparty.tsx";
import Translations from "./translations.tsx";

export const ControlTitle = styled(Divider)`
	margin: 0 !important;
`;

export const Control = styled.div`
	width: 32px;
	height: 32px;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
	color: var(--si-header-fg);
	border-radius: 6px;
	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}
`;

const Controls = () => {
	const { isMobileSize } = useSizes();
	return isMobileSize
		? (
			<Flex align="center">
				<Settings />
				<Translations />
				<ThridParty />
			</Flex>
		)
		: (
			<>
				<Flex align="center">
					<Settings />
					<Translations />
					<ThridParty />
				</Flex>
				<Divider type="vertical" />
				<Socials />
			</>
		);
};

export default Controls;
