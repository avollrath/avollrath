// src/scripts/gsapHandler.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Store animation instances for cleanup
let animations = []

// Initialize all GSAP animations
export function initGSAP() {
	// Clean up existing animations
	cleanup()

	// Re-register plugins after navigation
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

	// Initialize footer animations
	initFooterAnimations()

	// Initialize page-specific animations based on current path
	const currentPath = window.location.pathname

	console.log(currentPath)

	if (currentPath.startsWith('/about')) {
		initAboutAnimations()
	} else if (currentPath.startsWith('/now')) {
		initNowAnimations()
	} else if (currentPath === '/' || currentPath === '') {
		initHomeAnimations()
	}
}

// Cleanup function to kill existing animations
function cleanup() {
	// Kill all ScrollTrigger instances
	ScrollTrigger.getAll().forEach((st) => st.kill())

	// Kill all tracked animations
	animations.forEach((anim) => anim.kill())
	animations = []
}

// Footer-specific animations
function initFooterAnimations() {
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
	const scrollButton = footer.querySelector('.footer-bar a')
	if (scrollButton) {
		scrollButton.addEventListener('click', scrollToTop)
	}

	const footerAnim = gsap.from(footer, {
		scrollTrigger: {
			trigger: 'footer',
			start: 'top 90%',
			end: '-=500',
			toggleActions: 'play reset play reset'
		},
		opacity: 0,
		y: -50,
		ease: 'expo',
		duration: 2,
		delay: 0.4
	})
	animations.push(footerAnim)
}

