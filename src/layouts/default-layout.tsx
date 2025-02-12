// @deno-types="@types/react"
import { memo } from "react";
import { Layout } from "antd";
import { Gallery, Header, Modal } from "#components";

export default memo(() => {
	return (
		<Layout>
			<Header />
			<Layout.Content>
				<Gallery mode="virtuoso" />
			</Layout.Content>
			<Modal />
		</Layout>
	);
});
