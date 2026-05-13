---
title: 'superVIMus'
summary: 'Puzzle game for practicing Vim movement keys through play.'
category: 'Games'
heroImage: './supervimus.jpg'
heroImageAlt: 'superVIMus Game'
techStackLogos: ['Godot.svg']
iframeSrc: 'https://avollrath.github.io/superVIMus/'
buttonText: 'Click to load game'
order: 12
liveUrl: 'https://avollrath.github.io/superVIMus/'
---

Learning Vim's movement keys is mostly a matter of repetition until the muscle memory takes over. The problem is that drilling `hjkl` in a text editor is boring enough that most people give up before it clicks. **superVIMus** is an attempt to make that repetition worth doing.

It's a box-pushing puzzle game — think Sokoban — where the only movement is `h`, `j`, `k`, and `l`. The mechanics are simple enough that your brain isn't distracted by the game itself and can focus on internalising which key goes which direction. By the time you finish a few levels, the mapping starts to feel natural.

## Building it in Godot

The game is built in **Godot** using **GDScript**. The grid-based movement was the interesting technical problem: every action is discrete, so the engine's physics system isn't involved at all — everything is coordinate math on a tile grid, checking whether the target cell is empty or contains a pushable box, and whether the box has room to slide.

Godot's scene tree made it straightforward to keep the level state clean and implement undo — each move is recorded as a delta, so you can step back without re-simulating anything. The pixel art style fit the project naturally and kept the asset work scoped to something one person could actually finish.

The absurdist framing — the slightly unhinged pixel characters, the deliberately odd scenario — was a deliberate choice to make something that didn't feel like homework. Whether it worked is up to you to decide. Play it below.
