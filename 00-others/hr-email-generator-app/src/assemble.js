// Builds the final email HTML for the wizard: template (or client-branded variant),
// filled fields, client font, and a recipe comment that later series emails read back.

import { TEMPLATES, buildVariant, assembleCustom } from './templates';
import { renderEmail } from './render';
import { paletteFromBrand, applyBrandFont } from './brand';

export const CREDIT_OPTIONS = ['0.5 HR Credit', '1 HR Credit', '1 BUSINESS Credit', '1 GLOBAL Credit'];

export function variantFor(eventType, variantIndex, brand) {
  return brand ? buildVariant(eventType, variantIndex, paletteFromBrand(brand)) : TEMPLATES[eventType].variants[variantIndex];
}

export function emailFields({ eventType, webcast, details, copy, subjectLines }) {
  const hosts = (webcast.hosts || []).filter((h) => h.name || h.image).slice(0, 5)
    .map((h) => ({ name: h.name || '', title: h.title || '', image: h.image || '', alt: h.name || '' }));
  const learnings = copy?.learnings || [];
  return {
    subject: (subjectLines || []).join(' | '),
    preheader: copy?.preheader || '',
    logo: webcast.sponsorLogo || '',
    logoAlt: webcast.sponsorName || '',
    logoHeight: details.logoHeight || '40',
    badge: details.badge || '',
    title: webcast.title || '',
    dateTime: eventType === 'ondemand' ? '' : (webcast.dateTime || ''),
    intro: copy?.intro || '',
    learn1: learnings[0] || '',
    learn2: learnings[1] || '',
    learn3: learnings[2] || '',
    learn4: learnings[3] || '',
    apShortcode: details.apShortcode || '',
    veName: details.veName || '',
    veShortcode: details.veShortcode || '',
    creditValue: details.credit || '',
    showCredits: !!details.credit,
    hosts: hosts.length ? hosts : [{ name: '', title: '', image: '', alt: '' }],
  };
}

// recipe: plain object saved inside the email so the next email in the series can avoid repeating it
// custom: a brand-new design from Claude ({ middle, css, hostCard }); used instead of the template
export function buildEmailHtml({ eventType, variantIndex, brand, custom, fields, recipe }) {
  const variant = custom
    ? assembleCustom(eventType, brand ? paletteFromBrand(brand) : undefined, custom.middle, custom.hostCard, custom.css)
    : variantFor(eventType, variantIndex, brand);
  let html = renderEmail(variant, fields);
  if (brand) html = applyBrandFont(html, { family: brand.fontFamily, serif: brand.serif, cssUrl: brand.googleFontsUrl });
  if (recipe) {
    const json = JSON.stringify(recipe).replace(/--/g, '-\\u002d').replace(/>/g, '\\u003e');
    html = html.replace('</head>', `    <!-- HRCOM-RECIPE ${json} -->\n</head>`);
  }
  // Drop indentation and blank lines: smaller file, same rendering
  return html.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
}
