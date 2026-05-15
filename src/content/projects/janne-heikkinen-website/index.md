---
title: 'Janne Heikkinen Website'
seoTitle: 'Designing and Building a High-Performance Site for a Member of Parliament'
summary: 'Turning a political identity into a usable public website. Built with Gatsby and GraphQL for speed, clarity, and content flexibility.'
category: 'Websites'
heroImage: './janne.jpg'
heroImageAlt: 'Janne Heikkinen Website'
techStackLogos: ['React.svg', 'SASS.svg', 'JavaScript.svg', 'GraphQL.svg', 'Gatsby.svg']
order: 10
liveUrl: 'https://janneheikkinen.fi/'

---

The **Janne Heikkinen Website** was a design and frontend challenge for a Finnish Member of Parliament. Political websites have a narrow, critical job: make a public figure’s positions and identity legible instantly, without turning the experience into "campaign-template" wallpaper.

## The Strategy: Clarity Over Decoration

For this project, my role spanned from initial design direction to final frontend implementation. The goal was to create a visual structure that felt authoritative yet accessible.

The site focused on three pillars:
- **Instant Legibility**: Clearly communicating who Janne is and what he stands for.
- **Content Flexibility**: Ensuring the site could handle shifting political priorities and real-time news updates.
- **Performance**: Using **Gatsby** to ensure static output and lightning-fast page loads, even on mobile devices.

## The Implementation: Design-to-Code Continuity

By handling both the design and the frontend, I was able to ensure that the visual rhythm survived the transition from mockup to production. I used **React** and **GraphQL** to build repeatable, content-driven sections that remained flexible enough to accommodate copy changes and varying image shapes without breaking the layout.

Client sites have a specific kind of friction. Copy changes, images arrive in the wrong shape, and placeholder assumptions usually break. The page rhythm, navigation, responsive behavior, and content sections needed enough flexibility to handle that without redesigning every block.

## Technical highlights

The production stack was `Gatsby`, `React`, `JavaScript`, `Sass`, and `GraphQL`. For a content-driven public site, that made sense at the time:

- Static output for fast page loads
- `React` components for repeatable sections
- `GraphQL` queries for content access
- `Sass` for styling and responsive structure

The external source evidence is partly archival. The older portfolio source references the Janne section, image, animation hooks, and live demo link, while the current portfolio metadata captures the stack. There is not a clean standalone repository with a modern commit history, so this case study is also about a stage of my work: moving from design files into shipped client-facing frontend.

The main implementation tradeoff was keeping the page flexible without overbuilding it. Public political content changes often enough that components need to tolerate imperfect copy and image lengths, but not so often that the site needs application-level complexity.

## Status

If I built the same site now, I would probably use `Astro` and keep the content model simpler unless a CMS requirement demanded more. Still, the project did what it needed to do: turn a political identity into a usable public website, not just a polished mockup.
