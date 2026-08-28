---
name: enforcing-cms-html-constraints
description: Enforces CMS-safe HTML, scoped CSS, px-only typography, image resets, and full-width layout rules. Use when generating HTML pages, sections, or UI blocks that will be pasted into a CMS environment.
---

# CMS HTML Constraints

This skill defines the technical rules required for building HTML pages inside a CMS environment.

The agent must follow these rules strictly to avoid CMS style conflicts.

---

# When to Use This Skill

Use this skill when:
- generating CMS HTML pages
- creating HTML sections for CMS
- writing CSS for CMS pages
- building paste-ready landing pages
- fixing layout issues caused by CMS global styles
- defining responsive typography in px

---

# Workflow

1. Identify that the output is intended for a CMS environment.
2. Wrap the entire page inside a unique parent wrapper.
3. Scope all CSS selectors to that wrapper.
4. Reset elements that are commonly affected by CMS styles.
5. Apply typography in px across all breakpoints.
6. Keep layouts full width with inner content containers where needed.
7. Use optional JavaScript only when necessary.

Checklist:
- Parent wrapper added
- All CSS scoped
- Image styles reset
- Typography in px only
- Layout is full width
- Output is CMS-safe
- No framework code used

---

# Required Output Pattern

All page output must follow this structure:

```html
<div class="cms-page">

  <style>
    .cms-page {}
  </style>

  <!-- HTML content -->

  <script>
  </script>

</div>
```

Rules:
- The full page must live inside one wrapper.
- The wrapper class can be customized per page if needed.
- No unscoped selectors are allowed.

### CSS Scoping Rules

All selectors must begin with the wrapper.

Examples:
```css
.cms-page h1 {}
.cms-page p {}
.cms-page .hero {}
.cms-page .card img {}
```

Do not write:
```css
h1 {}
p {}
img {}
.section {}
```

### Image Reset Rules

CMS platforms may apply global image styles that break layouts. Reset all images inside the wrapper.

Required direction:
- prevent unwanted stretching
- prevent inherited width/height conflicts
- ensure images behave predictably
- explicitly include max-height: 100% to prevent vertical overflow or stretching

Recommended pattern:
```css
.cms-page img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  border: 0;
}
```

If the CMS is highly aggressive, stronger overrides may be used.

### Image Asset Rules

When generating HTML that includes images:
- Do not use external placeholders (e.g., via.placeholder.com) for final CMS output unless explicitly asked.
- Download or generate the required images and save them into the local project's `images/` directory.
- Link all images relatively in the HTML (e.g., `<img src="images/hero-graphic.png" />`).

### Typography Rules

Fluid typography is explicitly encouraged using `clamp()`, `rem`, or `em` to ensure smooth scaling across all device sizes.

**CRITICAL CMS OVERRIDE RULE:** Because CMS environments often aggressively apply global typography styles (including `font-family`, `font-weight`, `line-height`, and `letter-spacing`), you **MUST** apply an aggressive reset to specific text elements (`h1`, `h2`, `h3`, `h4`, `p`, `a`, `li`, `span`, `button`).

1. **Font Family Override**: Always apply the chosen `font-family` with `!important` explicitly to all text-rendering elements, not just the wrapper.
   Example: 
   ```css
   .cms-page h1, .cms-page p, .cms-page a, .cms-page li, .cms-page span, .cms-page div {
       font-family: 'Roboto', Arial, sans-serif !important;
   }
   ```
2. **Typography Properties**: **ALL** typography properties (`font-size`, `font-weight`, `line-height`, `letter-spacing`, `color`) **MUST include `!important`**. 

**Accessibility Standards**:
- Enforce adequate contrast ratios (e.g., dark text on light backgrounds).
- Enforce readable `line-height` (e.g., `1.5` for body text) using `!important`.
- Ensure buttons and interactive elements have visually distinct hover/focus states.

The skill must define typography for these viewport groups:
- mobile
- tablet
- desktop
- desktop-medium
- desktop-large
- desktop-xlarge

