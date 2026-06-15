# Keystone Builders — Claude Code Project Memory

## Business Context
Keystone Builders is a premium residential and commercial contractor 
serving [Metro Area]. Demo site built by Alectronic Solutions to showcase 
what a $5K-$8K contractor web presence looks like.

## Design System
- Primary: #1C2B3A (slate charcoal)
- Accent: #C9A96E (warm stone gold)
- Background: #F5F1EB (off-white linen)
- Danger/highlight: #8B3A2A (deep rust, sparingly)
- Text: #1A1A1A primary, #5A5A5A secondary

## Typography
- Display: Playfair Display (600, 700) — headings only
- Body: Inter (400, 500, 600) — all UI text
- Load via next/font/google

## Tech Stack
- Next.js 14, TypeScript, App Router
- Tailwind CSS with custom tokens in tailwind.config.ts
- Framer Motion for animations
- Static export (output: 'export') — Cloudflare Pages
- FormSubmit for all forms (no backend)
- next/image for ALL images

## Animation Rules
- Page entry: stagger fade-up (y: 30 → 0, opacity 0 → 1, 0.6s)
- Scroll reveals: whileInView, once: true, threshold 0.15
- Hover: scale(1.02), 250ms ease
- NO infinite loops, NO auto-playing carousels

## Quality Gates (check before every section)
- [ ] Mobile-first (375px base, then md/lg breakpoints)
- [ ] No placeholder divs — use real next/image
- [ ] No lorem ipsum
- [ ] Tailwind tokens only (no hardcoded hex in JSX)
- [ ] Each section has ONE job, stated in a comment at top of file

## Strict Rules
- No em dashes anywhere in copy or code comments
- No overline pill labels above section headings (AI tell)
- No stock-photo hero — use a construction site image or video
- License number displayed in trust bar and footer
- FormSubmit action URL: https://formsubmit.co/YOUR_EMAIL