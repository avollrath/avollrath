---
title: 'FlipSite'
seoTitle: 'FlipSite: A Full-Stack Inventory Tracker for Resellers (Supabase & React)'
summary: 'Solve the "spreadsheet drift" problem for resellers. Handles complex bundle math and profit analytics with Supabase and React.'
category: 'Apps'
heroImage: './flipsite.jpg'
heroImageAlt: 'FlipSite inventory and resale tracker'
techStackLogos: ['React.svg', 'TypeScript.svg', 'Tailwind.svg', 'Supabase.svg', 'Vite.svg', 'shadcn.svg', 'GSAP.svg']
order: 3
liveUrl: 'https://flipsite-three.vercel.app/'
mockup: 'laptop'
---

**FlipSite** is a full-stack resale inventory tracker I built because my spreadsheet started lying to me. As a reseller, entering data is the easy part—keeping that data connected to receipts, photos, and complex "bundle math" over months of history is where traditional tools break.

## The Problem: "Spreadsheet Drift"

The challenge wasn't just tracking items; it was maintaining a single source of truth for items that change states. I needed a system that could handle:
- **Bundle Logic**: Buying a camera kit as one unit, but selling the body, lens, and accessories separately while splitting costs accurately.
- **Visual Inventory**: Browsing by photo rather than just name (because an image is worth a thousand SKU numbers).
- **Financial Honesty**: Comparing cumulative profit against pace lines to see if I’m actually making money after fees and hold times.

## The Technical Solution: Supabase and TanStack

FlipSite leverages **Supabase** for robust authentication, Postgres data management, and secure file storage. On the frontend, **TanStack Query** ensures data loading is predictable, while **Recharts** provides the visual feedback needed to track category and platform performance.

The core actions are:

- Add an item with photos, prices, platform, condition, and notes
- Attach receipts or manuals so warranty details are not buried in email
- Mark items as `holding`, `listed`, `sold`, or `keeping`
- Review profit, `ROI`, category performance, platform performance, and hold time
- Compare cumulative profit against a rough pace line

![FlipSite resale inventory tracker - Table view with profit and status columns](/projects/flipsite/inventory-table.png)
![FlipSite resale inventory tracker - Gallery view with item cards and photos](/projects/flipsite/inventory-gallery.png)

## Technical highlights

Bundle math is the part I cared about most. If I buy a camera kit for one price and sell the body, lens, and accessories separately, each child item needs its own sale state while still sharing the original purchase cost correctly. A spreadsheet can fake that until one edit quietly corrupts three months of history.

`Supabase` handles auth, `Postgres`, file storage, and row-level security. `TanStack Query` keeps data loading predictable, and `Recharts` powers the analytics views. The repo also has demo item seeding, screenshot automation, image compression utilities, `CSV` helpers, and tests around import and file handling.

Recent commits moved from application behavior into landing-page polish, QA fixes, screenshot updates, and pricing copy. That usually means the core app already does the thing.

![FlipSite resale inventory tracker - Add item form with pricing and details](/projects/flipsite/add-item-form.png)
![FlipSite resale inventory tracker - Profit chart and analytics dashboard](/projects/flipsite/profit-chart.png)
![FlipSite resale inventory tracker - Category breakdown analytics](/projects/flipsite/category-breakdown.png)
![FlipSite resale inventory tracker - Item detail view with attached receipts and files](/projects/flipsite/item-detail.png)

## Stack

The frontend is `React`, `TypeScript`, `Vite`, and `Tailwind CSS`, with `Supabase` behind the data layer. UI pieces use Radix-style components, `lucide-react`, `sonner`, and some `GSAP` on the landing page.

## Status

FlipSite replaced my spreadsheet, which is the only success metric that matters here. If I rebuilt it, I would move some analytics closer to the database and tighten import/export earlier, but I would keep the scope personal. It works because it is shaped around the way I actually buy, keep, and sell things.

![FlipSite resale inventory tracker - Full dashboard overview](/projects/flipsite/dashboard-overview.png)
![FlipSite resale inventory tracker - Mobile dashboard layout and responsive design](/projects/flipsite/mobile-dashboard.png)
