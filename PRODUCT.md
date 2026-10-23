# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitors to Joona Ansamaa's personal portfolio: mainly people judging him as an engineer (recruiters, hiring managers, developers reviewing a candidate), plus peers who follow a link from GitHub or LinkedIn. They usually arrive from a link, scan quickly, look at shipped work, and then decide whether to get in touch. (Inferred from the portfolio framing; the user described the site only as "my personal portfolio site".)

## Product Purpose

trapland.fi is Joona's personal portfolio: one place that shows who he is and where he has worked, shows off his frontend craft through the site itself, and makes contacting him easy. It works when a visitor leaves impressed by the craft, understanding his level and focus, and knowing how to reach him.

## Positioning

Full-stack software engineer with a frontend focus, based in Finland. Self-taught through games, then vocational school, then a Qt Group traineeship and a promotion to Software Engineer. He owned a project's whole frontend architecture as a trainee. His side projects (FACEIT Finder, Image Pixelator) are real, deployed tools with public repositories, but they are left off the site for now at his request.

## Operating Context

- Single-page site at https://trapland.fi, deployed on Vercel. Vercel rewrites `/imagepixelator` to a separate app, so the root site must not claim that path.
- FACEIT Finder lives at faceitfinder.trapland.fi.
- Visitors arrive on desktop (recruiters at work) and on mobile (links opened from LinkedIn).

## Capabilities and Constraints

- Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, framer-motion, lucide-react, @vercel/analytics. pnpm.
- Content: about, experience (3 roles), contact (email, GitHub, LinkedIn). Projects are removed for now (user request, 2026-10-23); keep them out until he asks for them back.
- English only.
- "trapland" is just the domain name, not a brand or persona. The identity is Joona Ansamaa.

## Brand Commitments

- Name: Joona Ansamaa. Title: Software Engineer (full-stack, frontend focus).
- Voice: direct and modest, first person, no hype. Existing copy ("I care about the details: clean code, good performance, and interfaces that actually feel good to use.") is his own words.

## Evidence on Hand

- `public/headshot.jpg` colour portrait (supplied 2026-10-23, edges feathered to black).
- Project screenshots (currently unused): `public/project-faceitfinder.png`, `public/project-imagepixelator.png`, `public/project-traplandfi.png`.
- Experience: Qt Group Software Engineer (May 2025 to Mar 2026), Qt Group Software Engineer Trainee (Feb 2024 to May 2025), Netproce Oy Intern (Feb to Apr 2022).
- No testimonials, metrics, client logos, or a résumé PDF exist. Do not invent them.

## Product Principles

1. The site is the proof. Its own craft is the main point ("the main point of the site is to show off"), backed by real roles rather than self-description.
2. Every visitor should reach a contact route within one scroll or one tap.
3. The site is itself a frontend sample, so its craft, performance, and accessibility are part of the pitch.
4. Say it plainly. Only factual claims, no inflated titles or metrics.

## Accessibility & Inclusion

WCAG 2.2 AA as the baseline. Respect reduced motion. Full keyboard navigation.
