---
title: 'Chess Trading Card (CTC)'
seoTitle: 'Building a Chess.com Trading Card Generator with Next.js & AI'
summary: 'Turn dry player stats into collectible fantasy-style cards. Features procedural art generation, AI-driven lore, and a robust Next.js backend.'
category: 'Apps'
heroImage: './ctc.jpg'
heroImageAlt: 'CTC Chess.com Trading Card app'
techStackLogos: ['Next.js.svg', 'React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Three.js.svg']
order: 6
liveUrl: 'https://chess-trading-card.vercel.app/'
mockup: 'laptop'
---

**CTC (Chess Trading Card)** is an over-engineered way to find beauty in a losing streak. It’s a generator that transforms dry public Chess.com metadata into high-fidelity, collectible cards. Because if you’re going to tilt on a Tuesday night, you might as well have a legendary-tier card to show for it.

## The Goal: From Metadata to Lore

Chess.com provides a wealth of public profile data, but it’s usually presented as dry account metadata. CTC reimagines this as a collectible fantasy item.

Each card features:
- **Chess-derived attributes**: Power, speed, tactics, and prestige mapped from your real stats.
- **AI-Generated Lore**: A unique title and lore snippet generated specifically for your playstyle.
- **Procedural Artwork**: Dynamic portraits with reliable local fallbacks.
- **Visual Polish**: Rarity styling, shine effects, tilt interactions, and particle glows.

## The Architecture: Next.js and Generative APIs

The application is built on a **Next.js** backbone, fetching data through a local proxy API to handle caching and deduplication. One of the key technical decisions was treating the card as a derived "snapshot" rather than a live profile dump, allowing for a more stable and shareable card model.

## Technical highlights

The first important decision was treating the card as a derived object, not a literal profile dump. Chess.com data is not real-time anyway, so the app maps profile and stat fields into a stable card model rather than pretending it is a live ranking display.

The second decision was making generation optional. The app can use Pollinations and Google generative APIs, but it cannot depend on them.

Fallback behavior covers:

- Missing `POLLINATIONS_API_KEY`
- Failed text generation
- Failed image generation
- Empty or incomplete Chess.com stats
- Local fallback artwork from `public/creatures/`

The recent git history shows the project moving from a more general profile-to-creature experiment into a Chess.com-specific app. Later commits were mostly practical: Vercel-safe routes, branded `Open Graph` images, preview cards, font fixes, blob handling, and responsive layout.

## Stack

The app is built with `Next.js`, `React`, `TypeScript`, and `Tailwind CSS`. Visual effects use `@tsparticles/react`, `OGL`, and `Three.js`, while `html-to-image` handles the `PNG` export.

## Status

The current version works as an MVP and is more resilient than it looks. If I rebuilt it, I would separate the stat model from the presentation layer earlier and write more tests around Chess.com response shapes. The fun part is polished; the boring data contracts could still be stricter.
