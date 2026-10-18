---
title: 'How This Portfolio Is Built with Astro, Tailwind, and GSAP'
layout: ../../layouts/BlogPost.astro
pubDate: '2026-03-10'
description: 'Why I built this portfolio with Astro, Tailwind CSS, and small GSAP interactions instead of a large client-side app.'
author: 'André Vollrath'
image:
  src: '../images/blog/portfolio.jpg'
  alt: 'A screenshot of my frontend developer portfolio homepage built with Astro.'
tags: ['astro', 'portfolio', 'frontend developer', 'personal website', 'web performance', 'ui design', 'static site', 'project']
teaser: 'This portfolio uses <strong class="font-semibold text-dark-text">Astro</strong> for static pages, <strong class="font-semibold text-dark-text">Tailwind CSS</strong> for styling, and <strong class="font-semibold text-dark-text">GSAP</strong> only where movement adds something.'
---

Every developer rebuilds their portfolio eventually. This version needed to show projects, blog posts, renders, and a few personal details without becoming a small web app for no reason.

## Why Astro

Most of this site is content: pages, project write-ups, posts, images, and a few lists. Astro gives me static output, components, good image handling, and the option to add JavaScript only where it is useful.

That is enough for a portfolio. I did not need a large client-side framework or an API for things that can be built ahead of time.

## The homepage

The homepage is a grid of separate cards rather than one long introduction. It has a hero, client logos, latest post, about copy, a render, Spotify, tech stack, links, contact details, and location.

Each card has one job. The grid lets them sit together without forcing everything into the same format. It is more interesting than a hero followed by a stack of generic sections, and it is easier to change one part without rebuilding the page.

## Styling and movement

Tailwind keeps the styling close to the components. The visual system is deliberately simple: rounded cards, light backgrounds, dark blue type, a pink accent, repeated outlined headings, and enough whitespace to let the varied content breathe.

GSAP is for small interactions, not constant motion. It handles entrance animations and a few bits of feedback. The page should still work perfectly when that JavaScript is absent or delayed.

## Dynamic bits

Most content is static. The exceptions are things where changing data is the point: the Spotify list, books, and a few media sections. Those features have fallbacks because none of them should stop the portfolio from loading.

## Keeping it maintainable

I split repeating pieces into Astro components: navigation, footer, cards, project content, blog layouts, marquees, and media sections. That gives the site enough structure without abstracting every line of markup.

Performance is part of the design here. Images are optimised at build time, pages are static, and client-side work stays limited. A portfolio should make the work easy to see, not make visitors wait for it.

## What I would suggest

Start with the content and page structure. Make reusable blocks only after they repeat. Add dynamic features when they earn their cost. Then give the layout a visual system that fits the work instead of copying the current portfolio template trend.

That is what I was trying to do here: make a site that is personal, practical, and not overly serious about itself.
