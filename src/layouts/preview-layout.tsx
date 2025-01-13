// @deno-types="@types/react"
import { memo } from "react";
import { Layout } from "antd";
import Preview from "../components/preview.tsx";

export default memo(() => (
	<Layout>
		<Preview />
	</Layout>
));
