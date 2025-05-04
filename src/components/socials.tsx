// @deno-types="@types/react"
import { ReactNode } from "react";
import { Flex } from "antd";
import { styled } from "styled-components";
import { linkRel } from "#constants";
import { useColorScheme } from "#hooks";

// deno-fmt-ignore
const Link = styled.a`
  display: block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  box-sizing: content-box;
  padding: 5px;
  border-radius: 6px;
  &:hover {
    background-color: rgba(0,0,0,0.06);
  }
`;

const Social = (
	{ icon, link }: { icon: string | ReactNode; link: string },
) => {
	const { isLight, iconFg } = useColorScheme();
	return (
		<Link
			href={link}
			rel={linkRel}
			target="_blank"
		>
			{typeof icon === "string"
				? (
					<img
						src={`https://cdn.simpleicons.org/${icon}/${
							isLight ? "_" : iconFg.slice(1)
						}`}
						alt={icon}
					/>
				)
				: icon}
		</Link>
	);
};

const Socials = () => (
	<Flex>
		<Social
			icon="github"
			link="https://github.com/simple-icons/simple-icons"
		/>
		<Social
			icon="discord"
			link="https://discord.gg/vUXFa7t5xJ"
		/>
	</Flex>
);

export default Socials;
