---
title: 'Vollrath Drum Machine'
seoTitle: 'Browser Drum Machine: Building a High-Performance Sequencer with GSAP'
summary: 'A tactile 16-step sequencer built for the browser. Focuses on immediate feedback, timing precision, and polished GSAP animations.'
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

**Vollrath Drum Machine** was an exercise in building a UI where there is nowhere to hide. A 16-step sequencer either feels immediate and tactile, or it feels like a laggy web form. I wanted to see if I could recreate the mechanical satisfaction of a hardware drum machine using only browser primitives and GSAP.

## The Goal: Precision and Feedback

The core of any instrument is timing. If the visual playhead drifts from the audio, the illusion breaks. I focused on creating a tight loop between user interaction and sensory feedback.

The app features:
- **A 16-Step Grid**: Toggling beats across kick, snare, tom, hihat, and fx channels.
- **Per-Channel Controls**: Real-time volume and master tempo adjustments.
- **Pattern Persistence**: Saving and loading presets directly through `localStorage`.
- **Physical Interaction**: Using **GSAP** to ensure every button press and light change feels mechanical and responsive.

## The Philosophy: No Framework, Just Flow

I intentionally avoided heavy frameworks for this project. Adding a massive abstraction layer would have mostly obscured the interesting timing and DOM-update challenges. By sticking to plain **JavaScript**, I kept the playback loop and state management as close to the browser as possible.

No framework was necessary. Adding one would mostly have moved the interesting timing problems behind another abstraction.

The useful model is small enough to hold in your head:

- A pattern is sixteen steps
- A channel owns its active steps and volume
- The transport owns tempo and playhead position
- Presets are just named starting states

## Technical highlights

Timing is the real project. A sequencer UI can look fine in a screenshot and still feel wrong if the playhead drifts, step toggles lag, or the visual state does not line up with the sound.

`GSAP` is used for interface motion because a drum machine benefits from physical feedback. The interaction should feel a little mechanical:

- Lights changing
- Active steps reading clearly
- Controls responding quickly
- Presets switching without confusing the grid

The git history is short and practical: path fixes, update passes, transition delays, and animation work. That is about right for this project. Most of the work is tightening the feel until the simple loop is pleasant.

## Status

The current version is embedded directly in the portfolio as an interactive demo. If I rebuilt it, I would isolate the timing engine more cleanly and add export/import for patterns as text. I would not make it much bigger.

The rough edge is that browser audio always deserves more testing than it gets. Different devices, tab throttling, and autoplay rules can make a small instrument feel less deterministic than the code suggests.
