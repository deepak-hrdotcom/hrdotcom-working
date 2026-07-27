# Configuration: Typography Scale

**Rule: Typography must use `px` exclusively.** `rem`, `em`, and `clamp` are strictly forbidden for CMS safety, to prevent responsive layouts inherited from unfamiliar host sites stretching or shrinking elements unexpectedly.

The target breakpoints are generally categorizations, and explicit media queries should be used to manage sizes.

## Breakpoints Hierarchy
- `mobile`: `< 768px`
- `tablet`: `768px - 1023px`
- `desktop`: `1024px - 1279px`
- `desktop-medium`: `1280px - 1439px`
- `desktop-large`: `1440px - 1919px`
- `desktop-xlarge`: `>= 1920px`

## Typical Scale (Example)

When generating code, size text appropriately. Here is a recommended scale framework based in pixels:

### Mobile (`max-width: 767px`)
- **h1**: `32px`
- **h2**: `28px`
- **h3**: `24px`
- **h4**: `20px`
- **body-large**: `18px`
- **body**: `16px`
- **small**: `14px`
- **caption**: `12px`
- **button**: `16px`

### Tablet & Desktop (`min-width: 768px`)
- **h1**: `48px` (can scale up across desktop sizes)
- **h2**: `36px` 
- **h3**: `28px`
- **h4**: `24px`
- **body-large**: `20px`
- **body**: `16px`
- **small**: `14px`
- **caption**: `12px`
- **button**: `16px`

Line heights should also be defined explicitly, usually as a unitless multiplier (like `1.5`) or exact `px` (like `24px`).

## Example Usage
```css
.cms-page h1 {
  font-size: 32px;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .cms-page h1 {
    font-size: 48px;
  }
}
@media (min-width: 1440px) {
  .cms-page h1 {
    font-size: 56px;
  }
}
```
