import { mkdir, readFile, readdir, rm, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const FAVORITE_BOOKS_PATH = path.join(rootDir, 'src', 'lib', 'books.json')
const NOW_BOOKS_PATH = path.join(rootDir, 'src', 'lib', 'now_books.json')
const COVER_DIR = path.join(rootDir, 'src', 'images', 'book-covers')
const COVER_DIR_RELATIVE = '/src/images/book-covers'
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const forceDownload = process.argv.includes('--force')

function normalizeBookCoverUrl(url) {
	if (!url || typeof url !== 'string') return ''

	const trimmed = url.trim()
	if (!trimmed) return ''

	try {
		const parsed = new URL(trimmed)
		if (parsed.protocol === 'http:') parsed.protocol = 'https:'
		return parsed.toString()
	} catch {
		return trimmed
	}
}

function sanitizeFileStem(value) {
	return String(value || '')
		.trim()
		.replace(/[^a-zA-Z0-9_-]/g, '')
}

function getExtensionFromContentType(contentType) {
	const normalizedType = String(contentType || '').toLowerCase()

	if (normalizedType.includes('image/avif')) return '.avif'
	if (normalizedType.includes('image/webp')) return '.webp'
	if (normalizedType.includes('image/png')) return '.png'
	if (normalizedType.includes('image/jpeg')) return '.jpg'
	if (normalizedType.includes('image/jpg')) return '.jpg'

	return ''
}

function getExtensionFromUrl(url) {
	try {
		const pathname = new URL(url).pathname
		const extension = path.extname(pathname).toLowerCase()
		return SUPPORTED_EXTENSIONS.has(extension) ? extension : ''
	} catch {
		return ''
	}
}

async function loadJson(filePath) {
	const raw = await readFile(filePath, 'utf8')
	return JSON.parse(raw)
}

async function saveJson(filePath, data) {
	await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

async function getExistingCoverMap() {
	await mkdir(COVER_DIR, { recursive: true })
	const entries = await readdir(COVER_DIR, { withFileTypes: true })
	const existing = new Map()

	for (const entry of entries) {
		if (!entry.isFile()) continue
		const extension = path.extname(entry.name).toLowerCase()
		if (!SUPPORTED_EXTENSIONS.has(extension)) continue
		existing.set(path.basename(entry.name, extension), entry.name)
	}

	return existing
}

function collectUniqueBooks(favoriteBooks, nowBooksByDate) {
	const booksByIsbn = new Map()

	for (const book of favoriteBooks) {
		if (book?.isbn) booksByIsbn.set(book.isbn, book)
	}

	for (const booksForDate of Object.values(nowBooksByDate)) {
		for (const book of booksForDate || []) {
			if (book?.isbn && !booksByIsbn.has(book.isbn)) booksByIsbn.set(book.isbn, book)
		}
	}

	return [...booksByIsbn.values()]
}

async function removeExistingVariants(fileStem) {
	const entries = await readdir(COVER_DIR, { withFileTypes: true })

	for (const entry of entries) {
		if (!entry.isFile()) continue
		const extension = path.extname(entry.name).toLowerCase()
		if (!SUPPORTED_EXTENSIONS.has(extension)) continue
		if (path.basename(entry.name, extension) !== fileStem) continue
		await rm(path.join(COVER_DIR, entry.name), { force: true })
	}
}

async function downloadCover(book, existingCoverMap) {
	const fileStem = sanitizeFileStem(book.isbn)
	if (!fileStem) return ''

	const existingFileName = existingCoverMap.get(fileStem)
	if (existingFileName && !forceDownload) {
		return `${COVER_DIR_RELATIVE}/${existingFileName}`.replaceAll('\\', '/')
	}

	const coverUrl = normalizeBookCoverUrl(book.coverURL)
	if (!coverUrl) return ''

	const response = await fetch(coverUrl, {
		headers: {
			'user-agent': 'website2024-book-cover-sync/1.0'
		}
	})

	if (!response.ok) {
		throw new Error(`Failed to download ${book.isbn}: ${response.status} ${response.statusText}`)
	}

	const contentType = response.headers.get('content-type')
	const extension = getExtensionFromContentType(contentType) || getExtensionFromUrl(coverUrl) || '.jpg'
	const fileName = `${fileStem}${extension}`
	const filePath = path.join(COVER_DIR, fileName)
	const arrayBuffer = await response.arrayBuffer()

	await removeExistingVariants(fileStem)
	await writeFile(filePath, Buffer.from(arrayBuffer))
	existingCoverMap.set(fileStem, fileName)

	return `${COVER_DIR_RELATIVE}/${fileName}`.replaceAll('\\', '/')
}

function applyLocalCoversToFavoriteBooks(favoriteBooks, coverMap) {
	return favoriteBooks.map((book) => ({
		...book,
		localCover: coverMap.get(book.isbn) || ''
	}))
}

function applyLocalCoversToNowBooks(nowBooksByDate, coverMap) {
	return Object.fromEntries(
		Object.entries(nowBooksByDate).map(([date, books]) => [
			date,
			(books || []).map((book) => ({
				...book,
				localCover: coverMap.get(book.isbn) || ''
			}))
		])
	)
}

async function main() {
	const favoriteBooks = await loadJson(FAVORITE_BOOKS_PATH)
	const nowBooksByDate = await loadJson(NOW_BOOKS_PATH)
	const existingCoverMap = await getExistingCoverMap()
	const localCoverMap = new Map()
	const uniqueBooks = collectUniqueBooks(favoriteBooks, nowBooksByDate)

	for (const book of uniqueBooks) {
		try {
			const localCover = await downloadCover(book, existingCoverMap)
			if (localCover) {
				localCoverMap.set(book.isbn, localCover)
				console.log(`Synced cover for ${book.isbn}`)
			} else {
				console.warn(`Skipped ${book.isbn}: missing cover URL`)
			}
		} catch (error) {
			console.warn(`Could not sync ${book.isbn}: ${error.message}`)
		}
	}

	const updatedFavoriteBooks = applyLocalCoversToFavoriteBooks(favoriteBooks, localCoverMap)
	const updatedNowBooks = applyLocalCoversToNowBooks(nowBooksByDate, localCoverMap)

	await saveJson(FAVORITE_BOOKS_PATH, updatedFavoriteBooks)
	await saveJson(NOW_BOOKS_PATH, updatedNowBooks)
	console.log(`Updated ${FAVORITE_BOOKS_PATH}`)
	console.log(`Updated ${NOW_BOOKS_PATH}`)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
