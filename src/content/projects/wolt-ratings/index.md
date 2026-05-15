---
title: 'Wolt Ratings'
seoTitle: 'Wolt Ratings: A Privacy-First Chrome Extension for Foodies'
summary: 'Remember what was actually good. A local-first dashboard for rating Wolt orders, adding private notes, and tracking your tastes.'
category: 'Apps'
heroImage: './wolt-ratings.jpg'
heroImageAlt: 'Wolt Ratings order history dashboard'
techStackLogos: ['Python.svg', 'Flask.svg', 'JavaScript.svg']
order: 1
liveUrl: 'https://github.com/avollrath/wolt-ratings'
mockup: 'laptop'
---

**Wolt Ratings** solves a problem that is too specific to buy but too annoying to ignore. Wolt knows what I ordered, but it doesn’t help me remember if a restaurant was actually good, which dish was the standout, or how often I’ve made the same lazy delivery decision.

## The Goal: Ownership of Taste

I built this Chrome extension to turn a buried order history into a meaningful personal dashboard. It’s about more than just data—it’s about having a private space to track your own culinary hits and misses.

Key features include:
- **Venue Search & Filtering**: Quickly finding that one place you liked six months ago.
- **Private Ratings & Notes**: Storing your honest thoughts without them being part of a public review system.
- **Spending Context**: Seeing the reality of your delivery habits in a local-only environment.

## The Strategy: Privacy-First by Design

The workflow is intentionally disconnected from the cloud. The extension pulls order history into **Local Storage**, providing a dashboard that is entirely private. No accounts, no sync, and no tracking—just your food history, kept on your machine.

There are no accounts, no cloud sync, and no tracking. Food history is not deeply sensitive, but it is personal enough that I did not want to turn this into a hosted service.

![Wolt Ratings extension popup for opening the local dashboard](/projects/wolt-ratings/extension.jpg)

## Technical highlights

The important decision was resisting the obvious product shape. A web app with login, backend database, and sync would have been easier to explain but worse for the actual use case.

The project is split between:

- Browser-extension `JavaScript`
- Local browser storage
- A small `Python` and `Flask` side for local data work
- Local-first dashboard views

Recent commits include a performance fix to skip redundant storage writes and badge updates. That is exactly the kind of issue browser extensions run into. Too much background work makes the extension feel sloppy even if the UI looks fine.

![Wolt Ratings venue modal with previous orders and spending context](/projects/wolt-ratings/venue_modal.jpg)

## Stack

The stack is plain `JavaScript` for the extension, `Python` and `Flask` for local support tooling, and browser storage for persistence. There is no large frontend framework because the interaction model does not need one.

## Status

The current version works for reviewing my own order history and remembering which places are worth repeating. If I rebuilt it, I would define the import/update pipeline more rigorously and add better handling for Wolt UI changes. Any extension that depends on another product’s pages is living on borrowed stability.

![Wolt Ratings order dashboard view](/projects/wolt-ratings/dashboard.jpg)
