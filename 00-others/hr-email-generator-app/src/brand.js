// Client branding: turns a client's brand colors and font into a template palette.
// Every derived color is checked for WCAG AA contrast against the text it sits under,
// so a pale brand color never produces unreadable buttons or headings.

import { DM, DISPLAY_FONT_NAMES } from './templates';

const ON_BRIGHT = '#0B1220';

const toRgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const mix = (a, b, t) => { const x = toRgb(a), y = toRgb(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };

const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

export const isHex = (v) => typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());

// A color as typed or copied from browser DevTools → '#RRGGBB', or null if not understood.
// Accepts "#f06f1f", "f06f1f", "#fff", "rgb(240, 111, 31)", "rgba(240 111 31 / 1)", "hsl(23, 87%, 53%)",
// and "color: #f06f1f;" / "--brand: #f06f1f".
export function parseCssColor(input) {
  let v = String(input || '').trim().toLowerCase();
  v = v.replace(/^[\w-]+\s*:\s*/, '').replace(/\s*!important/, '').replace(/;$/, '').trim();
  let m = v.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/);
  if (m) return toHex(toRgb(m[1]));
  m = v.match(/^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/);
  if (m) return toHex([m[1], m[2], m[3]].map(Number));
  m = v.match(/^hsla?\(\s*(\d+(?:\.\d+)?)(?:deg)?[\s,]+(\d+(?:\.\d+)?)%[\s,]+(\d+(?:\.\d+)?)%/);
  if (m) {
    const h = Number(m[1]) / 360, s = Number(m[2]) / 100, l = Number(m[3]) / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    const hue = (t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
    return toHex([hue(h + 1 / 3), hue(h), hue(h - 1 / 3)].map((x) => x * 255));
  }
  return null;
}

// A font-family value as copied from DevTools → { family, serif }, or null.
// Accepts "font-family: 'Myriad Pro', Arial, sans-serif;" or just "Myriad Pro".
export function parseFontCss(input) {
  const v = String(input || '').trim().replace(/^font-family\s*:\s*/i, '').replace(/\s*!important/, '').replace(/;$/, '');
  const list = v.split(',').map((f) => f.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  if (!list.length) return null;
  const generic = list.find((f) => /^(serif|sans-serif)$/i.test(f));
  return { family: list[0], serif: generic ? generic.toLowerCase() === 'serif' : /serif|georgia|times|garamond|merriweather|playfair/i.test(list[0]) && !/sans/i.test(list[0]) };
}

// Step a color toward `target` until it reaches the contrast ratio against `against`
function ensureContrast(color, against, ratio, target) {
  let c = color;
  for (let i = 0; i < 20 && contrast(c, against) < ratio; i++) c = mix(c, target, 0.12);
  return c;
}

// brand: { primary, secondary?, dark? } (hex strings)
export function paletteFromBrand(brand) {
  const primary = isHex(brand.primary) ? brand.primary : '#02588E';
  const secondary = isHex(brand.secondary) ? brand.secondary : primary;
  // accent carries white text (hero, buttons) and is used as text on white
  const accent = ensureContrast(primary, '#FFFFFF', 4.5, '#000000');
  const deep = isHex(brand.dark) && contrast(brand.dark, '#FFFFFF') >= 7 ? brand.dark : mix(accent, '#000000', 0.62);
  // bright carries dark text (secondary buttons, accent bars)
  const bright = ensureContrast(secondary, ON_BRIGHT, 4.5, '#FFFFFF');
  return {
    accent,
    deep,
    tint: mix(accent, '#FFFFFF', 0.92),
    line: mix(accent, '#FFFFFF', 0.78),
    bright,
    glowA: mix(accent, '#FFFFFF', 0.9),
    glowB: mix(bright, '#FFFFFF', 0.88),
    soft: mix(accent, '#FFFFFF', 0.82),
    accentDm: ensureContrast(mix(accent, '#FFFFFF', 0.45), DM.surface, 4.5, '#FFFFFF'),
    tintDm: mix(accent, DM.page, 0.8),
  };
}

// Swap the template font (Roboto) for the client's font. The fallback stack stays,
// so Outlook and Gmail (which ignore web fonts) still get a close system font.
// font: { family, serif?: boolean, cssUrl?: string } — cssUrl is the client's own
// Google Fonts stylesheet link (known to load); without it the font only shows where installed.
export function applyBrandFont(html, font) {
  if (!font || !font.family || /^roboto$/i.test(font.family)) return html;
  const family = font.family.replace(/['"]/g, '').trim();
  const fallback = font.serif ? "Georgia,'Times New Roman',Times,serif" : 'Arial,Helvetica,sans-serif';
  // Each design's display typeface gives way to the client's font (serif accents keep Georgia)
  let out = html.replace(/^\s*@import url\('[^']+'\); \/\* display-font \*\/\n?/m, '');
  for (const name of DISPLAY_FONT_NAMES) out = out.replaceAll(`'${name}',`, '');
  out = out.replace(/'Roboto',\s*Arial,\s*Helvetica,\s*sans-serif/g, `'${family}',${fallback}`);
  const importLine = "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');";
  const safeUrl = typeof font.cssUrl === 'string' && /^https:\/\/fonts\.googleapis\.com\/[^'"()\s]+$/.test(font.cssUrl) ? font.cssUrl : '';
  return out.replace(importLine, safeUrl ? `@import url('${safeUrl}');` : '');
}
