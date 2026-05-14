---
title: 'HyperType'
summary: 'Neon arcade typing game with achievements, score tracking, and sharp feedback.'
category: 'Games'
heroImage: './hypertype.jpg'
heroImageAlt: 'HyperType neon arcade typing game'
techStackLogos: ['Godot.svg']
iframeSrc: 'https://avollrath.github.io/HyperType/'
buttonText: 'Play the game'
order: 4
liveUrl: 'https://avollrath.github.io/HyperType/'
mockup: 'laptop'
---

I wanted a typing game that actually felt good to play. Not a drill, not a lesson — something with stakes, momentum, and the kind of satisfying feedback loop that makes you want one more run. So I built one.

**HyperType** is a synthwave typing shooter where words are your weapons. Enemies rush in from a neon skyline, every correct keypress fires back at them, and the pressure climbs as the level accelerates. Miss too many and they reach you. Stay sharp and the screen becomes a rhythm.

## How it plays

The core loop is immediate: pick a difficulty, type incoming words to destroy enemies, build streaks, survive mistakes, push your score higher. There are three modes — Beginner, Challenging, and Insane — each shifting the pace and enemy pressure. Boss encounters break up the flow and demand accuracy under a different kind of stress.

What I spent the most time on was making it *feel* right. The visual feedback on each keypress, the audio hitting at exactly the right moment, the way a streak builds and a miss interrupts it — those small details are what separate a typing tool from a game worth returning to.

## Progression

HyperType has a full account system with login and registration, run stat tracking, high score persistence, and an achievement badge gallery that unlocks as you play. Guest mode is there for quick runs when you just want to jump in.

The progression system is built on [Talo](https://trytalo.com/), a game backend service that handles player auth and achievement data — which let me focus on the game itself rather than writing server infrastructure.

## Game feel decisions

Typing games live or die on latency. If a correct keypress does not feel immediate, the whole game feels unfair. I spent a lot of time tuning the feedback chain: key input, enemy hit state, sound, score update, streak text, and screen effects. Each piece is small, but together they make the player understand that the game heard them instantly.

The word list also matters more than it first seems. Short words make the game feel snappy but can become chaotic at high speed. Longer words give the player time to plan but slow down the action. HyperType mixes both so the rhythm changes during a run. Boss encounters use that same idea at a larger scale by shifting from many small targets to one focused accuracy challenge.

## Technical notes

The browser version also shaped the scope. A web game has to load quickly and survive a wide range of hardware, screen sizes, and input devices. That pushed me toward clear 2D presentation, compact scenes, and a UI that explains itself quickly. The game can still feel arcade-like, but it cannot assume a controlled console environment.

I also wanted the web version to work without a heavy onboarding step. Guest play, fast loading, and short sessions are important because a browser game has very little patience from a new player.

The next technical pass is accessibility. Color contrast, reduced motion, readable enemy states, and input remapping all matter in a typing game. The more pressure the game adds, the more carefully the interface has to explain what is happening.

Godot made the browser build practical because the core loop can stay inside one engine instead of being split across DOM state, canvas rendering, and custom timing code. Talo handles persistence for accounts, scores, and achievements, which keeps the project focused on gameplay. The game can still run as a quick guest experience, but players who want progress have a real profile.

## Still going

This is an active project. The roadmap has more enemy and boss types, leaderboard polish, additional badges, and accessibility improvements in it. The web build runs in the browser — give it a try and see how long you last on Insane.
