---
title: 'Sushi-san Website'
summary: 'Restaurant website designed and built around Sushi-san identity.'
category: 'Websites'
heroImage: './sushi.jpg'
heroImageAlt: 'Sushi-san Website'
techStackLogos: ['HTML5.svg', 'CSS 3.svg']
order: 11
---

**Sushi-san** is a sushi restaurant in Helsinki. They had a logo, a colour palette, and no website. I handled both the design and the build.

Restaurant websites have a clear job: tell people what you serve, where you are, when you're open, and make the place look worth visiting. Getting out of the way of those four things is harder than it sounds. The temptation is always to add more — more pages, more animation, more copy. The right answer here was restraint.

## Design to build

Starting from the logo and brand colours, I worked out a visual system — type scale, spacing, section layouts — and built the site directly in **HTML and CSS** without a framework or build tool. For a project of this scope that was the right call. No unnecessary complexity, fast load times, easy to hand off or update, and the constraints of working without abstractions kept the code honest.

The CSS uses custom properties for the brand colours and spacing scale, which made maintaining consistency across the site straightforward even without a component system. The layout is fully responsive with a mobile-first approach — most restaurant website traffic comes from phones, often from someone standing outside deciding whether to walk in.

A project like this is a good reminder that the basics done well are almost always enough.
