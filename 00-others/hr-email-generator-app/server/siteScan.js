// Reads a client website's HTML and stylesheets and summarizes its colors and fonts.
// Runs on the local server, so the browser's cross-site limits don't apply.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

async function get(url, maxBytes = 600_000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,text/css,*/*' }, redirect: 'follow', signal: ctrl.signal });
    const body = (await r.text()).slice(0, maxBytes);
    return { ok: r.ok, status: r.status, url: r.url, body };
  } finally {
    clearTimeout(t);
  }
}

const count = (map, key, n = 1) => map.set(key, (map.get(key) || 0) + n);
const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

const normHex = (h) => {
  let x = h.toLowerCase();
  if (x.length === 4) x = '#' + x.slice(1).split('').map((c) => c + c).join('');
  return x.length === 7 ? x.toUpperCase() : null;
};
// Greys, near-white and near-black say nothing about a brand
const isNeutral = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return Math.max(r, g, b) - Math.min(r, g, b) < 18;
};

export async function scanSite(rawUrl) {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const page = await get(url);
  const blocked = !page.ok || /cf-browser-verification|challenge-platform|Just a moment\.\.\./i.test(page.body);
  if (blocked) return { ok: false, reason: `The site did not allow an automated visit (HTTP ${page.status}).` };

  const html = page.body;
  const base = page.url;
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim() || '';
  const themeColor = (html.match(/<meta[^>]+name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*name=["']theme-color["']/i) || [])[1] || '';

  const hrefs = [...html.matchAll(/<link[^>]+>/gi)].map((m) => m[0])
    .filter((tag) => /rel=["']?[^"'>]*stylesheet/i.test(tag))
    .map((tag) => (tag.match(/href=["']([^"']+)["']/i) || [])[1])
    .filter(Boolean)
    .map((h) => { try { return new URL(h.replace(/&amp;/g, '&'), base).href; } catch { return null; } })
    .filter(Boolean);
  const googleFontLinks = hrefs.filter((h) => h.includes('fonts.googleapis.com'));
  const sheets = hrefs.filter((h) => !h.includes('fonts.googleapis.com')).slice(0, 6);

  let css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  css += '\n' + [...html.matchAll(/style=["']([^"']+)["']/gi)].map((m) => m[1]).join(';\n');
  const fetched = await Promise.allSettled(sheets.map((s) => get(s, 800_000)));
  fetched.forEach((f) => { if (f.status === 'fulfilled' && f.value.ok) css += '\n' + f.value.body; });
  return {
    ok: true,
    url: base,
    title,
    themeColor,
    ...summarizeCss(css, googleFontLinks),
    stylesheetsRead: fetched.filter((f) => f.status === 'fulfilled' && f.value.ok).length,
  };
}

// rgb(240, 111, 31) / rgb(240 111 31) → #F06F1F (DevTools shows computed colors this way)
const rgbToHex = (s) => {
  const m = s.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  return m ? '#' + [m[1], m[2], m[3]].map((v) => Math.min(255, +v).toString(16).padStart(2, '0')).join('').toUpperCase() : null;
};
const COLOR_RE = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\(\s*\d+[\s,]+\d+[\s,]+\d+[^)]*\)/g;
const toHexAny = (s) => (s.startsWith('#') ? normHex(s) : rgbToHex(s));

// Colors and fonts in a block of CSS: a whole site's stylesheets, or what the user pasted from DevTools
export function summarizeCss(css, googleFontLinks = []) {
  const links = [...googleFontLinks, ...[...css.matchAll(/(https:\/\/fonts\.googleapis\.com[^"')\s]+)/gi)].map((m) => m[1])];

  const colors = new Map();
  for (const m of css.matchAll(COLOR_RE)) {
    const hex = toHexAny(m[0]);
    if (hex && !isNeutral(hex)) count(colors, hex);
  }
  const varColors = [...css.matchAll(/(--[\w-]*(?:primary|brand|accent|secondary|main|theme|color)[\w-]*)\s*:\s*(#[0-9a-fA-F]{3,6}\b|rgba?\([^)]*\))/gi)]
    .filter((m) => !/^--(wp--preset|wp-admin|tw-|swiper)/i.test(m[1]))
    .map((m) => `${m[1]}: ${toHexAny(m[2]) || m[2]}`);
  const buttonColors = [...css.matchAll(/(?:\.btn|button|\.button|\.cta)[^{]*\{[^}]*?background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,6}\b|rgba?\([^)]*\))/gi)]
    .map((m) => toHexAny(m[1])).filter(Boolean);

  const fonts = new Map();
  for (const m of css.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) {
    const first = m[1].split(',')[0].replace(/['"]|!important/g, '').trim();
    if (first && !/^(inherit|initial|var\(|-apple-system|system-ui|sans-serif|serif|monospace)/i.test(first)) count(fonts, first);
  }
  const fontFaces = [...new Set([...css.matchAll(/@font-face\s*\{[^}]*font-family\s*:\s*["']?([^;"']+)/gi)].map((m) => m[1].trim()))];

  return {
    topColors: top(colors, 15),
    cssVariables: [...new Set(varColors)].slice(0, 25),
    buttonColors: [...new Set(buttonColors)].slice(0, 8),
    topFonts: top(fonts, 8),
    fontFaces: fontFaces.slice(0, 10),
    googleFontLinks: [...new Set(links)].slice(0, 4),
  };
}
