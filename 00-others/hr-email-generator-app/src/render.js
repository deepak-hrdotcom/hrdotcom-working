import { HOST_CARD, CREDIT_HTML_BLOCK } from './templates';

export const cleanUrl = (val) => {
  if (!val || typeof val !== 'string') return '';
  let str = val.trim();
  
  // 1. If it matches markdown link [text](url)
  const markdownMatch = str.match(/\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/i);
  if (markdownMatch) {
    const textPart = markdownMatch[1];
    const urlPart = markdownMatch[2];
    
    // If the text inside [] is a valid URL, prefer it (handles Gemini's weird formatting)
    if (textPart.match(/^https?:\/\//i)) {
      str = textPart; 
    } else if (urlPart.includes('google.com/search?q=')) {
      // If the urlPart is a google search, extract the 'q' parameter
      try {
        const urlObj = new URL(urlPart);
        const qParam = urlObj.searchParams.get('q');
        str = qParam || textPart;
      } catch (e) {
        str = textPart;
      }
    } else {
      str = urlPart;
    }
  }
  
  // 2. Strip any leading/trailing brackets, parentheses, quotes, or whitespace
  str = str.replace(/^[\[\(\s'"]+|[\]\)\s'"]+$/g, '').trim();
  
  // 3. Fallback: extract the first absolute http/https substring
  const httpMatch = str.match(/(https?:\/\/[^\s\(\)\[\]"'<>]+)/i);
  if (httpMatch) {
    str = httpMatch[1];
  }
  
  // Final safeguard: if it still is a google search query, decode it
  if (str.includes('google.com/search?q=')) {
     try {
       const urlObj = new URL(str);
       const qParam = urlObj.searchParams.get('q');
       if (qParam) str = qParam;
     } catch (e) {}
  }
  
  return str;
};

export const renderIntroHtml = (introText, style = null) => {
  const defaultPara1 = "Despite rapid advancements in technology, global workforce productivity and employee engagement continue to slump across industries. Organizations struggle to pinpoint the root causes of this systemic decline, impacting retention and workplace culture.";
  const defaultPara2 = "Based on recent studies, this session reveals key organizational drivers, leadership practices, and technology tools that measurably revitalize team output.";

  let paragraphs = introText 
    ? introText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
    : [];

  if (paragraphs.length === 0) {
    paragraphs = [defaultPara1, defaultPara2];
  } else if (paragraphs.length === 1) {
    const lines = introText.split('\n').map(p => p.trim()).filter(Boolean);
    if (lines.length > 1) {
      paragraphs = lines;
    }
  }

  // Design-specific styles: { lead, leadCls, body, cls, dropCap } (see templates.js `intro`)
  if (style && (style.lead || style.body)) {
    const last = (css) => css.replace(/margin:0 0 \d+px 0;/, 'margin:0;');
    return paragraphs.map((para, idx) => {
      const isLast = idx === paragraphs.length - 1;
      const useLead = idx === 0 && style.lead && paragraphs.length > 1;
      let css = useLead ? style.lead : style.body;
      if (isLast) css = last(css);
      const pCls = useLead ? `intro-lead${style.leadCls ? ` ${style.leadCls}` : ''}` : `body-copy-p${style.cls ? ` ${style.cls}` : ''}`;
      let text = para;
      if (idx === 0 && style.dropCap) {
        const m = text.match(/^([A-Za-z0-9"“'‘])/);
        if (m) text = `<span class="dm-accent${style.cls ? ` ${style.cls}` : ''}" style="${style.dropCap}">${m[1]}</span>${text.slice(m[1].length)}`;
      }
      return `<p class="${pCls}" style="${css}text-align:left;">${text}</p>`;
    }).join('\n                            ');
  }

  return paragraphs.map((para, idx) => {
    const isLast = idx === paragraphs.length - 1;
    const marginBottom = isLast ? '0' : '16px';
    return `<p class="body-copy-p" style="margin:0 0 ${marginBottom} 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">${para}</p>`;
  }).join('\n                            ');
};

// "December 10, 2026 at 1:00 PM - 2:00 PM ET" → calendar pieces for the date-tile designs.
// Anything unrecognised falls back to a neutral tile instead of a broken date.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export function dateParts(dateTime) {
  const s = String(dateTime || '').trim();
  const m = s.match(/^(?:[A-Za-z]+,?\s+)?([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})?\s*(?:(?:at|@|,|-|–|\|)\s*(.+))?$/i);
  const mi = m ? MONTHS.indexOf(m[1].slice(0, 3).toLowerCase()) : -1;
  if (!m || mi < 0) return { mon: 'WEBCAST', day: '&#9733;', weekday: '', time: s };
  const year = m[3] ? Number(m[3]) : new Date().getFullYear();
  const weekday = new Date(year, mi, Number(m[2])).toLocaleDateString('en-US', { weekday: 'long' });
  return { mon: MONTHS[mi].toUpperCase(), day: String(Number(m[2])), weekday, time: (m[4] || '').trim() };
}

// Fills a template variant ({ html, hostCard }) with the email fields.
// Empty fields get sample text so the preview always looks complete.
export function renderEmail(currentVariant, fields) {
  let html = currentVariant.html;
  const activeHostCard = currentVariant.hostCard || HOST_CARD;

  // 1. Process Host Cards with Preview Fallbacks
  const hostsHtml = fields.hosts.map((h, i) => {
    const cardHtml = activeHostCard
      .replaceAll("{{H_NAME}}", h.name || "Expert Name")
      .replace("{{H_TITLE}}", h.title || "Designation / Company")
      .replace("{{H_IMG}}", cleanUrl(h.image) || "https://public-cdn.hr.com/profile_images/default.jpg")
      .replace("{{H_ALT}}", h.alt || h.name || "Expert Image");

    // Wrap with Outlook ghost tables for 2 columns per row
    let prefix = "";
    if (i === 0) {
      prefix = `<!--[if mso]><td width="276" align="center" valign="top" style="padding:10px 8px;"><![endif]-->`;
    } else if (i % 2 === 0) {
      prefix = `<!--[if mso]></td></tr><tr><td width="276" align="center" valign="top" style="padding:10px 8px;"><![endif]-->`;
    } else {
      prefix = `<!--[if mso]></td><td width="276" align="center" valign="top" style="padding:10px 8px;"><![endif]-->`;
    }

    let suffix = "";
    if (i === fields.hosts.length - 1) {
      suffix = `<!--[if mso]></td><![endif]-->`;
    }

    return prefix + cardHtml + suffix;
  }).join("");

  // Labels logic
  const hostLabel = fields.hosts.length > 1 ? "Your expert hosts" : "Your expert host";
  const hostSubLabel = fields.hosts.length > 1 ? "Learn directly from industry leaders" : "Learn directly from industry leader";

  // 2. Process Credit Section Toggle
  let creditHtml = fields.showCredits
    ? (currentVariant.creditHtml || CREDIT_HTML_BLOCK).replace("{{CREDIT_VALUE}}", fields.creditValue || "1 HR Credit")
    : "";
  const dateTime = fields.dateTime || "April 14, 2026 at 11:00 AM - 12:00 PM ET";
  const dp = dateParts(dateTime);

  // 3. Master Mapping with Fallbacks for the Live Preview
  const map = {
    "{{PREHEADER}}": fields.preheader || "Join this upcoming webcast to stay ahead of HR trends.",
    "{{LOGO_URL}}": cleanUrl(fields.logo) || "https://public-cdn.hr.com/system/app/media/rs/2022/3/25/l164gf41/120.jpg",
    "{{LOGO_ALT}}": fields.logoAlt || "Sponsor Logo",
    "{{BADGE}}": fields.badge || currentVariant.badge || "Upcoming Webcast",
    "{{TITLE}}": fields.title || "Webcast Title: The Future of Work",
    "{{DATE_TIME}}": dateTime,
    "{{SPLIT_DATE_TIME}}": dateTime.replace(/\s+at\s+/i, "<br>"),
    "{{DATE_MON}}": dp.mon,
    "{{DATE_DAY}}": dp.day,
    "{{DATE_WEEKDAY}}": dp.weekday,
    "{{DATE_TIME_ONLY}}": dp.time || dateTime,
    "{{INTRO}}": renderIntroHtml(fields.intro, currentVariant.introStyle),
    "{{LEARN1}}": fields.learn1 || "The core definition of this technology and why it matters",
    "{{LEARN2}}": fields.learn2 || "Real-world examples and case studies from industry leaders",
    "{{LEARN3}}": fields.learn3 || "A practical readiness framework for your specific HR team",
    "{{LEARN4}}": fields.learn4 || "Actionable strategies to compress weeks of work into hours",
    "__SECONDARY_CTA__": cleanUrl(fields.apShortcode) || "#",
    "__ONDEMAND_CTA__": cleanUrl(fields.apShortcode) || "#",
    "{{HOSTS_SECTION}}": hostsHtml,
    "Your expert hosts": hostLabel, 
    "Learn directly from industry leaders": hostSubLabel,
    "__VE_NAME__": fields.veName || "Virtual Event Name",
    "__VE_CTA__": cleanUrl(fields.veShortcode) || "#",
    "{{CREDIT_SECTION}}": creditHtml
  };

  // Update Outlook host section wrapper to centered 552px wide table
  html = html.replace(
    '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->',
    '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="552" align="center"><tr><![endif]-->'
  );

  // Proportional logo height adjustment
  const logoHeightNum = parseInt(fields.logoHeight, 10) || 40;
  const logoWidthNum = Math.round(2.25 * logoHeightNum);
  html = html.replaceAll("max-width:90px;max-height:40px;", `max-width:${logoWidthNum}px;max-height:${logoHeightNum}px;`);

  Object.entries(map).forEach(([key, val]) => {
    html = html.replaceAll(key, val || "");
  });

  // Replace the subject comment in all templates dynamically!
  html = html.replace(/<!-- SUBJECT: .*? -->/, `<!-- SUBJECT: ${fields.subject || '[REPLACE WITH GENERATED SUBJECT LINE]'} -->`);

  return html;
}
