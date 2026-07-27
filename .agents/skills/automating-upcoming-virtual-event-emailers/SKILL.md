---
name: automating-upcoming-virtual-event-emailers
description: Automates the creation of premium HTML promotional emailers for HR.com webcasts and virtual events. Uses extracted landing page data (sessions, sponsors, descriptions) to rewrite copy and generate responsive email HTML.
---

# Automating Webcasts & Virtual Event Emailers

## 🎯 When to use this skill
- Trigger words: "build demo emailer", "build standalone emailer", "build on demand emailer", "build virtual event emailer".
- The user provides structured data extracted via the `virtual_event_extractor.js` or `webcast_extractor.js`.

## 🛠️ Resources
- **Extractor Scripts:** `00-emailer-automation/brainstorming/` (Contains both `virtual_event_extractor.js` and `webcast_extractor.js`).
- **Demo Template:** `00-emailer-automation/email-reference/premium-templates/demo.html`
- **Standalone Template:** `00-emailer-automation/email-reference/premium-templates/standalone.html`
- **On-Demand Template:** `00-emailer-automation/email-reference/premium-templates/ondemand.html`
- **Virtual Event Template:** `00-emailer-automation/email-reference/premium-templates/virtual-event.html`

## 🚨 Template Selection Guardrail
The user's requested emailer type is the source of truth. Never infer the template from the sponsor, title, event category, credits, prior examples, or similar existing folders.

Before creating any folder or copying any HTML, explicitly map the request phrase to the source template:

| User request phrase | Required source template | Output folder prefix |
| --- | --- | --- |
| `build standalone emailer` | `00-emailer-automation/email-reference/premium-templates/standalone.html` | `standalone-` |
| `build demo emailer` | `00-emailer-automation/email-reference/premium-templates/demo.html` | `demo-` |
| `build on demand emailer` | `00-emailer-automation/email-reference/premium-templates/ondemand.html` | `ondemand-` |
| `build virtual event emailer` | `00-emailer-automation/email-reference/premium-templates/virtual-event.html` | `virtual-event-` |

Required pre-copy check:
- If the user says **"build standalone emailer"**, the copied source path MUST contain `premium-templates/standalone.html` and the destination folder/file MUST start with `standalone-`.
- Do **not** use `demo.html` for a standalone request, even if the event data looks like a demo, includes `Credits: N/A`, has one sponsor, or resembles an older demo emailer.
- Do **not** start from an existing generated emailer folder as a shortcut. Always copy from the required master template, then inject dynamic data.

## 📋 Extractor Output Format (Webcast)
The `webcast_extractor.js` outputs a tab-separated row with these columns (in order):
1. **Title** — Event title
2. **Date** — Event date/time string (e.g. `April 14, 2026 at 11:00 AM - 12:00 PM ET`)
3. **Description** — Full cleaned description text
4. **Sponsors** — Pipe-separated: `Name::LogoURL::ProfileLink`
5. **Presenters** — Pipe-separated: `Name::Title - Company::ImageURL`
6. **RegistrationLink** — Full registration URL
7. **Credits** — Pipe-separated: `BadgeImageURL::CreditText` (or `N/A`)

