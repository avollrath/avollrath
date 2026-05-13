---
title: 'Jurassic Jump'
summary: 'Claymation-inspired jump-and-run game built while learning Godot.'
category: 'Games'
heroImage: './jurassic-jump.jpg'
heroImageAlt: 'Jurassic Jump Game'
techStackLogos: ['Godot.svg']
iframeSrc: 'https://avollrath.github.io/jurassic-jump/'
buttonText: 'Click to load game'
order: 8
liveUrl: 'https://avollrath.github.io/jurassic-jump/'
---

**Jurassic Jump** started as a JavaScript experiment — a canvas-based platformer I was building to understand how game loops work at a low level. Collision detection, frame-independent movement, gravity simulation. At some point the project outgrew what was comfortable to maintain in vanilla JS and I rebuilt it from scratch in **Godot** using **GDScript**, which turned out to be a much better fit for what it was becoming.

## The visual style

The art direction was the most experimental part. I wanted a claymation look — something tactile and slightly absurd, like a stop-motion kids' show. The workflow was AI-assisted: I generated reference images describing the style and scene I wanted, then used **Affinity Photo** and **ComfyUI** to push them into the specific aesthetic. Each character and environment piece went through several rounds of adjustment to get the texture and colour palette consistent. It's a slow process but the result is a visual identity that doesn't look like any other browser game.

## What I learned

Rebuilding the same project in two different tools back-to-back is a surprisingly good way to understand both. The JavaScript version forced me to understand the fundamentals — game state, the update loop, input handling. The Godot version showed me what an engine actually gives you: scene trees, built-in physics, **sprite sheets** with animation state machines, **particle systems** that would have taken days to write from scratch.

**Level design** turned out to be its own discipline. Getting the jump feel right, pacing the difficulty curve, making the player want to keep going — that's a design problem as much as a technical one, and one I spent more time on than I expected.

Play it in the browser below, or full screen [here](https://avollrath.github.io/WebGL-test/).
