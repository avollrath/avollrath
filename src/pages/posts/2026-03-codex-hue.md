---
title: 'Using a Philips Hue Lamp for Codex Task Notifications'
layout: ../../layouts/BlogPost.astro
pubDate: '2026-03-12'
description: 'A small PowerShell integration that makes my Philips Hue desk lamp flash when a Codex task finishes in VS Code.'
author: 'André Vollrath'
image:
  src: '../images/blog/codex-hue.jpg'
  alt: 'A desk setup with VS Code and a Philips Hue lamp flashing as a status indicator for Codex.'
tags: ['codex', 'vscode', 'philips hue', 'powershell', 'automation', 'smart home', 'developer tools', 'project']
teaser: 'I connected the <strong class="font-semibold text-dark-text">Codex notify hook</strong> in <strong class="font-semibold text-dark-text">VS Code</strong> to a <strong class="font-semibold text-dark-text">Philips Hue</strong> desk lamp with a short PowerShell script.'
---

When I start a longer Codex task, I tend to go and do something else. I did not want to keep checking the VS Code sidebar to see whether it had finished, so I made my desk lamp flash instead.

## What happens

When Codex finishes a turn, its notify hook runs a local PowerShell script. The script talks to the Hue Bridge on my network and makes one lamp flash red three times.

```
Codex finishes a turn
        ↓
Codex notify hook
        ↓
PowerShell script
        ↓
Hue Bridge API
        ↓
Desk lamp flashes
```

<div class="my-8">
  <video autoplay muted loop playsinline preload="metadata" style="width: 320px; max-width: 100%; border-radius: 1rem;">
    <source src="/images/blog/codex-hue.mp4" type="video/mp4">
  </video>
</div>

_The lamp flashing when Codex finishes a task._

## Why I made it

It is unnecessary, but useful. A light in the room is less distracting than another sound, badge, or popup, and it means I can stop watching the progress indicator.

There is no cloud service or custom extension involved. Codex emits an event, PowerShell runs a script, and the Hue Bridge gets a request. Every piece is easy to replace.

## Possible next bits

Codex currently gives me one useful event: `agent-turn-complete`. If more hooks arrive, I could use colours for success and errors, show a busy state, trigger more lamps, or restore the previous light state afterwards.

For now, it tells me one thing clearly: task done.

The script and setup notes are on [GitHub](https://github.com/avollrath/Codex-Hue-Notifier).
