---
name: redesigning-webcast-emailers
description: Redesigns an existing HR.com webcast emailer pasted into webcast-emailer-redesign/input.html into a visibly different, responsive, dark-mode-friendly, cross-client layout without changing any text, links or images (Step 1), then replaces only the preheader, intro paragraphs and key learnings from a pasted JSON copywriting prompt and returns 10 subject lines in chat (Step 2). Use when the user mentions redesigning an emailer, a repeat/2nd/3rd push or resend, input.html, redesigned.html, or pastes the HR.com JSON copywriting prompt for a webcast emailer.
---

# Redesigning Webcast Emailers

Two-step workflow for re-sending an HR.com webcast emailer (e.g. a 2nd or 3rd push) with a fresh look and refreshed copy.

| File | Purpose | Who writes it |
|---|---|---|
| `webcast-emailer-redesign/input.html` | Original emailer HTML (blank until the user pastes) | User only. **Never edit.** |
| `webcast-emailer-redesign/redesigned.html` | Step 1 output; Step 2 edits it | Agent |
| `webcast-emailer-redesign/scripts/verify-emailer.mjs` | Text / link / image diff + email lint | Run it, don't edit it |
| `webcast-emailer-redesign/PROMPT.md` | Copy-paste prompts for chats outside this workspace | Reference |

Repository: `https://github.com/deepak-hrdotcom/hrdotcom-working` (branch `main`). All paths are relative to the repo root.

## Golden rules (both steps)

1. **Never invent, guess or assume.** If anything below says "ask", stop and ask the user before editing. Do not fill gaps with made-up text, URLs, names, dates, credits or images.
2. **Never edit `input.html`.** It is the source of truth for verification.
3. **Only touch what the current step allows.** Everything else stays byte-for-byte as it is.
4. **Run the verifier before reporting done.** Never claim it passed without running it.
5. **No git commits/pushes, no installs, no servers** unless the user explicitly asks.
6. Do not claim the email "works in all clients". You can only say static checks passed; real inbox testing (Litmus / Email on Acid / test sends) is the user's call.

---

## Step 1: Redesign

**Trigger:** user says "step 1", "redesign", or similar after pasting HTML into `input.html`. If they paste the HTML in chat instead, write it into `input.html` **exactly as pasted** (no reformatting) and confirm before continuing.

### Pre-flight (ask, don't assume)
- `input.html` is empty or not HTML → ask the user to paste the emailer.
- `redesigned.html` already exists → ask: overwrite it, or save as `redesigned-2.html` (etc.)?
- The user asked for anything that conflicts with the content rules below (e.g. "shorten the footer") → ask for explicit confirmation.
- **Brand source: ALWAYS ask before designing.** Ask the user exactly this (one question, two options) and wait for the answer:
  > For the brand colours and fonts, should I:
  > **A)** use the same colours and fonts as the HTML you gave me (`input.html`), or
  > **B)** pick them up from a URL you'll give me?
  - Don't pick a default and don't infer the answer from earlier chats. Only skip the question if the user's message for this run already says A or gives a brand URL explicitly.
  - If **B** and no URL was given yet → ask for the URL. Follow [Brand source B: URL](#brand-source-b-url) below.

### Content rules (STRICT, zero tolerance)
- **Text:** every visible word stays identical and in the same reading order: headline, intro, learnings, button labels, speaker name/designation, credit statements, footer, legal, unsubscribe text, hidden preheader, `<title>`. No adding, deleting, rewording, re-capitalising, fixing typos, changing punctuation/apostrophes/quotes, or swapping `&` for "and". No new labels like "Featured Speaker" or "Register Now" that aren't in the input. Don't duplicate a CTA if it would repeat its label text.
  - CSS `text-transform` is allowed (the source text stays the same); changing the characters in the source is not.
- **Links:** every `href` identical, including tracking params, `mailto:` subjects, merge tags (e.g. `__CUSTOMER_ID__`), and tracking attributes on `<a>` tags (`data-*`, `name`, `target`, `class` used for tracking). Keep each link on the same content it was on.
- **Images:** same `src` and `alt` for every image. You may change displayed size/shape/border (e.g. round speaker photo) but not swap or remove images. No new images (no stock photos, icons, or background images from elsewhere).
- **Order:** keep the content sections in their original order. Redesign *how* each section looks, not *what* or *where* it is in the reading flow.

### Design rules
- **Visibly different** from `input.html`. The user re-sends the same webcast, so it must not look like the previous send. Change the structure, not just colours: e.g. hero treatment (dark band ↔ light centred headline ↔ split), learnings presentation (2×2 cards ↔ numbered full-width list ↔ checklist rows ↔ timeline), CTA shape (square ↔ pill ↔ full-width bar), speaker layout (side-by-side ↔ centred spotlight), section backgrounds and dividers.
- **Colours & fonts follow the brand source the user chose in pre-flight:**
  - **A) Same as `input.html`:** light-mode design uses only the hex colours already in `input.html`. Keep the exact `font-family` stacks from `input.html` (and any font `<link>` / `@import` it already has). Don't add new web fonts.
  - **B) From a URL:** light-mode design uses only the palette and fonts the user confirmed from that URL (see below). Don't mix in colours or fonts from `input.html` unless the user says so.
  - Either way, dark-mode overrides may add dark neutral backgrounds and light text needed for contrast, derived from the chosen palette.
