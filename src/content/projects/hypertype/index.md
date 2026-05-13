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
---

I wanted a typing game that actually felt good to play. Not a drill, not a lesson — something with stakes, momentum, and the kind of satisfying feedback loop that makes you want one more run. So I built one.

**HyperType** is a synthwave typing shooter where words are your weapons. Enemies rush in from a neon skyline, every correct keypress fires back at them, and the pressure climbs as the level accelerates. Miss too many and they reach you. Stay sharp and the screen becomes a rhythm.

## How it plays

The core loop is immediate: pick a difficulty, type incoming words to destroy enemies, build streaks, survive mistakes, push your score higher. There are three modes — Beginner, Challenging, and Insane — each shifting the pace and enemy pressure. Boss encounters break up the flow and demand accuracy under a different kind of stress.

What I spent the most time on was making it *feel* right. The visual feedback on each keypress, the audio hitting at exactly the right moment, the way a streak builds and a miss interrupts it — those small details are what separate a typing tool from a game worth returning to.

## Progression

HyperType has a full account system with login and registration, run stat tracking, high score persistence, and an achievement badge gallery that unlocks as you play. Guest mode is there for quick runs when you just want to jump in.

The progression system is built on [Talo](https://trytalo.com/), a game backend service that handles player auth and achievement data — which let me focus on the game itself rather than writing server infrastructure.

## Still going

This is an active project. The roadmap has more enemy and boss types, leaderboard polish, additional badges, and accessibility improvements in it. The web build runs in the browser — give it a try and see how long you last on Insane.
