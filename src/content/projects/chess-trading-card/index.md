---
title: 'CTC - Chess.com Trading Card'
summary: 'Fantasy trading card generator built from public Chess.com profile data.'
category: 'Apps'
heroImage: './ctc.jpg'
heroImageAlt: 'CTC Chess.com Trading Card app'
techStackLogos: ['Next.js.svg', 'TypeScript.svg', 'Tailwind.svg']
order: 5
liveUrl: 'https://chess-trading-card.vercel.app/'
---

I play chess badly and often. At some point I thought it would be fun to turn a Chess.com profile into something you could actually hold — a collectible trading card that captures your playing style as stats and lore, like a Pokémon card but for your embarrassing blunder rate.

**CTC** does exactly that. Type in any Chess.com username, and the app builds a unique card for that player.

## How it works

The app hits the public **Chess.com API** to pull player data — ratings across game modes, win/loss records, join date, country, verified status. From that raw data it derives a set of fantasy attributes: rarity tier, tactics rating, speed, endgame strength, prestige. A player who's been on the platform for years with a high blitz rating gets a different card feel than a brand-new casual player, and the algorithm is designed to surface those differences in a way that feels meaningful rather than arbitrary.

The card identity — name variant, flavour lore, visual theme — is generated with **AI**, but with deterministic fallbacks at every step so the card always renders cleanly even if the generation call fails or returns something unusable. That reliability matters more than novelty when someone pastes in a username and expects something to appear.

## The card itself

The finished card renders with **CSS 3D transforms** — tilt that follows your cursor, a shine layer that moves with the light angle, foil effects on higher rarity tiers. It's the kind of small frontend detail that makes a static image feel alive. Download and share options are baked in so it's easy to send to whoever you just beat.

Built with **Next.js**, **TypeScript**, and **Tailwind**. The whole thing runs on Vercel — type a username and the card appears in a few seconds.
