---
title: 'Sententia'
summary: 'A minimal full-screen quote display built from personal e-reader highlights.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'Sententia quote display with full-screen background'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Vite.svg', 'Express.js.svg']
liveUrl: 'https://avollrath.github.io/supernote-quote/'
order: 2
mockup: 'laptop'
---

I read on a Supernote Nomad e-ink reader, which has a nice built-in feature: every highlighted passage from any ebook gets collected into a digest page automatically. It's a great idea, but browsing highlights on e-ink is slow and a bit cumbersome — the format isn't really made for skimming. I wanted those quotes somewhere faster, cleaner, and accessible on any screen.

**Sententia** — Latin for *thought, opinion, maxim* — is that second home.

## What it is

The deployed app is deliberately minimal: one quote at a time, full-screen, readable typography on a background image. Navigate forward and backward through your highlights with arrow keys or the spacebar, and it remembers where you left off in `localStorage`. Nothing more than that needs to exist in the public view.

## The data pipeline

Highlights come off the Supernote as a plain-text export. I manually clean them into a strict two-line format — quote text on one line, `Book Title - Author Name` on the next — and then a **TypeScript parser** transforms that file into structured JSON. The parser detects language, formats long quotes into readable line breaks, strips duplicates, and sorts by book and author. German quotes are already in the data, ready for a language toggle when I get to it.

The JSON lives in version control alongside the app. Every push to `main` triggers a **GitHub Actions** build that publishes to GitHub Pages — no server in production, just static files.

## The local editor

Editing quotes from a text file by hand gets tedious. There's a local admin UI that runs when you start the Express backend alongside the frontend — search and filter by text, author, or book, edit metadata, delete entries, and set a max display length so the public view doesn't get swamped by very long passages. Changes write directly back to the JSON source files, which you then commit. The admin route is hash-based so it's completely inert on the static deployment — it just shows a friendly message if the backend isn't running.

The stack is intentionally lean: **React 19**, **TypeScript**, **Vite**, plain CSS with no UI framework, and a small **Express** server that only exists locally. It's the kind of project where reaching for a component library or a styling framework would have added more complexity than the problem warrants.