- Changing the brand source never changes the content rules: text, links and images stay exactly as in `input.html` (no logos, icons or images pulled from the URL).

### Brand source B: URL
1. Fetch the URL the user gave (web fetch, `curl`, or the browser tool if the page needs JavaScript). Also read the stylesheets it links to.
2. Extract only what's actually on the page:
   - **Colours:** hex/rgb values from CSS custom properties (e.g. `--primary`), buttons/links, headings, header/footer backgrounds and body text. Ignore third-party widget/ad colours.
   - **Fonts:** `font-family` declarations for headings and body text, plus how they're loaded (Google Fonts `<link>`/`@import`, Adobe Fonts, or self-hosted `@font-face`).
3. **Show the user what you found and wait for confirmation before designing:** a short table of colours with their role (e.g. `#0A4F9E` primary/buttons, `#0E2340` headings, `#F7B718` accent) and the heading/body fonts. Ask them to confirm or correct it. Never guess a role you didn't see on the page; mark it "unclear" and ask.
4. Fonts in email: put the brand font first with an email-safe fallback stack (e.g. `'Brand Font', Arial, Helvetica, sans-serif`). Only add a font `<link>`/`@import` if it's a public Google Fonts URL. For self-hosted or licensed fonts (Adobe, custom files), ask the user before embedding anything; the default is to use the name plus the fallback stack only. Mention that Gmail and Outlook desktop will show the fallback font.
5. If the URL can't be fetched (blocked, login wall, bot protection, timeout) or shows no usable colours/fonts → tell the user exactly what happened and ask whether to try another URL or use option A. Don't fill in colours or fonts from memory or from the brand's name.

### Technical rules (cross-client)
- `<!DOCTYPE html>`, `lang`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<meta http-equiv="X-UA-Compatible" content="IE=edge">`, `<meta name="x-apple-disable-message-reformatting">`, `<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">`.
- Dark mode: `<meta name="color-scheme" content="light dark">`, `<meta name="supported-color-schemes" content="light dark">`, `:root { color-scheme: light dark; }`, `@media (prefers-color-scheme: dark) {…}` with `!important` overrides via classes, plus duplicate `[data-ogsc]` / `[data-ogsb]` rules for Outlook.com / Outlook apps. Gmail ignores these, so pick colours that survive Gmail's automatic inversion (avoid text that disappears on inverted backgrounds; logos on light/white chips).
- Layout: nested `<table role="presentation" border="0" cellpadding="0" cellspacing="0">`, 600px max container, inline styles on every element (head CSS is only progressive enhancement). No flex, grid, `position`, floats for layout, `<svg>`, `<script>`, forms, video or iframes.
- Mobile: `@media screen and (max-width:600px)` rules that stack columns, enlarge tap targets (≥44px), adjust padding and font sizes.
- Outlook desktop: `<!--[if mso]>` wrappers with fixed-width ghost tables, `mso-line-height-rule:exactly`, VML `v:roundrect` bulletproof buttons that use **the same href and same label** as the HTML button, and the `<o:OfficeDocumentSettings>` PixelsPerInch 96 block.
- Images: `width`/`height` attributes, `display:block`, `border:0`, `alt` unchanged.
- Hidden preheader stays the first thing in `<body>` with the same text (keep any `&zwnj;&nbsp;` padding).
- Keep the file under ~100 KB so Gmail doesn't clip it.

