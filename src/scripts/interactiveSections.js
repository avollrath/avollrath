import { navigate } from 'astro:transitions/client'

const INTERACTIVE_CHILD_SELECTOR =
	'a, button, input, textarea, select, option, label, summary, [role="button"]'

function isModifiedClick(event) {
	return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function getClickableSection(target) {
	return target instanceof Element ? target.closest('.clickable-section') : null
}

function handleSectionClick(event) {
	if (isModifiedClick(event)) return

	const section = getClickableSection(event.target)
	if (!section) return

	const interactiveChild = event.target instanceof Element
		? event.target.closest(INTERACTIVE_CHILD_SELECTOR)
		: null

	if (interactiveChild) {
		const arrowLink = section.querySelector('.arrow-link')
		if (!arrowLink || interactiveChild !== arrowLink) {
			return
		}
	}

	const arrowLink = section.querySelector('.arrow-link')
	const href = arrowLink?.getAttribute('href')
	if (!href) return

	event.preventDefault()
	navigate(href)
}

export function initializeInteractiveSections() {
	if (window.__interactiveSectionsInitialized) return

	document.addEventListener('click', handleSectionClick)
	window.__interactiveSectionsInitialized = true
}
