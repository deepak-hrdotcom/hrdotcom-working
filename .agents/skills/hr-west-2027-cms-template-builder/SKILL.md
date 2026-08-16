---
name: hr-west-2027-cms-template-builder
description: Trigger keywords - "build hr west 2027 page", "hr west 2027 cms", "hrwest 2027 cms page", "hrwest 2027 template", "new hr west 2027 page", "hrwest 2027 story". Builds and maintains CMS-compatible HTML pages and master templates for HR West 2027 using pure semantic HTML, vanilla CSS design tokens, and lightweight vanilla JS. Enforces the Visionary Violet + Pink accent design system and CMS injection rules ($desc_long).
---

# HR West 2027 CMS Template & Page Builder Skill

**Trigger Keywords**: `build hr west 2027 page`, `hr west 2027 cms`, `hrwest 2027 cms page`, `hrwest 2027 template`, `new hr west 2027 page`, `hrwest 2027 story`

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

## 5. Critical CMS Duplicate Story & Widget Suppression Rule

When HR.com CMS renders a story page with a custom template, the CMS core default engine attempts to render the raw story description at the top of the page inside `#intro-header` (or `section#intro-header`), along with floating social widgets and unwanted navigation bars.

To prevent the story from rendering twice, eliminate FOUC, and suppress unwanted floating widgets, place this blocking style tag at the very top (Line 1) of both the template and the page story:
```html
<style>
  /* Prevent Flash of Unwanted CMS Content (FOUC) & Unwanted Widgets */
  #intro-header,
  section#intro-header,
  div#intro-header,
  .sf-nav-main,
  .socialshare,
  #socialshare,
  .social-share,
  .floating-social,
  .st-sticky-share-buttons,
  div[class*="socialshare"],
  div[id*="socialshare"],
  #content,
  .TopLink_new,
  .TopBar,
  #hradbtmwrapper {
    display: none !important;
  }
  body, body.sf-nav-main-mode, .sf-nav-main-mode {
    padding-top: 0px !important;
    margin-top: 0px !important;
  }
</style>
```

Additionally, immediately follow with the early JavaScript reset:
```html
<script>
(function() {
  function applyEarlyReset() {
    if (document.body) {
      document.body.style.setProperty('padding-top', '0px', 'important');
      document.body.style.setProperty('margin-top', '0px', 'important');
    }
  }
  applyEarlyReset();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyEarlyReset);
  }
})();
</script>
```

---

## 6. Full-Width Layout Overrides & Section Design

HR.com CMS wrappers often have default `.ContentArea` or `.container` constraints with `max-width: 1200px` or side paddings that prevent modern full-bleed edge-to-edge layouts (e.g. angled hero splits, dual-row marquees, full-bleed color bands).

- **Outer Overrides**:
  ```css
  .ContentArea {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
  }
  .FooterBG .container,
  .FooterMidBG .container {
    gap: 0 !important;
  }
  ```
- **Section Pattern**:
  - Use `.section-wrap` on sections for full-width background and padding.
  - Use `.container-inner` (max-width `1280px` or `1360px`, margin `0 auto`, padding `0 24px`) for contained content.
  - For full-bleed split layouts (like Hero `.hero-split-grid`), let the parent section span 100vw edge-to-edge without a `.container-inner` constraint so angled image layers bleed seamlessly to the viewport edge.

---

## 7. Dual-Row Marquee System ("See Who Shows Up at HRWest")

For high-converting social proof, use a dual-row marquee with opposite scroll directions and pause-on-hover:
- **Row 1 (Attendee Action Photos)**: 9 real keynote & conference photos inside `.photo-marquee-card` with dark glass overlay captions, scrolling left with `@keyframes hrw27-marquee` (40s linear infinite).
- **Row 2 (Sponsor Badges)**: Deduplicated sponsor logos scrolling in reverse with `@keyframes hrw27-marquee-reverse` (45s linear infinite).
- **Hover Behavior**:
  ```css
  .marquee-track:hover .marquee-strip,
  .marquee-track:hover .marquee-strip-reverse {
    animation-play-state: paused;
  }
  ```

---

## 8. Canonical Live CMS Destination URLs

When wiring navigation links, mobile menu items, and story CTA buttons in HR West 2027 templates and pages, use the exact canonical live CMS URLs:

| Navigation Item | Live CMS URL |
| :--- | :--- |
| **Logo / Home** | `/en/webcasts_events/live_events/hrwest/hrwest-hr-conference_laapwgci.html` |
| **Speakers Directory** | `/en/webcasts_events/live_events/hrwest/hrwest-conference-speakers---hrcom_laaqsa2l.html` |
| **Agenda & Schedule** | `/en/webcasts_events/live_events/hrwest/hrwest-2026-agenda-listing_mnq4uvmw.html` |
| **Sponsors Directory** | `/en/webcasts_events/live_events/hrwest/hrwest-sponsors_lyfn7g9y.html` |
| **Attend as a Team** | `/en/webcasts_events/live_events/hrwest/attend-hrwest-as-a-team_laaqzi6t.html` |
| **Convince Your Boss** | `/en/webcasts_events/live_events/hrwest/get-your-employer-to-send-you-to-hrwest_lk2vgc3h.html` |
| **Venue & Travel** | `/en/webcasts_events/live_events/hrwest/hrwest-hr-conference-location_laar45d5.html` |
| **Volunteer for Pass** | `/en/webcasts_events/live_events/hrwest/volunteer-at-hrwest-for-free-pass_laaqw0y9.html` |
| **Why Sponsor / Exhibit** | `/en/webcasts_events/live_events/hrwest/sponsor-hrwest_laar1r7a.html` |
| **Pre-Register / Buy Tickets** | `/en/webcasts_events/live_events/hrwest-2026-registration_ml6ofh1g.html` |

---

## 9. Clean Comments Rule (No Special Characters)

**CRITICAL**: The HR.com CMS parser can fail, break regex token matching, or corrupt template rendering when special characters or symbols appear inside HTML comments (`<!-- ... -->`) or CSS comments (`/* ... */`).
- **NEVER use special symbols in comments**: Avoid `+`, `—`, `–`, `═`, `─`, `&`, emojis, or fancy box borders in comments.
- **Always use simple standard ASCII words and spaces**: e.g., `<!-- Hero Section -->`, `<!-- Master Header -->`, `<!-- Footer Links -->`.