## 📋 Additional Provided Data
Along with the extracted data, the user will provide variables (with examples below):
- `story id: 1775664752484` (Replace `__STORY_ID__` in the template's primary hero CTA. The generated link will look like `...&storyID=1775664752484&...`)
- `secondary cta: https://web.hr.com/9e3b` (Replace `__SECONDARY_CTA__` in the template's "Curious? Find out more here" pill button and "Register anyway" link)
- `ve name: ai4hr` (Replace `__VE_NAME__` in the Virtual Event callout header inside the `<strong style="color:#2A343E;">` tag)
- `ve cta: https://web.hr.com/xegb` (Replace `__VE_CTA__` in the Virtual Event callout "Check it out here" button)
- `ondemand cta: https://web.hr.com/s1bww` (Replace `__ONDEMAND_CTA__` in the On-Demand template's "View OnDemand" hero & mid-content buttons)
- `Here's what you'll learn:` data (Use this explicitly for the 4 bullet points. Do not invent new points. If more than 4 are provided, select exactly 4.)

## 📋 Workflow (The Generator Engine Logic)

When requested to build or process an emailer, follow this pipeline:

### 1. Data Ingestion & Validation
- Read the structured tab-separated row provided by the user.
- For **Virtual Events**, the format includes full Session lists (Time::Title) and 10 sponsor logos.
- For **Webcasts**, the format includes Presenter lists (Name::Title::ImgURL) and 1-2 sponsor logos.
- Parse out the individual entities. Ensure URLs (especially relative ones) are handled correctly.

### 2. AI Creative Rewriting (The "Hook")
- **Do not** just copy and paste the raw description into the email.
- **Analyze** the original description to define:
  1. The single biggest **Pain Point** (e.g., Burnout, Disengagement, Compliance risks).
  2. The **Value Proposition/Solution** (e.g., actionable strategies, expert frameworks).
- **Rewrite ONE short punchy paragraph** (150–220 characters max) designed to drive clicks:
  - Hook first: lead with the pain point or the opportunity, then name the session as the answer.
  - Use second-person tone ("You", "Your team"). End with an implicit or explicit call to register.
  - Style: `font-weight: 400; color: #4A5568; font-size: 16px; line-height: 28px; text-align: left`.
  - **CRITICAL**: This is ONE paragraph only — do NOT write two paragraphs. The old two-paragraph pattern is deprecated.
- **Generate "What You'll Learn" bullet titles** directly from the explicit "Here's what you'll learn" data provided by the user in the prompt:
  - **STRICT CONSTRAINT**: You MUST use the exact learning points provided by the user. Do NOT assume, invent, or extract points from the general description if explicit points are provided. Ask the user if you have questions.
  - If the user provides more than 4 points (e.g., 5 or 6), you must select and generate **exactly 4** of them.
  - Each bullet is a **single bold sentence only** — no description/subtext below it.
  - Write them to be scannable: start with a noun or verb, 6–10 words max per bullet (you may slightly condense the user's provided points to meet this length, but do not change the core meaning).
  - Use the four brand badge colors in order: `#EF4A3D`, `#4AC4D6`, `#94C83D`, `#FDB414`.
  - Badge text colors: `#FFFFFF`, `#0D1F28`, `#1A2A00`, `#1A1000` respectively.
- Tone: Act as a senior copywriter. Professional, authoritative, yet approachable and highly conversion-focused to get maximum registrations.

### 2b. Subject Line & Preheader Generation (MUST DO — act as expert email copywriter)
Generate these **before** writing any HTML. Present them to the user in a clearly formatted block **at the top of your response** before the HTML generation begins.

**Output format to user:**
```
📧 EMAIL SUBJECT LINE:
[Subject Line Here]

👁 PREHEADER TEXT:
[Preheader text here]
```

**Subject Line Rules:**
- Max 50 characters (aim for 40–50 for best mobile display)
- Lead with the emotional hook or the pain point — NOT the event title
- Use a conversational, second-person tone: make it feel personal and urgent
- Include a time anchor when relevant (e.g., `[May 6]`, `Tomorrow`, `This Wed`)
- Avoid spam trigger words: FREE (in caps), !!!, $$$, "guaranteed"
- NO colons to split subject line unless it creates strong tension
- Examples of strong patterns:
  - `Your culture is being tested. Are you ready? [May 6]`
  - `Chaos is the new normal — lead through it. Join us May 6`
  - `When everything's uncertain, this is what great leaders do`

**Preheader Text Rules:**
- Max 90 characters (inbox shows ~85–110 chars after subject)
- It must **complement** the subject line — never repeat it word-for-word
- Reinforce the value prop or add a second hook that extends the subject
- End with a soft urgency signal: date, "register free", or "learn how"
- The preheader `<div>` must have `&#847;&zwnj;&nbsp;` padding characters after the text to prevent inbox apps from pulling body copy into the preview
- Inject it into the HTML as:
  ```html
  <!-- ============================================================ -->
  <!-- SUBJECT LINE (do not render in email — reference only)      -->
  <!-- ============================================================ -->
  <!-- SUBJECT: [Subject line text here] -->

  <!-- ============================================================ -->
  <!-- PREHEADER TEXT                                               -->
  <!-- ============================================================ -->
  <div style="display:none;font-size:1px;color:#ECEEF0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">[Preheader text]&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
  ```

### 3. Master Template Assembly
- **Determine the pathway based on the request (STRICT MAPPING):**
   - **"build demo emailer"**: Clone `demo.html` into a new dedicated subfolder inside `00-emailer-automation/webcasts/`. The **filename must match the folder name** and start with `demo-` (e.g., `demo-2026-04-08-title/demo-2026-04-08-title.html`).
   - **"build standalone emailer"**: Clone `standalone.html` into a new dedicated subfolder inside `00-emailer-automation/webcasts/`. The **filename must match the folder name** and start with `standalone-` (e.g., `standalone-2026-04-08-title/standalone-2026-04-08-title.html`). **CRITICAL**: Use this template strictly if requested, regardless of other clues.
   - **"build on demand emailer"**: Clone `ondemand.html` into a new dedicated subfolder inside `00-emailer-automation/webcasts/`. The **filename must match the folder name** and start with `ondemand-` (e.g., `ondemand-2026-04-08-title/ondemand-2026-04-08-title.html`).
   - **"build virtual event emailer"**: Clone `virtual-event.html` into a new dedicated subfolder inside `00-emailer-automation/webcasts/`. The **filename must match the folder name** and start with `virtual-event-` (e.g., `virtual-event-2026-04-08-title/virtual-event-2026-04-08-title.html`).
   - **🚨 CRITICAL — VERSIONING:** If an emailer folder already exists for the event, **DO NOT overwrite it**. Instead, create a new folder and a new version of the emailer by appending a version number to both the folder name and the filename (e.g., `virtual-event-2026-04-08-title-v2/virtual-event-2026-04-08-title-v2.html`).
- **🚨 CRITICAL — STATIC SECTIONS: NEVER TOUCH.**
  - The `<!-- CREDIT INFORMATION -->` section, the `<!-- FOOTER -->` section, and the `<!-- VIRTUAL EVENT CALLOUT -->` block (if present in the template) must **ALWAYS be copied exactly as-is** from the master template. Never modify any text, links, images, or layout within them.
  - **CRITICAL for Credits:** Even if the input data explicitly states `Credits: N/A`, **DO NOT REMOVE** the `<!-- CREDIT INFORMATION -->` block. If the template has it, it MUST remain in the final output. The user will manually update the credit information section later.
  - These sections are audited sections — any accidental edits will break compliance and branding.
- **IMPORTANT:** The **sponsor logo section is a separate section that MUST be updated** for each emailer using the dynamically extracted sponsor data. Do not leave the placeholder sponsors in the final HTML.
- **Only** inject/list the dynamic sections (event agenda items / presenters / sponsor logos) based on the extracted data.

- **Hero Layout (Webcasts specifically):**
   - The webcast template uses a distinct **multi-tier hero design**:
     - **Tier 1 (White Header Bar):** A pure white `<tr>` containing a 2-column nested table. Sponsor logo on the left, "Upcoming Webcast" text label on the right (or "On-Demand Webcast" for on-demand). (Uses tables instead of inline-block divs to support Outlook Word rendering engine).
     - **Tier 2 (Colored Hero):** Contains the title, date, and the primary CTA button. `linear-gradient(160deg, #C01060 0%, #D44030 100%)` with `background-color: #C01060` as Outlook fallback. No descriptive copy or sponsor chips here. **For On-Demand Webcasts, DO NOT add time and date in the hero section, and note that the CTA button styling differs.**
     - **Tier 3 (White Copy+Bullets):** `background-color: #FFFFFF`. Contains the single-paragraph intro and the "What You'll Learn" bullets.

- **CTA Hierarchy & Weight (CRITICAL for Conversions):**
  - **Primary CTA (Hero):** Solid white button with brand red text (`#C01060`). `background: #FFFFFF; bgcolor="FFFFFF"` on the `<td>`. This is the single dominant visual action item in the email.
  - **Secondary CTA (Post-bullets):** Must be a **text link** (e.g., "Ready to join? Register for free &rarr;"), NOT another pill button. This reduces visual competition while providing a click opportunity for users who scrolled past the hero.
  - **Passive CTA (Bottom Reminder):** A full-width subtle row (`background-color:#E8ECEF`) below the speakers section containing a sentence like "Can't attend the live webcast? Register anyway to access the recording." Do NOT place a "Register Now" pill button here.

- **Design Rules:**
   - **Font:** Always use `'Roboto', Arial, Helvetica, sans-serif` for all inline `font-family` declarations. The Google Fonts import must be `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');`. The Outlook MSO fallback block uses `Arial, sans-serif`. **Never use Manrope** — that font has been replaced.
   - Ensure all image sources (`src`) use the actual HR.com CDN (`public-cdn.hr.com`), NOT Google proxy URLs.
   - **Sponsor Logos (Webcasts specifically):** Keep sponsor logos clean and unlinked. **Do NOT wrap the sponsor `<img>` in an `<a>` tag.** For webcasts, only the `<img>` should be rendered. **NEVER add `filter: grayscale()`, any CSS `filter` property, or `opacity` less than 1 to sponsor logo `<img>` tags.** Logos must always be full colour at full opacity. **Sizing MUST be proportional using: `style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;"` — do NOT set a hard `width` or `height` attribute. This allows tall/square logos to be constrained by `max-height:40px` and wide/horizontal logos to be constrained by `max-width:90px`, whichever kicks in first, always preserving aspect ratio. If a sponsor logo path is not available (e.g. Sponsors: N/A), STILL include the `<img>` tag with `src=""` — NEVER drop the `<img ...>` tag completely for the sponsor.**
   - **Speaker Avatars & Copy (Webcasts specifically):** You MUST always include the speaker image in the `<div class="speaker-card-div">` layout. Pay close attention to parsing the Presenter list string (`Name::Title::ImgURL`). **CRITICAL: Image URLs from HR.com often do NOT have a file extension (e.g., `.../1639477478951_120`). Treat them as fully valid image paths.** NEVER fallback to a placeholder image; always render the exact image URL provided in the data so that broken images are immediately visible during QA. Do not drop the `<img ...>` element under any circumstances.
   - **Presenter Logic:** Adjust the text above the speaker cards based on the number of presenters:
     - 1 Presenter: "Your expert host" and "Learn directly from industry leader"
     - >1 Presenters: "Your expert hosts" and "Learn directly from industry leaders"
   - Do not break the established responsive fluid layouts.

- **Bullet Alignment Rules (Critical for cross-client rendering):**
  - Each bullet uses a two-column table: badge `<td>` (fixed `width="36"`) and text `<td>`.
  - Both `<td>` elements MUST have **both** `valign="middle"` (HTML attribute) AND `style="vertical-align:middle;"` (inline CSS). This dual approach is required for Outlook (uses attribute) and modern clients (uses style).
  - The badge inner `<td>` must have `width:26px; height:26px; line-height:26px; mso-line-height-rule:exactly` so the number is vertically centered in the colored square.
  - Do NOT add `padding-top` to the badge cell — this was the root cause of misalignment in older versions.
  - Each bullet is **title only** (bold `<span class="takeaway-title">`). Do NOT add a `<span class="takeaway-desc">` subtext line — that pattern is deprecated.

- **Spacing Rules:**
  - Intro `<td>` padding: `40px 36px 6px 36px` (tight bottom so it flows into bullets).
  - Bullets `<td>` padding: `14px 36px 32px 36px` (tight top to close the gap, generous bottom before CTA).
  - Mid-content Text CTA `margin`: `24px auto 0 auto`.

### 4. Quality Assurance Checklist
- [ ] Are all sessions/presenters listed correctly?
- [ ] Are presenter headshots framed cleanly and circularly? (Webcasts only)
- [ ] Are sponsor logos high-resolution and full color?
- [ ] Does the intro paragraph hit 150–220 chars and lead with a clear hook?
- [ ] Are the "What You'll Learn" bullets title-only (no subtext)?
- [ ] Are badge numbers vertically centered and aligned with the text on the same row?
- [ ] Is the hero CTA a solid white button and the only full button in the email?
- [ ] Is the mid-content CTA formatted as a text link to avoid competing visual weight?
- [ ] Is the passive registration reminder row present below the speaker section?
- [ ] Are the certification badge section and footer **exactly** identical to the master template?
- [ ] Is the primary CTA obvious, correctly linking to the Registration page?

### 💡 Agent Environment Tips
- **Large Block Replacements:** If you need to strip out or replace massive chunks of HTML where `replace_file_content` block-matching might fail due to whitespace anomalies, write a quick custom manipulation script.
- **Avoid Template Literal Syntax Errors:** When writing Node.js manipulation scripts via the `write_to_file` tool, **do NOT use template literals (backticks ` **` ) ) or string interpolation (`${var}`). These frequently trigger JSON escaping syntax errors resulting in wasted time and retries. Rely exclusively on simple string concatenation (`+`) and Array `['string', var].join('\n')`. Do NOT double-escape the newline (e.g. `\\n`), as that will literally print '\n' into the generated raw HTML.
- **Sponsor Regex Warning:** The `virtual-event.html` template does **NOT** contain a `<!-- Lead Magnet / Guide -->` tag. When writing a regex to replace sponsor logos, be very careful NOT to use `<!-- Lead Magnet / Guide -->` as your end bound. Instead, target the specific inner `<div>` containing the logos or use `<!-- CREDIT INFORMATION` as your bound, and ensure you do not accidentally overwrite the `<tr><td>` wrapper or the section `<h2>` headings!
- **Whitespace & Newlines in Regex:** When writing Node.js replacement scripts, remember that HTML strings (like dates, paragraphs, or the **"What You'll Learn" bullet points**) almost always wrap across multiple lines in the HTML source. Avoid strict literal string matching via `String.replace('Exact String')` for these sections. Instead, use broad regex with `[\s\S]*?` (e.g., `/<span class="takeaway-title"[\s\S]*?>[\s\S]*?<\/span>/`), or bypass the script entirely and use your built-in `multi_replace_file_content` tool to edit the bullets directly in the HTML.
- **⚠️ Python is NOT installed** in this workspace. Always write temporary scripts in **Node.js** (`replace.js`) using `fs.readFileSync` and Regex/String/Array manipulation, run them with `node`, and verify the output.
