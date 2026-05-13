import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
	loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			category: z.enum(['Apps', 'Games', 'Websites', 'Design']),
			heroImage: image(),
			heroImageAlt: z.string(),
			techStackLogos: z.array(z.string()),
			liveUrl: z.string().optional(),
			iframeSrc: z.string().optional(),
			iframeLayout: z.enum(['drum-machine']).optional(),
			buttonText: z.string().optional(),
			order: z.number().optional()
		})
})

export const collections = { projects }
