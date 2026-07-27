---
description: HR West 2026 Brand and CMS Design Guidelines
---

# HR West 2026 Design Guidelines

When creating or modifying sections within the `00-hrwest-2026` folder, STRICTLY adhere to these guidelines. These files live within a CMS environment, so component structure, responsiveness, and exact class names are critical.

## 1. Typography (Roboto)
- **Base:** Default font is Roboto (`100;300;400;500;700;900`). Body text is typically 13px or 16px.
- **Titles & Headings:**
  - `h1` / `.ext-class`: 50px-80px, font-weight 900, `#2A343E`, letter-spacing `-0.03em`, line-height `1.1-1.2`.
  - `.section-title` (h2): 40px, font-weight 700, `#2a343e`, line-height `1.3`.
  - `.section-subtitle` (h3): 18px, font-weight 400, `#2a343e`, line-height `1.6`.
  - `.section-small-title` (h4): 24px, font-weight 600, `#2a343e`, line-height `1.3`.
- **Paragraphs:**
  - `.para`: 16px, font-weight 400, `#2a343e`, line-height `1.6`, max-width 700px.
  - `.para-sm`: 14px, font-weight 400, color `#6b7280`.

## 2. Color Palette & Tokens
Do not use raw colors if utility classes exist.
- **Text:**
  - Primary: `#2a343e` (`--color-text-primary`)
  - Secondary: `#273a8f` (`--color-text-secondary`)
  - Muted: `#6b7280` (`--color-text-muted`)
- **Backgrounds:**
  - Base: `#ffffff`
  - Soft: `#f5f5f5`
- **Brand Accents:**
  - Purple: `#91278c` (`--accent-purple`)
  - Pink: `#ef146e` (`--accent-pink`)
  - Orange: `#ef5924` (`--accent-orange`)
  - Yellow: `#fdb414` / `#fcb22f` (`--accent-yellow`)
  - Blue: `#273a8f` (`--accent-blue`)
  - Cyan: `#29a8df` (`--accent-cyan`)
  - Green: `#94c83d` / `#338b93` / `#b6f492`

### Gradients
The brand heavily features multi-color gradients and dual-tone multiply-blend gradients over images.
- **Brand Stripe:** `linear-gradient(to right, #ef4a3d, #fdb414, #94c83d, #ef146e, #273a8f)`
- **Image Overlays (Hero/Cards):** Combine image URL with a linear gradient and `background-blend-mode: multiply`.
  - `.purple`: `linear-gradient(45deg, #91278c, #ef5924)`
  - `.yellow`: `linear-gradient(45deg, #ef5924, #fcb22f)`
  - `.blue`: `linear-gradient(45deg, #29a8df, #273a8f)`
  - `.green`: `linear-gradient(45deg, #338b93, #b6f492)`

## 3. Layouts & Structure
- **Max Widths:**
  - Full width layout: `.layout-full` (max 1920px)
  - Container: `.in-container` or `.layout-container` (max 1170px, inline padding of 16px/24px/32px).
  - Use `section`, `.section-center`, and standard flex/grid techniques as demonstrated in `00-home` or `04 hrdotcom-awards`.
- **Spacing Utilities:**
  - Padding: `.pt4` to `.pt32`, `.pb4` to `.pb32`, `.pl4` to `.pl32`, `.pr4` to `.pr32` (increments of 4).
  - Margin: `.mt4` to `.mt32`, `.mb4` to `.mb32`...
- **Alignment Classes:** `.center`, `.left`, `.right`

## 4. Common CMS Components
- **Hero & Headers:**
  - Use `.hr-west_wrapper` with `display: flex` (or `grid` for responsive layout) and `.hr-wrapper_info` for the typography content.
  - The main heading often contains spans customized with `display: block` and `font-size: 40px`.
- **Cards (.hero_card):**
  - Usually in a flex or grid wrapper (`.hero_card_wrapper`). Cards get a `border-radius: 20px`, padding, and a minimum height of `450px` for visual consistency.
  - Add specific color classes (`.purple`, `.yellow`, `.blue`) for background images + gradients.
- **Awards Grids (.awards-grid & .award-card):**
  - Found in the Awards section. Standard CSS grid for responsiveness with distinct inner typography: `h3` for title, `.position` for rank, `.hr-award-winner-name` for proper highlight color.
- **Notice & Countdowns:**
  - Wrap notices in `.notice-grid` and `.notice-box`. Countdowns rely on specific unordered lists (`.countdown ul`) with large font spans (`color: #e51069; font-size: 34px`) and `.sep` colons.

## 5. Styling Rules
- **Consistency:** Always use the defined CSS custom variables where they apply. If placing inline styles or new blocks, match the border radiuses (usually `1.25rem` or `20px` for major containers, `8px` or `12px` for smaller boxes).
- **Responsive:** Build mobile-first or ensure tablet/mobile overrides (e.g., standard breakpoints at `768px`, `992px`, `1200px`).
- **CMS Notice:** Since it's a CMS, ensure styles are generic enough not to conflict globally, but specific enough to enforce the HR West 2026 aesthetics when nested inside `.hr-west_container` or `.in-container`.
- **Clean UI:** Do not use default shadows. Use soft shadows (`rgba(0, 0, 0, 0.1) 0px 4px 12px` or `--shadow-soft`).

## 6. General Editing Rules
- **Strict Constraint:** Do NOT modify any other sections of the HTML or CSS unless explicitly requested by the user.
- **Strict Constraint:** Do NOT create or invent your own text content. Always use the exact text provided by the user.

## 7. Component Development (Sliders & JS)
- **CMS CSS Overrides:** When building new components (like sliders) for the CMS, CSS should be placed in an inline `<style>` block and strictly use `!important` on all properties to prevent native CMS stylesheets from stripping or overtaking the design.
- **JavaScript Isolation:** Ensure `<script>` blocks (or separate JS files) have defensive checks (e.g. `if (!element) return;`) and use standard `DOMContentLoaded` listeners to prevent errors in shared CMS environments.
- **Slider Formatting (Bleed Fix):** When building sliders with `overflow: hidden`, do NOT apply left/right padding to the outer wrapper, as it causes adjacent slides to bleed into view. Apply `width: 100%`, `flex-shrink: 0`, and inner padding directly to the individual slide elements instead.
- **Animation Timings:** The established standard for text slider readability in this project is an 8-second interval (`8000ms`) between slides with a snappy `0.5s` CSS transition.
