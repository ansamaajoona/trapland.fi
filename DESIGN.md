---
name: trapland.fi
description: Joona Ansamaa's portfolio as a grown-up demoscene title screen. Void, drifting dust, one apricot signal, and a name built live from particles.
colors:
  void: "#000000"
  dust: "#4a4a4a"
  frost: "#8a8a86"
  haze: "#b9b6ac"
  ivory: "#e6e2d6"
  signal: "#ffd594"
typography:
  display-mega:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 0.2rem + 8.8vw, 8.75rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  display-odometer:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(6rem, 2rem + 7vw, 10.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  stack:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 0.5rem + 6.4vw, 7rem)"
    fontWeight: 760
    lineHeight: 1.02
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 92"
  display-year:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 2.6vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 0.85
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  display-close:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 0.4rem + 4.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  statement:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1rem + 2.2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
  role:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "Departure Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  shell-x-sm: "20px"
  shell-x-md: "40px"
  shell-x-lg: "56px"
  shell-max: "1440px"
  leader-gap: "20px"
  section-end: "128px"
  section-end-lg: "144px"
  queue-gap: "80px"
  queue-gap-lg: "96px"
components:
  link-primary:
    textColor: "{colors.signal}"
    typography: "{typography.lead}"
  link-primary-hover:
    textColor: "{colors.signal}"
  link:
    textColor: "{colors.ivory}"
    typography: "{typography.small}"
  link-hover:
    textColor: "{colors.signal}"
  nav-link:
    textColor: "{colors.haze}"
    typography: "{typography.small}"
  nav-link-active:
    textColor: "{colors.signal}"
  label:
    textColor: "{colors.frost}"
    typography: "{typography.label}"
  copy-button:
    textColor: "{colors.haze}"
    typography: "{typography.small}"
  drift-toggle:
    textColor: "{colors.frost}"
    typography: "{typography.label}"
---

# Design System: trapland.fi

## Overview

**Creative North Star: "The Title Screen, Grown Up"**

A demoscene title screen rebuilt with modern type. The page is a black void with ribbons of dust drifting slowly behind it, one apricot signal, and a single extraordinary moment: the name, set enormous in expanded black Archivo and rendered by thousands of particles that fly in from the drift, lock into the letterforms, scatter under the cursor like wind and dissolve back into the dust on scroll. Everything else is quiet, sharp and heavy: no cards, no pills, no borders, no glow.

Density is low and the page is long. Each section opens with a dotted dust leader that runs off the right edge of the screen, then lets one voice speak: the route as a pinned, scroll-scrubbed timeline, the stack as a wall of live variable type, the about as a portrait and a statement, the close as the email address set in display type.

