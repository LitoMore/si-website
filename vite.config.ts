import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';

const baseUrl = process.env['VITE_BASE_URL'];
const enableVisualizer = process.env['VITE_ENABLE_VISUALIZER'];

export default defineConfig({
	base: baseUrl ? `/${baseUrl}` : undefined,
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
		tailwindcss(),
		enableVisualizer ? visualizer() : undefined,
	].filter(Boolean),
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					return id.includes('rc-field-form') ? 'rc-field-form' : undefined;
				},
			},
		},
	},
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',

			'#atom': '/src/atom.ts',
			'#data': '/src/data/index.ts',
			'#components': '/src/components',
			'#constants': '/src/constants.ts',
			'#context': '/src/context.tsx',
			'#hooks': '/src/hooks.ts',
			'#i18n': '/src/i18n/_index.i18n.ts',
			'#types': '/src/types.ts',
			'#utils': '/src/utils.ts',
			'#vendor': '/src/vendor',
		},
	},
});
