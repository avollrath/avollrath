import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://vollrath.dev',
	output: 'static',
	outDir: './docs',
	build: {
		assets: 'astro'
	},
	vite: {
		optimizeDeps: {
			exclude: ['split-type']
		}
	}
})
