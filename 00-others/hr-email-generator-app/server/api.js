// Local API for the Create Emailer wizard, mounted on the Vite dev server at /api.
// Every route runs Claude Code headless on this machine; nothing here works when deployed.

import fs from 'node:fs';
import path from 'node:path';
import { runClaude, extractJson, newJob, downloadedSince, resolveDownload, MODELS, DRIVE_TOOLS } from './claude.js';
import { scanSite, summarizeCss } from './siteScan.js';
import { COPY_RULES } from '../src/copyRules.js';
import { variantParts, PALETTES } from '../src/templates.js';

// Google Drive "webcast-emailers" folder and its per-event subfolders
const DRIVE_FOLDERS = {
  root: '1VXxTRhX2RXdk1J2UzxPba6UJ4QOsZw6y',
  demo: '1_I4E3_xHoB-oxikIrozuBk_oCNDUB2Xk',
  ondemand: '1UvCZYtjcpYJeCEHfyGU6zmrhhKw9pOKJ',
  standalone: '1q-3THuqvzUp8u7dk7_nwCjWvfwRFWwRh',
  virtual: '1nOfJVWsFbBl3A7GOHP0iNld1rDU33uKY',
};
const EVENT_NAMES = { demo: 'Demo webcast', ondemand: 'On-demand webcast', standalone: 'Standalone webcast', virtual: 'Virtual event session' };
const q = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const folderUrl = (id) => `https://drive.google.com/drive/folders/${id}`;

// ---------------------------------------------------------------- branding
// From a website URL, or (when the site blocks automated visits) CSS the user pasted from it
async function brand({ url, css }) {
  let scan;
  if (css && css.trim()) {
    const summary = summarizeCss(css.slice(0, 400_000));
    if (!summary.topColors.length && !summary.cssVariables.length) {
      return { ok: false, reason: 'No colors found in the pasted CSS. Copy the styles of the logo, a main button and the page text.' };
    }
    scan = { ok: true, url: url ? `${url} (CSS pasted by the user)` : 'CSS pasted by the user', ...summary };
  } else {
    if (!url) throw new Error('No website URL given.');
    try { scan = await scanSite(url); } catch (e) { scan = { ok: false, reason: e.message }; }
    if (!scan.ok) return { ok: false, reason: scan.reason };
  }

  const prompt = `You pick a company's brand colors and font from a scan of its website, for use in an email.
Scan of ${scan.url} (counts are how often each value appears in the CSS):
${JSON.stringify(scan, null, 1)}

Choose:
- primary: the main brand color (logo, main buttons, links). Must be a hex color from the scan.
- secondary: a second, clearly different brand accent color from the scan, or the same as primary if the brand has only one.
- dark: the brand's dark navy/charcoal color if one appears in the scan, else "".
- fontFamily: the brand's main font name as written in the CSS (use the real family, not a "Fallback" alias or an icon font), or "" if none.
- serif: true if that font is a serif font.
- googleFontsUrl: the entry from googleFontLinks that loads that font, else "".
- brandName: the company name.
Ignore colors that clearly come from plugins, cookie banners or social icons.
Reply with ONLY this JSON: {"primary":"","secondary":"","dark":"","fontFamily":"","serif":false,"googleFontsUrl":"","brandName":""}`;
  const { text } = await runClaude(prompt, MODELS.writer);
  return { ok: true, ...extractJson(text), scanned: scan.url };
}

