---
title: 'FlipSite'
seoTitle: 'FlipSite Resale Inventory Tracker with Supabase Auth'
summary: 'FlipSite is a resale inventory tracker with bundle profit math, file storage, analytics dashboards, custom themes, and Supabase-backed auth.'
category: 'Apps'
heroImage: './flipsite.jpg'
heroImageAlt: 'FlipSite inventory and resale tracker'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Supabase.svg', 'Vite.svg', 'shadcn.svg', 'GSAP.svg']
order: 3
liveUrl: 'https://flipsite-three.vercel.app/'
mockup: 'laptop'
---

A **resale inventory tracker** should answer one question cleanly: am I making money, or just moving objects around? FlipSite replaces the spreadsheet I was using for second-hand buying, selling, and keeping, because bundle math, receipts, photos, fees, and platform notes kept drifting apart.

The app is a React and TypeScript dashboard built with Vite, Tailwind, Supabase, TanStack Query, Recharts, shadcn-style components, and GSAP on the landing page. Supabase handles auth, Postgres, file storage, and row-level security. The data model supports normal inventory items, keeper items, attached files, buy/sell platforms, item status, and bundles where a single purchase can be split into multiple resale outcomes without corrupting profit or ROI.

The core workflow is practical: add an item with photos and receipts, mark it as holding, listed, sold, or keeping, review sortable table and gallery views, then use analytics to compare profit by period, category, platform, hold time, and cumulative pace. Recent commits added pricing/landing work, refreshed screenshots, and improved the portfolio README, which matches the current state: a personal tool that became polished enough to use daily.

![FlipSite dashboard hero](/projects/flipsite/dashboard-hero.png)
![FlipSite inventory table](/projects/flipsite/inventory-table.png)
![FlipSite add item form](/projects/flipsite/add-item-form.png)
![FlipSite profit chart](/projects/flipsite/profit-chart.png)
![FlipSite category breakdown analytics](/projects/flipsite/category-breakdown.png)
![FlipSite dashboard overview](/projects/flipsite/dashboard-overview.png)
![FlipSite inventory gallery](/projects/flipsite/inventory-gallery.png)
![FlipSite item detail view](/projects/flipsite/item-detail.png)
![FlipSite mobile dashboard](/projects/flipsite/mobile-dashboard.png)
