---
title: 'CTC - Chess.com Trading Card'
seoTitle: 'Chess.com Trading Card Generator in Next.js App Router'
summary: 'Chess.com trading card generator turns public player stats into animated collectible cards with AI lore, generated art, PNG export, and fallbacks.'
category: 'Apps'
heroImage: './ctc.jpg'
heroImageAlt: 'CTC Chess.com Trading Card app'
techStackLogos: ['Next.js.svg', 'React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Three.js.svg']
order: 6
liveUrl: 'https://chess-trading-card.vercel.app/'
mockup: 'laptop'
---

A **Chess.com trading card generator** turns any public Chess.com profile into a collectible fantasy card with stats, rarity, lore, and generated artwork. I built it because chess profiles contain plenty of personality, but Chess.com presents the data as tables instead of something you would want to share.

The app uses the **Next.js App Router** to fetch Chess.com PubAPI data through a server-side proxy, normalize profile and stats responses, then map that data into card attributes like power, speed, tactics, precision, endurance, and prestige. It also generates a chess-themed name, title, lore snippet, portrait prompt, and rarity treatment, with deterministic fallbacks when AI generation or upstream data is unavailable.

Key pieces include dedicated `/u/[username]` result pages, dynamic metadata, an Open Graph image route, a share-link flow, PNG export via `html-to-image`, and animated card effects using React, Tailwind, particles, OGL, and Three.js. The latest commits show the project moving from an earlier profile experiment into a Chess.com-specific card generator, then tightening preview cards, deployment blockers, font rendering, and responsive behavior.

![Magnus Carlsen Chess.com trading card preview](/projects/chess-trading-card/magnuscarlsen-chess-player-card.jpg)
