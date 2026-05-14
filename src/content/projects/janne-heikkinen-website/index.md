---
title: 'Janne Heikkinen Website'
summary: 'Website design and frontend work for a Finnish member of parliament.'
category: 'Websites'
heroImage: './janne.jpg'
heroImageAlt: 'Janne Heikkinen Website'
techStackLogos: ['React.svg', 'SASS.svg', 'JavaScript.svg', 'GraphQL.svg', 'Gatsby.svg']
order: 10
liveUrl: 'https://janneheikkinen.fi/'

---

This was a real client project — a website for **Janne Heikkinen**, a Finnish member of parliament, built as part of a team of three. My role started as design lead and expanded into frontend development once the prototype was signed off.

## The design work

Political websites have a specific set of constraints: they need to communicate credibility and accessibility at the same time, work for an audience with a wide age range, and present a lot of content — news, positions, contact information, constituency work — without feeling cluttered. I designed the layout and visual system from scratch, making decisions about hierarchy, typography, and colour that could scale across the full site without needing constant one-off fixes.

Getting the prototype approved by the client required presenting design decisions clearly and defending the choices that weren't immediately obvious. That part of the process — translating design reasoning into something a non-designer can evaluate — is a skill I got a lot of practice with on this project.

## Content structure

The result was a site that could grow without losing its structure. That matters for political work because content changes constantly: new articles, public appearances, campaign material, and position updates all need somewhere sensible to live. A design that only works for the launch content would become fragile almost immediately.

That long-term stability was as important as the launch design.

The content also had to remain maintainable after handoff. News posts, campaign updates, and static pages need different templates and different editorial expectations. That meant thinking about the CMS structure while designing the screens: what should be reusable, what should be flexible, and where the layout should protect the editor from accidentally breaking the page.

Performance was part of that trust as well. Political and public-sector adjacent sites cannot assume perfect devices or perfect connections, so the static Gatsby output was useful. Pages loaded quickly, content remained accessible, and the site could handle traffic spikes around announcements without needing complex infrastructure.

The visual tone had to sit between personal and institutional. The site needed enough personality to feel connected to the candidate, but not so much that it distracted from policy, local work, and contact paths. I treated the brand system as a support structure for the content rather than decoration.

Clear typography, predictable section rhythm, and restrained colour usage made the site easier to scan on mobile and desktop. This project was also a good exercise in collaboration: design choices had to survive client feedback, content changes, and implementation constraints.

The hardest part of political website design is not making a hero section look good. It is giving different visitor types a clear path. A voter may want positions and contact details. A journalist may want biography, photos, and current statements. A local supporter may want news and campaign updates. The information architecture had to support all of those without making the homepage feel like a directory.

I kept the structure conventional on purpose: recognizable navigation, clear content sections, and strong contrast between current updates and evergreen information. That is not the place for clever interaction patterns. A public-facing political site needs to feel trustworthy, fast, and easy to understand on the first visit.

## The frontend work

The site is built on **Gatsby** with content managed through a **GraphQL** layer, which at the time was a common stack for static sites with a CMS backend. I joined the development phase after the prototype was complete and worked on implementing the designs in **React** and **SASS**, keeping the frontend aligned with what had been designed rather than letting implementation drift produce a different result.

The live site is still running and active.
