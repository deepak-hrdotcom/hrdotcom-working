# HR.com CMS Domains & Mini-Sites — Technical Architecture & Integration Guide

Mini-sites are secondary hostnames (for example `ihr.com`) that share this portal database but show their own branding, menus, analytics, and SEO. Stories assigned to a mini-site are exclusive to that host (404 on the primary portal). Unmapped content and most admin/login paths redirect to the primary portal host. Digital product checkout can stay on the mini-site via `/domain/checkout/index`.

---

## 1. Domain Configuration & Tabs Overview

- **List of Configured Domains**: Appears at top. Use Edit to open the form, or Delete to remove a mapping.
- **Form Tabs**: General, Menus, Appearance, Analytics, and SEO.
- **Save**: Stores all tabs together. Cancel returns to the list without saving.
- **Preview Mini-Site**: When a host is set, opens a sample page with `?mock_host=your.domain` for local testing.

### General Tab
- **Domain host**: Required hostname (e.g. `ihr.com`). Do not register the primary portal host.
- **Display name**: Friendly name used in admin and as fallback site name.
- **Status**: Inactive domains are ignored for Host matching.
- **Host aliases**: Optional alternate hostnames (one per line, e.g. `www.ihr.com`).
- **Primary menu (whitelist / landing)**: CMS menu whose story tree is allowed on this mini-site and blocked (404) on the primary host. Root requests land on this menu. (Not the branded header menu).
- **Layout template ID**: Optional. Uses `templateMasterD_{ID}` when it exists.

### Menus Tab
- **Header mode**:
  - `Default`: Keeps portal chrome.
  - `Minimal`: Hides default header/footer chrome and injects a branded bar plus optional footer.
- **Header / Footer menu source**:
  - `Use CMS menu`: Pick an existing Website & CMS menu.
  - `Custom menu builder`: Define label + URL links with drag-and-drop order and up to two submenu levels.
- **Custom builder**: Add/remove items, drag handle to reorder/nest, use `+` for submenu. URLs may be site-relative (`/path`) or external (`https://...`). External links open in a new tab.

### Appearance Tab
One tab for brand, page layout, header/footer chrome, and advanced CSS.
- **Brand**: Logo, favicon, primary color.
- **Page layout**: Page background, story title hide/color/size, sidebar visibility, main content width.
- **Surfaces**: Solid color, optional gradient (from/to/angle), background image with opacity/position.
- **Menu strip**: Separate nav bar background, padding, min height.
- **Active nav**: Current link style (color, pill, underline) plus underline thickness and highlight background.
- **Typography & spacing**: Font family, site name size/weight, content top gap, footer top margin.
- **Shadows & radius**: None / soft / strong shadow and border radius on header and footer.
- **Buttons**: CTA and primary/secondary button colors.
- **Footer accent / social**: Accent bar, powered-by line, up to 4 social links.
- **Advanced custom CSS**: Use safe selectors below for overrides.

---

## 2. CSS Selectors (Stable Hooks)
These classes are safe to target from Advanced Custom CSS ([main-navigation-custom.css](file:///e:/HR/00-html/01-education/02-certification-pages/mini-site/css/main-navigation-custom.css)):
- `body.domain-minisite` / `body.domain-minisite-minimal` / `body.domain-minisite-hide-sidebar`
- `.domain-minisite-header` + `.domain-minisite-header--{preset}` (`logo-left`, `logo-left-nav-center`, `stacked`, `centered`)
- `.domain-minisite-header-brand` · `.domain-minisite-logo-link` · `.domain-minisite-logo-img` · `.domain-minisite-site-name`
- `.domain-minisite-nav` · `.domain-minisite-nav-list` · `.domain-minisite-nav-item` · `.domain-minisite-nav-link`
- `.domain-minisite-nav-item--depth-0` ... `--depth-2` · `--has-children` · `--external`
- `.domain-minisite-nav-toggle` · `.domain-minisite-header.is-nav-open` · `.domain-minisite-header-actions`
- `.domain-minisite-cta` · `.domain-minisite-cta--solid` · `.domain-minisite-cta--outline`
- `.domain-minisite-footer` + `.domain-minisite-footer--{preset}` · `.domain-minisite-footer--cols-1|2|3`
- `.domain-minisite-footer-nav` · `.domain-minisite-footer-meta` · `.domain-minisite-footer-tagline` · `.domain-minisite-footer-copyright`
- `:root { --domain-primary }`

---

## 3. Analytics & External Scripts Injection

Max 50,000 characters per field.
- **Head scripts**: End of `<head>`, after GTM and SEO when set.
- **Body-start scripts**: Right after `<body>`, after GTM noscript when set.
- **Body-end scripts**: Near end of page before `</body>`, after mini-site chrome and Sign in / Join modal.
  > **Note**: For DOM-manipulation scripts such as the minisite navigation controller ([mini-site-cert-prep-course.js](file:///e:/HR/00-html/01-education/02-certification-pages/mini-site/js/mini-site-cert-prep-course.js)), **`Body-end scripts`** is the required injection target so all header and navigation markup is fully parsed and available in the DOM.

---

## 4. Local Testing & Story Domain Context

- **Local Testing**: Append `?mock_host=your.domain` (e.g. `?mock_host=ihr.com`) to simulate the secondary Host without editing the OS hosts file. The mock host is remembered for the session so pretty URLs keep mini-site chrome; clear with `?mock_host=0`. Production uses the real Host header.
- **Story Domain Context**: A story is allowed on a mini-site if it is under the Primary menu tree or checked under Story Manager -> Options -> Domain Context.
- **Checkout Link Format**: `<a href="/en?t=/domain/checkout/index&productID=12345">Buy now</a>` (testing: append `&mock_host=your.domain`).
- **Portal Master Access**: Required for domain config. Changes apply after Save; hard-refresh if styles look cached.
