---
title: 'PreFlight'
seoTitle: 'PreFlight Windows Electron Checklist App with React'
summary: 'PreFlight is a Windows Electron checklist app that blocks desktop distraction until daily tasks are completed, with React, Vite, and Three.js.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'PreFlight lock screen with neon corridor background'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Vite.svg', 'Three.js.svg']
liveUrl: 'https://github.com/avollrath/preflight'
order: 0
mockup: 'laptop'
---

A **Windows Electron checklist app** became useful because I kept waking the PC and immediately leaking attention into Slack, email, or YouTube. PreFlight puts a small gate in front of that habit: before the desktop becomes available, the day?s checklist has to be handled.

The app is built with Electron, React, TypeScript, Vite, and Three.js. The README describes a Windows-first productivity lock screen, with setup through npm scripts and Electron Builder packaging. The source includes a neon corridor visual treatment, a settings window, local checklist state, and a desktop-focused workflow rather than a web-first productivity dashboard.

The technical shape is deliberately local. There is no account system, social layer, or cloud sync requirement. The hard part is making the gate feel firm without making the app annoying: readable checklist UI, clear settings, window sizing that fits the content, and visual polish that makes the block feel intentional. Recent commits focused on settings window sizing, centering, padding, font sizes, and contrast, which says a lot about the current state of the project: the core idea works, and the active work has been making the daily interaction easier to live with.

![PreFlight checklist lock screen](/projects/preflight/preview.jpg)
![PreFlight neon corridor hero artwork](/projects/preflight/hero.png)
