import { gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initProjectsOverviewAnimations() {
	const leftCol = document.querySelector('.projects-left-col')
	const projectCards = document.querySelectorAll('.project-card')

	if (leftCol) {
		const leftAnim = gsap.from(leftCol, {
			opacity: 0,
			x: -300,
			duration: 1,
			ease: 'expo.out',
			delay: 0.1
		})
		animations.push(leftAnim)
	}

	if (projectCards.length) {
		const cardsAnim = gsap.from(projectCards, {
			opacity: 0,
			x: 300,
			duration: 0.6,
			ease: 'back.out',
			delay: 0.3,
			stagger: 0.2,
			onStart: () => {
				document.documentElement.classList.remove('projects-intro-pending')
			}
		})
		animations.push(cardsAnim)
	}
}
