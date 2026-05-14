---
title: 'PasiLunch'
summary: 'Daily Pasila lunch menus collected into one web app and Slack command.'
category: 'Apps'
heroImage: './pasilunch.jpg'
heroImageAlt: 'PasiLunch website'
techStackLogos: ['HTML5.svg', 'JavaScript.svg', 'CSS 3.svg', 'Node.js.svg', 'Cheerio.svg', 'Express.js.svg']
order: 7
liveUrl: 'https://lunchbot-btnu.onrender.com/'
mockup: 'laptop'
---

The Pasila office district in Helsinki has a decent spread of lunch spots, but checking five different restaurant websites every morning to figure out what's on gets old fast. **PasiLunch** collects all of them into one page and a Slack command so the decision takes ten seconds instead of five minutes.

## How it's built

The backend runs on **Node.js** and **Express**, scraping each restaurant's menu page daily with **Cheerio**. The tricky part is that every restaurant formats their menu differently — one uses a table, another uses a PDF link, another just dumps text into a paragraph. Rather than writing a custom parser for each, I pipe the raw scraped content through the **Gemini API** with a structured prompt that normalises everything into a consistent JSON format. It works surprisingly well, and when a restaurant redesigns their site the parser doesn't break — Gemini figures out the new structure automatically.

Menus are cached once per day so the scraper and API calls only run once in the morning rather than on every request. The cache means the page loads instantly for everyone after that first hit.

## Normalising messy restaurant data

From a local SEO perspective, the useful content is also naturally location-specific. Pasila lunch menus, restaurant names, weekday availability, and English menu descriptions all describe a real recurring search intent. The app was built for office workers first, but the same structure makes the page easier to understand as a local lunch resource.

The project also became a good example of using AI for a bounded transformation instead of a vague chatbot feature. Gemini does not decide where to eat, write marketing copy, or invent content. It receives messy restaurant text and returns structured menu data. That narrow role makes the output easier to validate and easier to cache.

The cache also gives the service a stable daily rhythm. Lunch menus change once per weekday, so refreshing constantly would add cost and failure points without improving the user experience. A clear once-per-day update matches the real-world decision cycle.

I deliberately kept the interface simple. The page is for a weekday decision, usually made quickly before lunch. Search, filters, accounts, and reviews would all be possible, but they would also make the tool slower to understand. The useful flow is: open page, scan menus, pick a place, go eat.

The next improvements would be reliability-oriented: better PDF extraction, clearer stale-cache states, and restaurant-specific fallback rules for pages that are too messy for a general parser. Those changes would make the service more dependable without changing the core experience.

The main SEO and product challenge is the same: restaurant menus are inconsistent. Some pages use Finnish, some use English, some mix both. Some have prices on separate lines, some group meals by weekday, and some hide the useful content inside images or PDFs. PasiLunch handles the cases it can read, then normalises the output into a predictable structure with restaurant name, date, dish names, descriptions, prices, and dietary notes where available.

That structure makes the web dashboard much easier to scan. Instead of five restaurant sites with five layouts, every lunch option appears in one consistent format. It also makes the Slack command useful because the response can stay compact without losing the information people need to decide.

## The Slack side

The Slack integration exposes a slash command that returns the day's menus directly in-channel. It adds a randomised humorous intro message each time — small thing, but it makes it slightly more fun to use than a plain data dump, and people actually used it regularly.

Hosted on Render, which means the free tier occasionally needs a moment to wake up on first load. Worth it for a lunch bot.
