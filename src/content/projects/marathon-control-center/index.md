---
title: 'Marathon Control Center'
summary: 'Training dashboard for the final weeks before a first marathon.'
category: 'Apps'
heroImage: './marathon.jpg'
heroImageAlt: 'Marathon Control Center marathon training dashboard'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Supabase.svg']
order: 5
liveUrl: 'https://avollrath.github.io/marathon/'
mockup: 'laptop'
---

My first full marathon was three weeks away and I had a problem. After months of inconsistent training — travel, winter, a stretch of illness, general life — I needed to be honest with myself about what the taper block actually looked like. A note in my phone wasn't going to cut it. A spreadsheet felt like the wrong tool. So I did what any developer does when they want to avoid confronting a hard reality: I built an app about it.

**Marathon Control Center** is a 21-day taper dashboard for exactly one thing — getting to race day with a clear head and a completed plan.

## What it tracks

The dashboard maps out the final three weeks: runs with target and actual kilometres logged, gym sessions, rowing, rest days, and race day itself. Every completed session updates a live progress state that persists across browser sessions. There's a kilometre input for each run so the gap between "planned" and "actually ran" stays visible rather than quietly forgiven.

The scope is deliberately narrow. It's not a general training log or a fitness tracker. It's a focused interface for one high-stakes block of training, polished enough to feel worth opening every day.

## The tech side

The app is **offline-first** by default — all progress lives in localStorage and works immediately with no network connection. Supabase sync is layered on top as an optional enhancement: when the environment variables are present at build time, the dashboard syncs a shared progress record remotely. Without them it just keeps working locally. This made it easy to deploy as a static site on GitHub Pages while still having real persistence when I wanted it.

Editing is protected by a password gate — public visitors can view the dashboard but can't mark sessions complete or reset progress without the password. It's a frontend convenience lock, not real auth, and I was intentional about documenting that distinction in the README. Real protection would need Supabase Auth and server-side validation. For a personal taper dashboard shared with a few people, the password gate was the right call.

## Design

The visual language is dark, geometric, and industrial — thin borders, matte panels, neon green-yellow accent states. The kind of interface that looks like it belongs in a control room rather than a wellness app. Glow is used sparingly: active controls, completed days, focus states. The restraint matters — a dashboard you stare at every morning needs to be readable first.

I finished the marathon. The dashboard helped.
