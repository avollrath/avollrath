---
title: 'Marathon Control Center'
seoTitle: 'Marathon Training Tracker: Building a Taper Dashboard with React'
summary: 'Stop the pre-race panic. A narrow, personal control panel for the final weeks of marathon training, built with React and Supabase.'
category: 'Apps'
heroImage: './marathon.jpg'
heroImageAlt: 'Marathon Control Center marathon training dashboard'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Supabase.svg', 'Vite.svg']
order: 5
liveUrl: 'https://avollrath.github.io/marathon/'
mockup: 'laptop'
---

**Marathon Control Center** was a "panic build" completed just three weeks before my first marathon. As race day approached, I realized my training history was scattered across too many apps, and I lacked a clear, honest view of my taper block. I didn’t need a generic fitness tracker; I needed a narrow control panel for the final stretch.

## The Goal: Honesty Over Motivation

The app focuses exclusively on the high-stakes weeks leading up to the race. It’s designed to answer the questions that keep a runner up at night during the taper:
- **Am I following the plan?** Tracking planned vs. actual kilometers.
- **Is the gear ready?** Logged shoe tests and equipment checks.
- **Am I overdoing it?** Monitoring recovery state and cross-training (gym/rowing).

## The Build: Speed and Utility

Built with **React**, **Tailwind CSS**, and **Supabase**, the primary design constraint was speed of use. I needed to log data quickly and see the taper state immediately without fighting a complex UI. It’s a tool shaped by a concrete, high-pressure situation, designed for utility over scale.

The useful part is seeing whether the remaining work is realistic. If every metric is visible, none of them matter, so the app stays focused on the questions I actually needed answered:

- Am I following the taper plan?
- Am I overdoing it?
- Are the shoes working?
- Is the actual mileage close enough to the plan?

## Technical highlights

The stack is `React`, `TypeScript`, `Vite`, `Tailwind CSS`, `lucide-react`, and optional `Supabase` sync. The `.env.example` points to Supabase, but the app is still shaped like a personal tool rather than a SaaS product.

Sync is useful, but it is not the core idea. The primary design constraint was speed of use: add or adjust training data quickly, see the taper state immediately, and keep backups available so the tool does not become another fragile database hobby.

The git log is very much a live-use log:

- Plan updates
- Preview changes
- Grid and stats layout fixes
- Adjustments as race day got closer

That is the right kind of history for this project. It was adjusted while the real event was approaching.

## Status

If I rebuilt it, I would separate reusable fitness primitives from marathon-specific copy and maybe add a cleaner export format. I would keep the narrowness, though. The useful part was that it matched one concrete situation exactly.
