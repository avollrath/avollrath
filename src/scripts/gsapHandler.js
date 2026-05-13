import {
	applyLiteModeStyles,
	cleanup,
	isLiteMotionMode,
	registerGSAPPlugins,
	startInitRun
} from './animations/gsapRuntime.js'

const initialPath = window.location.pathname
const footerAnimationModulePromise = import('./animations/footerAnimations.js')
const initialPageAnimationModulePromise = loadPageAnimationModule(initialPath)
const pageAnimationModulePreloads = new Map()

function loadPageAnimationModule(pathname) {
	if (pathname.startsWith('/about')) {
		return import('./animations/aboutAnimations.js')
	}
	if (pathname.startsWith('/now')) {
		return import('./animations/nowAnimations.js')
	}
	if (pathname === '/' || pathname === '') {
		return import('./animations/homeAnimations.js')
	}
	if (pathname === '/projects' || pathname === '/projects/') {
		return import('./animations/projectsOverviewAnimations.js')
	}
	if (pathname.startsWith('/renders')) {
		return import('./animations/renderAnimations.js')
	}
	if (pathname.startsWith('/blog')) {
		return import('./animations/blogAnimations.js')
	}
	return null
}

export function preloadGSAPForPath(pathname) {
	if (!pathname) return null
	if (!pageAnimationModulePreloads.has(pathname)) {
		pageAnimationModulePreloads.set(pathname, loadPageAnimationModule(pathname))
	}
	return pageAnimationModulePreloads.get(pathname)
}

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
			const { initFooterAnimations } = await footerAnimationModulePromise
			initFooterAnimations(reducedMotion)
		})
	)

	if (reducedMotion) {
		applyLiteModeStyles()
		return
	}

	const currentPath = window.location.pathname
	const pageAnimationModulePromise =
		currentPath === initialPath
			? initialPageAnimationModulePromise
			: preloadGSAPForPath(currentPath)

	if (!pageAnimationModulePromise) return

	const pageAnimationModule = await pageAnimationModulePromise

	if (currentPath.startsWith('/about')) {
		const { initAboutAnimations } = pageAnimationModule
		initAboutAnimations()
	} else if (currentPath.startsWith('/now')) {
		const { initNowAnimations } = pageAnimationModule
		initNowAnimations()
	} else if (currentPath === '/' || currentPath === '') {
		const { initHomeAnimations } = pageAnimationModule
		await initHomeAnimations(runId)
	} else if (currentPath === '/projects' || currentPath === '/projects/') {
		const { initProjectsOverviewAnimations } = pageAnimationModule
		initProjectsOverviewAnimations()
	} else if (currentPath.startsWith('/renders')) {
		const { initRenderAnimations } = pageAnimationModule
		initRenderAnimations()
	} else if (currentPath.startsWith('/blog')) {
		const { initBlogAnimations } = pageAnimationModule
		initBlogAnimations()
	}
}

export { cleanup }
