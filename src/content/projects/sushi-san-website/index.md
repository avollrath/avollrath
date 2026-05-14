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

## Mobile-first restaurant UX

It also needed to work as a handoff-friendly site. Restaurant owners should not need a complicated deployment pipeline for basic presence on the web. Keeping the stack simple makes small future edits realistic, whether that means changing opening hours, updating a menu link, or replacing a photo.

That practicality was the point of the whole build.

Simple won.

The project also highlights a common website tradeoff: a small site does not need to feel small. Careful spacing, strong imagery, and clear type hierarchy can make a simple HTML/CSS build feel considered. The important part is spending the design effort on the few decisions users actually notice.

The site also needed to communicate taste without burying the practical information. Restaurant branding can easily become image-heavy, but users still need fast answers. I treated photography and brand colour as supporting context around the menu, location, and opening hours rather than as a separate visual showcase.

This was also a good case for restraint on the technical side. A static HTML and CSS site has fewer moving parts, loads quickly, and is easy for a small business to host or update. There is no hydration cost, no dependency chain, and no build process to remember months later. For a compact restaurant website, that simplicity is a feature.

If I revisited it, I would add structured data for local business details, menu sections, and opening hours. That would help search engines understand the restaurant better without changing the visible design. I would also make the menu content easier to update independently so daily or seasonal changes would not require editing layout code.

For a restaurant site, mobile is the primary experience. People are often checking the menu while walking nearby, looking up the address from maps, or deciding whether the place is open right now. That shaped the content priority: name, food, location, opening hours, and contact details need to be easy to reach without hunting through navigation.

I kept the visual design close to the existing identity instead of inventing a new brand system. The logo and colours already gave the site enough character. The work was in turning those pieces into a layout that felt clean, appetizing, and practical. Food images, spacing, and contrast mattered more than decorative effects.

## Design to build

Starting from the logo and brand colours, I worked out a visual system — type scale, spacing, section layouts — and built the site directly in **HTML and CSS** without a framework or build tool. For a project of this scope that was the right call. No unnecessary complexity, fast load times, easy to hand off or update, and the constraints of working without abstractions kept the code honest.

The CSS uses custom properties for the brand colours and spacing scale, which made maintaining consistency across the site straightforward even without a component system. The layout is fully responsive with a mobile-first approach — most restaurant website traffic comes from phones, often from someone standing outside deciding whether to walk in.

A project like this is a good reminder that the basics done well are almost always enough.
