---
name: generating-premium-emailers
description: Generates high-quality, responsive, and brand-aligned emailers using the Hybrid/Fluid layout pattern. Use when the user asks for email template creation, fixing email responsiveness, or building brand-consistent email campaigns that must work across Outlook, Gmail, and mobile clients.
---

# Generating Premium Emailers

This skill defines the technical and design rules for building production-ready emailers that render consistently across all major email clients.

The agent must follow these rules strictly to avoid layout breakage in sensitive clients like Outlook and Gmail Mobile.

---

# When to Use This Skill

Use this skill when:
- generating new email templates
- updating existing emailers for responsiveness
- ensuring brand consistency across different product emailers
- fixing spacing or alignment issues in mobile views
- implementing dark mode for emails

---

# Workflow

1. **Load Context**: Read brand identity rules (`managing-brand-identity`).
2. **Structure Planning**: Define the email hierarchy (Header, Hero, Main Content, CTA, Footer).
3. **Hybrid Layout Implementation**: Use the "Hybrid/Fluid" pattern (Divs for mobile/modern, MSO Tables for Outlook).
4. **Style Inlining**: Ensure all CSS is either inlined or placed in a `<style>` block compatible with target clients.
5. **Brand Alignment**: Apply HR.com colors, typography (Manrope with fallbacks), and motifs.
6. **Dark Mode**: Include `@media (prefers-color-scheme: dark)` overrides.
7. **Verification**: Check for MSO conditionals and responsive container widths.

---

# Technical Rules

### 1. The Hybrid Layout Pattern (CRITICAL)

To ensure columns stack on mobile but stay side-by-side in Outlook, use the "Ghost Table" (MSO) approach combined with `inline-block` divs.

**Required Pattern for Columns:**

```html
<!--[if mso]>
<table role="presentation" width="100%">
<tr>
<td width="300" valign="top">
<![endif]-->
<div class="column" style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top;">
    <!-- Content for column 1 -->
</div>
<!--[if mso]>
</td><td width="300" valign="top">
<![endif]-->
<div class="column" style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top;">
    <!-- Content for column 2 -->
</div>
<!--[if mso]>
</td></tr></table>
<![endif]-->
```

### 2. Typography & Fonts

- **Primary Font**: 'Manrope', Arial, sans-serif.
- **Import**: Include the Google Fonts `@import` but provide a safe fallback for Outlook.
- **MSO Fallback**:
  ```html
  <!--[if mso]>
  <style>
      table, td, p, a, h1, h2, h3 { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  ```

### 3. Image Handling

- Use `display: block;` and `max-width: 100%;`.
- Always provide `alt` text.
- Use `border: 0;` to prevent Outlook borders.

### 4. Spacing

- Use `padding` on `td` or `div` rather than `margin` (margins are poorly supported in many clients).
- Use `line-height` explicitly to prevent varying default spacing.

### 5. Dark Mode Support

Always include a dark mode reset and targeted overrides:
```css
@media (prefers-color-scheme: dark) {
    .bg-white { background-color: #2A343E !important; }
    .text-dark { color: #FFFFFF !important; }
}
```

---

# Checklist

- [ ] Used MSO "Ghost Tables" for columns
- [ ] CSS inlined or client-compatible
- [ ] Manrope font with Arial fallback
- [ ] Dark mode support included
- [ ] Images have `display: block` and `alt` text
- [ ] Brand colors (HR.com Pink/Teal/Dark) used correctly
- [ ] Mobile stacking verified (inline-block divs)

---

# Resources

- `resources/email-resets.md`
- `resources/layout-patterns.md`
- `resources/brand-assets.md`
