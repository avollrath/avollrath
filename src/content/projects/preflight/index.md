---
title: 'PreFlight'
summary: 'A Windows Electron app that blocks the desktop until a daily checklist is done.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'PreFlight lock screen with neon corridor background'
techStackLogos: ['JavaScript.svg', 'Three.js.svg']
liveUrl: 'https://github.com/avollrath/preflight'
order: 0
mockup: 'laptop'
---

I kept sitting down at my computer and immediately opening Slack, email, or YouTube before doing anything I actually meant to do. The things I needed to handle — laundry, groceries, cleaning, whatever tomorrow-me had left for today-me — just quietly didn't happen because the computer was right there and it was easier not to think about them.

**PreFlight** is the wall between waking the PC and pretending the list doesn't exist.

## How it works

The idea is simple: the night before, you set your checklist. The next morning when the PC boots or wakes from sleep, PreFlight opens as a fullscreen overlay. You work through the list, and when the last item is checked off the overlay closes and the desktop comes back. Until then, it's just you and the list.

The lock screen has a **Three.js animated neon corridor** built with WebGL as the background — something that feels deliberate and slightly cinematic rather than just a grey wall. It needed to feel like a moment, not a punishment.

## The technical side of locking a Windows desktop

This was the interesting part to build. Electron gives you enough rope to do real kiosk-style locking, but Windows pushes back on a lot of it. PreFlight uses a combination of **kiosk windows**, **always-on-top overlays**, focus recapture, and monitor bounds clamping to hold the lock. It also kills `explorer.exe` while locked — that removes the taskbar, Start menu, and desktop shell entirely. Explorer is restored when the checklist clears, when lock mode exits, and from the quit and error handlers so you're never stranded.

Secondary monitors are blocked too, with an option to leave them usable for things like Spotify.

Some things genuinely can't be blocked from user space — `Ctrl+Alt+Del`, `Win+L`, firmware keys. That's fine and intentional. This is a tool for honest self-accountability, not a prison. If I really want out, I can sign out of Windows. That's enough friction for the use case.

## Setup mode

The settings panel looks visually distinct from the lock screen so it's always obvious which mode you're in. Add, edit, and remove checklist items, toggle secondary screen blocking, configure auto-start on boot and wake from sleep. Completion state resets daily so the list is fresh each morning without any manual clearing.

The checklist, daily completions, and settings are stored in Electron's `userData` folder as a plain JSON file — easy to inspect, easy to reset if something goes wrong.
