---
title: 'PasiLunch – A Lunch Menu Bot for Slack and the Web'
layout: ../../layouts/BlogPost.astro
pubDate: '2025-03-02'
description: 'Rebuilding my old LunchBot into a small service that fetches local restaurant menus, adds caching, and exposes them through both Slack and a simple web interface.'
author: 'André Vollrath'
image:
  src: '../images/blog/pasilunch.jpg'
  alt: 'Illustration of LunchBot fetching and displaying menus on Slack and a web dashboard.'
tags: ['node.js', 'express', 'cheerio', 'slack', 'bot', 'project', 'workplace', 'web']
teaser: 'A small side project that turned into a daily office tool. <strong class="font-semibold text-dark-text">PasiLunch</strong> fetches restaurant menus, caches them, and makes them available through a <strong class="font-semibold text-dark-text">Slack command</strong> and a simple <strong class="font-semibold text-dark-text">web dashboard</strong>.'
---

# Building PasiLunch – A Lunch Menu Bot for Slack and the Web

## Introduction

A few years ago I built a small Slack bot that fetched lunch menus from restaurants near my office. It worked, but it was basically just a quick script.

Over time I wanted a bit more from it: better performance, caching so it wouldn’t scrape the same pages repeatedly, and a simple web interface so the menus could also be viewed outside Slack.

So I decided to rebuild the project from scratch. The result is **PasiLunch**, a small service that collects local lunch menus and makes them available both in Slack and through a web dashboard.

## Features

- 🏢 **Slack command (`/lunch`)**  
  Fetches the daily menus and posts them directly in Slack.

- 🌐 **Web dashboard**  
  A simple page that displays all available menus in one place.

- ⚡ **Caching**  
  Menus are stored locally so the bot doesn't repeatedly scrape the same sites.

- 🤖 **A bit of personality**  
  The bot posts menus with random humorous messages.

- 🔄 **Keep-alive mechanism**  
  Prevents the bot from going to sleep on free hosting platforms.

## Tech Stack

The project is intentionally simple and lightweight:

- **Node.js** – core runtime
- **Express.js** – serves the web dashboard
- **Cheerio** – parses and scrapes restaurant websites
- **Slack API** – handles the `/lunch` command
- **Axios** – requests external pages and APIs
- **JSON storage** – caches menus locally

## How It Works

### Fetching Menus

Each restaurant has its own small scraper. Some sites expose menus as HTML, some as JSON, and others even as XML.

The scrapers normalize everything into a consistent format so the bot can present the results cleanly.

### Caching

To avoid unnecessary scraping, the bot stores menus together with the current date in a JSON file.

If the same menu is requested again during the day, the cached version is returned instead of scraping the site again. This keeps the responses fast and avoids hitting restaurant websites too often.

### Slack Integration

Inside Slack, users simply type: /lunch

The bot responds with the day’s available menus in a formatted message.

### Web Dashboard

Besides Slack, the project also serves a small web interface where all menus can be viewed at once.

It updates automatically and presents the information in a more visual format than the Slack response.

## Challenges & Learnings

A few things turned out to be more interesting than expected:

**Scraping different sites**  
Each restaurant site had its own structure, so every scraper needed slightly different parsing logic.

**Fragile HTML structures**  
When restaurants update their websites, scrapers can break. Adding error handling and fallbacks helped keep things stable.

**Formatting for Slack**  
Slack's markdown-style formatting has its quirks, so getting the menu output to look clean required a bit of experimentation.

## Try It Out

You can see the project here:

👉 **[LunchBot Web Dashboard](https://lunchbot-btnu.onrender.com/)**

This started as a small side project but quickly became a daily tool in our office. It’s also a fun reminder that simple ideas can turn into genuinely useful tools.

![LunchBot](../../images/blog/pasilunch.jpg)

_The PasiLunch bot collects restaurant menus and makes them easily accessible for the whole team._
