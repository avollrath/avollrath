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
mockup: 'laptop'
---

Learning Vim's movement keys is mostly a matter of repetition until the muscle memory takes over. The problem is that drilling `hjkl` in a text editor is boring enough that most people give up before it clicks. **superVIMus** is an attempt to make that repetition worth doing.

It's a box-pushing puzzle game — think Sokoban — where the only movement is `h`, `j`, `k`, and `l`. The mechanics are simple enough that your brain isn't distracted by the game itself and can focus on internalising which key goes which direction. By the time you finish a few levels, the mapping starts to feel natural.

## Teaching through constraints

The project is small, but it has a clear audience: people who understand that Vim movement is useful but have not built the muscle memory yet. That focus helped keep the feature set disciplined. The game does not need inventory, combat, or narrative progression. It needs repeated directional decisions that stay just interesting enough.

I also avoided adding too many mechanics because every extra rule competes with the learning goal. Sokoban-style pushing is enough to create spatial puzzles, but still simple enough that movement remains the focus. The fewer controls the game has, the more every move reinforces the Vim key mapping.

The theme helps keep that practice from feeling sterile. The strange characters and puzzle framing give the player a reason to continue beyond "learn Vim keys". That matters because repetition only works if someone tolerates doing it long enough.

Because the game is grid-based, every entity can be represented by integer coordinates. That makes collision, pushing, win detection, and undo more reliable than trying to adapt continuous physics to a discrete puzzle. The renderer can animate between cells for polish, but the source of truth stays simple.

If I continue it, I would add a level selector, keyboard layout notes for non-QWERTY users, and a small explanation of how Vim movement maps to the grid. The core should stay small, though. It is strongest as a focused practice tool disguised as a strange little puzzle game.

The educational part works because the control scheme is the game. There is no option to use arrow keys as a fallback, because that would let the player avoid the exact habit the game is trying to build. The puzzle rules are familiar enough that the only unfamiliar thing is movement. That keeps the cognitive load in the right place.

Level design is doing a lot of quiet work. Early levels are almost movement drills with a goal state attached. Later levels introduce more planning, undo usage, and spatial reasoning. The player is practicing `h`, `j`, `k`, and `l`, but the game does not need to announce that constantly. Repetition happens naturally because each puzzle asks for another set of directional decisions.

## Building it in Godot

The game is built in **Godot** using **GDScript**. The grid-based movement was the interesting technical problem: every action is discrete, so the engine's physics system isn't involved at all — everything is coordinate math on a tile grid, checking whether the target cell is empty or contains a pushable box, and whether the box has room to slide.

Godot's scene tree made it straightforward to keep the level state clean and implement undo — each move is recorded as a delta, so you can step back without re-simulating anything. The pixel art style fit the project naturally and kept the asset work scoped to something one person could actually finish.

The absurdist framing — the slightly unhinged pixel characters, the deliberately odd scenario — was a deliberate choice to make something that didn't feel like homework. Whether it worked is up to you to decide. Play it below.
