import placeholderCover from '../images/book_placeholder.jpeg'

const coverModules = import.meta.glob('../images/book-covers/*.{jpg,jpeg,png,webp,avif}', {
	eager: true,
	import: 'default'
})

const coversByRelativePath = new Map()
const coversByIsbn = new Map()

for (const [modulePath, asset] of Object.entries(coverModules)) {
	const normalizedModulePath = modulePath.replace(/\\/g, '/')
	const relativeAssetPath = normalizedModulePath.replace('../images', '/src/images')
	const fileName = normalizedModulePath.split('/').pop() || ''
	const isbn = fileName.replace(/\.[^.]+$/, '')

	coversByRelativePath.set(relativeAssetPath, asset)
	coversByIsbn.set(isbn, asset)
}

export { placeholderCover }

export function getLocalBookCover(book) {
	if (!book) return null

	if (book.localCover && coversByRelativePath.has(book.localCover)) {
		return coversByRelativePath.get(book.localCover)
	}

	if (book.isbn && coversByIsbn.has(String(book.isbn))) {
		return coversByIsbn.get(String(book.isbn))
	}

	return null
}
