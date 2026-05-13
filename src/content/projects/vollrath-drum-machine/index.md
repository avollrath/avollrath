---
title: 'Vollrath Drum Machine'
summary: 'Browser step sequencer inspired by classic hardware drum machines.'
category: 'Apps'
heroImage: './drum-machine.jpg'
heroImageAlt: 'Vollrath Drum Machine browser sequencer'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'GSAP.svg']
iframeSrc: 'https://avollrath.github.io/drum-machine/'
iframeLayout: 'drum-machine'
buttonText: 'Launch drum machine'
order: 9
liveUrl: 'https://avollrath.github.io/drum-machine/'
---

I've always been interested in how classic hardware drum machines work — the physicality of the interface, the way a 16-step grid makes pattern-making immediately intuitive, the satisfying click of toggling a beat on or off. This project was an attempt to recreate that experience in the browser using no frameworks, just **vanilla JavaScript**, **HTML**, and **CSS**.

## The sequencer

The core is a 16-step sequencer with five instrument channels — kick, snare, hi-hat, clap, and tom. Each channel has its own volume control and step grid. The playback engine uses the **Web Audio API** for precise timing, scheduling each beat slightly ahead of playback to compensate for the inherent imprecision of `setTimeout` — a technique called lookahead scheduling that's standard in browser audio work and makes the difference between a sequencer that drifts and one that stays locked.

BPM is adjustable in real time, preset patterns give you a starting point, and the current pattern saves automatically to **localStorage** so it's still there when you come back.

## The interface

The visual design was as important to me as the functionality. I wanted it to feel like a piece of gear — something with weight and intention — not a web widget. **GSAP** handles the button press animations and the step indicator light that sweeps across the grid during playback. The CSS leans into a dark industrial aesthetic with backlit buttons and matte panel surfaces.

Building this without a framework was deliberate. Understanding event handling, state management, and the audio scheduling loop at the bare metal level is something I wanted to do before reaching for abstractions. The project achieved that, and the result is surprisingly tight for something with no build step.
