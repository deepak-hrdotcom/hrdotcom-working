#!/usr/bin/env node
// Verifies that a redesigned / copy-updated emailer kept the original text, links and images,
// and lints it for common email-client problems. Node built-ins only - no install needed.
//
// Usage:
//   node webcast-emailer-redesign/scripts/verify-emailer.mjs <original.html> <candidate.html> [--allow-text-changes]
//
// Step 1 (redesign):   run WITHOUT --allow-text-changes. Must exit 0.
// Step 2 (copy update): run WITH --allow-text-changes against a backup taken before editing.
//                       Text hunks are printed for review; link/image checks must still pass.

import { readFileSync } from 'node:fs';

const USAGE = `Usage: node verify-emailer.mjs <original.html> <candidate.html> [--allow-text-changes]

Checks (candidate vs original):
  TEXT    visible text, word for word and in the same order (comments, <style>, <script> ignored)
  LINKS   every href value (incl. those inside Outlook conditional comments / VML)
  IMAGES  every img src value and every alt text
  LINT    email-client warnings for the candidate (never fail the run)

Exit code 1 if TEXT differs (unless --allow-text-changes) or if any LINK/IMAGE differs.`;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const files = args.filter((a) => !a.startsWith('--'));
if (flags.has('--help') || flags.has('-h') || files.length !== 2) {
  console.log(USAGE);
  process.exit(files.length === 2 ? 0 : 2);
}
const allowText = flags.has('--allow-text-changes');
const [origPath, candPath] = files;
const orig = readFileSync(origPath, 'utf8');
const cand = readFileSync(candPath, 'utf8');
if (!orig.trim()) {
  console.error(`ERROR: ${origPath} is empty.`);
  process.exit(2);
}
if (!cand.trim()) {
  console.error(`ERROR: ${candPath} is empty.`);
  process.exit(2);
}

// ---------- helpers ----------
const NAMED = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", reg: '®', trade: '™', copy: '©',
  mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', bull: '•',
  middot: '·', zwnj: '', zwj: '', shy: '', ensp: ' ', emsp: ' ', thinsp: ' ', laquo: '«', raquo: '»',
  rarr: '→', larr: '←', times: '×', deg: '°', euro: '€', pound: '£', cent: '¢', sect: '§', para: '¶',
};
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(cp); } catch { return m; }
    }
    const v = NAMED[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}
// Invisible padding characters often used after preheaders.
const INVISIBLE = /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u3164\uFEFF\uFFA0]/g;
const norm = (s) => s.replace(INVISIBLE, '').replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ').replace(/\s+/g, ' ').trim();

const stripComments = (h) => h.replace(/<!--[\s\S]*?-->/g, ' ');
const stripCode = (h) => h.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ');
const BLOCK = 'address|article|aside|blockquote|body|br|button|center|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|head|header|hr|html|img|li|link|main|meta|nav|ol|p|pre|section|table|tbody|td|tfoot|th|thead|title|tr|ul';
const BLOCK_RE = new RegExp(`<\\/?(?:${BLOCK})\\b[^>]*>`, 'gi');

