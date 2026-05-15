---
title: 'Marathon Control Center'
seoTitle: 'Marathon Training Dashboard with React and Supabase'
summary: 'Marathon Control Center is a React training dashboard for taper runs, gym work, mileage, shoe tests, backups, progress state, and Supabase sync.'
category: 'Apps'
heroImage: './marathon.jpg'
heroImageAlt: 'Marathon Control Center marathon training dashboard'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Supabase.svg', 'Vite.svg']
order: 5
liveUrl: 'https://avollrath.github.io/marathon/'
mockup: 'laptop'
---

A **marathon training dashboard** made more sense than another note or spreadsheet when my first marathon was three weeks away. I needed one compact place to track the taper block honestly: running, gym sessions, rowing, shoe tests, actual kilometres, planned work, and the state of my body.

The app is built with React, TypeScript, Vite, Tailwind, lucide icons, and optional Supabase sync. The README describes a focused 21-day control center, not a general fitness platform. That constraint shaped the UI: small technical panels, progress state, backup/export behavior, and enough structure to see whether I was following the plan without turning marathon prep into another admin job.

The dependency set is intentionally small. React handles the dashboard, Tailwind keeps the interface fast to iterate, and Supabase adds persistence when needed without making the app unusable locally. Recent commits show plan updates and taper adjustments, which is exactly how the project was used: as a live personal operating surface during race preparation. It is less about building a reusable SaaS product and more about building the right tool at the moment the problem became real.
