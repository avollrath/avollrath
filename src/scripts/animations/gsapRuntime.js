import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
window.ScrollTrigger = ScrollTrigger

let animations = []
let domCleanupFns = []
let initRunId = 0

export { gsap, ScrollTrigger, ScrollToPlugin }

export function registerGSAPPlugins() {
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
	window.ScrollTrigger = ScrollTrigger
}

export function addManagedListener(element, eventName, handler, options) {
	if (!element) return
	element.addEventListener(eventName, handler, options)
	domCleanupFns.push(() => {
		element.removeEventListener(eventName, handler, options)
	})
}

export function trackAnimation(animation) {
	animations.push(animation)
}

export function getInitRunId() {
	return initRunId
}

export function startInitRun() {
	initRunId += 1
	return initRunId
}

export function isLiteMotionMode() {
	return document.documentElement.classList.contains('reduced-motion')
}

export function applyLiteModeStyles() {
	document.documentElement.classList.remove('home-intro-pending')
	document.documentElement.classList.remove('about-intro-pending')
	document.documentElement.classList.remove('projects-intro-pending')

	const keySections = document.querySelectorAll(
		'.nav-bar, .nav-item, .nav-logo, .hero-container, .hero-badge, .hero-header, .intro-text, .cta-button, .avatar-wrapper, .now-container, .now-content, .blog-container, .blog-content, .about-container, .about-content, .render-container, .render-content, .spotify-container'
	)

	keySections.forEach((element) => {
		element.style.opacity = '1'
		element.style.transform = 'none'
	})
}

export function cleanup() {
	initRunId += 1

	domCleanupFns.forEach((fn) => fn())
	domCleanupFns = []

	ScrollTrigger.getAll().forEach((st) => st.kill())

	animations.forEach((anim) => anim.kill())
	animations = []
}

export function scheduleScrollTriggerRefresh() {
	const refresh = () => {
		requestAnimationFrame(() => {
			ScrollTrigger.refresh()
		})
	}

	if ('requestIdleCallback' in window) {
		requestIdleCallback(refresh, { timeout: 400 })
		return
	}

	setTimeout(refresh, 0)
}
