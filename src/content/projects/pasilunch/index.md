---
title: 'PasiLunch'
seoTitle: 'PasiLunch Pasila Lunch Menu Aggregator with Node.js'
summary: 'PasiLunch aggregates Pasila lunch menus into a Node.js web app, Slack slash command, JSON API, cache layer, and Gemini-normalized daily feed.'
category: 'Apps'
heroImage: './pasilunch.jpg'
heroImageAlt: 'PasiLunch website'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'Node.js.svg', 'Cheerio.svg', 'Express.js.svg']
order: 7
liveUrl: 'https://lunchbot-btnu.onrender.com/'
mockup: 'laptop'
---

A **Pasila lunch menu aggregator** saves the tiny daily annoyance of opening several restaurant sites before deciding where to eat. PasiLunch collects lunch menus around the Pasila office district into one web dashboard, one Slack slash command, and one JSON API.

The source project started as LunchBot and has grown into a Node.js and Express app. It scrapes restaurant pages with Cheerio and XML parsing, caches raw menu data, normalizes inconsistent restaurant copy, and uses Gemini through `@google/genai` to produce cleaner structured menus when simple parsing is not enough. The README lists three main outputs: the web dashboard at `/`, Slack command handling at `/slack/commands`, and normalized JSON at `/api/menus/normalized`.

The interesting technical problem is not the UI; it is making messy external menus reliable enough to scan quickly. Some restaurants publish HTML lists, others use inconsistent text, mixed Finnish and English, prices in different formats, and weekly notes. PasiLunch turns that into a daily view that is fast enough for a work chat decision. Recent commits include SEO and update passes, so the current version is both a usable internal tool and a small public web app.

![PasiLunch menu dashboard screenshot](/projects/pasilunch/screenshot.png)
