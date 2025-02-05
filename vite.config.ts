import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	base: "/si-website/",
	plugins: [
		deno(),
		react({ plugins: [["@swc/plugin-styled-components", {}]] }),
	],
	resolve: {
		alias: {
			"#atom": "/src/atom.ts",
			"#components": "/src/components/index.ts",
			"#constants": "/src/constants.ts",
			"#context": "/src/context.tsx",
			"#hooks": "/src/hooks.ts",
			"#i18n": "/src/i18n/_index.ts",
			"#types": "/src/types.ts",
			"#utils": "/src/utils.ts",
		},
	},
});
