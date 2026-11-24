// Drive folder and file names.
// Folder: "2026-12-10 Building Resilient Teams in Hybrid" (event date + first 5 title words)
// File:   "2026-12-10_building-resilient-teams-in-hybrid_standalone_1-of-4.html"

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// "June 4, 2026 at 1:00 PM - 2:00 PM ET" → "2026-06-04"; '' when no date is found
export function isoDateFrom(text) {
  if (!text) return '';
  const iso = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return iso[0];
  const m = text.match(/([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
  if (m) {
    const mi = MONTHS.indexOf(m[1].slice(0, 3).toLowerCase());
    if (mi >= 0) return `${m[3]}-${String(mi + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
  }
  const us = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (us) return `${us[3]}-${us[1].padStart(2, '0')}-${us[2].padStart(2, '0')}`;
  return '';
}

export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const titleWords = (title, n = 5) => (title || 'Untitled Webcast')
  .replace(/&[a-z]+;/gi, ' ')
  .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
  .split(/\s+/).filter(Boolean).slice(0, n);

export const folderName = (date, title) => `${date} ${titleWords(title).join(' ')}`;

export const fileName = (date, title, eventType, n, m) => [
  date,
  titleWords(title).join('-').toLowerCase().replace(/'/g, ''),
  eventType,
  `${n}-of-${m}`,
].join('_') + '.html';

export const subjectDocName = (date, title) => `${folderName(date, title)} - Subject Lines`;
