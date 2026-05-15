---
title: 'superVIMus'
seoTitle: 'superVIMus Vim Movement Game Built in Godot for Web'
summary: 'superVIMus is a Godot Vim movement game for practicing hjkl navigation through compact puzzle levels, keyboard repetition, and browser play.'
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

A **Vim movement game** is a better way to practice `hjkl` than staring at a text editor and pretending drills are fun. superVIMus turns movement-key repetition into small puzzle levels where the player navigates with Vim-style directions until the muscle memory starts to feel automatic.

The external folder is named `vimto-the-hole` and contains the playable superVIMus project, including a README, exported web build, fantasy tile and sprite assets, UI art, coins, buttons, and a preview image. The implementation uses Godot because grid movement, level scenes, collisions, collectible behavior, and browser export fit naturally in a game engine.

The interesting design constraint is that the controls are the lesson. The game cannot hide `h`, `j`, `k`, and `l` behind normal arrow-key habits; it has to make those inputs useful enough that repetition happens through play. Recent commits include README and GPU warmup work, which suggests the project is already playable and the remaining work has been around presentation and launch smoothness. The current version is a focused browser game for making Vim navigation less abstract.

![superVIMus Vim movement game preview](/projects/supervimus/supervimus.webp)
