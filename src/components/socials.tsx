// @deno-types="@types/react"
import { ReactNode } from "react";
import { Flex } from "antd";
import { styled } from "styled-components";

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
	return (
		<Link
			href={link}
			rel="noopener nofollow noreferrer"
			target="_blank"
		>
			{typeof icon === "string"
				? (
					<img
						src={`https://cdn.simpleicons.org/${icon}`}
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
		{
			/* <Social
			icon="npm"
			link="https://npmjs.com/simple-icons"
		/> */
		}
		<Social
			icon="discord"
			link="https://discord.gg/vUXFa7t5xJ"
		/>
	</Flex>
);

export default Socials;
