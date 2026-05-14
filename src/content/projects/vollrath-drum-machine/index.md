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
mockup: 'laptop'
---

I've always been interested in how classic hardware drum machines work — the physicality of the interface, the way a 16-step grid makes pattern-making immediately intuitive, the satisfying click of toggling a beat on or off. This project was an attempt to recreate that experience in the browser using no frameworks, just **vanilla JavaScript**, **HTML**, and **CSS**.

## The sequencer

The core is a 16-step sequencer with five instrument channels — kick, snare, hi-hat, clap, and tom. Each channel has its own volume control and step grid. The playback engine uses the **Web Audio API** for precise timing, scheduling each beat slightly ahead of playback to compensate for the inherent imprecision of `setTimeout` — a technique called lookahead scheduling that's standard in browser audio work and makes the difference between a sequencer that drifts and one that stays locked.

BPM is adjustable in real time, preset patterns give you a starting point, and the current pattern saves automatically to **localStorage** so it's still there when you come back.

## Audio timing

Building it in vanilla JavaScript also kept the learning surface exposed. There was no framework lifecycle to hide state updates, no audio wrapper to abstract scheduling, and no component library shaping the interface. That made the project slower in places, but much more useful as a way to understand browser audio and interaction timing.

It was a better learning project because nothing was hidden.

The project also made me appreciate how much music software depends on tiny trust signals. The playhead has to line up with what you hear. Muting or changing volume has to respond immediately. Presets have to load without surprising the user. If any of those details feel loose, the whole instrument feels unreliable.

The interface follows the hardware metaphor because that metaphor teaches the interaction. A 16-step row reads like a pattern, lit buttons read as active hits, and a moving playhead explains time better than a paragraph could. That made the visual design part of the usability, not just styling.

The next version would benefit from pattern chaining, swing, export/import, and maybe a small sample selector. I would still keep it intentionally limited. The charm of the project is that it opens fast, looks like a tiny machine, and lets you build a beat without reading instructions. More features only make sense if they preserve that directness.

The key lesson was that visual timing and audio timing are different problems. A UI can tolerate a few milliseconds of delay, but rhythm cannot. The sequencer therefore schedules audio slightly ahead of time while the interface follows the current step visually. That split keeps playback steady even when the browser is doing other work.

Each instrument channel has its own gain node so volume changes can happen without rebuilding the pattern. The pattern itself stays as simple state: channels, steps, tempo, and preset data. That made localStorage persistence easy and kept the code understandable when debugging timing issues.

## The interface

The visual design was as important to me as the functionality. I wanted it to feel like a piece of gear — something with weight and intention — not a web widget. **GSAP** handles the button press animations and the step indicator light that sweeps across the grid during playback. The CSS leans into a dark industrial aesthetic with backlit buttons and matte panel surfaces.

Building this without a framework was deliberate. Understanding event handling, state management, and the audio scheduling loop at the bare metal level is something I wanted to do before reaching for abstractions. The project achieved that, and the result is surprisingly tight for something with no build step.
