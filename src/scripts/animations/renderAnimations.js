import { gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initRenderAnimations() {
	const renderTextContainers = document.querySelectorAll('.render-text-container')

	if (renderTextContainers.length) {
		const projectTextContainersAnim = gsap.from(renderTextContainers, {
			scrollTrigger: {
				trigger: renderTextContainers[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: -300,
			duration: 1,
			ease: 'expo.out',
			delay: 0.1,
			stagger: 0.3
		})
		animations.push(projectTextContainersAnim)
	}

	const renderImageContainers = document.querySelectorAll('.render-image-container')

	if (renderImageContainers.length) {
		const renderImageContainerAnim = gsap.from(renderImageContainers, {
			scrollTrigger: {
				trigger: renderImageContainers[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: 300,
			duration: 0.6,
			ease: 'back.out',
			delay: 0.3,
			stagger: 0.3
		})
		animations.push(renderImageContainerAnim)
	}
}
