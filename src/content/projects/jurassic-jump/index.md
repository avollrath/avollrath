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
mockup: 'laptop'
---

**Jurassic Jump** started as a JavaScript experiment — a canvas-based platformer I was building to understand how game loops work at a low level. Collision detection, frame-independent movement, gravity simulation. At some point the project outgrew what was comfortable to maintain in vanilla JS and I rebuilt it from scratch in **Godot** using **GDScript**, which turned out to be a much better fit for what it was becoming.

## The visual style

The art direction was the most experimental part. I wanted a claymation look — something tactile and slightly absurd, like a stop-motion kids' show. The workflow was AI-assisted: I generated reference images describing the style and scene I wanted, then used **Affinity Photo** and **ComfyUI** to push them into the specific aesthetic. Each character and environment piece went through several rounds of adjustment to get the texture and colour palette consistent. It's a slow process but the result is a visual identity that doesn't look like any other browser game.

## Movement and difficulty

The move to Godot also made it easier to separate design tuning from code changes. Exported variables let me adjust jump strength, gravity, speed, and enemy timing without rewriting systems. That faster feedback loop mattered because platformer feel is hard to judge in the abstract. You have to play a section repeatedly, change one value, and feel whether the result became fairer or more frustrating.

Audio and feedback were kept intentionally simple. The game needs enough response to feel alive, but too much noise would fight the handmade visual style. Small particles, readable animation states, and a clear fail condition did more for the experience than adding complicated systems.

The visual style made level design more demanding. Clay-like characters and soft shapes are charming, but they can make hitboxes feel unclear if collision boundaries are too strict. I kept gameplay readable by separating decorative edges from actual collision areas and by using movement, particles, and camera feedback to show what matters.

If I keep developing it, I would add checkpoint logic, a clearer difficulty curve, and more deliberate tutorial moments. The prototype already taught me a lot, but those additions would make it feel less like an experiment and more like a complete browser platformer.

The main tuning challenge was the jump. Platformers feel wrong immediately when gravity, acceleration, or collision margins are even slightly off. I adjusted the jump arc until it felt readable rather than realistic. The player needs enough hang time to react, but not so much that the character feels floaty. That balance changed again once enemies, platforms, and visual effects were added.

Difficulty also had to ramp without feeling random. Early sections teach timing and spacing. Later sections ask for faster decisions and cleaner landings. Because this is a small browser game, the goal was not a long campaign; it was a tight loop that gives the player a fair reason to restart.

## What I learned

Rebuilding the same project in two different tools back-to-back is a surprisingly good way to understand both. The JavaScript version forced me to understand the fundamentals — game state, the update loop, input handling. The Godot version showed me what an engine actually gives you: scene trees, built-in physics, **sprite sheets** with animation state machines, **particle systems** that would have taken days to write from scratch.

**Level design** turned out to be its own discipline. Getting the jump feel right, pacing the difficulty curve, making the player want to keep going — that's a design problem as much as a technical one, and one I spent more time on than I expected.

Play it in the browser below, or full screen [here](https://avollrath.github.io/WebGL-test/).
