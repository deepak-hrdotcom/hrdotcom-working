# CMS CSS Reset Rules

This document outlines the required CSS resets when generating CMS-safe HTML.

## Core Principle
All resets MUST be scoped within the main wrapper container (e.g., `.cms-page`). NEVER write global resets like `*`, `body`, or `p`.

## Elements Most Affected by CMS Native Styles
The following elements must explicitly have their base styles defined to prevent CMS interference:
- `img`
- `a`
- `p`
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `ul`, `ol`, `li`
- `button`
- `input`, `textarea`

## Standard Resets Example

```css
/* Scoped Wrapper Examples */

/* Box sizing for all elements within wrapper */
.cms-page, .cms-page *, .cms-page *::before, .cms-page *::after {
  box-sizing: border-box;
}

/* Images */
.cms-page img {
  display: block;
  max-width: 100%;
  height: auto;
  border: 0;
  margin: 0;
  padding: 0;
}

/* Paragraphs */
.cms-page p {
  margin-top: 0;
  margin-bottom: 24px; /* Explicit px */
}

/* Headings */
.cms-page h1, .cms-page h2, .cms-page h3, .cms-page h4, .cms-page h5, .cms-page h6 {
  margin-top: 0;
  font-weight: normal; /* Specify explicitly based on design */
}

/* Lists */
.cms-page ul, .cms-page ol {
  margin-top: 0;
  margin-bottom: 24px;
  padding-left: 20px; /* Explicit px indentation */
}
.cms-page li {
  margin-bottom: 8px; /* Explicit list spacing */
}

/* Links */
.cms-page a {
  text-decoration: none;
  color: inherit; /* Override default link colors if needed */
}
```

If the environment is very hostile, you may need to use `!important` to force these rules, but use it sparingly and only when necessary.
