import { bindLazyRenderVideosPageLoad } from './lazyRenderVideos.js'

function loadLottiePlayerWhenVisible() {
		const lottiePlayer = document.getElementById('lottie-player')
		if (!lottiePlayer) return

		if (window.customElements && window.customElements.get('lottie-player')) return

		const addScript = () => {
			if (window.__lottiePlayerScriptPromise) return window.__lottiePlayerScriptPromise

			window.__lottiePlayerScriptPromise = new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js'
				script.async = true
				script.onload = () => {
					if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
						window.ScrollTrigger.refresh()
					}
					resolve()
				}
				script.onerror = reject
				document.head.appendChild(script)
			})

			return window.__lottiePlayerScriptPromise
		}

		const loadOnIdle = () => {
			if ('requestIdleCallback' in window) {
				requestIdleCallback(addScript, { timeout: 1200 })
			} else {
				setTimeout(addScript, 0)
			}
		}

		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						loadOnIdle()
						observer.disconnect()
					}
				},
				{ rootMargin: '300px 0px' }
			)
			observer.observe(lottiePlayer)
		} else {
			loadOnIdle()
		}
	}

	function initEyes() {
		if (document.documentElement.classList.contains('reduced-motion')) {
			return
		}

		const eyes = Array.from(document.querySelectorAll('.eye-left, .eye-right'))
		const sunglasses = document.querySelector('.sunglasses')
		const contactButton = document.querySelector('.contact-btn')
		const MAX_DISTANCE = 10
		const padding = 10

		let isEyeHovered = false
		let isButtonHovered = false
		let removalTimeout = null
		const globalState = window.__eyesState || (window.__eyesState = {})
		let eyeBounds = []
		let queuedPointerEvent = null
		let frameId = null

		const refreshEyeBounds = () => {
			eyeBounds = eyes.map((eye) => eye.getBoundingClientRect())
		}

		function updateSunglassesVisibility() {
			if (!sunglasses) return

			if (isEyeHovered || isButtonHovered) {
				if (removalTimeout) {
					clearTimeout(removalTimeout)
					removalTimeout = null
				}
				sunglasses.classList.add('visible')
			} else {
				if (!removalTimeout) {
					removalTimeout = setTimeout(() => {
						sunglasses.classList.remove('visible')
						removalTimeout = null
					}, 300)
				}
			}
		}

		if (globalState.onMouseMove) {
			document.removeEventListener('pointermove', globalState.onMouseMove)
		}

		if (globalState.onResize) {
			window.removeEventListener('resize', globalState.onResize)
		}

		if (globalState.onScroll) {
			window.removeEventListener('scroll', globalState.onScroll, true)
		}

		const applyEyeTracking = () => {
			frameId = null
			const e = queuedPointerEvent
			if (!e || !eyeBounds.length) return

			eyes.forEach((eye, index) => {
				const rect = eyeBounds[index]
				const centerX = rect.left + rect.width / 2
				const centerY = rect.top + rect.height / 2
				const dx = e.clientX - centerX
				const dy = e.clientY - centerY
				const angle = Math.atan2(dy, dx)
				const distance = Math.hypot(dx, dy)
				const clampedDistance = Math.min(distance, MAX_DISTANCE)
				const offsetX = clampedDistance * Math.cos(angle)
				const offsetY = clampedDistance * Math.sin(angle)
				eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`
			})

			let overEye = false
			eyeBounds.forEach((rect) => {
				const paddedLeft = rect.left - padding
				const paddedRight = rect.right + padding
				const paddedTop = rect.top - padding
				const paddedBottom = rect.bottom + padding
				if (
					e.clientX >= paddedLeft &&
					e.clientX <= paddedRight &&
					e.clientY >= paddedTop &&
					e.clientY <= paddedBottom
				) {
					overEye = true
				}
			})

			isEyeHovered = overEye
			updateSunglassesVisibility()
		}

		const onMouseMove = (event) => {
			queuedPointerEvent = event
			if (frameId !== null) return
			frameId = requestAnimationFrame(applyEyeTracking)
		}

		const onResize = () => {
			refreshEyeBounds()
		}

		const onScroll = () => {
			refreshEyeBounds()
		}

		refreshEyeBounds()
		document.addEventListener('pointermove', onMouseMove, { passive: true })
		window.addEventListener('resize', onResize, { passive: true })
		window.addEventListener('scroll', onScroll, { passive: true, capture: true })
		globalState.onMouseMove = onMouseMove
		globalState.onResize = onResize
		globalState.onScroll = onScroll

		if (globalState.button && globalState.onButtonEnter && globalState.onButtonLeave) {
			globalState.button.removeEventListener('mouseenter', globalState.onButtonEnter)
			globalState.button.removeEventListener('mouseleave', globalState.onButtonLeave)
		}

		if (contactButton) {
			const onButtonEnter = () => {
				isButtonHovered = true
				updateSunglassesVisibility()
			}

			const onButtonLeave = () => {
				isButtonHovered = false
				updateSunglassesVisibility()
			}

			contactButton.addEventListener('mouseenter', onButtonEnter)
			contactButton.addEventListener('mouseleave', onButtonLeave)
			globalState.button = contactButton
			globalState.onButtonEnter = onButtonEnter
			globalState.onButtonLeave = onButtonLeave
		}
	}


export function initializeHomeInteractions() {
	if (!window.__eyesPageLoadBound) {
		document.addEventListener('astro:page-load', initEyes)
		window.__eyesPageLoadBound = true
	}

	initEyes()
	bindLazyRenderVideosPageLoad()
	loadLottiePlayerWhenVisible()
}
