import process from 'node:process';
import react from '@vitejs/plugin-react-swc';
import {visualizer} from 'rollup-plugin-visualizer';
import {type PluginOption, defineConfig} from 'vite';

const baseUrl = process.env['VITE_BASE_URL'];
const enableVisualizer = process.env['VITE_ENABLE_VISUALIZER'];

export default defineConfig({
	base: baseUrl ? `/${baseUrl}` : undefined,
	plugins: [
		react({plugins: [['@swc/plugin-styled-components', {}]]}) as PluginOption,
		enableVisualizer ? visualizer() : undefined,
	].filter(Boolean),
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('rc-field-form')) {
						return 'rc-field-form';
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
			/* eslint-disable @typescript-eslint/naming-convention */
			'#atom': '/src/atom.ts',
			'#data': '/src/data/index.ts',
			'#components': '/src/components/index.ts',
			'#constants': '/src/constants.ts',
			'#context': '/src/context.tsx',
			'#hooks': '/src/hooks.ts',
			'#i18n': '/src/i18n/_index.ts',
			'#types': '/src/types.ts',
			'#utils': '/src/utils.ts',
			/* eslint-enable @typescript-eslint/naming-convention */
		},
	},
});
