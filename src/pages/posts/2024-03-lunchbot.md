---
title: 'Building LunchBot: A Simple Slack Bot for Lunch Menus'
layout: ../../layouts/BlogPost.astro
pubDate: '2024-03-30'
description: 'A small Node.js project that scrapes restaurant menus and posts them to Slack so our team can quickly see what’s available for lunch.'
author: 'André Vollrath'
image:
  src: '../images/blog/lunchbot.jpg'
  alt: 'Illustration of a lunch table with various dishes, representing LunchBot project.'
tags: ['node.js', 'cheerio', 'slack', 'bot', 'project', 'workplace']
teaser: 'A small side project that scrapes restaurant menus and posts them to Slack. <strong class="font-semibold text-dark-text">LunchBot</strong> was built with <strong class="font-semibold text-dark-text">Node.js</strong>, <strong class="font-semibold text-dark-text">Cheerio</strong>, and the <strong class="font-semibold text-dark-text">Slack API</strong> to make the daily lunch decision a little easier.'
---

Lunch is a surprisingly frequent topic in office Slack channels.

Someone asks where to eat, someone else checks a restaurant website, and a few minutes later the whole discussion starts again the next day.

I thought it would be fun to automate that process.

So I built **LunchBot**, a small Slack bot that fetches lunch menus from nearby restaurants and posts them directly into Slack.

---

## The Idea

The idea was simple:

1. Fetch lunch menus from restaurant websites.
2. Extract the relevant menu information.
3. Post the results into Slack.

Instead of opening multiple websites every day, the whole team could just type a command and instantly see the available options.

---

## Tech Stack

The project is intentionally lightweight and built with just a few tools.

### Node.js

The bot runs on **Node.js**, which makes it easy to handle asynchronous tasks like HTTP requests and scraping.

### Cheerio

To extract menu data from restaurant websites, I used **Cheerio**.

It provides a jQuery-like API for parsing HTML, which makes scraping structured data much easier.

### Slack API

The **Slack API** allows the bot to send messages directly to a Slack channel. Once the menus are collected and formatted, the bot posts them as a message.

---

## How It Works

### Fetching Menus

LunchBot requests the restaurant websites and downloads the HTML content.

Each restaurant page has its own structure, so I wrote small parsing functions that extract the relevant menu items.

### Parsing the Data

Using Cheerio, the bot selects the elements containing the menu text and converts them into a cleaner format.

### Posting to Slack

Once the menu data is prepared, the bot sends a formatted message to Slack so the team can see the options immediately.

---

## Challenges

Even for a small project, a few things turned out to be trickier than expected.

**Different website structures**  
Each restaurant page was structured differently, so the scraper logic had to be adapted for each one.

**Formatting messages for Slack**  
Slack messages have their own formatting rules, so getting the menus to display nicely required a bit of experimentation.

**Handling async requests**  
Fetching multiple websites at once means dealing with asynchronous code. Using `async/await` helped keep things readable.

---

## What I Learned

LunchBot was a great small project for experimenting with:

- web scraping
- Slack integrations
- Node.js automation scripts

More importantly, it turned out to be genuinely useful. Once it was running, it quickly became part of the daily workflow in our office.

---

## What Came Next

Over time I started thinking about improving the project with things like:

- caching menus
- a web interface
- better formatting and error handling

That eventually led to a rebuilt version of the project called **PasiLunch**, which I wrote about in a later post.

---

![LunchBot](../../images/blog/lunchbot.jpg)

_The original LunchBot fetching daily menus and posting them to Slack._
