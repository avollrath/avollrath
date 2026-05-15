---
title: 'Jurassic Jump'
seoTitle: 'Jurassic Jump Godot Platformer Game for Browser Play'
summary: 'Jurassic Jump is a Godot platformer with claymation-inspired art, dinosaur hazards, sprite-heavy levels, exported web play, and tuned movement.'
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

A **Godot platformer game** was the right next step once my original JavaScript prototype started turning into something bigger than a canvas experiment. Jurassic Jump began as a way to learn movement, collision, gravity, and game loops by hand, then moved into Godot when the level design and visual direction needed a proper engine.

The external project folder is asset-heavy, with backgrounds, platforms, clouds, coins, hazards, character sprites, menu art, blurred depth layers, and dinosaur-themed set pieces. That matches the design goal: a playful jump-and-run game with a claymation-inspired look rather than a bare mechanics demo. Godot let the project keep movement tuning, collisions, sprite animation, scene composition, exported web builds, and level work in one place.

The interesting part was deciding what to stop hand-rolling. Writing physics in JavaScript was useful for learning, but once the project needed consistent collisions, authored scenes, and browser export, Godot became the more practical tool. The current version is a playable web game: small, focused, and mostly about learning how to turn prototype mechanics into a more coherent platformer experience.
