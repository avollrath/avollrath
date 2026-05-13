import {
	applyLiteModeStyles,
	cleanup,
	isLiteMotionMode,
	registerGSAPPlugins,
	startInitRun
} from './animations/gsapRuntime.js'

export function initGSAP() {
	return initializeGSAP()
}

async function initializeGSAP() {
	cleanup()
	const runId = startInitRun()

	registerGSAPPlugins()
	const reducedMotion = isLiteMotionMode()

	requestAnimationFrame(() =>
		requestAnimationFrame(async () => {
			const { initFooterAnimations } = await import('./animations/footerAnimations.js')
			initFooterAnimations(reducedMotion)
		})
	)

	if (reducedMotion) {
		applyLiteModeStyles()
		return
	}

	const currentPath = window.location.pathname

	if (currentPath.startsWith('/about')) {
		const { initAboutAnimations } = await import('./animations/aboutAnimations.js')
		initAboutAnimations()
	} else if (currentPath.startsWith('/now')) {
		const { initNowAnimations } = await import('./animations/nowAnimations.js')
		initNowAnimations()
	} else if (currentPath === '/' || currentPath === '') {
		const { initHomeAnimations } = await import('./animations/homeAnimations.js')
		await initHomeAnimations(runId)
	} else if (currentPath === '/projects' || currentPath === '/projects/') {
		const { initProjectsOverviewAnimations } = await import('./animations/projectsOverviewAnimations.js')
		initProjectsOverviewAnimations()
	} else if (currentPath.startsWith('/renders')) {
		const { initRenderAnimations } = await import('./animations/renderAnimations.js')
		initRenderAnimations()
	} else if (currentPath.startsWith('/blog')) {
		const { initBlogAnimations } = await import('./animations/blogAnimations.js')
		initBlogAnimations()
	}
}

export { cleanup }
