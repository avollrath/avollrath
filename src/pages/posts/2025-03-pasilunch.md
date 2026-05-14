---
title: 'PasiLunch – AI-Normalized Lunch Menus for Slack and the Web'
layout: ../../layouts/BlogPost.astro
pubDate: '2025-03-02'
description: 'A lunch menu service for Pasila that scrapes local restaurant menus, translates and normalizes them with Gemini, caches the result once per day, and serves it through both Slack and a web dashboard.'
author: 'André Vollrath'
image:
  src: '../images/blog/pasilunch.jpg'
  alt: 'Illustration of PasiLunch fetching and displaying restaurant menus in Slack and on a web dashboard.'
tags: ['node.js', 'express', 'slack', 'gemini', 'web scraping', 'seo', 'automation', 'project']
teaser: 'What started as a small Slack lunch bot turned into a smarter daily service. <strong class="font-semibold text-dark-text">PasiLunch</strong> scrapes restaurant menus in Pasila, translates and normalizes them with <strong class="font-semibold text-dark-text">Gemini</strong>, caches the result once per day, and serves it through both a <strong class="font-semibold text-dark-text">Slack command</strong> and a clean <strong class="font-semibold text-dark-text">web dashboard</strong>.'
---

## Introduction

A few years ago I built a small Slack bot that fetched lunch menus from restaurants near my office. It worked, but it was basically just a quick script.

Over time I wanted more from it. I wanted the menus to load faster, I wanted a simple web interface outside Slack, and I wanted a cleaner and more consistent result across restaurants whose menu formats were all over the place.

So I rebuilt the project into **PasiLunch**, a small service that collects lunch menus from restaurants in Pasila, normalizes and translates them into consistent English with **Gemini**, and makes them available both in Slack and through a web dashboard.

## Features

- 🏢 **Slack command (`/lunch`)**  
  Fetches the day’s menus and posts them directly into Slack in a readable, unified format.

- 🌐 **Web dashboard**  
  Displays all available lunch menus in one place with a more visual presentation than Slack.

- 🤖 **AI normalization and translation**  
  Restaurant menus come in wildly different formats and often in Finnish. Gemini translates, cleans, and restructures them into one consistent JSON format.

- ⚡ **Daily caching**  
  Menus are scraped and normalized only once per day, which keeps the app fast and avoids unnecessary requests to restaurant websites and the LLM API.

- 🧩 **Multi-source scraping**  
  Different restaurants expose their menus in HTML, JSON, or custom formats, so each source needs its own scraper logic.

- 🔄 **Lazy refresh architecture**  
  The app is deployed on free hosting, so it regenerates data only when needed and safely reuses the cached output for the rest of the day.

- 📈 **SEO improvements**  
  The web dashboard includes proper metadata, sitemap, robots.txt, and structured data so the site can be indexed more effectively.

## Tech Stack

The project stays intentionally lightweight, but the pipeline is more sophisticated than the UI suggests:

- **Node.js** for the backend runtime
- **Express.js** for the web server and dashboard rendering
- **Cheerio** for parsing HTML menus
- **Slack API** for the `/lunch` command
- **Gemini API** for menu translation and normalization
- **JSON files** for menu caching and normalized output
- **Render** for deployment

## How It Works

### Scraping menus from different sources

Each restaurant has its own scraper. Some menus are available as simple HTML, some come from JSON endpoints, and some need custom parsing.

The raw menu data is first cached locally per restaurant.

### Normalizing menus with Gemini

The biggest challenge was that every restaurant formats its menu differently. Some include prices inline, some add extra fluff, some use inconsistent structure, and many menus are only available in Finnish.

To solve that, I added a normalization step using **Gemini**. The model takes the raw menu data and transforms it into a consistent structured JSON format that preserves things like:

- translated dish names
- prices
- notes
- dietary markers
- item descriptions

That normalized output is then used as the single source of truth for both Slack and the website.

### Daily caching and refresh logic

To avoid unnecessary scraping and LLM calls, the menus are generated only once per day.

If the cached normalized menu for the current day already exists, the app simply serves it. If not, it fetches fresh source data, runs the normalization step, and writes a new daily cache.

This keeps the project cheap to run and makes it work well even on a free Render instance.

### Slack integration

Inside Slack, users simply type `/lunch`.

The bot responds with a clean, readable version of the current lunch menus, using the same normalized data that powers the website.

### Web dashboard

The web dashboard reads from the normalized daily JSON and renders the menus server-side into a simple template.

That means the page stays lightweight, fast, and crawlable by search engines while still showing structured, translated menu content.

## Challenges & Learnings

A few parts of the rebuild turned out to be more interesting than expected.

**Scraping fragile restaurant websites**  
Every restaurant has its own structure, and small website updates can break scrapers. Good error handling and fallbacks became essential.

**Using AI for structured cleanup, not just translation**  
The most valuable part of the Gemini integration was not just translating Finnish to English, but unifying inconsistent menu formats into one predictable structure.

**Preserving the important details**  
Prices, dietary tags, and buffet notes are easy to lose when normalizing messy source text. Getting those details preserved consistently required both prompt tuning and post-processing safeguards.

**Deploying on free infrastructure**  
Because Render free instances can spin down and use ephemeral storage, the app needed a lazy daily refresh strategy rather than assuming files would always be there.

**Keeping the UI simple**  
Even though the backend became more sophisticated, I wanted the final experience to stay lightweight and straightforward.

## Try It Out

You can see the project here:

👉 **[PasiLunch Web Dashboard](https://lunchbot-btnu.onrender.com/)**

What started as a tiny office utility turned into a fun exercise in scraping, normalization, caching, deployment constraints, and practical AI integration.

It is still a small project, but it now feels much closer to a real product than a quick script.

![LunchBot](../../images/blog/pasilunch.jpg)

_The PasiLunch dashboard aggregates, translates, and normalizes daily lunch menus for restaurants in Pasila._
