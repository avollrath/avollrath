// src/scripts/gsapHandler.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
window.ScrollTrigger = ScrollTrigger

// Store animation instances for cleanup
let animations = []
let domCleanupFns = []
let initRunId = 0

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
	document.documentElement.classList.remove('about-intro-pending')

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
	return initializeGSAP()
}

async function initializeGSAP() {
	// Clean up existing animations
	cleanup()
	const runId = ++initRunId

	// Re-register plugins after navigation
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
	window.ScrollTrigger = ScrollTrigger
	const reducedMotion = isLiteMotionMode()

	// Initialize footer animations after layout settles (deferred so ScrollTrigger
	// measures the correct page height after view transitions paint new content)
	requestAnimationFrame(() => requestAnimationFrame(() => initFooterAnimations(reducedMotion)))

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
		await initHomeAnimations(runId)
	} else if (currentPath === '/projects' || currentPath === '/projects/') {
		initProjectsOverviewAnimations()
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
	initRunId += 1

	// Remove DOM listeners registered during previous init cycle.
	domCleanupFns.forEach((fn) => fn())
	domCleanupFns = []

	// Kill all ScrollTrigger instances
	ScrollTrigger.getAll().forEach((st) => st.kill())

	// Kill all tracked animations
	animations.forEach((anim) => anim.kill())
	animations = []
}