function visibleTokens(html) {
  const text = stripCode(stripComments(html)).replace(BLOCK_RE, ' ').replace(/<[^>]*>/g, '');
  return norm(decode(text)).split(' ').filter(Boolean);
}
function attrValues(html, attr, tagFilter) {
  const out = [];
  const tagRe = /<([a-z][\w:-]*)\b[^>]*>/gi;
  const attrRe = new RegExp(`\\s${attr}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  let m;
  while ((m = tagRe.exec(html))) {
    if (tagFilter && !tagFilter.test(m[1])) continue;
    const a = attrRe.exec(m[0]);
    if (a) out.push(norm(decode(a[1] ?? a[2] ?? a[3] ?? '')));
  }
  return out;
}
function setDiff(a, b) {
  const A = new Set(a), B = new Set(b);
  return { missing: [...A].filter((x) => !B.has(x)), added: [...B].filter((x) => !A.has(x)) };
}
function multisetDiff(a, b) {
  const count = new Map();
  a.forEach((x) => count.set(x, (count.get(x) || 0) + 1));
  b.forEach((x) => count.set(x, (count.get(x) || 0) - 1));
  const missing = [], added = [];
  for (const [k, v] of count) {
    for (let i = 0; i < v; i++) missing.push(k);
    for (let i = 0; i < -v; i++) added.push(k);
  }
  return { missing, added };
}

// Token-level LCS diff -> hunks [{aStart, removed[], added[]}]
function diffTokens(a, b) {
  let s = 0;
  while (s < a.length && s < b.length && a[s] === b[s]) s++;
  let ea = a.length, eb = b.length;
  while (ea > s && eb > s && a[ea - 1] === b[eb - 1]) { ea--; eb--; }
  const A = a.slice(s, ea), B = b.slice(s, eb);
  const N = A.length, M = B.length, W = M + 1;
  if (N * M > 30e6) return null;
  const dp = new Uint32Array((N + 1) * W);
  for (let i = N - 1; i >= 0; i--)
    for (let j = M - 1; j >= 0; j--)
      dp[i * W + j] = A[i] === B[j] ? dp[(i + 1) * W + j + 1] + 1 : Math.max(dp[(i + 1) * W + j], dp[i * W + j + 1]);
  const hunks = [];
  let cur = null, i = 0, j = 0;
  const flush = () => { if (cur) { hunks.push(cur); cur = null; } };
  while (i < N || j < M) {
    if (i < N && j < M && A[i] === B[j]) { flush(); i++; j++; continue; }
    if (!cur) cur = { aStart: s + i, removed: [], added: [] };
    if (j < M && (i === N || dp[i * W + j + 1] >= dp[(i + 1) * W + j])) { cur.added.push(B[j]); j++; }
    else { cur.removed.push(A[i]); i++; }
  }
  flush();
  return hunks;
}

// ---------- checks ----------
let failed = false;
const fail = (msg) => { failed = true; console.log(`  FAIL  ${msg}`); };

console.log(`Original:  ${origPath}\nCandidate: ${candPath}\n`);

// TEXT
console.log('TEXT (visible copy, word for word, same order)');
const ta = visibleTokens(orig), tb = visibleTokens(cand);
const hunks = diffTokens(ta, tb);
if (hunks === null) {
  const d = multisetDiff(ta, tb);
  if (d.missing.length || d.added.length) {
    const msg = `word counts differ. Missing: ${JSON.stringify(d.missing.slice(0, 60))} Added: ${JSON.stringify(d.added.slice(0, 60))}`;
    allowText ? console.log(`  CHANGED  ${msg}`) : fail(msg);
  } else console.log('  ok  (same words; file too large for ordered diff)');
} else if (hunks.length === 0) {
  console.log(`  ok  (${ta.length} words identical)`);
} else {
  const label = allowText ? 'CHANGED' : 'FAIL';
  if (!allowText) failed = true;
  console.log(`  ${label}  ${hunks.length} text difference(s):`);
  hunks.slice(0, 60).forEach((h, n) => {
    const before = ta.slice(Math.max(0, h.aStart - 6), h.aStart).join(' ');
    const after = ta.slice(h.aStart + h.removed.length, h.aStart + h.removed.length + 6).join(' ');
    console.log(`    #${n + 1}  …${before} ${h.removed.length ? `[-${h.removed.join(' ')}-]` : ''}${h.added.length ? `{+${h.added.join(' ')}+}` : ''} ${after}…`);
  });
  if (hunks.length > 60) console.log(`    … ${hunks.length - 60} more`);
}

// LINKS (raw html incl. conditional comments, so VML button hrefs are covered)
console.log('\nLINKS (href values)');
const la = attrValues(orig, 'href'), lb = attrValues(cand, 'href');
const ld = setDiff(la, lb);
ld.missing.forEach((u) => fail(`link missing from candidate: ${u}`));
ld.added.forEach((u) => fail(`new link not in original: ${u}`));
if (!ld.missing.length && !ld.added.length) console.log(`  ok  (${new Set(la).size} unique links identical)`);

