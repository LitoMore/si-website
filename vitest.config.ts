import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";

export default defineConfig({
	// plugins: [react()],
	test: {
		setupFiles: ["./setup-file.ts"],
		browser: {
			enabled: true,
			provider: "playwright",
			instances: [
				{ browser: "chromium" },
			],
		},
	},
});
