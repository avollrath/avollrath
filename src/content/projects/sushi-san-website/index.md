---
title: 'Sushi-san Website'
seoTitle: 'Building a Clean, Effective Restaurant Website for Sushi-san'
summary: 'Answering the practical questions first. A minimalist restaurant website built with static HTML and CSS to ensure stability and speed.'
category: 'Websites'
heroImage: './sushi.jpg'
heroImageAlt: 'Sushi-san Website'
techStackLogos: ['HTML5.svg', 'CSS 3.svg']
order: 11

---

**Sushi-san** was one of my first real-world client projects, and it taught me a valuable lesson: restaurant websites should answer practical questions before they try to be clever. Built for a local Helsinki sushi spot, the goal was to take an existing brand identity and translate it into a fast, usable digital presence.

## The Goal: Utility Over Decoration

When someone visits a restaurant site, they usually have a few specific questions: *What do they serve? Where are they? Are they open?* I built Sushi-san to answer these questions with as little friction as possible.

The design focused on:
- **Immediate Information**: Placing the menu and location front and center.
- **Atmospheric Visuals**: Using the brand’s color palette and high-quality imagery to convey the restaurant's vibe.
- **Zero Latency**: By sticking to static HTML and CSS, I ensured the site loaded instantly on any device, avoiding the bloat of unnecessary frameworks.

## The Strategy: Built to Last

For a small business, stability is often more important than "cutting-edge" features. By avoiding complex build systems and external dependencies, I delivered a site that remained maintainable and stable long after the initial launch. It was a exercise in knowing when *not* to use a framework.


For this kind of site, the biggest risk is usually not lack of technical ambition. It is making the page harder to use than the business needs.

## Technical highlights

The external evidence is split across an older personal portfolio archive and the newer design-selection archive. Both reference the Sushi San work as design and development for a restaurant website, and the older source includes:

- The project section
- The project image
- Animation hooks
- The original demo link

There is no modern standalone repository with a clean commit history. That is accurate context: this was early client work, not a current product build.

Technically, restraint was the right decision. No framework, no `CMS`, no build system, and no application architecture. The work was layout, responsive behavior, spacing, image treatment, and translating an existing restaurant identity into a usable page.

That was also the useful lesson. A small business website can be damaged by unnecessary tooling. If the content is stable and the owner mostly needs presence, static `HTML` and `CSS` can be the most maintainable option.

## Status

If I built it now, I would be stricter about semantic sections, image alt text, restaurant structured data, and performance budgets. I would probably use `Astro` so the static output stays simple while the authoring experience improves.

The project still belongs in the portfolio because it marks the point where design stopped being an exercise. A real client had a real need, and the page had to be useful to normal visitors.
