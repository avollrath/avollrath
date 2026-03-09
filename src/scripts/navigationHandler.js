// Create a new file: src/scripts/navigationHandler.js
let isNavigationInitialized = false
let navigationCleanupFns = []

function addManagedListener(element, eventName, handler, options) {
	if (!element) return
	element.addEventListener(eventName, handler, options)
	navigationCleanupFns.push(() => {
		element.removeEventListener(eventName, handler, options)
	})
}

function cleanupNavigationListeners() {
	navigationCleanupFns.forEach((fn) => fn())
	navigationCleanupFns = []
}

export function initializeNavigation() {
	if (isNavigationInitialized) return
	isNavigationInitialized = true

	// Store last underline position
	let lastUnderlinePosition = { left: 0, width: 0 }
	let scrollLockY = 0
	let lastFocusedBeforeMenuOpen = null
	let mobileMenuKeydownHandler = null
	let mobileMenuCloseTimer = null

	function normalizePath(pathname) {
		if (!pathname) return '/'
		const trimmed = pathname.replace(/\/+$/, '')
		return trimmed === '' ? '/' : trimmed
	}

	function isActiveLink(link, currentPath) {
		const href = link.getAttribute('href') || ''
		const hrefPath = normalizePath(href)
		if (hrefPath === currentPath) return true

		// Blog section should remain active for individual post pages.
		if (link.id === 'blog-link' && currentPath.startsWith('/posts')) return true

		return false
	}

	function updateActiveNavItem() {
		const currentPath = normalizePath(window.location.pathname)
		const navItems = document.querySelectorAll('.nav-item')

		navItems.forEach((item) => {
			const active = isActiveLink(item, currentPath)
			item.classList.toggle('gradient-underline', active)
			item.classList.toggle('text-dark-text', active)
			item.classList.toggle('text-gray-400', !active)
			item.classList.toggle('hover:text-dark-text', !active)
			if (active) {
				item.setAttribute('aria-current', 'page')
			} else {
				item.removeAttribute('aria-current')
			}
		})
	}

	function saveUnderlinePosition() {
		const underline = document.querySelector('#nav-underline')
		if (underline) {
			const style = window.getComputedStyle(underline)
			lastUnderlinePosition = {
				left: parseFloat(style.left),
				width: parseFloat(style.width)
			}
		}
	}

	function updateUnderline() {
		updateActiveNavItem()

		const underline = document.querySelector('#nav-underline')
		const activeItem = document.querySelector('.nav-item.gradient-underline')

		if (!underline || !activeItem) return

		const navMenu = document.querySelector('#nav-menu')
		if (!navMenu) return

		const navMenuRect = navMenu.getBoundingClientRect()
		const activeItemRect = activeItem.getBoundingClientRect()

		// Calculate new position relative to nav menu
		const newLeft = activeItemRect.left - navMenuRect.left + 10 // Add padding
		const newWidth = activeItemRect.width - 20 // Subtract padding

		// Determine animation direction
		const movingRight = newLeft > lastUnderlinePosition.left

		// Set initial position for animation
		if (movingRight) {
			underline.style.left = `${lastUnderlinePosition.left}px`
			underline.style.width = `${lastUnderlinePosition.width}px`
		} else {
			underline.style.left = `${lastUnderlinePosition.left + lastUnderlinePosition.width - newWidth}px`
			underline.style.width = `${lastUnderlinePosition.width}px`
		}

		// Trigger animation
		requestAnimationFrame(() => {
			underline.style.transition = 'left 0.3s ease-out, width 0.3s ease-out'
			underline.style.left = `${newLeft}px`
			underline.style.width = `${newWidth}px`
		})
	}

	function closeMobileMenu(immediate = false) {
		const hamburger = document.getElementById('hamburger')
		const navMenu = document.getElementById('nav-menu')
		const body = document.body

		if (!hamburger || !navMenu) return
		const wasMenuOpen =
			navMenu.classList.contains('mobile-menu-active') ||
			hamburger.getAttribute('aria-expanded') === 'true'
		if (!wasMenuOpen) return

		if (mobileMenuCloseTimer) {
			clearTimeout(mobileMenuCloseTimer)
			mobileMenuCloseTimer = null
		}

		hamburger.classList.remove('active')
		navMenu.classList.remove('mobile-menu-visible')
		hamburger.setAttribute('aria-expanded', 'false')
		navMenu.setAttribute('aria-hidden', 'true')
		body.style.overflow = ''
		body.style.position = ''
		body.style.top = ''
		body.style.width = ''
		if (mobileMenuKeydownHandler) {
			document.removeEventListener('keydown', mobileMenuKeydownHandler)
			mobileMenuKeydownHandler = null
		}
		window.scrollTo(0, scrollLockY)

		if (lastFocusedBeforeMenuOpen && typeof lastFocusedBeforeMenuOpen.focus === 'function') {
			lastFocusedBeforeMenuOpen.focus()
		} else {
			hamburger.focus()
		}
		lastFocusedBeforeMenuOpen = null

		const finalizeClose = () => {
			navMenu.classList.add('hidden')
			navMenu.classList.remove('mobile-menu-active')
		}

		if (immediate) {
			finalizeClose()
		} else {
			mobileMenuCloseTimer = setTimeout(() => {
				finalizeClose()
				mobileMenuCloseTimer = null
			}, 220)
		}
	}

	function openMobileMenu() {
		const hamburger = document.getElementById('hamburger')
		const navMenu = document.getElementById('nav-menu')
		const menuClose = document.getElementById('menu-close')
		const body = document.body

		if (!hamburger || !navMenu) return

		if (mobileMenuCloseTimer) {
			clearTimeout(mobileMenuCloseTimer)
			mobileMenuCloseTimer = null
		}

		lastFocusedBeforeMenuOpen = document.activeElement
		scrollLockY = window.scrollY || window.pageYOffset || 0
		hamburger.classList.add('active')
		navMenu.classList.remove('hidden')
		navMenu.classList.add('mobile-menu-active')
		hamburger.setAttribute('aria-expanded', 'true')
		navMenu.setAttribute('aria-hidden', 'false')
		body.style.overflow = 'hidden'
		body.style.position = 'fixed'
		body.style.top = `-${scrollLockY}px`
		body.style.width = '100%'
		requestAnimationFrame(() => {
			navMenu.classList.add('mobile-menu-visible')
		})

		const focusables = navMenu.querySelectorAll(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
		)
		const firstFocusable = focusables[0]
		const lastFocusable = focusables[focusables.length - 1]

		mobileMenuKeydownHandler = (event) => {
			if (event.key === 'Escape') {
				event.preventDefault()
				closeMobileMenu()
				return
			}

			if (event.key !== 'Tab' || focusables.length === 0) return

			if (event.shiftKey && document.activeElement === firstFocusable) {
				event.preventDefault()
				lastFocusable.focus()
			} else if (!event.shiftKey && document.activeElement === lastFocusable) {
				event.preventDefault()
				firstFocusable.focus()
			}
		}
		document.addEventListener('keydown', mobileMenuKeydownHandler)

		if (menuClose) {
			menuClose.focus()
		} else if (firstFocusable) {
			firstFocusable.focus()
		} else {
			navMenu.focus()
		}
	}

	// Mobile menu handler
	// Add this to your initMobileMenu function
	function initMobileMenu() {
		const hamburger = document.getElementById('hamburger')
		const navMenu = document.getElementById('nav-menu')
		const menuClose = document.getElementById('menu-close')

		if (!hamburger || !navMenu) return

		if (hamburger.dataset.navBound !== 'true') {
			const handleHamburgerClick = () => {
				const isExpanded = hamburger.getAttribute('aria-expanded') === 'true'
				if (isExpanded) {
					closeMobileMenu()
				} else {
					openMobileMenu()
				}
			}
			addManagedListener(hamburger, 'click', handleHamburgerClick)
			hamburger.dataset.navBound = 'true'
		}

		if (menuClose && menuClose.dataset.navBound !== 'true') {
			addManagedListener(menuClose, 'click', () => closeMobileMenu())
			menuClose.dataset.navBound = 'true'
		}

		if (navMenu.dataset.navLinksBound !== 'true') {
			navMenu.querySelectorAll('a').forEach((link) => {
				addManagedListener(link, 'click', () => {
					if (navMenu.classList.contains('mobile-menu-active')) {
						closeMobileMenu(true)
					}
				})
			})
			navMenu.dataset.navLinksBound = 'true'
		}
	}

	// Project iframe handler
	function initializeProjectIframes() {
		function handleImageClick(imageElement) {
			const projectContainer = imageElement.closest('.wrapper')
			if (!projectContainer) return

			const imageContainer = projectContainer.querySelector('.image-container')
			const iframeContainer = projectContainer.querySelector('.iframe-container')
			const iframe = iframeContainer?.querySelector('iframe')

			if (iframe && iframe.getAttribute('data-src')) {
				iframe.src = iframe.getAttribute('data-src')
				imageContainer.classList.add('hidden')
				iframeContainer.classList.remove('hidden')
			}
		}

		const clickableImages = document.querySelectorAll('.iframe-trigger')
		clickableImages.forEach((img) => {
			if (img.dataset.iframeBound === 'true') return
			const onImageClick = () => handleImageClick(img)
			addManagedListener(img, 'click', onImageClick)
			img.dataset.iframeBound = 'true'
		})
	}

	// Initialize all handlers
	function initializeAll() {
		updateUnderline()
		initMobileMenu()
		initializeProjectIframes()
	}

	// Event listeners
	const handleBeforeSwap = () => {
		saveUnderlinePosition()
		closeMobileMenu(true)
	}
	addManagedListener(document, 'astro:before-swap', handleBeforeSwap)
	addManagedListener(document, 'astro:after-swap', initializeAll)
	addManagedListener(window, 'resize', updateUnderline)
	addManagedListener(window, 'pagehide', cleanupNavigationListeners)

	// Initial setup
	if (document.readyState === 'loading') {
		addManagedListener(document, 'DOMContentLoaded', initializeAll)
	} else {
		initializeAll()
	}
}
