const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'email-reference', 'premium-templates', 'standalone.html');
const outDir = path.join(__dirname, 'webcasts', 'standalone-2026-06-24-the-end-of-bundled-maternity-care');
const outPath = path.join(outDir, 'standalone-2026-06-24-the-end-of-bundled-maternity-care.html');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Title & Meta
html = html.replace(/<title>.*?<\/title>/, '<title>The End of Bundled Maternity Care | HR.com Webcast</title>');
html = html.replace(/\[REPLACE WITH GENERATED SUBJECT LINE\]/, 'Your maternity costs are about to skyrocket. [June 24]');
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, 'In 2027, the AMA ends bundled maternity care. See the hidden risks to your health plan.');

// 2. Hero
html = html.replace(/<h1 class="hero-title"[\s\S]*?>[\s\S]*?<\/h1>/, '<h1 class="hero-title"\n                                style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">\n                                The End of Bundled Maternity Care\n                            </h1>');

html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET/, 'June 24, 2026 at 12:00 PM - 12:30 PM ET');

// Note: I am NOT changing the hero gradient/colors to ensure exact compliance with the template.

// 3. Links
html = html.split('__STORY_ID__').join('1777299354945');
// The template has '__EMAIL__' as well. We will leave it as is.
html = html.split('__SECONDARY_CTA__').join('https://web.hr.com/h3sq');

// 4. Sponsor Logo
html = html.replace(/https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg/, 'https://public-cdn.hr.com/system/app/media/rs/2025/10/16/mgtmdfzw/120.jpg');
html = html.replace(/alt="TestGorilla"/g, 'alt="Maven Clinic"');

// 5. Intro Copy
const introText = 'In 2027, the AMA will dismantle global maternity billing, fragmenting a single charge into dozens. Join this webcast to understand the hidden risks of unbundled care and what smart employers are doing now to protect their benefit plans.';
html = html.replace(/<p class="body-copy-p"[\s\S]*?>\s*Many newly-hired candidates[\s\S]*?offer.\s*<\/p>/, '<p class="body-copy-p"\n                                style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                ' + introText + '\n                            </p>');

// 6. Bullets
html = html.replace(/What\s+AI fluency actually looks like in a candidate/, 'Understand why maternity billing is unbundling in 2027');
html = html.replace(/Why\s+traditional signals like CVs fail for AI roles/, 'Identify where costs will rise and lose predictability');
html = html.replace(/Real\s+insights from companies hiring for AI today/, 'Assess hidden risks for employer-sponsored health plans');
html = html.replace(/How\s+to evolve your hiring processes to verify execution/, 'Discover strategies to stay ahead of the 2027 changes');

// 7. Presenters
// P1
html = html.replace(/https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775660546464_120/, '');
html = html.replace(/alt="Mehak Chowdhary"/, 'alt="Dr. Neel Shah"');
html = html.replace(/Mehak Chowdhary/, 'Dr. Neel Shah');
html = html.replace(/Head of Marketing - TestGorilla/, 'Chief Medical Officer - Maven Clinic');

// P2
html = html.replace(/https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775663244968_120/, '');
html = html.replace(/alt="Megan Bourdages"/, 'alt="Doreen Bortel"');
html = html.replace(/Megan Bourdages/, 'Doreen Bortel');
html = html.replace(/Vice President of Sales - TestGorilla/, 'Chief Revenue Officer - Maven Clinic');

// 8. Handle N/A Credits
// The user complained by showing the credit block. Because the metadata says 'Credits: N/A',
// and this is a standalone emailer, we MUST remove the credit section entirely to avoid falsely advertising credits.
html = html.replace(/<!-- ============================================================ -->\s*<!-- CREDIT INFORMATION — KEEP EXACTLY INTACT                     -->\s*<!-- ============================================================ -->[\s\S]*?<!-- ============================================================ -->\s*<!-- FOOTER — KEEP EXACTLY INTACT/, '<!-- ============================================================ -->\n                    <!-- FOOTER — KEEP EXACTLY INTACT');

fs.writeFileSync(outPath, html, 'utf8');
console.log('Successfully generated ' + outPath);
