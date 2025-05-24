import { Dropdown } from "antd";
import { IconPuzzle } from "@tabler/icons-react";
import { useColorTheme } from "#atom";
import { linkRel } from "#constants";
import { thirdParties } from "#data";
import { useColorScheme } from "#hooks";
import { getColorScheme } from "#utils";
import { Control } from "./controls.tsx";

const Icon = ({ url }: { url: string }) => (
	<img
		src={url}
		style={{
			width: 20,
			height: 20,
		}}
	/>
);

const Item = (
	{ icon, label, url }: {
		icon: string;
		label: string;
		url: string;
	},
) => (
	<a
		rel={linkRel}
		target="_blank"
		href={url}
		style={{ display: "flex", alignItems: "center", gap: 8 }}
	>
		<Icon url={icon} />
		{label}
	</a>
);

const ThirdParty = () => {
	const [colorTheme] = useColorTheme();
	const { iconFg } = useColorScheme();

	return (
		<Dropdown
			overlayStyle={{
				colorScheme: getColorScheme(colorTheme),
			}}
			menu={{
				items: [{
					key: "extensions",
					type: "group",
					label: "Extensions",
					children: thirdParties.extensions.map((x) => ({
						key: x.name,
						label: <Item icon={x.icon} label={x.name} url={x.url} />,
						extra: x.authorName,
					})),
				}, {
					key: "libraries",
					type: "group",
					label: "Libraries",
					children: thirdParties.libraries.map((x) => ({
						key: x.name,
						label: <Item icon={x.icon} label={x.name} url={x.url} />,
						extra: x.authorName,
					})),
				}],
			}}
		>
			<Control as={IconPuzzle} style={{ color: iconFg }} />
		</Dropdown>
	);
};

export default ThirdParty;
