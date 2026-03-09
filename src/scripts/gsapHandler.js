// src/scripts/gsapHandler.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Store animation instances for cleanup
let animations = []
let domCleanupFns = []

function addManagedListener(element, eventName, handler, options) {
	if (!element) return
	element.addEventListener(eventName, handler, options)
	domCleanupFns.push(() => {
		element.removeEventListener(eventName, handler, options)
	})
}

function isLiteMotionMode() {
	return document.documentElement.classList.contains('reduced-motion')
}

function applyLiteModeStyles() {
	document.documentElement.classList.remove('home-intro-pending')

	const keySections = document.querySelectorAll(
		'.nav-bar, .nav-item, .nav-logo, .hero-container, .hero-badge, .hero-header, .intro-text, .cta-button, .avatar-wrapper, .now-container, .now-content, .blog-container, .blog-content, .about-container, .about-content, .render-container, .render-content, .spotify-container'
	)

	keySections.forEach((element) => {
		element.style.opacity = '1'
		element.style.transform = 'none'
	})
}

// Initialize all GSAP animations
export function initGSAP() {
	// Clean up existing animations
	cleanup()

	// Re-register plugins after navigation
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
	const reducedMotion = isLiteMotionMode()

	// Initialize footer animations
	initFooterAnimations(reducedMotion)

	if (reducedMotion) {
		applyLiteModeStyles()
		return
	}

	// Initialize page-specific animations based on current path
	const currentPath = window.location.pathname

	if (currentPath.startsWith('/about')) {
		initAboutAnimations()
	} else if (currentPath.startsWith('/now')) {
		initNowAnimations()
	} else if (currentPath === '/' || currentPath === '') {
		initHomeAnimations()
	} else if (currentPath.startsWith('/projects')) {
		initProjectAnimations()
	} else if (currentPath.startsWith('/renders')) {
		initRenderAnimations()
	} else if (currentPath.startsWith('/blog')) {
		initBlogAnimations()
	}
}

// Cleanup function to kill existing animations
function cleanup() {
	// Remove DOM listeners registered during previous init cycle.
	domCleanupFns.forEach((fn) => fn())
	domCleanupFns = []

	// Kill all ScrollTrigger instances
	ScrollTrigger.getAll().forEach((st) => st.kill())

	// Kill all tracked animations
	animations.forEach((anim) => anim.kill())
	animations = []
}

// Footer-specific animations
function initFooterAnimations(reducedMotion = false) {
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

	const footerAnim = gsap.from(footer, {
		scrollTrigger: {
			trigger: 'footer',
			start: 'top 90%',
			toggleActions: 'play none none none',
			once: true
		},
		opacity: 0,
		y: -100,
		ease: 'back.out',
		duration: 1,
		delay: 0.2
	})
	animations.push(footerAnim)
}

