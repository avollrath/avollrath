import { gsap, trackAnimation } from './gsapRuntime.js'

const animations = { push: trackAnimation }

export function initAboutAnimations() {
	let shouldRunAboutIntro = window.__aboutIntroSeen !== true

	if (shouldRunAboutIntro) {
		window.__aboutIntroSeen = true
	} else {
		document.documentElement.classList.remove('about-intro-pending')
	}

	const aboutImage = document.querySelector('.about-image')
	if (aboutImage) {
		gsap.set(aboutImage, { opacity: 0, x: -300 })
		const lottieAnim = gsap.to(aboutImage, {
			scrollTrigger: {
				trigger: '.about-image',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			x: 0,
			opacity: 1,
			ease: 'back.out',
			duration: 0.6,
			delay: 0.6,
			clearProps: 'transform,opacity'
		})
		animations.push(lottieAnim)
	}

	if (shouldRunAboutIntro) {
		requestAnimationFrame(() => {
			document.documentElement.classList.remove('about-intro-pending')
		})
	}

	const techStackIcons = document.querySelectorAll('.tech-stack-icon')
	if (techStackIcons.length) {
		const techStackAnim = gsap.from(techStackIcons, {
			scrollTrigger: {
				trigger: techStackIcons[0],
				start: 'top 80%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			y: 50,
			ease: 'expo.out',
			stagger: {
				amount: 1,
				from: 'start'
			}
		})

		animations.push(techStackAnim)
	}

	const favBookImages = document.querySelectorAll('.fav-book-image')

	if (favBookImages.length) {
		const favBookAnim = gsap.from(favBookImages, {
			scrollTrigger: {
				trigger: favBookImages[0],
				start: 'top bottom',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			y: 20,
			ease: 'back.out',
			delay: 0.4,
			stagger: {
				amount: 1,
				from: 'end'
			}
		})

		animations.push(favBookAnim)
	}
}
