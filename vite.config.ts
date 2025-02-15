/// <reference lib="deno.ns" />
import { defineConfig, PluginOption } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	base: Deno.env.get("VITE_BASE_URL"),
	plugins: [
		deno() as PluginOption,
		react({ plugins: [["@swc/plugin-styled-components", {}]] }) as PluginOption,
	],
	optimizeDeps: {
		exclude: ["pdfkit", "blob-stream"],
	},
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
			"#utilsx": "/src/utilsx.tsx",
		},
	},
});
