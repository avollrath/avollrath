---
title: 'Vollrath Drum Machine'
seoTitle: 'Browser Drum Machine Step Sequencer in Vanilla JavaScript'
summary: 'Vollrath Drum Machine is a browser step sequencer with five channels, presets, localStorage saves, tempo control, channel volume, and GSAP UI.'
category: 'Apps'
heroImage: './drum-machine.jpg'
heroImageAlt: 'Vollrath Drum Machine browser sequencer'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'GSAP.svg']
iframeSrc: 'https://avollrath.github.io/drum-machine/'
iframeLayout: 'drum-machine'
buttonText: 'Launch drum machine'
order: 9
liveUrl: 'https://avollrath.github.io/drum-machine/'
mockup: 'laptop'
---

A **browser drum machine** is a good test of whether a simple interface can feel physical without any hardware. Vollrath Drum Machine recreates the basic pleasure of a classic 16-step sequencer: choose a channel, toggle beats on the grid, adjust volume and tempo, then hear the pattern lock in.

The external README describes a vanilla web app with five channels: kick, snare, tom, hihat, and fx. It includes a 16-step sequencer, per-channel volume, master volume, rock/house/hiphop/techno presets, and pattern save/load through `localStorage`. The stack stays close to the browser: HTML, CSS, JavaScript, and GSAP for interface motion.

The interesting part is timing and interaction. A drum machine only works if the grid is immediate, the playhead feels steady, and preset changes do not make the interface confusing. I kept it framework-free so the audio loop, state, DOM updates, and animations stayed explicit. Recent commits mention path and update fixes, which fits the project?s current status: a compact browser instrument with enough polish to embed directly in the portfolio as an interactive demo.
