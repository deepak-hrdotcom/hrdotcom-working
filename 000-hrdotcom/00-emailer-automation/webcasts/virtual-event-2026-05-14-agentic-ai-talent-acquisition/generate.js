const fs = require('fs');
const path = require('path');

const templatePath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\virtual-event.html';
const outputPath = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\virtual-event-2026-05-14-agentic-ai-talent-acquisition\\virtual-event-2026-05-14-agentic-ai-talent-acquisition.html';

let html = fs.readFileSync(templatePath, 'utf8');

// Title & Meta
html = html.replace(/<title>.*?<\/title>/, '<title>The New Hiring Engine: Agentic AI in Modern Talent Acquisition | HR.com Webcast</title>');

// Subject & Preheader
html = html.replace('<!-- SUBJECT: [REPLACE WITH GENERATED SUBJECT LINE] -->', '<!-- SUBJECT: Still screening the old way? AI just changed hiring. [May 14] -->');
html = html.replace(/\s*\[REPLACE WITH GENERATED PREHEADER TEXT\]\s*/, '\n        Agentic AI is rewriting talent acquisition — learn how to build a smarter hiring engine. Free, May 14.\n');

// Sponsor Logo
html = html.replace(/<img[^>]*alt="TestGorilla"[^>]*>/, '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/8/7/me1wchxs/120.jpg" alt="Eightfold AI" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />');

// Hero Section
html = html.replace(/The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/, "The New Hiring Engine: Agentic AI in Modern Talent Acquisition");
html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET/, 'May 14, 2026 at 12:00 PM - 12:55 PM ET');

// Hero CTA
html = html.replace(/__STORY_ID__/g, '1775754743731');

// Intro Paragraph
html = html.replace(
    /<p class="body-copy-p"[\s\S]*?<\/p>/,
    '<p class="body-copy-p"\n                                style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                Stop layering complex tools over broken processes. Discover how true agentic AI goes beyond automation to rethink candidate screening, uncover potential based on real skills, and reduce recruiter burnout.\n                            </p>'
);

// Bullets
html = html.replace(/What\s*AI fluency actually looks like in a candidate/, 'How emerging technologies and agentic AI are building connected hiring engines');
html = html.replace(/Why\s*traditional signals like CVs fail for AI roles/, 'Using AI to evaluate substance, reduce bias, and maintain consistency at scale');
html = html.replace(/Real\s*insights from companies hiring for AI today/, 'Why AI Interviewer moves beyond chatbot scripts to reason in real time');
html = html.replace(/How\s*to evolve your hiring processes to verify execution/, 'Strategies for pairing speed and automation with responsible AI and fairness');

// Secondary CTA
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/luk5');

// Speakers Text
html = html.replace(
    /<p\s*style="margin:0 0 6px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;text-align:center;">\s*Your expert hosts\s*<\/p>/,
    '<p style="margin:0 0 6px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;text-align:center;">Your expert hosts</p>'
);

html = html.replace(
    /<h2 class="section-heading"[\s\S]*?<\/h2>/,
    '<h2 class="section-heading"\n                                style="margin:0 0 28px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#2A343E;text-align:center;line-height:27px;">\n                                Learn directly from industry leaders\n                            </h2>'
);

// Speaker 1
html = html.replace(/alt="Mehak Chowdhary"/, 'alt="Rebecca Warren"');
html = html.replace(/https:\/\/public-cdn.hr.com\/profile_images\/2026\/4\/8\/1775660546464_120/, 'https://public-cdn.hr.com/profile_images/2022/6/21/1655830087270_120');
html = html.replace(/Mehak Chowdhary/, 'Rebecca Warren');
html = html.replace(/Head of Marketing - TestGorilla/, 'Director, Talent-centered Transformation - Eightfold AI');

// Speaker 2
html = html.replace(/alt="Megan Bourdages"/, 'alt="Michael Watson"');
html = html.replace(/https:\/\/public-cdn.hr.com\/profile_images\/2026\/4\/8\/1775663244968_120/, 'https://public-cdn.hr.com/profile_images/2023/2/9/1675998511268_120');
html = html.replace(/Megan Bourdages/, 'Michael Watson');
html = html.replace(/Vice President of Sales - TestGorilla/, 'Head of Customer Advocacy Talent Insights Intelligence - Eightfold AI');

// VE Replace
html = html.replace(/__VE_NAME__/g, "HR.com's State of Today's HR Tech and Integrations");
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/jrwpk');

fs.writeFileSync(outputPath, html);
console.log('HTML written successfully.'); 
