---
title: 'superVIMus'
seoTitle: 'superVIMus: A Vim Navigation Game to Build Muscle Memory'
summary: 'Stop the awkward repetition of learning Vim keys. A puzzle game built in Godot that turns hjkl practice into a browser-playable challenge.'
category: 'Games'
heroImage: './supervimus.jpg'
heroImageAlt: 'superVIMus Game'
techStackLogos: ['Godot.svg']
iframeSrc: 'https://avollrath.github.io/superVIMus/'
buttonText: 'Click to load game'
order: 12
liveUrl: 'https://avollrath.github.io/superVIMus/'
mockup: 'laptop'
---

**superVIMus** is an attempt to make the "learning curve" of Vim feel a little less steep. I love Vim, but the first stage of internalizing the `hjkl` movement keys is often a grim exercise in repetition. I decided to turn that repetition into a browser-playable puzzle game.

## The Goal: Muscle Memory Through Play

The game’s philosophy is simple: the controls *are* the mechanic. By stripping away complex RPG systems and focusing on short, punchy levels, superVIMus forces you to make directional decisions until the keys start to feel like an extension of your hand.

The design focuses on:
- **Intentional Level Design**: Corridors and obstacles that specifically punish arrow-key muscle memory.
- **Short Feedback Loops**: Quick resets and small rooms to keep the focus on movement rather than exploration.
- **Tactile Learning**: Turning directional translation into a physical, game-based response.

## The Build: Godot and Web Export

I built superVIMus in **Godot** to take advantage of its robust grid-movement and collision systems. The challenge was ensuring a smooth browser export; if the first few seconds of a movement game stutter, the player’s rhythm is immediately broken.


Good levels for this kind of thing need:

- Corridors that force horizontal movement
- Vertical movement that makes `j` and `k` feel natural
- Turns that punish arrow-key muscle memory
- Short resets so mistakes do not become annoying

That short-loop structure matters because the control scheme is the lesson. If a level takes too long, the player starts thinking about the level instead of the movement keys. Small rooms keep the focus where it belongs.

## Technical highlights

The external folder is named `vimto-the-hole`, which is a fair warning about the project’s origin. It contains a `Godot` project, browser export, preview art, tile sheets, fantasy sprites, coins, buttons, and level assets.

`Godot` was the obvious choice once the idea became a real game instead of an `HTML` keyboard toy. Grid movement, collisions, level scenes, collectables, sound, and web export all fit naturally in the engine.

The git log shows small-game polish rather than product expansion:

- Start screen work
- Level sound
- GPU warmup
- README cleanup

The GPU warmup note is a good example of browser-export reality. If the first few seconds stutter, the whole game feels cheaper than it is.

## Status

The current version is focused and playable. If I rebuilt it, I would add a clearer difficulty ramp and maybe track mistakes per level. I would not make it much bigger. The point is muscle memory, not an overwrought Vim curriculum.

The rough edge is balance. It teaches the keys, but a longer version would need more careful sequencing so repetition stays useful instead of becoming noise.