// IMAGES
console.log('\nIMAGES (img src and alt text)');
const IMG = /^img$/i;
const sa = attrValues(stripComments(orig), 'src', IMG), sb = attrValues(stripComments(cand), 'src', IMG);
const sd = setDiff(sa, sb);
sd.missing.forEach((u) => fail(`image missing from candidate: ${u}`));
sd.added.forEach((u) => fail(`new image not in original: ${u}`));
const aa = attrValues(stripComments(orig), 'alt', IMG), ab = attrValues(stripComments(cand), 'alt', IMG);
const ad = multisetDiff(aa, ab);
ad.missing.forEach((t) => fail(`alt text missing/changed: "${t}"`));
ad.added.forEach((t) => fail(`alt text added/changed: "${t}"`));
if (!sd.missing.length && !sd.added.length && !ad.missing.length && !ad.added.length)
  console.log(`  ok  (${new Set(sa).size} unique images, ${aa.length} alt texts identical)`);

// LINT (warnings only)
console.log('\nLINT (candidate email-client warnings)');
const warns = [];
const body = stripComments(cand);
const bytes = Buffer.byteLength(cand, 'utf8');
if (bytes > 102000) warns.push(`file is ${Math.round(bytes / 1024)} KB - Gmail clips messages over ~102 KB`);
if (!/<meta[^>]+name=["']viewport["']/i.test(cand)) warns.push('no <meta name="viewport">');
if (!/<meta[^>]+name=["']color-scheme["']/i.test(cand)) warns.push('no <meta name="color-scheme" content="light dark">');
if (!/<meta[^>]+name=["']supported-color-schemes["']/i.test(cand)) warns.push('no <meta name="supported-color-schemes" content="light dark">');
if (!/prefers-color-scheme\s*:\s*dark/i.test(cand)) warns.push('no @media (prefers-color-scheme: dark) rules');
if (!/\[data-ogsc\]/i.test(cand)) warns.push('no [data-ogsc] dark-mode rules for Outlook.com / Outlook apps');
if (!/@media[^{]*max-width/i.test(cand)) warns.push('no max-width @media query for mobile');
if (!/<!--\[if (gte )?mso/i.test(cand)) warns.push('no Outlook (mso) conditional fallbacks');
if (/<script\b/i.test(body)) warns.push('<script> found - stripped by every email client');
if (/<(form|iframe|video|audio|object|embed)\b/i.test(body)) warns.push('<form>/<iframe>/<video>/<audio>/<object>/<embed> found - unsupported in most clients');
if (/display\s*:\s*(flex|grid|inline-flex|inline-grid)/i.test(body)) warns.push('display:flex/grid found - unsupported in Outlook desktop and some Gmail views');
if (/position\s*:\s*(absolute|fixed|sticky)/i.test(body)) warns.push('position:absolute/fixed/sticky found - unsupported in many clients');
if (/<svg\b/i.test(body)) warns.push('inline <svg> found - not supported in Gmail/Outlook');
const imgs = body.match(/<img\b[^>]*>/gi) || [];
const noAlt = imgs.filter((t) => !/\salt\s*=/i.test(t)).length;
const noW = imgs.filter((t) => !/\swidth\s*=/i.test(t)).length;
if (noAlt) warns.push(`${noAlt} <img> without alt attribute`);
if (noW) warns.push(`${noW} <img> without width attribute (Outlook may render at native size)`);
warns.length ? warns.forEach((w) => console.log(`  warn  ${w}`)) : console.log('  ok  (no warnings)');

console.log(`\nRESULT: ${failed ? 'FAIL' : 'PASS'}${allowText && !failed && hunks && hunks.length ? ' (text changes allowed - review the hunks above)' : ''}`);
process.exit(failed ? 1 : 0);
