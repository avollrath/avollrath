---
title: 'PasiLunch'
summary: 'Daily Pasila lunch menus collected into one web app and Slack command.'
category: 'Apps'
heroImage: './pasilunch.jpg'
heroImageAlt: 'PasiLunch website'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'Node.js.svg', 'Cheerio.svg', 'Express.js.svg']
order: 7
liveUrl: 'https://lunchbot-btnu.onrender.com/'
---

The Pasila office district in Helsinki has a decent spread of lunch spots, but checking five different restaurant websites every morning to figure out what's on gets old fast. **PasiLunch** collects all of them into one page and a Slack command so the decision takes ten seconds instead of five minutes.

## How it's built

The backend runs on **Node.js** and **Express**, scraping each restaurant's menu page daily with **Cheerio**. The tricky part is that every restaurant formats their menu differently — one uses a table, another uses a PDF link, another just dumps text into a paragraph. Rather than writing a custom parser for each, I pipe the raw scraped content through the **Gemini API** with a structured prompt that normalises everything into a consistent JSON format. It works surprisingly well, and when a restaurant redesigns their site the parser doesn't break — Gemini figures out the new structure automatically.

Menus are cached once per day so the scraper and API calls only run once in the morning rather than on every request. The cache means the page loads instantly for everyone after that first hit.

## The Slack side

The Slack integration exposes a slash command that returns the day's menus directly in-channel. It adds a randomised humorous intro message each time — small thing, but it makes it slightly more fun to use than a plain data dump, and people actually used it regularly.

Hosted on Render, which means the free tier occasionally needs a moment to wake up on first load. Worth it for a lunch bot.