Typography should cover:
`h1`, `h2`, `h3`, `h4`, `body-large`, `body`, `small`, `caption`, `button text`

**Heading Constraints**:
- All heading elements (`h1`, `h2`, `h3`) must explicitly be set to normal casing (e.g. `text-transform: none !important;`).
- All heading elements (`h1`, `h2`, `h3`) must explicitly use `!important` to enforce their `letter-spacing` and `font-weight`.

The skill should keep the typography readable, accessible, explicit, and predictable inside the CMS.

### Button Rules

All generated buttons must strictly match the following standardized properties:

**Button Shapes**: 
- All buttons must be fully rounded / pill-shaped (e.g., `border-radius: 999px;`).

**Button Styles**:
- **Gradient Button**: Vibrant gradient background (e.g. `#E51069` to `#EF4A3D`), white text (`#FFFFFF`), no border.
- **White Button with Border**: White background (`#FFFFFF`), dark border (e.g. `#2A343E` or `#4A5568`), dark text (`#2A343E`).
- **Light BG Button**: Light neutral or tinted background (e.g. `#F4F5F7` or `#F5F5F5`), dark text (`#2A343E`), no border.
- **Dark BG Button**: Dark background (e.g. `#2A343E` or `#333333`), white text (`#FFFFFF`), no border.

**Button Sizes**:
- **Small Size**: `height: 30px;`
- **Default Size**: `height: 50px;`
- **Large Size**: `height: 60px;`

### Layout Rules

Use edge-to-edge (full-bleed) sections by default for backgrounds, while keeping the inner content container restricted to a max-width.

Embrace modern layouts:
- **Bento Box / Grid Layouts**: Use CSS Grid for feature sections to create varied card sizes.
- **Visual Depth**: Use large, soft mesh gradients in the background (using brand colors).
- **Glassmorphism**: Use semi-transparent white/dark cards with `backdrop-filter: blur(10px)` over gradients.
- **Overlapping Elements**: Allow images or cards to slightly break out of containers using negative margins or absolute positioning to create depth.

Recommended structure:
- edge-to-edge background wrapper
- centered inner content container
- clean spacing (using fluid padding/margins with `clamp()` where appropriate)
- modern airy layout, overlapping where it creates visual interest

The skill should support:
- section wrappers
- centered content containers
- CSS Grid (Bento Box) and flex layouts using plain CSS
- fluid spacing values

### Reset Priorities

The skill should include reset guidance for elements commonly affected by CMS styles:
`img`, `a`, `p`, `h1`-`h6`, `ul`, `ol`, `li`, `button`, `input`, `textarea`

Resets should be scoped only inside the page wrapper.

### JavaScript Interactivity & Animations

JavaScript is explicitly encouraged for modern micro-interactions (e.g. using the `modern-ui-interactions` skill).

Rules:
- use plain JavaScript only (Vanilla JS)
- Use `IntersectionObserver` to add scroll-triggered entrance animations (e.g., elements fading/sliding up into view).
- Add CSS hover states for interactivity (e.g., cards lifting, buttons scaling).
- keep scripts local to the page behavior
- avoid unnecessary global variables
- do not rely on external libraries unless explicitly requested

### Forbidden Patterns

Do not generate:
- React
- Tailwind
- Bootstrap
- jQuery
- styled-components
- framework-specific markup
- global unscoped CSS
- Special characters in HTML or CSS comments (`+`, `—`, `–`, `═`, `─`, `&`, emojis) — use only simple alphanumeric ASCII in comments to prevent CMS parsing errors.

### Validation Rules

If Antigravity can open generated files in the browser without excessive token cost, it may:
- preview the page
- verify image rendering
- verify typography sizing
- check wrapper scoping
- confirm layout stability

If validation is too expensive, skip it.

---

# Resources

Generate these supporting files during use or reference them for structure:
- `resources/css-reset.md`
- `resources/typography-scale.md`
- `resources/layout-rules.md`
