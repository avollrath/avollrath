---
title: 'PasiLunch'
seoTitle: 'PasiLunch: Scaping and Normalizing Menus with Node.js and AI'
summary: 'Aggregate messy Pasila lunch menus into a clean Slack command and API. Uses Gemini AI to parse even the most brittle restaurant sites.'
category: 'Apps'
heroImage: './pasilunch.jpg'
heroImageAlt: 'PasiLunch website'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'Node.js.svg', 'Cheerio.svg', 'Express.js.svg']
order: 7
liveUrl: 'https://lunchbot-btnu.onrender.com/'
mockup: 'laptop'
---

**PasiLunch** is a grand name for a small daily victory. I built it because checking half a dozen restaurant websites every morning to find a decent office lunch was a waste of time—especially when every menu is published in a different, often incompatible format.

## The Goal: One Source of Truth for Lunch

The app aggregates local Pasila lunch menus into a single, readable view. It’s not just about listing food; it’s about normalizing messy data so the team can make a decision in seconds rather than minutes.

Practical outputs include:
- **Slack Command**: Get the daily menus directly in the team chat where the decision happens.
- **Normalized API**: A clean JSON feed for secondary use cases.
- **Web Dashboard**: A simple, fast-loading overview of all nearby options.

## The Technical Twist: LLM-Powered Normalization

Restaurant sites are notoriously brittle. Some use clean HTML, others mix languages or bury prices in obscure places. To solve this, PasiLunch uses **Gemini AI** to normalize menus when standard scraping fails. It’s a practical use of an LLM for a messy, non-deterministic data problem.

The practical flow is:

- Scrape each restaurant source
- Parse `HTML` with `Cheerio`
- Parse structured sources with `xml2js` where needed
- Normalize menu names, prices, language, and categories
- Serve the result to the web page, Slack command, and API

## Technical highlights

The awkward part is restaurant content. Some sites publish clean lists. Some mix Finnish and English. Some put prices in odd places. Some include weekly notes, dietary labels, or headings that are useful to humans but awkward for parsers.

The project uses `@google/genai` with Gemini to help normalize menus when scraping alone is too brittle. I would not use an LLM for a deterministic problem, but lunch menus are messy enough that strict parsing quickly becomes a collection of one-off exceptions.

Slack support is the other practical piece. A lunch app is useful if it appears where the decision happens. The Slack command means the team can ask for menus without leaving chat, while the web view is still available for browsing.

## Stack

The stack is deliberately boring: `Express`, `JavaScript`, `Cheerio`, `xml2js`, `dotenv`, Slack’s Web API package, and Gemini through `@google/genai`.

## Status

The main limitation is that PasiLunch is only as stable as the restaurant sites it reads. If they redesign, selectors break. If I rebuilt it, I would make source health more visible and add better diagnostics for stale or failed menus.
