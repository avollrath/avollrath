import type { APIRoute } from 'astro'

const staticRoutes = ['/', '/about/', '/blog/', '/now/', '/projects/', '/renders/']

function getSlugFromPath(filePath: string) {
	return filePath.replace(/^\.\/posts\//, '').replace(/\.md$/, '')
}

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response('Missing site URL in Astro config', { status: 500 })
	}

	const postModules = import.meta.glob('./posts/*.md', { eager: true }) as Record<
		string,
		{ frontmatter?: { pubDate?: string } }
	>

	const postEntries = Object.entries(postModules).map(([filePath, module]) => ({
		loc: new URL(`/posts/${getSlugFromPath(filePath)}/`, site).toString(),
		lastmod: module.frontmatter?.pubDate
			? new Date(module.frontmatter.pubDate).toISOString()
			: undefined
	}))

	const staticEntries = staticRoutes.map((route) => ({
		loc: new URL(route, site).toString()
	}))

	const entries = [...staticEntries, ...postEntries]

	const urlset = entries
		.map(
			(entry) => `<url>
  <loc>${entry.loc}</loc>${entry.lastmod ? `
  <lastmod>${entry.lastmod}</lastmod>` : ''}
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
