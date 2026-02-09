# ZENITH’26 Symposium Website

## Cinematic Scroll‑Driven Animation Specification

---

## Project Overview

Build a **cinematic, scroll‑driven symposium website** for **ZENITH’26**, inspired by modern festival microsites. The experience must feel **immersive, kinetic, and premium**, using **scroll as the primary animation timeline** rather than simple hover effects.

This site prioritizes:

* Motion storytelling
* Depth via layered visuals
* GPU‑accelerated animation
* High performance despite rich visuals

---

## College Name

**JEPPIAAR ENGINEERING COLLEGE**

---

## Symposium Name

**ZENITH’26**

**Tagline:**
*Rise of Innovation*

---

## Core Visual Identity

### Design Language

* Dark, cinematic UI
* High‑contrast typography
* Oversized kinetic text
* Motion‑first layout
* No flat or static hero sections

The site should feel like a **live event reveal**, not a brochure.

---

## Color Palette (Cinematic Dark)

* **Primary Black:** `#0F0F14`
* **Deep Charcoal:** `#141414`
* **Highlight Red:** `#D73A2D`
* **Accent Orange:** `#FF6A2A`
* **Neutral Light:** `#EDEDED`

Usage:

* Backgrounds → Near‑black tones
* Text → Light neutral
* Motion accents → Red / Orange
* Glows → Soft gradients, never harsh

---

## Typography

* **Primary:** Inter / Space Grotesk
* **Display:** Bebas Neue‑style condensed font
* **Hero Text:** Extremely large (30–40vh)
* **Numbers:** Tabular numbers for animated counters

Typography is a **motion element**, not just content.

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animation:**

  * GSAP + ScrollTrigger (primary)
  * Framer Motion (micro‑interactions)
* **Graphics:**

  * HTML Canvas (2D)
  * SVG clipPath
  * Video masks (WebM)
* **UI:** shadcn/ui
* **Icons:** lucide‑react

---

## Global Animation Philosophy

### Scroll = Timeline

* User scroll controls animation progress
* Sections are **pinned** for extended durations (150–300vh)
* Content animates *within* the pinned viewport

No autoplay timelines.
No infinite looping hero animations.

---

## Animated Background System

### Layered Architecture

Each major animated section consists of **four synchronized layers**:

1. **Base Canvas (Fixed)**
2. **Foreground Canvas (Transparent)**
3. **Kinetic Typography (DOM)**
4. **Interactive UI Overlay**

All layers are driven by scroll position.

---

### Canvas Layers

#### Base Canvas

* `position: fixed`
* Full viewport coverage
* Dark background fill
* Handles:

  * Noise
  * Gradients
  * Ambient motion
* Redraws every frame

#### Foreground Canvas

* Transparent
* GPU‑accelerated
* Handles:

  * Particles
  * Light streaks
  * Scroll‑reactive distortion

Canvas layers must never contain UI or text.

---

### Scroll Pinning

* Hero section height: `200vh`
* Canvas pinned for full duration
* Implemented using GSAP `ScrollTrigger.pin`

This creates the illusion of **scrolling through the animation**.

---

### Kinetic Marquee Typography

* Font size: `35–40vh`
* Repeated phrases to simulate infinite scroll
* Horizontal motion via `translateX`
* Multiple rows moving at different speeds
* Alternating direction per row for parallax depth

Motion values are controlled via JavaScript timelines, not CSS keyframes.

---

### Foreground Floating UI

* Fixed‑position container while hero is pinned
* Contains:

  * Countdown timer
  * Symposium logo
  * CTA buttons

Parent layers use `pointer-events: none`; interaction is selectively re‑enabled on child elements.

---

### Countdown Animation

* Digits animated individually
* Uses:

  * `translateY`
  * `opacity`
* Tabular numerals only
* Smooth digit roll instead of text replacement

---

## SVG Clip‑Path Video System

### Purpose

Create **glitch / scanline / cinematic masking effects** without heavy shaders.

### Implementation

* WebM videos
* Masked using animated SVG `clipPath`
* Each clipPath consists of multiple horizontal rectangles
* Rectangle widths animate over time

Multiple masked videos appear at different:

* Scales
* Positions
* Depth levels

All videos are:

* Muted
* Looping
* GPU‑friendly

---

## Section‑Based Animation Patterns

### About Section

* Text reveals line‑by‑line
* Vertical translate from `110% → 0%`
* Triggered on scroll entry
* No fade‑only animations

---

### Media Cluster Section

* Central masked video
* Smaller floating masked videos around it
* Parallax offsets based on scroll
* Strong depth illusion

---

### Highlights / Proshows Section

* Multiple images stacked at center
* Each image:

  * Scales up
  * Moves forward
  * Fades out
* Next image replaces it in sequence

Only one image is visually dominant at any time.

---

### Marquee Section

* Continuous horizontal marquee
* Transform‑based animation
* Seamless repetition
* Pauses on hover

---

### Background Video Sections

* Full‑screen WebM background
* Overlaid typography
* No expensive blend modes
* Video acts as ambience, not focal content

---

## Page Structure

### `/` – Home

* Scroll‑pinned hero
* Dual canvas background system
* Kinetic marquee typography
* Countdown + CTA
* About section
* Media cluster

---

### `/technical-events`

* Event card grid
* Subtle hover lift and glow
* No heavy scroll pinning
* Clean, readable layout

---

### `/non-technical-events`

* Same structure as technical events
* Slightly playful transitions

---

### `/staff-coordinators`

* Armor‑plate inspired cards
* Minimal animation
* Focus on clarity

---

### `/student-coordinators`

* Similar to staff coordinators
* Lighter motion accents

---

### `/contact`

* Static layout
* Subtle background motion
* No pinned sections

---

## Performance Rules (Critical)

* Only `transform` and `opacity` may animate
* No layout‑triggering properties
* Canvases must be resolution‑aware
* Disable heavy animations on low‑power devices
* Respect `prefers-reduced-motion`

---

## Final Direction

ZENITH’26 should feel like:

* A festival site
* A tech showcase
* A cinematic reveal

The goal is **immersion through scroll**, not decoration.