// ---------------------------------------------------------------- Drive lookup
// Finds the webcast's folder and downloads its earlier emails (for series emails)
async function lookup({ eventType, folderName }) {
  const parent = DRIVE_FOLDERS[eventType];
  if (!parent) throw new Error(`Unknown event type: ${eventType}`);
  const prompt = `Google Drive lookup. Read only: do not create, edit, move or delete anything.
1. Call search_files with query: parentId = '${parent}' and title = '${q(folderName)}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false
2. If there is no such folder, reply with ONLY {"folderId":null,"files":[]} and stop.
3. Call search_files with query: parentId = '<that folder id>' and mimeType = 'text/html' and trashed = false
4. For each HTML file, call download_file_content with its id. Each result names the local path the file was saved to.
5. Reply with ONLY this JSON: {"folderId":"<folder id>","files":[{"id":"","name":"","localPath":""}]}`;
  const started = Date.now();
  const { text } = await runClaude(prompt, { ...MODELS.drive, tools: DRIVE_TOOLS });
  const res = extractJson(text);
  const files = (res.files || []).map((f) => {
    let html = '';
    const local = resolveDownload(f.localPath, started);
    try {
      html = fs.readFileSync(local, 'utf8');
      fs.rmSync(local, { force: true });
    } catch { /* left empty: Claude gets no text for this file */ }
    return { id: f.id, name: f.name, recipe: readRecipe(html), text: html ? htmlToText(html).slice(0, 4000) : '' };
  });
  return { folderId: res.folderId || null, folderUrl: res.folderId ? folderUrl(res.folderId) : '', files };
}

// The wizard stores its settings and copy in an HTML comment at the top of every email
function readRecipe(html) {
  const m = html.match(/<!-- HRCOM-RECIPE (\{[\s\S]*?\}) -->/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}
const htmlToText = (html) => html
  .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<head[\s\S]*?<\/head>/i, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&rarr;/g, '→').replace(/&middot;/g, '·')
  .replace(/\s+/g, ' ').trim();

// ---------------------------------------------------------------- copy
const BANNED_ALL = /\b(live|free)\b/i;
// "live" (and livestream etc.) is banned everywhere: preheader, subject lines, intro, learnings
const BANNED_LIVE = /\blive(?:[\s-]?stream(?:ed|ing|s)?)?\b/i;
const BANNED_ONDEMAND = /\b(on[\s-]?demand|recorded|recording)\b/i;

function checkCopy(c, eventType, wantSubjects) {
  const errs = [];
  if (!c.preheader) errs.push('preheader is empty');
  if (c.preheader && c.preheader.length > 90) errs.push(`preheader is ${c.preheader.length} characters (max 90)`);
  const paras = String(c.intro || '').split(/\n\s*\n/).filter((p) => p.trim());
  if (paras.length !== 2) errs.push(`intro must be exactly 2 paragraphs separated by a blank line (got ${paras.length})`);
  if (!Array.isArray(c.learnings) || c.learnings.filter((l) => String(l).trim()).length !== 4) errs.push('learnings must be exactly 4 non-empty strings');
  const body = [c.intro, ...(c.learnings || [])].join(' ');
  if (BANNED_ALL.test(body)) errs.push(`intro/learnings use a banned word: "${body.match(BANNED_ALL)[0]}"`);
  if (eventType === 'ondemand' && BANNED_ONDEMAND.test(body)) errs.push(`intro/learnings use a banned word: "${body.match(BANNED_ONDEMAND)[0]}"`);
  if (BANNED_LIVE.test(c.preheader || '')) errs.push('the preheader uses the banned word "live"');
  if (wantSubjects) errs.push(...checkSubjects(c.subjectLines, eventType));
  return errs;
}

// The copy rules ask for a numbered list, so Claude sometimes puts "1. " inside each string
const cleanSubjects = (s) => (Array.isArray(s) ? s.map((l) => String(l).replace(/^\s*\d{1,2}\s*[.)-]\s*/, '').trim()) : s);

function checkSubjects(s = [], eventType) {
  const errs = [];
  if (s.length !== 10) errs.push(`subjectLines must have exactly 10 items (got ${s.length})`);
  if (s.some((l) => l.includes(':'))) errs.push('a subject line contains a colon');
  if (s.some((l) => BANNED_LIVE.test(l))) errs.push('a subject line uses the banned word "live"');
  if (eventType === 'ondemand' && s.some((l) => BANNED_ONDEMAND.test(l))) errs.push('a subject line mentions on-demand/recording');
  return errs;
}