### Step 1 procedure
```
Step 1 checklist
- [ ] Pre-flight passed (input.html has HTML; redesigned.html overwrite decision made)
- [ ] Asked brand source: A) input.html colours/fonts or B) URL; got the answer
- [ ] If B: fetched URL, showed palette + fonts table, user confirmed
- [ ] Read input.html fully; noted section order, all links/images (and palette/fonts if A)
- [ ] Wrote webcast-emailer-redesign/redesigned.html (input.html untouched)
- [ ] Verifier PASS with no text/link/image differences
- [ ] Lint warnings fixed or explained
- [ ] Reported to user
```
1. Ask the brand-source question (pre-flight) and wait. If B, complete [Brand source B: URL](#brand-source-b-url) and get the user's confirmation.
   Then read `input.html` end to end. List the section order, links and images (plus palette and fonts if A) for yourself.
2. Write the new design to `webcast-emailer-redesign/redesigned.html`.
3. Verify (must print `RESULT: PASS`):
   ```bash
   node webcast-emailer-redesign/scripts/verify-emailer.mjs webcast-emailer-redesign/input.html webcast-emailer-redesign/redesigned.html
   ```
   Any TEXT/LINK/IMAGE FAIL → fix `redesigned.html` and re-run until PASS. Do not "fix" by editing `input.html`.
4. Reply briefly: what changed in the layout (3–5 bullets), that text/links/images were verified identical, any remaining lint warnings, and that real inbox testing is still recommended. Then wait for Step 2.

---

## Step 2: Copy update from the JSON prompt

**Trigger:** the user pastes the HR.com copywriting JSON prompt (it starts like "Act as a premium, B2B email copywriter and HTML data parser for HR.com…" and ends with a JSON structure containing `subject`, `preheader`, `introParagraph`, `keyLearnings`, …).

### What changes and what never changes
- **Change only these 3 things in `redesigned.html`:**
  1. Hidden **preheader** text → `preheader`
  2. The **two intro paragraphs** → `introParagraph` (text before `\n\n` → first intro paragraph, text after → second)
  3. The **key learning items** → `keyLearnings[0..3]`, in order
- **Never change** anything else, even if the JSON has a value for it: subject-line HTML comments, `<title>`, headline/title, date, CTA labels and links, logo/`logoAlt`, `apShortcode`, `storyId`, hosts/speakers, credits/`creditValue`, footer, styles, layout.
- **Subject lines go in the chat reply only.** Never write them into any file.

### Pre-flight (ask, don't assume)
- `redesigned.html` doesn't exist → ask which file to update (don't silently use `input.html`).
- You can't clearly identify the preheader, exactly two intro paragraphs, or the learning items → ask the user to point them out.
- The email doesn't have exactly 2 intro paragraphs or exactly 4 learning items → ask how to map them (e.g. remove the 5th item? merge?). Don't decide yourself.
- The pasted prompt is missing webcast title/description/takeaways → ask for them.

### Generating the copy
- Follow the pasted prompt's rules **exactly as written in that paste**. Re-read it every time; if it differs from the list below, the paste wins.
- Write copy strictly from the provided title, description and raw takeaways. No invented stats, names, dates, outcomes or claims.
- Self-check before editing (current HR.com on-demand rules):
  - 10 subject lines, numbered 1–10, each ≤60 chars (aim 40–55), anchored to the webcast title/topic; mix of 2–3 pain/risk, 2–3 how-to/solution, 2 question, 2 benefit; no colons; questions end with `?`; no "on-demand"/"ondemand"/"on demand"; no dates or "tomorrow"-style hooks; no spammy hype.
  - Preheader ≤90 chars, own-schedule angle, soft urgency ending (e.g. "watch now free").
  - Intro: exactly 2 paragraphs (Problem, then Solution), 350–500 chars combined.
  - 4 key learnings, 6–10 words each, single sentence, starting with an action verb/active noun, based strictly on the raw takeaways.
  - Intro + learnings never contain "live", "free" (any variation), "on-demand"/"ondemand"/"on demand", "recording", "recorded session", "recorded webcast".

### Step 2 procedure
```
Step 2 checklist
- [ ] Pre-flight passed (target file, 1 preheader, 2 intro paragraphs, 4 learnings identified)
- [ ] Copy generated and self-checked against the pasted prompt's rules
- [ ] Backup taken
- [ ] Replaced ONLY the inner text of preheader, intro p1, intro p2, learnings 1-4
- [ ] Verifier: links/images PASS; text hunks only in those 3 areas
- [ ] Chat reply = 10 subject lines + old/new changes list
```
1. Back up before editing:
   ```bash
   cp webcast-emailer-redesign/redesigned.html /tmp/redesigned.before-step2.html
   ```
2. Edit only the **inner text** of those elements. Keep the element, its attributes/inline styles, numbering/bullet/icon markup, and any trailing preheader padding (`&zwnj;&nbsp;…`). HTML-escape `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`.
3. Verify:
   ```bash
   node webcast-emailer-redesign/scripts/verify-emailer.mjs /tmp/redesigned.before-step2.html webcast-emailer-redesign/redesigned.html --allow-text-changes
   ```
   Must end `RESULT: PASS`, and every printed text hunk must sit in the preheader, intro or learnings. A hunk anywhere else means something else was touched: restore that part from the backup.
4. Chat reply, in this exact shape and nothing else (no full JSON, no extra commentary beyond one line on verification):

   ```
   **Subject lines**
   1. …
   2. …
   …
   10. …

   **Updated in webcast-emailer-redesign/redesigned.html**
   | Section | Old | New |
   |---|---|---|
   | Preheader | … | … |
   | Intro paragraph 1 | … | … |
   | Intro paragraph 2 | … | … |
   | Learning 1 | … | … |
   | Learning 2 | … | … |
   | Learning 3 | … | … |
   | Learning 4 | … | … |

   Verified: links, images and all other text unchanged.
   ```
