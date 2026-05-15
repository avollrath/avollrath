---
title: 'Wolt Ratings'
seoTitle: 'Wolt Ratings Local Chrome Extension Order Dashboard'
summary: 'Wolt Ratings is a local Chrome extension dashboard for rating Wolt order history, searching venues, adding private notes, and spotting spending patterns.'
category: 'Apps'
heroImage: './wolt-ratings.jpg'
heroImageAlt: 'Wolt Ratings order history dashboard'
techStackLogos: ['Python.svg', 'Flask.svg', 'JavaScript.svg']
order: 1
liveUrl: 'https://github.com/avollrath/wolt-ratings'
mockup: 'laptop'
---

A **Wolt order history dashboard** fixes a surprisingly specific problem: Wolt remembers every order, but it does not help you learn from them. Wolt Ratings pulls that history into a local-first Chrome extension so restaurants, dishes, ratings, notes, search, and spending patterns become useful again.

The project is split between a browser extension and a small Python/Flask backend used for local data work. The README is explicit about the privacy model: no accounts, no cloud, no tracking. Screenshots show the extension entry point, the dashboard, venue modal, ratings, filters, notes, and order history. Recent commits include performance work to skip redundant storage writes and badge updates, plus local startup tooling.

The important technical decision is keeping the data local. Food history is personal enough that a SaaS account would make the project worse, not better. JavaScript handles the extension UI and browser storage flow, while Python and Flask support local processing. The result is a practical dashboard for finding places worth reordering from, remembering what was good, and seeing spending patterns that the original app keeps buried.

![Wolt Ratings dashboard](/projects/wolt-ratings/wolt-ratings.jpg)
![Wolt Ratings extension popup](/projects/wolt-ratings/extension.jpg)
![Wolt Ratings venue modal](/projects/wolt-ratings/venue_modal.jpg)
![Wolt Ratings order dashboard view](/projects/wolt-ratings/dashboard.jpg)
