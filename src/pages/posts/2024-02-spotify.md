---
title: 'Making a Spotify Top 10 Less Repetitive'
pubDate: 2022-08-08
author: 'André Vollrath'
layout: ../../layouts/BlogPost.astro
image:
  src: '../images/blog/spotify.jpg'
  alt: 'Spotify top tracks section displayed on a website'
teaser: 'A small <strong class="font-semibold text-dark-text">Node.js</strong> filter that keeps one track per artist in my Spotify Top 10.'
description: 'I fetch my Spotify top tracks, then keep one track per primary artist so the homepage does not show the same album cover five times.'
tags: ['spotify', 'api', 'javascript', 'node.js', 'project', 'web']
showSpotifyComponent: true
---

I wanted a music section on the homepage, but Spotify's raw Top Tracks list often looked silly. Listen to one album too much and the first ten entries can be the same artist with nearly identical covers.

## The small fix

I fetch my top 50 tracks for Spotify's `medium_term` range, then loop through them in order and keep the first track from each primary artist. The loop stops when it has ten tracks.

That still reflects what I have been listening to. It just does not make the page look like I only own one album.

## API and fallback

The data comes from Spotify's Top Tracks endpoint with `time_range=medium_term` and `limit=50`. If Spotify responds with a `401`, the app refreshes its token and retries.

Successful results are written to a local cache. If the API is unavailable later, the site can still show the last good list. This is decorative data, so it should not be able to break the page.

## Why bother

It is a tiny filter, but it makes the component more pleasant to look at and requires no manual updates. I like that it changes with my listening without taking over the homepage.

_The Spotify Top 10 section on my homepage, filtered to avoid repeated artists:_
