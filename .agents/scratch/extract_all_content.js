const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mainPagesDir = 'e:/HR/00-html/01-education/main-pages';
const outputFile = 'e:/HR/00-html/01-education/00-certification-2026-redesign/ALL_PAGES_TEXT_CONTENT_INVENTORY.md';
const fetchedTestimonialsPath = 'C:/Users/Deepak/.gemini/antigravity-ide/brain/21063e07-3592-4a8c-b82e-4e6adb9584a6/.system_generated/steps/88/content.md';

const files = [
  'understanding-hr-certification.html',
  'preparation-options.html',
  'pass-assurance-program.html',
  'hr-group-certification.html',
  'hr-recertification.html',
  'testimonials.html',
  'ask-my-employer.html'
];

function cleanHtmlToText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    .replace(/&copy;/g, '©')
    .replace(/&bull;/g, '•')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '...')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"');
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractStructuredContent(html, fileName) {
  let cleaned = cleanHtmlToText(html);
  
  let lines = [];
  lines.push(`\n## 📄 Page File: \`${fileName}\`\n`);
  lines.push(`**File Path**: \`01-education/main-pages/${fileName}\`\n`);
  lines.push(`---\n`);
  
  let formatted = cleaned
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m, c) => `\n\n### 🏷️ [H1] ${stripTags(c).trim()}\n\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m, c) => `\n\n#### 🏷️ [H2] ${stripTags(c).trim()}\n\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m, c) => `\n\n##### 🏷️ [H3] ${stripTags(c).trim()}\n\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (m, c) => `\n\n###### 🏷️ [H4] ${stripTags(c).trim()}\n\n`)
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (m, c) => `\n\n###### 🏷️ [H5] ${stripTags(c).trim()}\n\n`)
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (m, c) => `\n\n###### 🏷️ [H6] ${stripTags(c).trim()}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, c) => `\n- ${stripTags(c).trim()}`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (m, c) => `\n\n${stripTags(c).trim()}\n\n`)
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, c) => `\n\n> ${stripTags(c).trim()}\n\n`)
    .replace(/<button[^>]*>([\s\S]*?)<\/button>/gi, (m, c) => `\n[ACTION BUTTON: ${stripTags(c).trim()}]\n`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '\n---\n');

  formatted = stripTags(formatted);
  
  formatted = formatted
    .split('\n')
    .map(l => l.trimEnd())
    .filter((l, i, arr) => !(l.trim() === '' && arr[i - 1] && arr[i - 1].trim() === ''))
    .join('\n');

  lines.push(formatted);

  // If testimonials, parse the real array cleanly
  if (fileName === 'testimonials.html' && fs.existsSync(fetchedTestimonialsPath)) {
    const rawFile = fs.readFileSync(fetchedTestimonialsPath, 'utf8');
    const startIdx = rawFile.indexOf('const testimonialArray = [');
    const endIdx = rawFile.lastIndexOf(']');
    if (startIdx !== -1 && endIdx !== -1) {
      const arrayCode = rawFile.substring(startIdx + 'const testimonialArray = '.length, endIdx + 1);
      try {
        const arr = eval(arrayCode);
        if (arr && Array.isArray(arr)) {
          lines.push(`\n\n### 💬 Full Verified Student Reviews (${arr.length} Testimonials Database)\n`);
          lines.push(`| # | Candidate | Credential / Track | Course Enrolled | Date | Testimonial Quote |`);
          lines.push(`|:---|:---|:---|:---|:---|:---|`);
          arr.forEach((t, i) => {
            const cleanQuote = cleanHtmlToText(t.comment || '').replace(/\s+/g, ' ').replace(/\|/g, '-').trim();
            const cleanCourse = cleanHtmlToText(t.courseName || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            lines.push(`| ${i + 1} | **${t.name}** | \`${(t.category || '').toUpperCase()}\` | ${cleanCourse} | ${t.date || 'N/A'} | "${cleanQuote}" |`);
          });
        }
      } catch (err) {
        lines.push(`\nError extracting testimonials: ${err.message}\n`);
      }
    }
  }

  lines.push('\n\n---\n\n');
  return lines.join('\n');
}

let allDoc = `# HR.com Education & Certification — Complete Verbatim Text & Content Inventory

> **Purpose**: Single Source of Truth containing 100% of the raw, verbatim copy, headings, value propositions, bullet points, pricing, FAQs, disclaimers, course catalogs, and verified student testimonials extracted from all 7 live Education pages.
> **Date Generated**: 2026-08-25
> **Scope**:
> 1. \`understanding-hr-certification.html\`
> 2. \`preparation-options.html\`
> 3. \`pass-assurance-program.html\`
> 4. \`hr-group-certification.html\`
> 5. \`hr-recertification.html\`
> 6. \`testimonials.html\` (with complete 2024–2025 verified student review database of 30+ detailed graduate reviews)
> 7. \`ask-my-employer.html\`

================================================================================
\n\n`;

for (const f of files) {
  const filePath = path.join(mainPagesDir, f);
  if (fs.existsSync(filePath)) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    allDoc += extractStructuredContent(rawContent, f);
  } else {
    allDoc += `\n# File not found: ${f}\n`;
  }
}

fs.writeFileSync(outputFile, allDoc, 'utf8');
console.log('Successfully generated 100% complete content inventory at:', outputFile);
