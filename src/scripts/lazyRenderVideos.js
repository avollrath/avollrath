export function initLazyRenderVideos() {
		const videos = document.querySelectorAll('.js-lazy-render-video')
		if (!videos.length) return

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		const activateVideo = (video) => {
			if (!(video instanceof HTMLVideoElement)) return
			if (!video.dataset.videoSrc || video.src) return

			video.src = video.dataset.videoSrc
			video.load()

			if (prefersReducedMotion) {
				video.removeAttribute('autoplay')
				return
			}

			const playAttempt = video.play()
			if (playAttempt && typeof playAttempt.catch === 'function') {
				playAttempt.catch(() => {})
			}
		}

		if (!('IntersectionObserver' in window)) {
			videos.forEach(activateVideo)
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return
					activateVideo(entry.target)
					observer.unobserve(entry.target)
				})
			},
			{ rootMargin: '300px 0px' }
		)

		videos.forEach((video) => observer.observe(video))
	}

export function bindLazyRenderVideosPageLoad() {
	if (!window.__lazyRenderVideosPageLoadBound) {
		document.addEventListener('astro:page-load', initLazyRenderVideos)
		window.__lazyRenderVideosPageLoadBound = true
	}

	initLazyRenderVideos()
}
