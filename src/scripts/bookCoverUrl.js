export const BOOK_COVER_FALLBACK = '/images/book_placeholder.jpeg'

export function normalizeBookCoverUrl(url) {
	if (!url || typeof url !== 'string') return ''

	const trimmed = url.trim()
	if (!trimmed) return ''

	try {
		const parsed = new URL(trimmed)
		if (parsed.protocol === 'http:') parsed.protocol = 'https:'
		return parsed.toString()
	} catch {
		// If it's not a valid URL, return as-is and let the image fallback handle it.
		return trimmed
	}
}

export function resolveBookCoverUrl(url, fallback = BOOK_COVER_FALLBACK) {
	return normalizeBookCoverUrl(url) || fallback
}
