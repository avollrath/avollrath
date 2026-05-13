import { gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initNowAnimations() {
	const favBookImages = document.querySelectorAll('.fav-book-image')

	if (favBookImages.length) {
		const favBookAnim = gsap.from(favBookImages, {
			scrollTrigger: {
				trigger: favBookImages[0],
				start: 'top 80%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: 'expo.out',
			stagger: {
				amount: 1, // Total time to stagger all animations
				from: 'start' // Animate icons in random order
			}
		})

		animations.push(favBookAnim)
	}

	const nowEntries = document.querySelectorAll('.now-entry')

	if (nowEntries.length) {
		nowEntries.forEach((entry) => {
			const anim = gsap.from(entry, {
				scrollTrigger: {
					trigger: entry,
					start: 'top bottom 60%',
					toggleActions: 'play none none none'
				},
				opacity: 0,
				y: 300,
				duration: 1,
				ease: 'expo.out',
				delay: 0.1
			})
			animations.push(anim)
		})
	}

	const nowBox = document.querySelector('.now-box')
	if (nowBox) {
		const nowBoxAnim = gsap.from(nowBox, {
			scrollTrigger: {
				trigger: '.now-box',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			x: -500,
			opacity: 0,
			ease: 'expo',
			duration: 1.5
		})
		animations.push(nowBoxAnim)
	}
}
