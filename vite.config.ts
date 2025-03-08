/// <reference lib="deno.ns" />
import { defineConfig, PluginOption } from "vite";
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

const baseUrl = Deno.env.get("VITE_BASE_URL");
const enableVisualizer = Deno.env.get("VITE_ENABLE_VISUALIZER");

export default defineConfig({
	base: baseUrl ? `/${baseUrl}` : undefined,
	plugins: [
		deno() as PluginOption,
		react({ plugins: [["@swc/plugin-styled-components", {}]] }) as PluginOption,
		enableVisualizer ? visualizer() : undefined,
	].filter((x) => Boolean(x)),
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("rc-field-form")) {
						return "rc-field-form";
					}
				},
			},
		},
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
		},
	},
});