// 10 subject lines on their own (for a later email in a series, or a fresh set)
async function subjects({ eventType, webcast, avoid = [] }) {
  const prompt = `Write exactly 10 email subject line options for an HR.com ${EVENT_NAMES[eventType]} promotional email.

WEBCAST:
Title: ${webcast.title}
Description: ${String(webcast.description || '').slice(0, 3000)}
Key learnings: ${(webcast.learnings || []).filter(Boolean).join(' | ') || 'n/a'}

Follow ONLY the SUBJECT LINE rules below (ignore the preheader, intro and learnings rules):
${COPY_RULES[eventType]}
Never use the word "live" (or livestream, live session, etc.) in any subject line.
${avoid.length ? `\nThese subject lines were already used; write 10 different ones:\n${avoid.map((s) => `- ${s}`).join('\n')}\n` : ''}
Reply with ONLY this JSON: {"subjectLines":["","","","","","","","","",""]}`;
  let { text } = await runClaude(prompt, MODELS.writer);
  let res = extractJson(text);
  res.subjectLines = cleanSubjects(res.subjectLines);
  let errs = checkSubjects(res.subjectLines, eventType);
  if (errs.length) {
    ({ text } = await runClaude(`${prompt}\n\nYour previous answer broke these rules, fix them:\n- ${errs.join('\n- ')}\nPrevious answer:\n${JSON.stringify(res)}`, MODELS.writer));
    res = extractJson(text);
    res.subjectLines = cleanSubjects(res.subjectLines);
    errs = checkSubjects(res.subjectLines, eventType);
  }
  return { subjectLines: res.subjectLines || [], warnings: errs };
}

// wantSubjects: write 10 subject lines too (email 1, or a later email whose series has none yet)
async function copy({ eventType, webcast, series, previous = [], wantSubjects = series.n === 1 }) {
  const prev = previous.map((p, i) => (p.copy
    ? `Earlier email ${i + 1} (${p.name}):\nPreheader: ${p.copy.preheader}\nIntro: ${p.copy.intro}\nLearnings:\n- ${(p.copy.learnings || []).join('\n- ')}`
    : `Earlier email ${i + 1} (${p.name}), full text:\n${p.text}`)).join('\n\n');

  const prompt = `You write promotional email copy for HR.com. This is a ${EVENT_NAMES[eventType]} email, email ${series.n} of ${series.m} promoting the same webcast.

WEBCAST FACTS (from the webcast page; never change or invent facts):
Title (this is the email headline and stays exactly as is; do not rewrite it): ${webcast.title}
Date and time: ${eventType === 'ondemand' ? '(on-demand, no date)' : webcast.dateTime}
Sponsor: ${webcast.sponsorName || 'n/a'}
Presenters: ${(webcast.hosts || []).map((h) => `${h.name} (${h.title})`).join('; ') || 'n/a'}
Raw key learnings from the page:
${(webcast.learnings || []).filter(Boolean).map((l, i) => `${i + 1}. ${l}`).join('\n') || 'n/a'}
Description:
${String(webcast.description || '').slice(0, 4000)}

YOU WRITE ONLY THESE PARTS:
- preheader
- intro: exactly two paragraphs separated by a blank line (paragraph 1 = the problem, paragraph 2 = the webcast as the solution)
- learnings: exactly 4 key learning points
${wantSubjects ? '- subjectLines: exactly 10 subject line options (as a JSON array of 10 strings, not a numbered string)\n' : ''}
HR.com COPY RULES FOR THIS EVENT TYPE:
${COPY_RULES[eventType]}
${wantSubjects ? '' : '\n(Ignore the subject line rules above: this email reuses the subject lines written for email 1.)\n'}
ALWAYS: never use the word "live" (or livestream, live session, etc.) anywhere: preheader, subject lines, intro or learnings. Never use "free" in the intro or learnings. Plain text only, no HTML or markdown.
${prev ? `
SERIES RULE: earlier emails for this same webcast already used the copy below. Your copy must keep the same meaning and the same facts but read clearly different: a different opening hook, different sentence structures and different verbs. Never repeat a phrase of 5 or more words from the earlier emails. The 4 learnings cover the same ideas, reworded.

${prev}
` : ''}
Reply with ONLY this JSON:
{"preheader":"","intro":"paragraph 1\\n\\nparagraph 2","learnings":["","","",""]${wantSubjects ? ',"subjectLines":["","","","","","","","","",""]' : ''}}`;

  let { text } = await runClaude(prompt, MODELS.writer);
  let c = extractJson(text);
  c.subjectLines = cleanSubjects(c.subjectLines);
  let errs = checkCopy(c, eventType, wantSubjects);
  if (errs.length) {
    ({ text } = await runClaude(`${prompt}\n\nYour previous answer broke these rules, fix them:\n- ${errs.join('\n- ')}\nPrevious answer:\n${JSON.stringify(c)}`, MODELS.writer));
    c = extractJson(text);
    c.subjectLines = cleanSubjects(c.subjectLines);
    errs = checkCopy(c, eventType, wantSubjects);
  }
  return { ...c, warnings: errs };
}

