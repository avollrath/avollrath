---
title: 'Building a Smarter Spotify Top 10 Component with Unique Artist Logic'
pubDate: 2022-08-08
author: 'André Vollrath'
layout: ../../layouts/BlogPost.astro
image:
  src: '../images/blog/spotify.jpg'
  alt: 'Spotify top tracks section displayed on a website'
teaser: 'Your "Top Tracks" list shouldn’t be a row of duplicate covers. I developed a custom <strong class="font-semibold text-dark-text">Node.js</strong> filtering layer that curates my listening habits into a visually diverse showcase, ensuring every slot in the grid represents a <strong class="font-semibold text-dark-text">unique artist</strong> for a cleaner visual identity.'
description: 'Standard "Top Tracks" lists are often full of duplicate artists from a single album. I wrote a custom Node.js filter that curates my listening habits into a visually diverse showcase, ensuring every slot in the grid represents a unique artist.'
tags: ['spotify', 'api', 'javascript', 'node.js', 'project', 'web']
showSpotifyComponent: true
---

While building my portfolio, I wanted to include a dynamic section that felt more personal than just a list of tech stacks. Music is a huge part of my daily flow, so displaying my most-listened-to tracks felt like a natural choice. However, I didn't just want a raw data dump from the Spotify API; I wanted a **curated visual row** that accurately reflected my musical identity.

The problem with most "now playing" or "top tracks" components is repetition. If I've been looping a single album all week, the top 10 list becomes a row of identical covers. That might be statistically accurate, but it’s visually boring. I wanted to build a component that was smart enough to filter for **unique artists**, ensuring that the resulting display felt as varied as my actual taste.

## The Goal: Curation Over Raw Data

I set out to build a homepage section that felt dynamic and personal without being repetitive. By fetching a larger sample size (my top 50 tracks) and then applying a filtering layer, I was able to generate a "Top 10 Unique Artists" row. This approach preserves the feeling of my current heavy rotation while providing much better visual diversity.

The goal was to create a homepage section that feels:

- personal
- dynamic
- visually clean

Spotify’s API can return your top tracks directly, but if you just take the first 10 results, there’s a good chance several of them come from the same artist. That may be accurate, but it usually doesn’t make for the most interesting layout.

Instead, I decided to fetch a larger list and then filter it down to **10 tracks with unique primary artists**.

That way the section still reflects my listening habits, but the visuals feel more varied.

## How It Works

The feature fetches my **top 50 tracks** from Spotify using the `medium_term` time range, which roughly represents the last six months.

From there, I filter the list so only the first track from each primary artist is kept.

That means the logic is roughly:

1. request the top 50 tracks
2. loop through them in order
3. keep only the first track for each primary artist
4. stop once 10 unique artists have been collected

This gives me a top 10 that feels more balanced and avoids repeated album artwork from the same artist.

## Why Filter by Unique Artists?

If one artist dominates my top tracks, the raw API response can easily produce a section with several near-identical covers in a row.

That may be statistically correct, but visually it feels repetitive.

Filtering by unique artists makes the section:

- more visually diverse
- easier to scan
- more interesting as a homepage element

It also better reflects the broader range of what I’ve been listening to, rather than just the heaviest rotation from one artist.

## API Integration

The data comes from the **Spotify Web API**, specifically the endpoint for a user’s top tracks.

I use the following query settings:

- `time_range=medium_term`
- `limit=50`

The authentication flow includes refreshing the access token when needed. If Spotify returns a `401`, the token is refreshed and the request is retried automatically.

## Caching and Fallbacks

Because this data doesn’t need to be fetched constantly, I also added a simple cache layer.

When the request succeeds, the filtered track list is written to a local cache. If the API request fails later, for example due to a network issue or an unavailable token, the site can fall back to the cached data instead of breaking completely.

That makes the feature more reliable and avoids unnecessary failures for something that is mostly decorative.

## A Small Detail I Like

I like that this section adds a bit of personality without needing any manual updates.

It changes over time, reflects what I’ve actually been listening to, and makes the homepage feel a little more alive. It’s a small feature, but those kinds of details are often the most fun to build.

## Final Thoughts

This was a small project, but a satisfying one.

It combines API integration, token refresh handling, caching, and a tiny bit of custom filtering logic to create something that feels personal and polished.

Sometimes a good feature isn’t about showing as much data as possible, but about shaping the data into something that works better for the experience.

---

_The Spotify Top 10 section on my homepage, built from my top tracks and filtered to avoid repeated artists:_
