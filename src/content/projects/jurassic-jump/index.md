---
title: 'Jurassic Jump'
seoTitle: 'Building a Godot Platformer with Claymation-Style Visuals'
summary: 'From a hand-rolled JS prototype to a polished Godot platformer. Features tuned physics and a distinct claymation-inspired art style.'
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

**Jurassic Jump** is a dinosaur-themed platformer that serves as a bridge between pure code and game engine logic. It began as a JavaScript exercise where I was hand-rolling gravity and collision physics, eventually evolving into a polished **Godot** project focused on game feel and visual identity.

## The Goal: Art and Mechanics in Agreement

The game features a distinct "claymation-style" visual direction. This aesthetic choice wasn't just decorative; it informed the mechanics. A visual style with this much weight required a more deliberate, readable movement model than a typical "twitch" platformer.

I focused on:
- **Tuned Physics**: Ensuring jump height, acceleration, and collision boundaries felt intuitive.
- **Level Layering**: Using blurred depth images and parallax backgrounds to create a sense of scale.
- **Asset Integrity**: Managing a heavy collection of character sprites and environment pieces within the Godot engine.

## The Pivot: Moving to Godot

While hand-rolling the original engine was a great learning experience, switching to **Godot** allowed me to stop building the "plumbing" and start focusing on the player experience. It provided the scene composition and level iteration tools needed to turn a prototype into a browser-playable game.

`Godot` gave me a better place for:

- Scene composition
- Collision shapes
- Sprite animation
- Level iteration
- Browser export
- Tuning movement without rewriting plumbing

## Technical highlights

The external project folder is mostly assets, which is honest for this kind of project. It contains layered backgrounds, blurred depth images, platforms, clouds, coin sprites, character sprites, menu art, and dinosaur-themed set pieces.

The hard part was not inventing a new platformer mechanic. It was getting the standard pieces to feel acceptable. Jump height, acceleration, collision boundaries, camera framing, and level spacing all matter more than they look like they should.

The asset-heavy structure also forced a useful constraint. Once the visual direction moved toward claymation-style sprites and layered backgrounds, the game needed slower, more readable movement than a twitch platformer. The art style and mechanics had to agree.

There is no useful git history in the external folder, so the development arc has to be inferred from the structure: a prototype became an asset-heavy `Godot` project with a web export as the final delivery target.

## Status

Jurassic Jump is a small learning game, not a polished commercial platformer. If I rebuilt it, I would define the movement model and level progression before producing too many visual assets.

The project still did its job:

- It made platformer physics concrete
- It moved a prototype into a real engine
- It produced a browser-playable `Godot` export