// ---------------------------------------------------------------- new design
// Claude designs the middle sections (hero → reminder) from a brief. The head, logo header,
// credits and footer stay fixed. Variant A, in the email's colors, is the technical reference.

const TOKEN_RE = /\{\{[A-Z0-9_]+\}\}|__[A-Z_]+__/g;
const HOSTS_OPEN = '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->';
const HOSTS_CLOSE = '<!--[if mso]></tr></table><![endif]-->';

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&rarr;/g, '→').replace(/&middot;/g, '·').replace(/&rsquo;|&#39;/g, "'");
const visibleText = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' '))
  .replace(TOKEN_RE, ' | ').replace(/\s+/g, ' ').trim();
const normText = (s) => s.toLowerCase().replace(/[^a-z0-9→]+/g, ' ').trim();

// Text pieces of 3+ words (one per text node) that every design must keep word for word
export const fixedPhrases = (html) => [...new Set(html
  .replace(/<!--[\s\S]*?-->/g, '<>')
  .split(/<[^>]*>/)
  .flatMap((node) => decode(node).split(TOKEN_RE))
  .flatMap((s) => s.split('·'))
  .map((s) => s.replace(/\s+/g, ' ').trim())
  .filter((s) => s.split(' ').length >= 3))];

export function checkDesign(ref, middle, hostCard) {
  const errs = [];
  const need = new Set(ref.middle.match(TOKEN_RE));
  const have = new Set(middle.match(TOKEN_RE));
  // Any of these shows the date: the full line, the split line, or calendar-tile pieces (render.js fills them)
  const DATE_TOKENS = ['{{SPLIT_DATE_TIME}}', '{{DATE_MON}}', '{{DATE_DAY}}', '{{DATE_WEEKDAY}}', '{{DATE_TIME_ONLY}}'];
  const dateAlt = have.has('{{DATE_TIME}}') || have.has('{{SPLIT_DATE_TIME}}') || (have.has('{{DATE_DAY}}') && have.has('{{DATE_MON}}'));
  for (const t of need) {
    if ((t === '{{DATE_TIME}}' || t === '{{SPLIT_DATE_TIME}}') && dateAlt) continue;
    if (!have.has(t)) errs.push(`placeholder ${t} is missing`);
  }
  for (const t of have) if (!need.has(t) && !(DATE_TOKENS.includes(t) && need.has('{{DATE_TIME}}'))) errs.push(`unknown placeholder ${t} (use only the reference's placeholders)`);
  if (!middle.includes(HOSTS_OPEN) || !middle.includes(HOSTS_CLOSE)) errs.push('the Outlook wrapper comments around {{HOSTS_SECTION}} must be copied exactly from the reference');
  for (const s of ['Your expert hosts', 'Learn directly from industry leaders']) if (!middle.includes(s)) errs.push(`the speakers labels must include the exact text "${s}"`);
  const ctaRef = (ref.middle.match(/data-cta="1"/g) || []).length;
  const ctaNew = (middle.match(/data-cta="1"/g) || []).length;
  if (ctaNew < ctaRef) errs.push(`tracking attributes missing: the reference has ${ctaRef} links with data-cta="1" data-captcha="1", the design has ${ctaNew}`);
  const refLinks = new Set([...ref.middle.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
  const newLinks = new Set([...middle.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
  for (const l of refLinks) if (!newLinks.has(l)) errs.push(`link missing: ${l}`);
  for (const l of newLinks) if (!refLinks.has(l)) errs.push(`new link not allowed: ${l}`);
  if (/<img\b(?![^>]*src="\{\{)/i.test(middle)) errs.push('no new images allowed in the sections (only the presenter photo in the host card)');
  if (/rgba?\(|hsla?\(/i.test(middle + hostCard)) errs.push('use solid hex colors only (no rgb/rgba/hsl), for Outlook');
  if (/<script|<form|<input|<video/i.test(middle)) errs.push('no scripts, forms or video');
  const text = normText(visibleText(middle));
  // Either approved registration button label is fine
  const alts = (p) => (/^(Save My Free Spot|Register Free) →$/.test(p) ? ['Save My Free Spot →', 'Register Free →'] : [p]);
  for (const p of fixedPhrases(ref.middle)) if (!alts(p).some((a) => text.includes(normText(a)))) errs.push(`fixed text missing or changed: "${p}"`);
  for (const t of ['{{H_NAME}}', '{{H_TITLE}}', '{{H_IMG}}', '{{H_ALT}}']) if (!hostCard.includes(t)) errs.push(`host card is missing ${t}`);
  return errs;
}

function parseDesign(text) {
  const part = (name) => {
    const m = text.match(new RegExp(`===${name}===\\s*([\\s\\S]*?)(?====[A-Z]+===|$)`));
    return m ? m[1].replace(/^```\w*\s*|```\s*$/g, '').trim() : '';
  };
  return { middle: part('MIDDLE'), css: part('CSS'), hostCard: part('HOSTCARD'), summary: part('SUMMARY') };
}

async function design({ eventType, brief = {}, palette, previousDesigns = [], changeRequest = '', current = null }) {
  const ref = variantParts(eventType, 0, palette || undefined);
  const p = palette || PALETTES[eventType];
  const prompt = `You are a senior email designer. Design a brand-new HTML email layout for an HR.com ${EVENT_NAMES[eventType]} promo. It must look clearly different from HR.com's standard templates.

${current ? `THIS IS A REVISION of the design below. Apply this change request and keep everything else as is:
"${changeRequest}"

CURRENT DESIGN:
===MIDDLE===
${current.middle}
===CSS===
${current.css || ''}
===HOSTCARD===
${current.hostCard}
` : `CREATIVE BRIEF
- The email should feel / make people: ${(brief.feel || []).join(', ') || 'not specified'}
- The one message it must deliver: ${brief.message || 'not specified'}
- Look & layout: ${(brief.look || []).join(', ') || 'designer\'s choice'}
- Colors: ${brief.colorNote || 'use the palette below'}
- Notes / references / things to avoid: ${brief.notes || 'none'}
${changeRequest ? `- Extra request: ${changeRequest}\n` : ''}`}
${previousDesigns.length ? `Earlier emails in this series used these designs; yours must look clearly different from all of them:\n${previousDesigns.map((d) => `- ${d}`).join('\n')}\n` : ''}
COLORS (hex). These already pass contrast checks: white text on accent/deep, dark text (#0B1220) on bright.
${JSON.stringify({ accent: p.accent, deep: p.deep, bright: p.bright, tint: p.tint, line: p.line, soft: p.soft, glowA: p.glowA, glowB: p.glowB })}
${brief.colorNote && brief.colorSource === 'describe' ? 'The user described their own colors above: use those instead, keeping WCAG AA contrast (4.5:1 for text).\n' : ''}
WHAT YOU DESIGN
Only the content sections that sit between the fixed logo header and the fixed credits/footer: hero, intro, key learnings, secondary CTA, speakers${ref.middle.includes('ve-callout-td') ? ', virtual event callout' : ''}${ref.middle.includes('registration') || ref.middle.includes('Register') ? ', registration reminder' : ''}, in that order. Below is the REFERENCE: HR.com's standard version of these sections, already in this email's colors. Use it as the source of truth for content, links, placeholders and technique; change the visual design freely.

REFERENCE SECTIONS:
${ref.middle}

REFERENCE HOST CARD (one card per presenter; the app repeats it and wraps cards for Outlook):
${ref.hostCard}

HARD RULES (the app checks these and rejects the design if any fails)
1. Content: keep every placeholder ({{...}} and __...__), every href exactly, and every piece of visible text word for word, including CTA labels, "Your expert hosts", "Learn directly from industry leaders" and the reminder/callout sentences. Add no new copy, no new links and no images (decorative shapes are fine as table cells with background colors). Numbering like 01–04 is fine.
${ref.middle.includes('{{DATE_TIME}}') ? `   Date options: {{DATE_TIME}} (full line), {{SPLIT_DATE_TIME}} (date<br>time), or calendar-tile pieces {{DATE_MON}} (e.g. DEC), {{DATE_DAY}} (10), {{DATE_WEEKDAY}} (Thursday), {{DATE_TIME_ONLY}} (1:00 PM - 2:00 PM ET).\n` : ''}2. Tracking: every link keeps its attributes exactly as in the reference (data-cta="1" data-captcha="1" where present).
3. Keep these two Outlook comments around {{HOSTS_SECTION}} exactly: ${HOSTS_OPEN} … ${HOSTS_CLOSE}
4. Structure: output a sequence of <tr> rows that sit inside the existing 600px wide main table. Tables for layout, inline styles, no divs for layout, no flex/grid, no position.
5. Outlook: solid hex colors only (never rgb/rgba/hsl). Any background-image gradient must have a bgcolor attribute and background-color fallback on the same cell. Buttons: <td bgcolor> with mso-padding-alt, as in the reference.
6. Dark mode: tag light sections and text with the reference's classes (dm-surface, dm-raised, dm-tint, dm-strong, dm-body, dm-muted, dm-accent, dm-line, body-copy-p, takeaway-title, speaker-name, section-heading, intro-section-td, takeaways-bg, speakers-bg) so they switch correctly. Sections that are already dark need no class.
7. Mobile: give padded cells class "m-pad"; multi-column rows use class "stack-cell" (stacks on phones) or "tile-cell" (2x2 tiles); headline keeps class "hero-title".
8. Fonts: use 'Roboto',Arial,Helvetica,sans-serif for sans text (the app swaps in client fonts) and Georgia,'Times New Roman',Times,serif if you want serif accents.
9. The host card must keep {{H_NAME}}, {{H_TITLE}}, {{H_IMG}}, {{H_ALT}} and the outer inline-block 260px shell from the reference card.
10. Optional extra CSS (for example extra mobile tweaks) goes in the CSS part. If it adds colors for your own classes, also add dark-mode versions under @media (prefers-color-scheme: dark), [data-ogsc] and [data-ogsb].

OUTPUT exactly these four parts and nothing else:
===MIDDLE===
(the <tr> rows)
===CSS===
(extra CSS, or leave empty)
===HOSTCARD===
(the host card HTML)
===SUMMARY===
(one sentence describing the design's look, for example "Dark navy hero with oversized serif headline, numbered learning tiles, side-by-side speakers")`;

  let { text } = await runClaude(prompt, { ...MODELS.writer, timeoutMs: 9 * 60 * 1000 });
  let d = parseDesign(text);
  let errs = d.middle ? checkDesign(ref, d.middle, d.hostCard) : ['no ===MIDDLE=== part in the reply'];
  if (errs.length) {
    ({ text } = await runClaude(`${prompt}\n\nYOUR PREVIOUS DESIGN FAILED THESE CHECKS. Return the full corrected design (all four parts) fixing every one:\n- ${errs.join('\n- ')}\n\nPREVIOUS DESIGN:\n===MIDDLE===\n${d.middle}\n===CSS===\n${d.css}\n===HOSTCARD===\n${d.hostCard}\n===SUMMARY===\n${d.summary}`, { ...MODELS.writer, timeoutMs: 9 * 60 * 1000 }));
    const d2 = parseDesign(text);
    if (d2.middle) {
      d = d2;
      errs = checkDesign(ref, d.middle, d.hostCard);
    }
  }
  if (!d.middle || !d.hostCard) throw new Error('Claude did not return a usable design. Try again.');
  return { ...d, warnings: errs };
}

// ---------------------------------------------------------------- save
const saving = new Map(); // folder name → running save, so a double click can't create two folders

async function save(body) {
  const key = `${body.eventType}/${body.folderName}`;
  while (saving.has(key)) await saving.get(key).catch(() => {});
  const run = doSave(body);
  saving.set(key, run);
  try { return await run; } finally { saving.delete(key); }
}

async function doSave({ eventType, folderName, folderId, fileName, html, subjectLines, subjectDocName }) {
  const parent = DRIVE_FOLDERS[eventType];
  if (!parent) throw new Error(`Unknown event type: ${eventType}`);
  const job = newJob('save');
  fs.writeFileSync(path.join(job.dir, 'email.html'), html);
  const hasSubjects = Array.isArray(subjectLines) && subjectLines.length > 0;
  if (hasSubjects) fs.writeFileSync(path.join(job.dir, 'subject-lines.txt'), subjectLines.map((s, i) => `${i + 1}. ${s}`).join('\n'));

  const base = fileName.replace(/\.html$/, '');
  const prompt = `Google Drive upload. Follow these steps exactly and do nothing else.
1. Folder: ${folderId
    ? `use the existing folder id ${folderId}.`
    : `call search_files with query: parentId = '${parent}' and title = '${q(folderName)}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false
   If found, use it. If not, create it with create_file: title '${folderName}', parentId '${parent}', contentMimeType 'application/vnd.google-apps.folder'. Create at most one folder.`}
2. File name: call search_files with query: parentId = '<folder id>' and title = '${q(fileName)}' and trashed = false
   If a file with that name exists, use '${base}_v2.html' instead (or _v3, _v4 … whichever is free). Never overwrite or delete anything.
3. Use the Read tool on ${job.name}/email.html (relative to the current directory). Upload it with create_file: title = the file name from step 2, parentId = the folder id, contentMimeType 'text/html', disableConversionToGoogleType true, textContent = the file's exact contents, character for character (no line-number prefixes, nothing added, removed or reformatted).
${hasSubjects ? `4. Use the Read tool on ${job.name}/subject-lines.txt. Create a Google Doc with create_file: title '${subjectDocName}', parentId = the folder id, contentMimeType 'text/plain', textContent = that file's exact contents.\n` : ''}${hasSubjects ? '5' : '4'}. Call download_file_content on the HTML file you uploaded. The result names the local path it was saved to.
Reply with ONLY this JSON: {"folderId":"","fileId":"","fileName":"","docId":${hasSubjects ? '""' : 'null'},"downloadedPath":""}`;

  const started = Date.now();
  let res;
  try {
    const { text } = await runClaude(prompt, { ...MODELS.drive, tools: DRIVE_TOOLS, timeoutMs: 8 * 60 * 1000 });
    res = extractJson(text);
  } finally {
    fs.rmSync(job.dir, { recursive: true, force: true });
  }
  // Verified = the copy downloaded back from Drive is identical to what was sent
  let verified = false;
  for (const p of downloadedSince(started)) {
    try {
      if (fs.readFileSync(p, 'utf8') === html) {
        verified = true;
        fs.rmSync(p, { force: true });
      }
    } catch { /* unreadable: ignore */ }
  }
  return {
    ...res,
    folderUrl: folderUrl(res.folderId),
    fileUrl: `https://drive.google.com/file/d/${res.fileId}/view`,
    docUrl: res.docId ? `https://docs.google.com/document/d/${res.docId}/edit` : '',
    verified,
  };
}

// ---------------------------------------------------------------- plumbing
const ROUTES = { '/brand': brand, '/lookup': lookup, '/copy': copy, '/subjects': subjects, '/design': design, '/save': save };

export function emailApi() {
  return {
    name: 'hr-email-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        const route = ROUTES[req.url.split('?')[0]];
        const send = (status, data) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        if (!route || req.method !== 'POST') return send(404, { error: 'Not found' });
        let raw = '';
        for await (const chunk of req) raw += chunk;
        try {
          send(200, await route(JSON.parse(raw || '{}')));
        } catch (e) {
          console.error('[email-api]', req.url, e);
          send(500, { error: e.message });
        }
      });
    },
  };
}
