---
name: hr-west-2027-cms-template-builder
description: Builds and maintains CMS-compatible HTML pages and master templates for HR West 2027 using pure semantic HTML, vanilla CSS design tokens, and lightweight vanilla JS. Enforces the Visionary Violet + Pink accent design system and CMS injection rules ($desc_long).
---

# HR West 2027 CMS Template & Page Builder Skill

This skill defines the technical, architectural, and design standards for porting and building HR West 2027 pages into the HR.com CMS environment.

---

## 1. CMS Architecture & Mental Model

- **Template File (`00-templates/hr-west-2027-template.html`)**:
  - Contains all master resets, font imports (`Outfit` + `Inter`), CSS design tokens scoped under `.hrw27`, utility classes, keyframes, and shared JavaScript (IntersectionObserver animations, countdown timers, count-up number counters, track sliders).
  - Uses the CMS injection placeholder `$desc_long` where the page-specific HTML is injected.
  - Contains the CMS edit toolbar snippet: `<div class="editlink">$designAttribute:story_edit_link $storyToolBar</div>`.

- **Page Stories (`02-pages/*.html`)**:
  - Pure HTML content fragment wrapped inside `<div class="hrw27">...</div>`.
  - Does **not** include `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` tags.
  - Fully self-contained visual hierarchy matching the React prototype with 100% pure HTML, scoped CSS, and inline SVGs.

---

## 2. Design System & Tokens (Visionary Violet + Pink Accent)

- **Primary Brand Theme**: Visionary Violet (`hsl(255, 62%, 44%)` / `#5d2fc7`)
- **Authority Deep Tone**: Deep Violet Authority (`hsl(255, 65%, 20%)` / `#1d0f4a`)
- **Secondary Accent (Sparingly — 15% rule)**: Hot Pink (`hsl(335, 90%, 54%)` / `#ef146e`) used for early bird urgency strips, conversion highlights, and primary final CTA actions.
- **Typography**:
  - Headlines & Titles: `'Outfit', system-ui, sans-serif !important;` (Weights: 700, 800, 900)
  - Body & Microcopy: `'Inter', system-ui, sans-serif !important;` (Weights: 400, 500, 600, 700)
- **Surfaces**:
  - Canvas: `hsl(240, 33%, 99%)`
  - Surface: `hsl(210, 40%, 98%)`
  - Elevated / Cards: `hsl(0, 0%, 100%)`
  - Borders: `hsl(214, 32%, 91%)`

---

## 3. Image CDN Asset Rules

All imagery must point directly to the production HR.com WebP CDN path:
- **Base CDN Path**: `https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2027/`
- **Key Assets**:
  - Hero Conference Background: `.../hrwest-2027/hero_conference.webp`
  - Cheering HR CTA: `.../hrwest-2027/cta_cheering_hr.webp`
  - SSF Venue: `.../hrwest-2027/ssf_venue.webp`
  - Track 1 (AI): `.../hrwest-2027/track_ai_real.webp`
  - Track 2 (Legal): `.../hrwest-2027/track_legal_real.webp`
  - Track 3 (HR Tech): `.../hrwest-2027/track_hrtech_real.webp`
  - Track 4 (Talent): `.../hrwest-2027/track_talent_real.webp`
  - Track 5 (Leadership): `.../hrwest-2027/track_leadership_real.webp`
  - Track 6 (Wellness): `.../hrwest-2027/track_wellness_real.webp`

---

## 4. Animation & Interaction Parity (Vanilla JS)

- **Scroll Entrance**: Add `.fade-up`, `.fade-left`, `.fade-right`, or `.fade-scale` plus stagger delays (`.delay-1`, `.delay-2`, etc.). Handled automatically by master template's `IntersectionObserver`.
- **Count-Up Stat Numbers**: Add `data-target="1000"` and optional `data-suffix="+"` to the number element.
- **Track Slider Navigation**: Wrapper `#hrw27-track-slider` with `#hrw27-track-prev` and `#hrw27-track-next` controls.
- **Countdown Timer**: Target `#hrw27-cd-days`, `#hrw27-cd-hours`, `#hrw27-cd-mins`, `#hrw27-cd-secs`.
- **Marquee**: Pure CSS `@keyframes` on `.marquee-strip` and `.marquee-strip-reverse`.

---

## 5. Critical CMS Duplicate Story Suppression Rule

When HR.com CMS renders a story page with a custom template, the CMS core default engine attempts to render the raw story description at the top of the page inside `#intro-header` (or `section#intro-header`).

To prevent the story from rendering twice (once above the header and once inside `$desc_long`):
```css
#intro-header,
section#intro-header,
div#intro-header {
  display: none !important;
}

.sf-nav-main,
.socialshare,
#content {
  display: none !important;
}
```
This ensures the page story is **only** rendered once, right in the intended `$desc_long` slot between the Header and Footer.

---

## 6. Clean Comments Rule (No Special Characters)

**CRITICAL**: The HR.com CMS parser can fail, break regex token matching, or corrupt template rendering when special characters or symbols appear inside HTML comments (`<!-- ... -->`) or CSS comments (`/* ... */`).
- **NEVER use special symbols in comments**: Avoid `+`, `—`, `–`, `═`, `─`, `&`, emojis, or fancy box borders in comments.
- **Always use simple standard ASCII words and spaces**: e.g., `<!-- Hero Section -->`, `<!-- Master Header -->`, `<!-- Footer Links -->`.
