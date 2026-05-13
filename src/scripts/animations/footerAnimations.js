import { addManagedListener, gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initFooterAnimations(reducedMotion = false) {
	const footer = document.querySelector('footer')
	if (!footer) return

	const scrollToTop = () => {
		const anim = gsap.to(window, {
			duration: 2,
			scrollTo: {
				y: 0,
				autoKill: false
			},
			ease: 'power2.inOut'
		})
		animations.push(anim)
	}

	// Add click listener
	const scrollButton = footer.querySelector('.footer-bar .scroll-top-btn')
	if (scrollButton) {
		addManagedListener(scrollButton, 'click', scrollToTop)

		if (!reducedMotion) {
			const handleMouseEnter = () => {
				gsap.killTweensOf(scrollButton)
				gsap.to(scrollButton, {
					scale: 1.1,
					ease: 'expo.out',
					duration: 0.6
				})
			}

			const handleMouseLeave = () => {
				gsap.killTweensOf(scrollButton)
				gsap.to(scrollButton, {
					scale: 1,
					ease: 'elastic(0.6)',
					delay: 0.1,
					duration: 0.6
				})
			}

			addManagedListener(scrollButton, 'mouseenter', handleMouseEnter)
			addManagedListener(scrollButton, 'mouseleave', handleMouseLeave)
		}
	}

	if (reducedMotion) return

	gsap.set(footer, { opacity: 0, y: -100 })
	const footerAnim = gsap.to(footer, {
		scrollTrigger: {
			trigger: 'footer',
			start: 'top 95%',
			toggleActions: 'play none none none',
			once: true
		},
		opacity: 1,
		y: 0,
		ease: 'back.out',
		duration: 1,
		delay: 0.2,
		immediateRender: false
	})
	animations.push(footerAnim)
}
