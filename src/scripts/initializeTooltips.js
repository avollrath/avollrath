import tippy from 'tippy.js'

function destroyExistingTooltips() {
	const instances = window.__tooltipInstances || []
	instances.forEach((instance) => instance.destroy())
	window.__tooltipInstances = []
}

export function initializeTooltips() {
	destroyExistingTooltips()

	const targets = document.querySelectorAll('[title], [data-tooltip-content]')
	if (!targets.length) return

	window.__tooltipInstances = tippy(targets, {
		arrow: false,
		placement: 'top',
		animation: 'fade',
		delay: 20,
		allowHTML: true,
		duration: 20,
		maxWidth: 500,
		theme: 'custom',
		ignoreAttributes: true,
		content(reference) {
			const savedContent = reference.getAttribute('data-tooltip-content')
			if (savedContent) return savedContent

			const title = reference.getAttribute('title') || ''
			reference.setAttribute('data-tooltip-content', title)
			reference.removeAttribute('title')
			return title
		},
		onDestroy(instance) {
			const originalContent = instance.reference.getAttribute('data-tooltip-content')
			if (originalContent && !instance.reference.hasAttribute('title')) {
				instance.reference.setAttribute('title', originalContent)
			}
		}
	})
}


