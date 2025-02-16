import tlds from "tlds";

/**
 * https://github.com/sindresorhus/is-public-domain
 * MIT license
 */
export default function isPublicDomain(domain: string) {
	if (typeof domain !== "string") {
		throw new TypeError(`Expected a \`string\`, got \`${typeof domain}\``);
	}
	if (domain.trim() === "") {
		return false;
	}
	const parts = domain.split(".");
	const tld = parts.pop();

	// Avoid domain handle only
	return tld && parts.length > 0 && tlds.includes(tld);
}
