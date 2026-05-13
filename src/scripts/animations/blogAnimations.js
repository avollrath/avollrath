import { gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initBlogAnimations() {
	const blogTextContainer = document.querySelectorAll('.blog-text-container')

	if (blogTextContainer.length) {
		const blogTextContainersAnim = gsap.from(blogTextContainer, {
			scrollTrigger: {
				trigger: blogTextContainer[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: -300,
			duration: 1,
			ease: 'expo.out',
			delay: 0.1
		})
		animations.push(blogTextContainersAnim)
	}

	const blogPostContainers = document.querySelectorAll('.blog-post-container')

	if (blogPostContainers.length) {
		const blogPostContainersAnim = gsap.from(blogPostContainers, {
			scrollTrigger: {
				trigger: blogPostContainers[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: 300,
			duration: 0.6,
			ease: 'back.out',
			delay: 0.3,
			stagger: 0.2
		})
		animations.push(blogPostContainersAnim)
	}
}
