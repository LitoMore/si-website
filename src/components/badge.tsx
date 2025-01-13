import { makeBadge } from "#utils";
import { Icon } from "#types";

export const Badge = ({ icon }: { icon: Icon }) => {
	const badgeUrl = makeBadge(icon);
	return <img height={20} src={badgeUrl} />;
};
