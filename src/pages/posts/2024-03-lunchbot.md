---
title: 'Building a Slack Lunch Bot with Node.js and Cheerio'
layout: ../../layouts/BlogPost.astro
pubDate: '2024-03-30'
description: 'I built a small Node.js bot that collects local lunch menus and posts them in Slack.'
author: 'André Vollrath'
image:
  src: '../images/blog/lunchbot.jpg'
  alt: 'Illustration of a lunch table with various dishes, representing LunchBot project.'
tags: ['node.js', 'cheerio', 'slack', 'bot', 'project', 'workplace']
teaser: 'LunchBot uses <strong class="font-semibold text-dark-text">Node.js</strong> and <strong class="font-semibold text-dark-text">Cheerio</strong> to put nearby lunch menus in Slack.'
---

Lunch came up in Slack every day: someone asked where to eat, someone opened a few restaurant sites, then the same thing happened again tomorrow. LunchBot was my small attempt to stop that.

## One command, all menus

The bot does three things:

1. Fetches local restaurant menus.
2. Pulls out the useful parts.
3. Posts them in Slack.

Slack was the right place for it because that was already where the question was being asked. Nobody needed another app or another tab.

## The boring technical bits

The bot runs on **Node.js**. I used **Cheerio** to parse restaurant HTML and Slack's API to post the result.

Each restaurant needed its own parser because every site had a different structure. Some menus were clean lists; others buried the useful text among weekly notes, prices, and layout markup. `async/await` kept fetching several sources readable, and Slack formatting took a bit of trial and error.

## What it became

The first version was useful because it stayed narrow. It put the answer where people already were.

It also showed the limits of scraping raw text. Different languages, missing prices, and odd site structures made the output uneven. That became [PasiLunch](/posts/2025-03-pasilunch/), where normalising the data became a proper part of the project instead of an afterthought.

![LunchBot Slack command interface - Automating office lunch menu search](../../images/blog/lunchbot.jpg)

_The original LunchBot posting daily menus to Slack._
