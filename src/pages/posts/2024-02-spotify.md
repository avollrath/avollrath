---
title: 'Building a Spotify Top Tracks Section for My Website'
pubDate: 2022-08-08
author: 'André Vollrath'
layout: ../../layouts/BlogPost.astro
image:
  src: '../images/blog/spotify.jpg'
  alt: 'Spotify top tracks section displayed on a website'
teaser: 'A small feature for my personal website that fetches my <strong class="font-semibold text-dark-text">Spotify top tracks</strong>, filters them by <strong class="font-semibold text-dark-text">unique artists</strong>, and displays a more visually varied top 10 section.'
description: 'Building a Spotify-powered homepage section that fetches my top tracks, filters duplicate artists, and caches the results for a cleaner visual presentation.'
tags: ['spotify', 'api', 'javascript', 'node.js', 'project', 'web']
showSpotifyComponent: true
---

# Building a Spotify Top Tracks Section for My Website

While working on my personal website, I wanted to add a small dynamic section that reflects something a bit more personal than just projects and tech stacks.

Music felt like a good fit.

So I built a feature that fetches my **most listened-to Spotify tracks from the last six months** and displays them directly on the homepage as a row of album covers.

At first glance the idea is simple, but there was one detail I wanted to handle differently: I didn’t want the section to be filled with multiple tracks from the same artist.

## The Goal

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