function scheduleScrollTriggerRefresh() {
	const refresh = () => {
		requestAnimationFrame(() => {
			ScrollTrigger.refresh()
		})
	}

	if ('requestIdleCallback' in window) {
		requestIdleCallback(refresh, { timeout: 400 })
		return
	}

	setTimeout(refresh, 0)
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

// Home page animations
async function initHomeAnimations(runId) {
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
		const navLogo = document.querySelector('.nav-logo')
		if (navLogo) {
			gsap.set(navLogo, { clearProps: 'transform,opacity' })
		}

		const navBar = document.querySelector('.nav-bar')
		if (navBar) {
			gsap.set(navBar, { opacity: 0, y: -200 })
			const navBarAnim = gsap.to(navBar, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 0.6,
				clearProps: 'transform,opacity'
			})
			animations.push(navBarAnim)
		}

		const navItems = document.querySelectorAll('.nav-item')
		if (navItems.length) {
			gsap.set(navItems, {
				opacity: 0,
				scale: 0,
				transformOrigin: 'center center'
			})

			const navItemsAnim = gsap.to(navItems, {
				opacity: 1,
				scale: 1,
				ease: 'sine',
				duration: 0.3,
				delay: 1.2,
				stagger: 0.2,
				clearProps: 'transform,opacity'
			})
			animations.push(navItemsAnim)
		}

		const heroContainer = document.querySelector('.hero-container')
		if (heroContainer) {
			gsap.set(heroContainer, { opacity: 0, x: -1000 })
			const heroContainerAnim = gsap.to(heroContainer, {
				opacity: 1,
				x: 0,
				ease: 'back.out',
				duration: 0.5,
				delay: 0.3,
				clearProps: 'transform,opacity'
			})
			animations.push(heroContainerAnim)
		}

		const heroBadge = document.querySelector('.hero-badge')
		if (heroBadge) {
			gsap.set(heroBadge, { opacity: 0, x: -150 })
			const badgeAnim = gsap.to(heroBadge, {
				opacity: 1,
				x: 0,
				ease: 'elastic(0.6)',
				duration: 1,
				delay: 0.8,
				clearProps: 'transform,opacity'
			})
			animations.push(badgeAnim)
		}

		const heroHeader = document.querySelector('.hero-header')
		if (heroHeader) {
			gsap.set(heroHeader, { opacity: 0, y: -100 })
			const heroHeaderAnim = gsap.to(heroHeader, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.5,
				delay: 0.5,
				clearProps: 'transform,opacity'
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
			gsap.set(ctaButton, { opacity: 0, y: 100 })
			const ctaAnim = gsap.to(ctaButton, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 1.3,
				clearProps: 'transform,opacity'
			})
			animations.push(ctaAnim)
		}

		const avatar = document.querySelector('.avatar-wrapper')
		if (avatar) {
			gsap.set(avatar, { scale: 0 })
			const avatarAnim = gsap.to(avatar, {
				scale: 1,
				ease: 'back.out',
				duration: 0.6,
				delay: 0.8,
				clearProps: 'transform'
			})
			animations.push(avatarAnim)
		}

		const nowContainer = document.querySelector('.now-container')
		if (nowContainer) {
			gsap.set(nowContainer, { opacity: 0, x: 300 })
			const nowContainerAnim = gsap.to(nowContainer, {
				opacity: 1,
				x: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 1,
				clearProps: 'transform,opacity'
			})
			animations.push(nowContainerAnim)
		}

		const clientLogosContainer = document.querySelector('.client-logos-container')
		if (clientLogosContainer) {
			gsap.set(clientLogosContainer, { opacity: 0, y: 400 })
			const clientLogosAnim = gsap.to(clientLogosContainer, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 0.8,
				clearProps: 'transform,opacity'
			})
			animations.push(clientLogosAnim)
		}

		const nowContent = document.querySelectorAll('.now-content')
		if (nowContent) {
			gsap.set(nowContent, { opacity: 0, y: 50 })
			const nowContentAnim = gsap.to(nowContent, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.7,
				delay: 1.2,
				clearProps: 'transform,opacity'
			})
			animations.push(nowContentAnim)
		}

		const blogContainer = document.querySelector('.blog-container')
		if (blogContainer) {
			gsap.set(blogContainer, { opacity: 0, x: -300 })
			const blogContainerAnim = gsap.to(blogContainer, {
				opacity: 1,
				x: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 1.3,
				clearProps: 'transform,opacity'
			})
			animations.push(blogContainerAnim)
		}

		const blogContent = document.querySelectorAll('.blog-content')
		if (blogContent) {
			gsap.set(blogContent, { opacity: 0, y: 50 })
			const blogContentAnim = gsap.to(blogContent, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.7,
				delay: 1.2,
				clearProps: 'transform,opacity'
			})
			animations.push(blogContentAnim)
		}

		const aboutContainer = document.querySelector('.about-container')
		if (aboutContainer) {
			gsap.set(aboutContainer, { opacity: 0, y: -300 })
			const aboutContainerAnim = gsap.to(aboutContainer, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 1.5,
				clearProps: 'transform,opacity'
			})
			animations.push(aboutContainerAnim)
		}

		const aboutContent = document.querySelectorAll('.about-content')
		if (aboutContent) {
			gsap.set(aboutContent, { opacity: 0, y: 50 })
			const aboutContentAnim = gsap.to(aboutContent, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.7,
				delay: 1.8,
				clearProps: 'transform,opacity'
			})
			animations.push(aboutContentAnim)
		}

		const renderContainer = document.querySelector('.render-container')
		if (renderContainer) {
			gsap.set(renderContainer, { opacity: 0, x: 300 })
			const renderContainerAnim = gsap.to(renderContainer, {
				opacity: 1,
				x: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 2.0,
				clearProps: 'transform,opacity'
			})
			animations.push(renderContainerAnim)
		}

		const renderContent = document.querySelectorAll('.render-content')
		if (renderContent) {
			gsap.set(renderContent, { opacity: 0, y: 100 })
			const renderContentAnim = gsap.to(renderContent, {
				opacity: 1,
				y: 0,
				ease: 'back.out',
				duration: 0.5,
				delay: 2.4,
				clearProps: 'transform,opacity'
			})
			animations.push(renderContentAnim)
		}

		const spotifyContainer = document.querySelector('.spotify-container')
		if (spotifyContainer) {
			gsap.set(spotifyContainer, { opacity: 0, x: 300 })
			const spotifyContainerAnim = gsap.to(spotifyContainer, {
				opacity: 1,
				x: 0,
				ease: 'back.out',
				duration: 0.4,
				delay: 2.8,
				clearProps: 'transform,opacity'
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

	const lottieAnimationContainer = basedInContainer?.querySelector('lottie-player')
	const revealLottieWithHelsinki = () => {
		if (!lottieAnimationContainer || lottieAnimationContainer.dataset.revealed === 'true') return

		lottieAnimationContainer.dataset.revealed = 'true'
		const lottieAnim = gsap.fromTo(
			lottieAnimationContainer,
			{ scale: 0.85, autoAlpha: 0 },
			{
				scale: 1,
				autoAlpha: 1,
				ease: 'expo.out',
				duration: 0.7,
				immediateRender: false,
				clearProps: 'opacity,visibility,transform'
			}
		)
		animations.push(lottieAnim)
	}

	// Based in text animation with SplitType
	const basedInText = document.querySelector('.based-in-text')
	if (basedInText) {
		const { default: SplitType } = await import('split-type')
		if (runId !== initRunId) return

		let typeSplit = new SplitType('.based-in-text', {
			types: 'lines'
		})

		const lines = typeSplit.lines
		if (lines) {
			const linesAnim = gsap.from(lines, {
				scrollTrigger: {
					trigger: '.based-in-container',
					start: sectionStart,
					toggleActions: 'play none none none',
					once: true,
					onEnter: revealLottieWithHelsinki
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

	// Fallback when the text block is unavailable for any reason.
	if (!basedInText) {
		revealLottieWithHelsinki()
	}

	// Recalculate trigger positions after dynamic content/layout settles.
	scheduleScrollTriggerRefresh()
}

function initAboutAnimations() {
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
	// Let Astro's view transition handle the page entrance (same as blog posts).
	// Only wire up interactive button hover effects here.
	const projectButtons = document.querySelectorAll('.project-button')
	if (projectButtons.length) {
		projectButtons.forEach((btn) => {
			const handleMouseEnter = () => {
				gsap.killTweensOf(btn)
				gsap.to(btn, { scale: 1.1, ease: 'elastic(0.8)', duration: 1 })
			}
			const handleMouseLeave = () => {
				gsap.killTweensOf(btn)
				gsap.to(btn, { scale: 1, ease: 'elastic(0.6)', delay: 0.1, duration: 0.6 })
			}
			addManagedListener(btn, 'mouseenter', handleMouseEnter)
			addManagedListener(btn, 'mouseleave', handleMouseLeave)
		})
	}
}

function initProjectsOverviewAnimations() {
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
			stagger: 0.2
		})
		animations.push(cardsAnim)
	}

	scheduleScrollTriggerRefresh()
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
