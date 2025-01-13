// @deno-types="@types/react"
import { lazy, memo } from "react";
import { Layout } from "antd";

const Preview = lazy(() => import("../components/preview.tsx"));

export default memo(() => (
	<Layout>
		<Preview />
	</Layout>
));
