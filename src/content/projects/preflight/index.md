---
title: 'PreFlight'
seoTitle: 'PreFlight: Building a Desktop Checklist App with Electron & React'
summary: 'Stop the distractions before they start. PreFlight is a blunt instrument for productivity: it blocks your desktop until your daily checklist is done.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'PreFlight lock screen with neon corridor background'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Vite.svg', 'Three.js.svg']
liveUrl: 'https://github.com/avollrath/preflight'
order: 0
mockup: 'laptop'
---

**PreFlight** is a Windows Electron checklist app, and it is intentionally a blunt instrument. I built it because I kept sitting down at my computer and immediately losing an hour to Slack, email, or YouTube instead of doing the high-leverage tasks I’d already decided mattered.

## The Problem: The Morning "Rabbit Hole"

Most productivity tools ask for your permission. PreFlight doesn't. It blocks your desktop until your daily checklist is complete. Is it subtle? No. Is it effective? Annoyingly, yes. It turns your PC into a focused workspace before you have the chance to get distracted.

## How it works: A Local-First Gatekeeper

This is a true desktop application, not a web app pretending to have system consequences. I chose **Electron** because the project needs to interact deeply with the local machine's startup flow.

The checklist is local-only by design. There are no accounts, no sync services, and no "productivity analytics" to distract you further. I just need the computer to refuse cooperation until the small list of "must-dos" is finished.

That local-only shape keeps the app honest. A checklist gate should not become another service to maintain, and it should not need a network connection before it can block the thing it is supposed to block.

## Technical highlights

The hard part is making the gate strict without making the app miserable. If the settings UI is cramped, the checklist text is hard to read, or the window sizing is wrong, the app becomes one more irritation.

Recent commits focused on exactly those details:

- Fitting the settings window to content
- Centering the window
- Increasing side padding
- Improving font sizes and contrast
- Making the checklist list scrollable
- Removing excess height from toggle rows

![PreFlight neon corridor hero artwork](/projects/preflight/hero.png)

## Stack

The app uses `Electron`, `React`, `TypeScript`, `Vite`, and `Three.js`. Packaging runs through `electron-builder`, with `concurrently`, `cross-env`, and `esbuild` helping the development and build flow.

The `Three.js` layer is visual, not architectural. It makes the lock screen feel more intentional, while the actual product behavior stays in the checklist state and desktop window handling.

## Status

The current version works for my use case, but anything that touches the desktop shell can get weird fast. If I rebuilt it, I would spend more time on Windows edge cases earlier: multi-monitor behavior, startup timing, and how hard the block should be.
