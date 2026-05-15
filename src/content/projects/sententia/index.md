---
title: 'Sententia'
seoTitle: 'Sententia Quote Display App for Supernote Highlights'
summary: 'Sententia is a React quote display app for Supernote highlights, with Express import tooling, full-screen reading views, and fast quote browsing.'
category: 'Apps'
heroImage: './hero.jpg'
heroImageAlt: 'Sententia quote display with full-screen background'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Vite.svg', 'Express.js.svg']
liveUrl: 'https://avollrath.github.io/supernote-quote/'
order: 2
mockup: 'laptop'
---

A **quote display app** was the missing second home for my Supernote highlights. The Supernote Nomad is excellent for reading and marking passages, but browsing those saved quotes on e-ink is slower than I want when I am trying to skim, revisit, or leave a quote running on another screen.

Sententia is built with React, TypeScript, Vite, and a small Express backend. The README explains the core workflow: exported reading highlights become a clean, fast, full-screen quote experience. The dependency list includes Express, CORS, tsx, and the React/Vite toolchain, which points to a practical split between import/server utility code and the frontend display surface.

The design is intentionally minimal because the content is the point. The app needs to make individual quotes feel calm and legible, while still being fast enough to browse compared with the e-ink digest. Recent commits mention formatted quotes and README work, so the current state is a personal reading tool with its main flow in place: take collected highlights from the reader, normalize them, and display them somewhere more flexible.

![Sententia full-screen quote display preview](/projects/sententia/preview.jpg)