Motion has one grammar. Particles and rear dust move; reading text never moves. Reduced motion (or the footer's Drift toggle) gives a still, fully formed name, still stack letters, instant route transitions and a still aurora.

**Key Characteristics:**
- Pure black void (#000) as the only surface; depth is ink, not material.
- Two Archivo voices on one family: expanded black uppercase for display, normal width for reading.
- Departure Mono survives only as 11px uppercase labels.
- Apricot signal marks what is live: primary action, hover, current section, focus.
- Square everything: no radius anywhere.
- Particles carry the spectacle; text stays still.

## Colors

A near-monochrome warm-grey ramp on pure black, with a single apricot that behaves like a terminal cursor.

### Primary
- **Signal Apricot** (signal): the live mark. The primary "Email me" action, link and nav hover, the current nav section, the active role's bar on the route track, the header's block mark, a few percent of the dust grains, `::selection` and the 2px focus ring.

### Neutral
- **Void** (void): the page, the only surface. Also the ground behind the portrait, whose black backdrop is crushed to true black and blended (lighten) so the photo floats in the dust.
- **Ivory** (ivory): front-plane ink. The name, headings, the statement, link text, the close email, definition values.
- **Haze** (haze): reading ink. Body copy, the strap, the about paragraph, nav links at rest.
- **Frost** (frost): third-plane ink. Labels and the meta line of the newest roles.
- **Dust** (dust): matter, not ink. The dotted leader, link underlines, the scrollbar thumb.

### Named Rules
**The One Signal Rule.** Apricot marks the live thing and nothing else: something you can act on, the thing under your pointer or focus, or the cursor. It is never a section color, a background wash or a decorative fill beyond the small block marks.

**The Ink Plane Rule.** Text color is a depth step: ivory (front), haze (reading), frost (meta). Pick a plane, never a new grey.

## Typography

**Display Font:** Archivo variable (with ui-sans-serif, system-ui), weight 900, width axis 125, uppercase
**Body Font:** Archivo variable at normal width (wdth 100)
**Label/Mono Font:** Departure Mono (with ui-monospace), labels only

**Character:** One grotesque in two widths. Expanded black reads like a title-screen logo; normal width reads like a plain, direct résumé. The pixel face is a trace of the scene, kept small.

### Hierarchy
- **Mega** (900, wdth 125, uppercase, 0.84): the name only. On phones (below 40rem) it drops to normal width at min(15.5vw, 5.5rem) so ANSAMAA fills the screen.
- **Stack** (uppercase, 1.02, clamp 2rem to 7rem): each letter's wdth (62 to 125) and wght (300 to 900) is driven live by a scroll scanline and cursor proximity, colour mixing from dust toward ivory; at rest 92 / 760.
- **Year** (900, wdth 125, uppercase, 0.85): the route's start years, sticky on desktop.
- **Close** (800, wdth 125, 1, lowercase as written): the email address at the end of the page.
- **Statement** (600, 1.15): the single about statement in ivory.
- **Role** (700, 1.1): role titles in the route.
- **Lead** (400, 1.55): the contact paragraph, the strap from sm up, the primary link (600).
- **Body** (400, 1.7): reading copy, held to 40 to 60ch.
- **Small** (500, 1.55): nav, links, company and dates, stack lists, definition values.
- **Label** (Departure Mono 400, 11px, 0.14em, uppercase, frost): the header wordmark, definition terms, footer, Drift toggle, skip link.

### Named Rules
**The Two Widths Rule.** Expanded black is for display only (name, years, close). Reading text is always normal width. Never set paragraphs, buttons or nav in the expanded cut.

**The Labels-Only Mono Rule.** Departure Mono appears only at the label size, uppercase and tracked. It never sets headings, body or display.

## Layout

One centered shell (max 90rem) with side padding of 20px, 40px from sm and 56px from lg. Desktop uses a 12-column grid with 32px gutters; content sits in asymmetric spans (5 + 6 for the route, 4 + 7 for the about, 7 + 5 for the hero foot). On mobile everything stacks in one column.

The hero is full viewport height on desktop: header row, the name filling the middle, then strap, actions and the live Oulu block grouped right below it. Sections end with large bottom space (112 to 160px) and each begins with a dust leader followed by 56px (80px from sm) of air. On desktop the route pins for one viewport plus 75svh per role while a playhead travels its track; on phones it is a stacked list. The stack wall alternates left and right aligned lines across the full shell.

**The Runs-Off Rule.** Leaders extend past the right edge of the viewport; the shell holds the reading text, the world is wider than the shell.

## Elevation & Depth

No shadows anywhere. Depth is conveyed by ink plane and by the dust field. Every background grain has a depth z (0 far, 1 near) that sets its size (0.6 to 3.2px, round), its brightness (five steps from #2a2a29 to #a7a49a), its drift speed (near grains drift faster), and how far it shifts with the cursor (up to 26px) and with the scroll. About 78% of grains gather in three soft-edged ribbons whose shape slowly bends over time; the rest float loose; about 3.5% are apricot. Near motes twinkle gently. Behind the grains sits a fixed atmosphere: a faint ivory haze from the top left, an even fainter apricot haze from the bottom right, and a vignette darkening the edges. The reading plane sits above it all and never moves.

In the route, time is drawn to scale: each role is a bar on a 2022 to 2026 track whose length is its real duration, and the active role's bar is apricot while the others sit at 35% haze.

**The Still Reading Plane Rule.** Anything you read stays put. Only particles, dust, the stack letters' axes, the route playhead and the rolling year move.

## Shapes

Square and flat. No border radius, no borders, no containers. The only recurring geometry is the small apricot block after the wordmark. Dust is round grains, sampled from the letterforms at a gap scaled to the type size, with edge grains held tight so the outlines stay sharp.

## Components

### Buttons
There are no filled buttons. Actions are typographic, like the rest of the page.
- **Primary link:** "Email me" in apricot, Archivo semibold at lead size, a faint apricot underline and a right arrow. Used once, in the hero.
- **Hover / Focus:** the underline goes full apricot and the arrow nudges right (200ms); focus is the global 2px apricot outline at 4px offset.
- **Text buttons:** Copy address (small, semibold, haze, dust underline, apricot on hover, announces "Copied to clipboard" politely) and the Drift toggle (label voice, state word in apricot when on, ivory when off).

### Links
- **Style:** ivory text with a 1px dust underline at 0.3em offset; external links carry a 0.95em arrow-up-right SVG.
- **Hover:** text and underline turn apricot (160ms, expo-out); the arrow nudges up-right by 0.15em.

### Navigation
Three text links (Route, About, Contact) at small size, top right of the hero. Haze at rest, apricot on hover and for the current section (tracked by scroll, exposed via `aria-current`). No bar, no background, no mobile menu; the row simply tightens its gap.

### Signed Name (signature)
The h1 is the big expanded-black ivory name. On load it stretches in: each letter starts thin and condensed (wdth 62, wght 300) below its line's baseline, clipped there, and rises and widens into the expanded black cut over 1s (expo-out), 45ms apart left to right, the second line 180ms behind the first; on phones the letters land at normal width. The strap, the actions and the Oulu block follow at 850ms, fading up 0.75rem 80ms apart, the only entrance the reading text gets. At 1.15s "Joona Ansamaa" is signed by hand in Mrs Saint Delafield at its resting place, hanging off the baseline of ANSAMAA at the lower right, like a signed print. The pen is a soft-edged mask whose edge leans 28° with the script, so it runs along the downstrokes. It moves at a writing pace over about 1.6s: slower through capitals, a 150ms lift between the words, and quicker through the flourishes either side. A narrow ivory band trails just behind the nib, fresh ink that dries to apricot. The script stays one run of text, so its joins never break. A 7px black stroke behind the script cuts it cleanly out of the type where they cross. Under the pointer or keyboard focus the ink glistens toward ivory (160ms), as if still wet; clicking the signature fades it out (160ms) and signs it again. Reduced motion shows the final state immediately; without JavaScript the name appears after 3s via a CSS fallback. The signature is set in a script typeface, not Joona's real signature; an SVG of the real one can replace the text later.

### Route Timeline (signature)
Large screens pin the section and scrub it with scroll, one chapter per role, oldest first. Left: the start year in expanded black as an odometer (each digit a rolling strip, 900ms expo-out) with a label 'Role n of 3 · scroll to travel'. Right: the active role's title, company link, dates, description and stack, cross-fading (450ms) as the chapter changes. Below: the track, with year ticks, a dust baseline, role bars to scale and an ivory playhead that eases between role midpoints. Phones get a stacked list, newest first, each role with its own 5px slice of the track.

### Stack Wall (signature)
"Works with" over six huge uppercase words, one per line, alternating left and right. Every letter is a live variable-font glyph, and a scanline across the middle of the viewport drives them as the wall scrolls past: a word swells from a condensed, lighter rest (wdth about 80, wght about 470, 46% ivory) to expanded black ivory as it crosses the middle of the screen, starting at the edge it is aligned to and running across the word, then thins again from that same edge as it leaves. Letters ease toward their target each frame, so stepped wheel scrolling still reads smooth. On desktop the cursor swells the letters near it on top of the scanline. Each row's peak is capped to what fits its line, so long words like TAILWIND CSS never overflow a phone. Only runs while in view (starting a quarter-screen early so letters are already at rest when seen); reduced motion and Drift off set it still at 92 / 760.

### Leader
A 2px row of 1px dust dots on an 8px pitch that follows any content and runs off the right edge. It opens each section after the hero.

### Personal, live touches
The page is tied to Oulu, where Joona lives, and the copy is casual and lightly funny (facts unchanged, jokes clearly jokes).
- **Oulu now (hero):** label 'Oulu, Finland', live local time, temperature and condition ('05:47 · −3°C · Snow'), a mood line for the hour in frost, and today's sun times ('Sun 08:36–17:27'), plus 'Aurora possible (Kp n)' when it is.
- **Oulu sky (background):** one fetch per load from Open-Meteo (time of day, temperature, cloud, sunrise and sunset, wind, weather code) and NOAA's planetary K index. The look is always daylight: a cool lifted sky from the top and a soft sun glow at the top right, with the dust receded to half strength. On top of that, sub-zero temperatures tint the haze icy and warm days warm, fog adds a grey veil, and heavy cloud mutes the dust. The dust drifts with the live wind and falls as snow or rain when it does there. When it is dark, Kp is at least about 3 and the sky is not overcast, faint green aurora curtains ripple across the top of the page. The footer states the live conditions. `?sky=snow|rain|fog|aurora` previews a state.
- **Scroll gusts:** fast scrolling blows the dust, decaying back to calm.

## Do's and Don'ts

### Do:
- **Do** keep pure black as the only surface and express hierarchy through the ink planes (ivory, haze, frost).
- **Do** reserve apricot for the single primary action, hover, current state, focus, selection and the small block marks.
- **Do** set display in Archivo 900 at wdth 125, uppercase, -0.01em, and everything readable at normal width.
- **Do** use Departure Mono only at 11px, uppercase, 0.14em tracking.
- **Do** open sections with the dust leader and let it run off the screen edge.
- **Do** move particles and dust, never reading text; honor reduced motion and the Drift toggle with a still, complete state.
- **Do** keep every corner square.

### Don't:
- **Don't** add cards, pills, borders, panels or glow; the void has no containers.
- **Don't** add box shadows of any kind.
- **Don't** set body copy, nav or buttons in the expanded cut, or anything but labels in Departure Mono.
- **Don't** introduce a second accent or new greys outside the ink planes.
- **Don't** put reading text in the dust tones; those are decorative only.
- **Don't** place small mono labels above headings as section kickers; labels name data (places, footer, controls), they do not introduce sections.