// Home page animations
function initHomeAnimations() {
	const isMobileViewport = window.matchMedia('(max-width: 1024px)').matches
	const spotifyStart = isMobileViewport ? 'top 108%' : 'top 90%'
	const sectionStart = isMobileViewport ? 'top 105%' : 'top 80%'
	const lowerSectionStart = isMobileViewport ? 'top 102%' : 'top 90%'

	let shouldRunHomeIntro = window.__homeIntroSeen !== true

	if (shouldRunHomeIntro) {
		window.__homeIntroSeen = true
	} else {
		document.documentElement.classList.remove('home-intro-pending')
	}

	const scrollToContact = () => {
		const anim = gsap.to(window, {
			duration: 1,
			scrollTo: { y: '#contact', offsetY: 250 },
			ease: 'power2.inOut'
		})
		animations.push(anim)
	}

	const ctaButton = document.querySelector('.cta-button')
	if (ctaButton) {
		addManagedListener(ctaButton, 'click', scrollToContact)
	}

	if (shouldRunHomeIntro) {
	const navBar = document.querySelector('.nav-bar')
	if (navBar) {
		const navBarAnim = gsap.from(navBar, {
			opacity: 0,
			y: -200,
			ease: 'back.out',
			duration: 0.4,
			delay: 0.6
		})
		animations.push(navBarAnim)
	}

	const navItems = document.querySelectorAll('.nav-item, .nav-logo')
	if (navItems) {
		const navItemsAnim = gsap.from(navItems, {
			opacity: 0,
			y: 50,
			ease: 'sine',
			duration: 0.3,
			delay: 1.2,
			stagger: 0.2
		})
		animations.push(navItemsAnim)
	}

	const heroContainer = document.querySelector('.hero-container')
	if (heroContainer) {
		const heroContainerAnim = gsap.from(heroContainer, {
			opacity: 0,
			x: -1000,
			ease: 'back.out',
			duration: 0.5,
			delay: 0.3
		})
		animations.push(heroContainerAnim)
	}

	const heroBadge = document.querySelector('.hero-badge')
	if (heroBadge) {
		const badgeAnim = gsap.from(heroBadge, {
			opacity: 0,
			x: -150,
			ease: 'elastic(0.6)',
			duration: 1,
			delay: 0.8
		})
		animations.push(badgeAnim)
	}

	const heroHeader = document.querySelector('.hero-header')
	if (heroHeader) {
		const heroHeaderAnim = gsap.from(heroHeader, {
			opacity: 0,
			y: -100,
			ease: 'back.out',
			duration: 0.5,
			delay: 0.5
		})
		animations.push(heroHeaderAnim)
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
				delay: 0.5,
				stagger: {
					amount: 2,
					from: 'start'
				},
				ease: 'power1.inOut'
			},
			0
		)

		animations.push(charsAnim)
	}

	if (ctaButton) {
		const ctaAnim = gsap.from(ctaButton, {
			opacity: 0,
			y: 100,
			ease: 'back.out',
			duration: 0.4,
			delay: 1.3
		})
		animations.push(ctaAnim)
	}

	const avatar = document.querySelector('.avatar-wrapper')
	if (avatar) {
		const avatarAnim = gsap.from(avatar, {
			scale: 0,
			ease: 'back.out',
			duration: 0.6,
			delay: 0.8
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
			delay: 1
		})
		animations.push(nowContainerAnim)
	}

	const nowContent = document.querySelectorAll('.now-content')
	if (nowContent) {
		const nowContentAnim = gsap.from(nowContent, {
			opacity: 0,
			y: 50,
			ease: 'back.out',
			duration: 0.7,
			delay: 1.2
		})
		animations.push(nowContentAnim)
	}

	const blogContainer = document.querySelector('.blog-container')
	if (blogContainer) {
		const blogContainerAnim = gsap.from(blogContainer, {
			opacity: 0,
			x: -300,
			ease: 'back.out',
			duration: 0.4,
			delay: 1.3
		})
		animations.push(blogContainerAnim)
	}

	const blogContent = document.querySelectorAll('.blog-content')
	if (blogContent) {
		const blogContentAnim = gsap.from(blogContent, {
			opacity: 0,
			y: 50,
			ease: 'back.out',
			duration: 0.7,
			delay: 1.2
		})
		animations.push(blogContentAnim)
	}

	const aboutContainer = document.querySelector('.about-container')
	if (aboutContainer) {
		const aboutContainerAnim = gsap.from(aboutContainer, {
			opacity: 0,
			y: -300,
			ease: 'back.out',
			duration: 0.4,
			delay: 1.5
		})
		animations.push(aboutContainerAnim)
	}

	const aboutContent = document.querySelectorAll('.about-content')
	if (aboutContent) {
		const aboutContentAnim = gsap.from(aboutContent, {
			opacity: 0,
			y: 50,
			ease: 'back.out',
			duration: 0.7,
			delay: 1.8
		})
		animations.push(aboutContentAnim)
	}

	const renderContainer = document.querySelector('.render-container')
	if (renderContainer) {
		const renderContainerAnim = gsap.from(renderContainer, {
			opacity: 0,
			x: 300,
			ease: 'back.out',
			duration: 0.4,
			delay: 2.0
		})
		animations.push(renderContainerAnim)
	}

	const renderContent = document.querySelectorAll('.render-content')
	if (renderContent) {
		const renderContentAnim = gsap.from(renderContent, {
			opacity: 0,
			y: 100,
			ease: 'back.out',
			duration: 0.5,
			delay: 2.4
		})
		animations.push(renderContentAnim)
	}

	const spotifyContainer = document.querySelector('.spotify-container')
	if (spotifyContainer) {
		const spotifyContainerAnim = gsap.from(spotifyContainer, {
			opacity: 0,
			x: 300,
			ease: 'back.out',
			duration: 0.4,
			delay: 2.8
		})
		animations.push(spotifyContainerAnim)
	}

	requestAnimationFrame(() => {
		document.documentElement.classList.remove('home-intro-pending')
	})
	}

	// Spotify tracks animation
	const spotifyTracks = document.querySelectorAll('.spotify-track')
	if (spotifyTracks.length) {
		const trackAnim = gsap.from(spotifyTracks, {
			scrollTrigger: {
				trigger: '.spotify-container',
				start: spotifyStart,
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
				start: sectionStart,
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
				start: sectionStart,
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
				start: lowerSectionStart,
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
				start: lowerSectionStart,
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
				start: lowerSectionStart,
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
					start: sectionStart,
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
}

function initAboutAnimations() {
	const aboutImage = document.querySelector('.about-image')
	if (aboutImage) {
		const lottieAnim = gsap.from(aboutImage, {
			scrollTrigger: {
				trigger: '.about-image',
				start: 'top 90%',
				toggleActions: 'play none none none'
			},
			x: -300,
			opacity: 0,
			ease: 'back.out',
			duration: 0.6,
			delay: 0.6
		})
		animations.push(lottieAnim)
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
			opacity: 0,
			ease: 'expo',
			duration: 1.5
		})
		animations.push(nowBoxAnim)
	}
}

function initProjectAnimations() {
	const projectTextContainers = document.querySelectorAll('.project-text-container')

	if (projectTextContainers.length) {
		const projectTextContainersAnim = gsap.from(projectTextContainers, {
			scrollTrigger: {
				trigger: projectTextContainers[0],
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

	const projectImageContainers = document.querySelectorAll('.project-image-container')

	if (projectImageContainers.length) {
		const projectImageContainersAnim = gsap.from(projectImageContainers, {
			scrollTrigger: {
				trigger: projectImageContainers[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			x: 300,
			duration: 1,
			ease: 'expo.out',
			delay: 0.3,
			stagger: 0.3
		})
		animations.push(projectImageContainersAnim)
	}

	const projectButtons = document.querySelectorAll('.project-button')

	if (projectButtons.length) {
		const projectsBtnAnim = gsap.from(projectButtons, {
			scrollTrigger: {
				trigger: projectTextContainers[0],
				start: 'top bottom 60%',
				toggleActions: 'play none none none'
			},
			opacity: 0,
			scale: 0,
			duration: 1,
			ease: 'expo.out',
			delay: 0.5,
			stagger: 0.3
		})
		animations.push(projectsBtnAnim)

		projectButtons.forEach((btn) => {
			const handleMouseEnter = () => {
				gsap.killTweensOf(btn)
				gsap.to(btn, {
					scale: 1.1,
					ease: 'elastic(0.8)',
					duration: 1
				})
			}
			const handleMouseLeave = () => {
				gsap.killTweensOf(btn)
				gsap.to(btn, {
					scale: 1,
					ease: 'elastic(0.6)',
					delay: 0.1,
					duration: 0.6
				})
			}
			addManagedListener(btn, 'mouseenter', handleMouseEnter)
			addManagedListener(btn, 'mouseleave', handleMouseLeave)
		})
	}
}

function initRenderAnimations() {
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

function initBlogAnimations() {
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

export { cleanup }