// Home page animations
function initHomeAnimations() {
	console.log('using GSAP: ', gsap.version)

	const heroBadge = document.querySelector('.hero-badge')
	if (heroBadge) {
		const badgeAnim = gsap.from(heroBadge, {
			opacity: 0,
			x: -50,
			ease: 'elastic',
			duration: 1.2,
			delay: 1
		})
		animations.push(badgeAnim)
	}

	const heroHeader = document.querySelector('.hero-header')
	if (heroHeader) {
		const heroHeaderAnim = gsap.from(heroHeader, {
			y: -100,
			ease: 'expoScale',
			duration: 1,
			delay: 0.2
		})
		animations.push(heroHeaderAnim)
	}

	// CTA button animation
	const ctaButton = document.querySelector('.cta-button')
	if (ctaButton) {
		const ctaAnim = gsap.from(ctaButton, {
			opacity: 0,
			y: 60,
			ease: 'back.out',
			duration: 1,
			delay: 2
		})
		animations.push(ctaAnim)
	}

	const avatar = document.querySelector('.avatar-wrapper')
	if (avatar) {
		const avatarAnim = gsap.from(avatar, {
			y: -860,
			x: -500,
			rotation: 180,
			ease: 'back.out',
			duration: 0.7,
			delay: 1
		})
		animations.push(avatarAnim)
	}

	const nowContainer = document.querySelector('.now-container')
	if (nowContainer) {
		const nowContainerAnim = gsap.from(nowContainer, {
			opacity: 0,
			x: 300,
			ease: 'back.out',
			duration: 0.4,
			delay: 1.5
		})
		animations.push(nowContainerAnim)
	}

	// Latest render animations
	const renderHeader = document.querySelector('.latest-render-header')
	const renderImage = document.querySelector('.latest-render-image')

	if (renderHeader && renderImage) {
		gsap.set([renderHeader, renderImage], { yPercent: 0 })

		const headerAnim = gsap.to(renderHeader, {
			yPercent: -3,
			ease: 'none',
			scrollTrigger: {
				trigger: '.spotify-track',
				scrub: 1
			}
		})

		const imageAnim = gsap.to(renderImage, {
			yPercent: 5,
			ease: 'none',
			scrollTrigger: {
				trigger: '.spotify-track',
				scrub: 1
			}
		})

		animations.push(headerAnim, imageAnim)
	}

	// Spotify tracks animation
	const spotifyTracks = document.querySelectorAll('.spotify-track')
	if (spotifyTracks.length) {
		const trackAnim = gsap.from(spotifyTracks, {
			scrollTrigger: {
				trigger: '.spotify-track',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: 300,
			ease: 'expo',
			duration: 1.2,
			stagger: 0.1
		})
		animations.push(trackAnim)
	}

	// Tech stack animation
	const techStack = document.querySelector('.techstack-container')
	if (techStack) {
		const techAnim = gsap.from(techStack, {
			scrollTrigger: {
				trigger: '.techstack-container',
				start: 'top 80%',
				toggleActions: 'play none none none'
			},
			x: -200,
			ease: 'expo',
			duration: 1,
			opacity: 0,
			delay: 0.2
		})
		animations.push(techAnim)
	}

	// Links container animation
	const linksContainer = document.querySelector('.links-container')
	if (linksContainer) {
		const linksAnim = gsap.from(linksContainer, {
			scrollTrigger: {
				trigger: '.links-container',
				start: 'top 80%',
				toggleActions: 'play none none none'
			},
			x: 200,
			opacity: 0,
			ease: 'expo',
			duration: 0.7,
			delay: 0.5
		})
		animations.push(linksAnim)
	}

	// Contact container animation
	const contactContainer = document.querySelector('.contact-container')
	if (contactContainer) {
		const contactAnim = gsap.from(contactContainer, {
			scrollTrigger: {
				trigger: '.contact-container',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			y: 200,
			ease: 'expo',
			duration: 1,
			opacity: 0,
			delay: 0.2
		})
		animations.push(contactAnim)
	}

	// Based in container animation
	const basedInContainer = document.querySelector('.based-in-container')
	if (basedInContainer) {
		const basedInAnim = gsap.from(basedInContainer, {
			scrollTrigger: {
				trigger: '.based-in-container',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			y: 200,
			opacity: 0,
			ease: 'expo',
			duration: 0.7,
			delay: 0.5
		})
		animations.push(basedInAnim)
	}

	const lottieAnimationContainer = document.querySelector('#lottie-player')
	if (lottieAnimationContainer) {
		const lottieAnim = gsap.from(lottieAnimationContainer, {
			scrollTrigger: {
				trigger: '.based-in-container',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			scale: 0,
			ease: 'expo',
			duration: 0.7,
			delay: 2
		})
		animations.push(lottieAnim)
	}

	// Based in text animation with SplitType
	const basedInText = document.querySelector('.based-in-text')
	if (basedInText) {
		let typeSplit = new SplitType('.based-in-text', {
			types: 'lines'
		})

		const lines = typeSplit.lines
		if (lines) {
			const linesAnim = gsap.from(lines, {
				scrollTrigger: {
					trigger: '.based-in-container',
					start: 'top 80%',
					toggleActions: 'play none none none'
				},
				y: '100%',
				opacity: 0,
				duration: 0.5,
				ease: 'back.out',
				stagger: 0.3,
				delay: 0.5
			})
			animations.push(linesAnim)
		}
	}

	// Intro text character animation
	const introText = document.querySelector('.intro-text')
	if (introText) {
		// Function to wrap characters in spans
		function wrapChars(element) {
			const text = element.textContent
			const chars = text.split('')
			const wrappedChars = chars
				.map((char) => {
					if (char === ' ') {
						return ' '
					}
					return `<span class="char">${char}</span>`
				})
				.join('')
			element.innerHTML = wrappedChars
		}

		// Function to wrap all text including strong tags
		function wrapAllText(element) {
			const strongTags = element.querySelectorAll('strong')
			strongTags.forEach((strong) => {
				wrapChars(strong)
			})

			const textNodes = Array.from(element.childNodes).filter(
				(node) => node.nodeType === Node.TEXT_NODE
			)

			textNodes.forEach((textNode) => {
				const span = document.createElement('span')
				span.textContent = textNode.textContent
				textNode.parentNode.replaceChild(span, textNode)
				wrapChars(span)
			})
		}

		wrapAllText(introText)

		const chars = introText.querySelectorAll('.char')
		const tl = gsap.timeline()

		tl.set(chars, {
			opacity: 0
		})

		const charsAnim = tl.to(
			chars,
			{
				opacity: 1,
				duration: 0.5,
				stagger: 0.005,
				ease: 'power1.inOut'
			},
			0
		)

		animations.push(charsAnim)
	}
}

function initAboutAnimations() {
	// Tech stack icons animation
	const techStackIcons = document.querySelectorAll('.tech-stack-icon')

	if (techStackIcons.length) {
		// Set initial state

		const techStackAnim = gsap.from(techStackIcons, {
			scrollTrigger: {
				trigger: techStackIcons[0],
				start: 'top 80%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			y: 50,
			duration: 0.8,
			ease: 'expo.out',
			stagger: {
				amount: 1,
				from: 'start'
			}
		})

		animations.push(techStackAnim)
	}

	// Tech stack icons animation
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
				from: 'center' // Animate icons in random order
			}
		})

		animations.push(favBookAnim)
	}
}

function initNowAnimations() {
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
			ease: 'expo',
			duration: 1.5,
			delay: 0.4
		})
		animations.push(nowBoxAnim)
	}
}

// Export cleanup function for use in component unmounting
export { cleanup }
