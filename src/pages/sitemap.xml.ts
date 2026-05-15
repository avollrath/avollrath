import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

const staticRoutes = ['/', '/about/', '/blog/', '/now/', '/projects/', '/renders/']

function getSlugFromPath(filePath: string) {
	return filePath.replace(/^\.\/posts\//, '').replace(/\.md$/, '')
}

function slugifyTag(tag: string) {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response('Missing site URL in Astro config', { status: 500 })
	}

	const postModules = import.meta.glob('./posts/*.md', { eager: true }) as Record<
		string,
		{ frontmatter?: { pubDate?: string; updatedDate?: string; tags?: string[] } }
	>

	const postEntries = Object.entries(postModules).map(([filePath, module]) => {
		const lastmod = module.frontmatter?.updatedDate ?? module.frontmatter?.pubDate
		return {
			loc: new URL(`/posts/${getSlugFromPath(filePath)}/`, site).toString(),
			lastmod: lastmod ? new Date(lastmod).toISOString() : undefined
		}
	})

	const tagEntries = [
		...new Set(
			Object.values(postModules).flatMap((module) =>
				(module.frontmatter?.tags ?? []).map((tag: string) => slugifyTag(tag))
			)
		)
	].map((tag) => ({
		loc: new URL(`/tags/${tag}/`, site).toString()
	}))

	const staticEntries = staticRoutes.map((route) => ({
		loc: new URL(route, site).toString(),
		priority: route === '/' ? 1.0 : 0.8,
		changefreq: 'weekly'
	}))

	const projects = await getCollection('projects')
	const projectEntries = projects.map((project) => ({
		loc: new URL(`/projects/${project.id}/`, site).toString(),
		priority: 0.7,
		changefreq: 'monthly'
	}))

	const entries = [...staticEntries, ...postEntries, ...tagEntries, ...projectEntries]

	const urlset = entries
		.map(
			(entry) => `<url>
  <loc>${entry.loc}</loc>${entry.lastmod ? `
  <lastmod>${entry.lastmod}</lastmod>` : ''}
  <changefreq>${entry.changefreq || 'monthly'}</changefreq>
  <priority>${entry.priority || 0.5}</priority>
</url>`
		)
		.join('\n')

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	})
}
