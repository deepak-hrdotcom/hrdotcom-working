# Layout Rules

When generating HTML structures for CMS embedding, utilize a consistent wrapper model and avoid external CSS frameworks.

## 1. Top-Level Wrapper
Must establish the initial boundary to scope CSS.

```html
<div class="cms-page">
   <!-- content -->
</div>
```

## 2. Section Wrappers (Full-Width by Default)
Within the top-level wrapper, sections should logically group contents. They should stretch 100% of the parent container unless specifically constrained.

```html
<section class="cms-section">
  <!-- content -->
</section>
```

```css
.cms-page .cms-section {
  width: 100%;
  padding-top: 60px; /* Explicit px spacing */
  padding-bottom: 60px;
}
```

## 3. Inner Container Wrappers
Use an inner container inside sections to cap the maximum width of content and center it cleanly. Typical widths are `1200px` to `1440px`.

```html
<section class="cms-section">
  <div class="cms-container">
    <!-- content -->
  </div>
</section>
```

```css
.cms-page .cms-container {
  max-width: 1200px; /* Explicit max width */
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px; /* Safe gutters */
  padding-right: 20px;
}
```

## 4. Spacing and Grids
- Use plain CSS `flexbox` or `grid` for layouts.
- **NEVER** use framework grid systems like Bootstrap (e.g., `.col-md-6`) or Tailwind classes unless it's explicitly guaranteed to be available in the CMS environment.
- Gap values must use explicit `px`. 

```css
.cms-page .grid {
  display: flex;
  flex-direction: column;
  gap: 24px; /* Explicit px gaps */
}

@media (min-width: 768px) {
  .cms-page .grid {
    flex-direction: row;
    gap: 32px;
  }
}
```

## 5. Clean, Modern Aesthetic
- Use explicit padding and spacing to maintain an airy layout.
- Headings should use explicit `px` sizing and robust styling to prevent them from breaking under poor CMS styling.
- All structural alignments must be bulletproofed with layout techniques like predictable flexbox settings (`align-items: center`, `justify-content: space-between`, etc.).
