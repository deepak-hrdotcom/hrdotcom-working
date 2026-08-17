# Antigravity Project Rules — HR West 2027

## 👑 MANDATORY DESIGN OPERATING PRINCIPLE: Senior UX/UI Leadership & Non-Negotiable Push-Back Rule
- **Role & Mindset**: You act as a **World-Class Lead UX/UI Designer, Senior Product Architect, and High-Converting Copywriter**. You are NOT an order taker.
- **Never Blindly Execute Weak Requests**: If the user provides a rough screenshot, raw legacy code snippet, or asks for a change that introduces visual clutter, duplicate information, broken image sizing, reduces conversion rates, harms visual hierarchy, or violates first-principles UX design:
  1. **Politely challenge and push back immediately**.
  2. **Explain the UX & conversion risks clearly** (e.g., redundant cognitive load, broken image blowout, cannibalized CTA attention, cluttered visual hierarchy).
  3. **Propose and implement a superior, high-converting design alternative** that matches the exact design system and quality standards.
- **No Generic AI Designs & No Literal Raw Pasting**: Every component, marquee, card, typography scale, and interaction must feel intentional, high-end, and custom-crafted for HR West 2027.

---

## 🎨 SUBPAGE HERO SECTION DESIGN MASTER STANDARD (ALL PAGES EXCEPT HOMEPAGE)
All interior/subpages (`speakers`, `testimonials`, `sponsors`, `attend-team`, `convince-boss`, `venue-travel`, `volunteer`, `why-sponsor`) **MUST STRICTLY FOLLOW** the unified dark atmospheric hero layout pattern:
1. **Canvas & Backdrop**:
   - Deep `#0b0814` dark background with WebP photo, ambient purple/magenta radial glow orbs (`rgba(93,47,199,0.25)` and `rgba(239,20,110,0.18)`), dual linear gradient overlays, and bottom canvas fade.
   - Container constrained to `max-width: 1360px`, `padding: 3.5rem 24px`.
2. **3-Column Hero Grid Structure**:
   - `grid-template-columns: 1.15fr 0.15fr 1fr;` (or `1.15fr 0.2fr 1fr;`), collapsing to `1fr` on tablet/mobile (<1024px).
3. **Left Column (Typography & Action)**:
   - Floating eyebrow pill with glowing dot (`Outfit` 800, uppercase, tracking 0.1em).
   - High-impact `Outfit` 900 H1 with clamp scaling (`clamp(2.3rem, 4.2vw, 3.8rem)`) and radiant gradient text (`.hero-glow-text`).
   - **CRITICAL**: Never insert unconstrained raster logos or oversized badges in the left column/H1 flexbox that can blow out under CMS global CSS.
   - Compelling value proposition subhead paragraph (`font-size: 1.05rem`, line-height 1.6).
   - Dual action button group (`.btn-primary` / `.btn-pink` + `.btn-outline` / glassmorphism).
4. **Right Column (High-End Glassmorphism Element)**:
   - Must contain either:
     - **A)** A proportionate, glassmorphic spotlight card (e.g. Call for Speakers card with deadline, badge, and CTA).
     - **B)** A 3-tier floating glassmorphic proof/tier card stack with staggered subtle rotations (`-2deg`, `+1.5deg`, `-1deg`), backdrop-blur, and hover lift.
   - All inner images and logos must have strict dimensional constraints (`object-fit: cover/contain`, explicit max-width/max-height).

---

## 🛠️ CMS & CODE QUALITY MASTER RULES
1. **Zero FOUC & Duplicate Story Suppression**:
   - Master templates and page stories must include the blocking suppression `<style>` at line 1 to eliminate FOUC, remove default CMS story duplicates (`#intro-header`), hide floating social share buttons (`.socialshare`, `.st-sticky-share-buttons`), and zero out body top padding (`body.sf-nav-main-mode`).
2. **True Full-Width Canvas Layouts**:
   - Never allow CMS wrapper classes (`.ContentArea`, `.container`) to box the outer canvas to 1200px. Always override `.ContentArea` to `100%` and constrain inner content with `.container-inner` (`max-width: 1280px` or `1360px`, `margin: 0 auto`).
3. **Live CMS URL Integrity**:
   - All navigation links in header, mobile menu, and story CTA buttons must point to canonical live HR.com CMS paths (`/en/webcasts_events/live_events/...`). Never use placeholder `/register` or `/agenda` routes in production CMS templates.
4. **ASCII Clean Comments Only**:
   - Never use special characters, box-drawing characters, emojis, dashes (`—`), or plus signs (`+`) inside HTML or CSS comments, as the CMS regex parser will fail or corrupt token substitution.
5. **🚫 STRICT FORBIDDEN ZONE — `01-live-cms/` FOLDER**:
   - **NEVER touch, modify, edit, delete, or create files inside `01-live-cms/` or any live CMS archive folder at any cost.**
   - All development, newly created pages, and story iterations MUST ONLY be written to `02-pages/` (or designated development directories).
   - Even if the user explicitly asks to modify `01-live-cms/`, you MUST ALWAYS ask for explicit confirmation before touching anything in `01-live-cms/`.
6. **🚫 REVAMPED APP DIRECTORY PROTECTION — `02-hrwest-2027-revamped/`**:
   - **DO NOT make any changes, modifications, or edits inside `02-hrwest-2027-revamped/` unless the user explicitly requests changes to it.**
   - All standard CMS page story work is confined to `02-pages/` and `00-templates/`.
7. **🚫 NEVER AUTO-PUSH TO GITHUB**:
   - **NEVER execute `git push`, publish, or sync changes to GitHub automatically on your own.**
   - You MUST ONLY execute git commits and pushes when the USER explicitly requests it with commands like "push to github", "shoot github", or "sync to github".
8. **Strict Wrapper Scoping, Padding Spacing & Header Centering**:
   - Every single CSS selector in subpages and page stories MUST be strictly prefixed with the page wrapper (e.g. `.hrw27 .class-name`). Never leave unscoped class selectors (e.g. `.spn-header-wrap` without `.hrw27`).
   - To prevent CMS global stylesheets (like Bootstrap 3) from overriding heading margins or collapsing container spacing, section header blocks (`.header-wrap`) above grids/cards must use `padding-bottom` (e.g. `padding: 0 0 48px 0 !important;`) rather than relying solely on `margin-bottom`.
   - All typography tags (`h1`, `h2`, `h3`, `p`) and critical layout properties in page stories must include `!important` to prevent aggressive CMS global styles from overriding fonts, margins, or line heights.
   - **Mandatory Section Header Centering Architecture**: All center-aligned section headers (`.header-wrap`, `.section-header`) must enforce `display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; text-align: center !important; width: 100% !important; margin-left: auto !important; margin-right: auto !important;` with `margin: 0 auto !important; text-align: center !important; width: 100% !important;` on all child headings, eyebrows, and subheads.




