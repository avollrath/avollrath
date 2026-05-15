---
title: 'Sententia'
seoTitle: 'Sententia: Building a Minimalist Quote Display for Supernote'
summary: 'Give your highlights a second home. A minimalist React app for browsing Supernote reading highlights on a clean, full-screen display.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'Sententia quote display with full-screen background'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Vite.svg', 'Express.js.svg']
liveUrl: 'https://avollrath.github.io/supernote-quote/'
order: 2
mockup: 'laptop'
---

**Sententia** is a calm, minimalist home for my Supernote reading highlights. While the Supernote Nomad is an incredible device for deep reading, browsing through hundreds of saved quotes on an e-ink screen can be slower than I’d like when I’m looking for inspiration or specific insights.

## The Goal: Digital Serenity

I built Sententia to bridge the gap between e-ink focus and high-speed digital browsing. It turns exported highlights into a beautiful, full-screen reading surface where the quote—not the interface—is the point.

The app is built around a singular, quiet workflow:
- **Export** highlights from the Supernote device.
- **Normalize** and parse the quote data.
- **Display** individual quotes in a clean, typographic layout.
- **Browse** at the speed of thought, without the lag of e-ink refreshes.

## The Technical Core: React and Express

Sententia splits the concerns between a lightweight **Express** utility for parsing and an elegant **React** frontend for display. This separation ensures that the complex work of formatting and normalization never compromises the speed of the browsing experience.

The display itself is intentionally minimal. Quotes need typography, spacing, and enough controls to browse. They do not need a dashboard full of fake productivity.

The useful interaction is almost passive. I want to move through saved passages without deciding whether I am “organizing knowledge” or doing some larger system. The app is closer to a reading surface than a note-taking tool.

## Technical highlights

The dependency list tells the shape of the project clearly:

- `Express` and `cors` for the small server side
- `tsx` for running TypeScript utilities
- `React` and `Vite` for the frontend
- `TypeScript` for keeping quote shapes explicit

Recent commits mention formatted quotes, curated quote updates, display config, and README work. That is exactly the phase this kind of personal tool goes through: the data and presentation get tuned together until the browsing experience feels right.

## Stack

The app uses `React`, `TypeScript`, `Vite`, and `Express`. It is not trying to support every e-reader export format; it is built around my Supernote workflow.

That narrow support is intentional. Generalizing too early would mostly mean collecting edge cases for devices I do not use.

## Status

The limitation is the export shape. If the Supernote side changes the format, the parser changes too. If I rebuilt it, I would make the import format more explicit and keep fixture files around for testing. For now, the boundedness is what keeps it pleasant.
