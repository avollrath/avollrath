---
title: 'Codex Hue Notifier – Turning My Desk Lamp into an AI Status Light'
layout: ../../layouts/BlogPost.astro
pubDate: '2026-03-12'
description: 'A tiny automation that connects Codex in VS Code with a Philips Hue lamp so my desk light flashes whenever Codex finishes a task.'
author: 'André Vollrath'
image:
  src: '../images/blog/codex-hue.jpg'
  alt: 'A desk setup with VS Code and a Philips Hue lamp flashing as a status indicator for Codex.'
tags:
  [
    'codex',
    'vscode',
    'philips hue',
    'powershell',
    'automation',
    'smart home',
    'developer tools',
    'project'
  ]
teaser: 'While working with <strong class="font-semibold text-dark-text">Codex</strong> in VS Code I often start a task and then look away from the screen. So I connected the Codex <strong class="font-semibold text-dark-text">notify hook</strong> to a <strong class="font-semibold text-dark-text">Philips Hue lamp</strong> and turned it into a tiny AI status light that flashes whenever Codex finishes.'
---

# Turning My Desk Lamp into a Codex Status Light

Sometimes the most satisfying projects are the tiny ones.

While working with the Codex extension in VS Code, I noticed that I often start a task and then immediately look away from the screen. Maybe I'm reading something else, maybe I'm grabbing coffee, maybe I'm just waiting.

I wanted a simple signal that tells me when Codex is done.

Since I already had Philips Hue lights on my desk, the solution was obvious: when Codex finishes a task, my desk lamp should flash.

No notifications.  
No extra apps.  
Just a small physical signal in the room.

<div class="my-8">
  <video
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    style="width: 320px; max-width: 100%; border-radius: 1rem;">
    <source src="/images/blog/codex-hue.mp4" type="video/mp4">
  </video>
</div>

_My Philips Hue desk lamp flashing when Codex finishes a task._

---

## What happens

The idea is very simple.

When Codex finishes a turn in the VS Code sidebar, it triggers a small local script. That script talks to the Philips Hue Bridge on my network and tells one of my desk lamps to flash red three times.

The whole flow looks like this:

```
Codex finishes a turn
        ↓
Codex notify hook
        ↓
Local script
        ↓
Hue Bridge API
        ↓
Desk lamp flashes
```

It’s a tiny bit of automation, but surprisingly satisfying in practice.

---

## Why I like this project

This project is obviously unnecessary in the best possible way.

But it combines a few things I really enjoy working with:

- developer tooling
- local automation
- small scripting projects
- smart home hardware
- making the workspace feel more interactive

And it shows how small integrations can make everyday tools feel a bit more personal.

There’s no cloud service involved, no custom extension, and no complicated infrastructure. Just a simple script reacting to a tool I already use.

---

## Possible upgrades

Right now Codex only exposes a single notification event (`agent-turn-complete`).  
That means the lamp can currently react only when a turn finishes.

If additional event hooks become available in the future, this could become much more expressive. For example:

- green flashes for successful completions
- red flashes for errors
- a different color while Codex is thinking
- triggering multiple lamps at once
- restoring the previous lamp state after flashing

For now though, the simple version already does exactly what I wanted.

Codex finishes a task, and my desk lamp tells me.

---

## Repository

The full implementation, including the script and setup instructions, is available on GitHub:

👉 **[View the Codex Hue Notifier on GitHub](https://github.com/avollrath/Codex-Hue-Notifier)**

---

## Final result

A tiny script and one configuration line were enough to turn Codex into something that doesn’t just work on screen, but also reacts in the room around me.

Probably unnecessary.

But also very satisfying.
