import fs from 'fs/promises'
import path from 'path'

const ROOT_DIR = path.resolve(process.cwd(), 'src')
const EXTENSIONS = new Set(['.astro', '.md', '.js', '.json'])
const SKIP_DIRS = new Set(['node_modules', 'docs', '.git'])

// Common UTF-8 mojibake markers when text was decoded with latin1/win-1252.
const MOJIBAKE_PATTERN = /(Ã.|Â.|â.|ðŸ|ï¸|�)/

async function collectFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true })
	const files = []

	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue
		const fullPath = path.join(dir, entry.name)

		if (entry.isDirectory()) {
			files.push(...(await collectFiles(fullPath)))
			continue
		}

		if (EXTENSIONS.has(path.extname(entry.name))) {
			files.push(fullPath)
		}
	}

	return files
}

function getLineAndColumn(content, index) {
	const linesUntilMatch = content.slice(0, index).split('\n')
	const line = linesUntilMatch.length
	const column = linesUntilMatch[linesUntilMatch.length - 1].length + 1
	return { line, column }
}

async function main() {
	const files = await collectFiles(ROOT_DIR)
	const findings = []

	for (const file of files) {
		const content = await fs.readFile(file, 'utf8')
		const match = content.match(MOJIBAKE_PATTERN)
		if (!match || typeof match.index !== 'number') continue

		const { line, column } = getLineAndColumn(content, match.index)
		findings.push({
			file,
			line,
			column,
			token: match[0]
		})
	}

	if (!findings.length) {
		console.log('Encoding check passed: no mojibake markers found.')
		return
	}

	console.error('Encoding check failed. Potential mojibake detected:')
	findings.forEach(({ file, line, column, token }) => {
		console.error(`- ${file}:${line}:${column} token="${token}"`)
	})
	process.exit(1)
}

main().catch((error) => {
	console.error('Encoding check crashed:', error)
	process.exit(1)
})
