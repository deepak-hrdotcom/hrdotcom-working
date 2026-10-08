---
name: figma-lessons
description: Hard-won, brand-neutral rules for building design systems, decks, prototypes and motion/video in Figma through the Figma MCP (use_figma, upload_assets, export). Load this alongside figma-use before any Figma build, edit, motion or export, and whenever setting up variables, text styles, masters boards, masks, images, video scenes or reviewer-facing files — even if the user doesn't mention "lessons". Skipping it repeats known tool failures.
---

# Figma lessons

Learned on a real 5-channel brand project (design system → deck → website → AI flow → video). Brand values don't belong here; these are tool and process rules. Load `figma-use` first, as always.

## Tool limits (tested, don't re-test)

- **Fonts:** `use_figma` can't load local/licensed fonts. Build in **Inter**, label it as the stand-in on the type board, and note the swap. Decide early whether the swap ever happens: a late swap reflows every frame and mismatches already-rendered video.
- **Images:** place with `upload_assets`. Plugin `figma.createImage` does not work here.
- **Video fills:** the agent can't place video. Leave a sized frame with a poster image and ask the user to drag the MP4 on (paid plan).
- **Masks:** mask a **plain frame that wraps the instance**. A mask applied straight to an instance is ignored.
- **Prototype renderer can't show masks reliably** (they flicker or vanish). If a masked look must survive in a prototype, export it at 2× and use the PNG. Keep the live source hidden next to it and note "re-bake if the component changes".
- **Motion scales around the node centre.** A node pulled out of an auto-layout row may keep FILL width, so resize it before you keyframe.
- **Instance sublayers can't take keyframes.** Put motion that every channel shares in the master component.
- **Video renderer ignores paint opacity.** For tints, use solid or soft surface tokens (e.g. `Surface/action-soft`), never a colour at 20%.
- **Smart Animate** matches layers by name. Give the changing layer the same name in every variant (e.g. `Header`).
- **Interactions in component Default variants** (hover → Hover, Smart animate 150 ms ease-out) reach every instance for free.
- **Tabular figures** can't be set via the plugin API. Set them by hand and say so.
- **Glow from a shadow:** offset 0, spread 0, blur ~26. A sourced CTA shadow with an offset won't read as a glow.

## Variables: 4 tiers, never skip one

1. **Brand** (hidden): raw ramps (50–950), scale numbers.
2. **Alias** (hidden): role ramps (Primary, Accent, Neutral, Success, Warning, Error…), radius, border width, space, font family and weight strings.
3. **Semantic**: modes **Light / Dark**. Surface / Border / Text / Icon / Dataviz with shared names (`default`, `action`, `action-hover`, `on-action`, `disabled`…).
4. **Responsive**: modes **Desktop / Mobile / Deck / Tablet / Wide**. Font size, line height, letter spacing per style, grid columns/margin/gutter, space jumpers (e.g. `space/4xl-xl`).

- Each tier only references the tier above. No component-specific tokens.
- **Letter spacing is stored in px** (= % × font size per mode). Figma applies tracking variables as px.
- Every variable gets a one-line description: its source, or "Extended" if you filled a gap. Never invent brand values. Unsourced = not used.
- Set the mode per frame, or per page when the page is one device (deck/video pages → Deck).

## Styles

- Every text style binds **family, weight, size, line height, letter spacing** to variables. No raw values.
- Gradients are paint styles with stops bound to Alias variables.
- Deck/video minimum text is about **28 px on 1920**. Write down any exception (footer, source line) in the type rules.

## Compliance: after every build

Run [scripts/compliance.js](scripts/compliance.js) through `use_figma` (set `ROOT_ID`). The target is **0 unbound fills, 0 unbound strokes, 0 unstyled text**. Fix the issues and re-run before showing the user. Before a build, list the rules of every board it touches in the plan.

## Never delete mid-project

Rename to `OLD · <what> (final review)` and hide it. Same for exports: keep the old file as `_OLD-v1`. Delete only in the final review, with the user.

## Masters board template

Doc boards are 1440 wide (80 margins → 1280 content). Each one: **hero** (eyebrow + title + one line) → one block per item:

1. **01 · Why**: 2–3 lines, the problem it solves.
2. **02 · What**: white outlined stage, all variants and states, short labels.
3. **03 · Where**: cards for each channel or use. Atoms list the components that use them.
4. **04 · How**: usage table plus Do / Don't cards.

Minimal text. Highlight the component, not notes.

## Components for non-designers

- Masters show **descriptive placeholders for editable text** ("Deck title: one idea, two lines max") and **real content for locked parts**. The difference then reads as "edit this" vs "fixed".
- Users edit only component properties, and every layer inside stays locked. One variant per layout type, like PowerPoint masters.
- For a one-channel tweak (e.g. bigger text in video), override the instance and leave the component unchanged.

## Reviewer-facing files

- **Cover:** a 1600×960 thumbnail frame, plus a `Reviewer guide · START HERE` frame beside it: route through the pages, time per stop, a "short on time?" path, and "Open page →" node links.
- **START HERE** frames at the top-left of any page with a must-do action (play the film, open the prototype).
- **Reviewer notes** per deliverable: a big "For reviewers" tag plus a **Quick access** row of node links to masters and components.
- Pages: numbered sub-pages (`↳ 1.1 Variables`…). Divider pages make the panel too long.
- **Final QC sweep:** placeholders left, tool or agent names, third-party names/logos, broken or hidden node links, unstyled text, visible `OLD ·` frames, stale PNG thumbnails (re-export).

## Video built in Figma

- Each scene **opens on the previous scene's last frame** (clone it, or place a PNG plate). Check the seam (SSIM ≈ 1.0) after export.
- Keep timings loose. The message matters more than exact timing, and the voice-over gets placed per title.
- Process per scene: discuss → rough sketch row → user locks it → generate frames → photomatic row under the sketch → approve → build/export.

## Process

- Keep a `DECISIONS.md` log (#, date, area, decision, why). Read it and the original brief every session. The original brief is the only source of requirements; paraphrases drift.
- Build one board or one slide at a time, and get the user's sign-off before the next.
