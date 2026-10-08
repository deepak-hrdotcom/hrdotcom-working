const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'virtual-event-2026-06-10-creating-rewards-and-recognition.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace subject and preheader
html = html.replace(
    /<!-- SUBJECT: \[REPLACE WITH GENERATED SUBJECT LINE\] -->/g,
    '<!-- SUBJECT: Are your employee rewards falling flat? [June 10] -->'
);
html = html.replace(
    /\[REPLACE WITH GENERATED PREHEADER TEXT\]/g,
    'Learn how to overcome cost barriers and build a recognition system that drives real impact.'
);

// 2. Replace Header Sponsor
const sponsorHtml = [
    '<table border="0" cellpadding="0" cellspacing="0">',
    '  <tr>',
    '    <td valign="middle" style="padding-right: 15px;">',
    '      <img src="https://public-cdn.hr.com/system/app/media/rs/2026/2/11/mlicv0tp/120.jpg" alt="SAP SuccessFactors" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />',
    '    </td>',
    '    <td valign="middle">',
    '      <img src="https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg" alt="HR.com" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />',
    '    </td>',
    '  </tr>',
    '</table>'
].join('\n');

html = html.replace(
    /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"[\s\S]*?alt="TestGorilla"[\s\S]*?border:0;" \/>/,
    sponsorHtml
);

// 3. Replace Hero Title
html = html.replace(
    /The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/g,
    'Creating Rewards and Recognition That Actually Work'
);

// 4. Replace Hero Meta (Date)
html = html.replace(
    /May 27, 2026 at 2:30 PM - 3:30 PM ET/g,
    'June 10, 2026 at 10:00 AM - 10:55 AM ET'
);

// 5. Replace Hero CTA Link & Secondary CTA & VE Links
html = html.replace(/__STORY_ID__/g, '1777643225264');
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/foh3');
html = html.replace(/__VE_NAME__/g, "HR.com's State of Rewards and Recognition");
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/8lpd');

// 6. Replace Intro Para
html = html.replace(
    /Many newly-hired candidates sound fluent in AI during interviews but fail on the job\.[\s\S]*?Join this webcast to learn what real AI fluency looks like and how to verify it before[\s\S]*?you make an offer\./,
    "Good intentions don't always translate into consistent employee recognition. Join this webcast to learn how to overcome cost and fairness barriers and build a strategic, inclusive rewards program that drives real impact."
);

// 7. Replace Bullets
html = html.replace(
    /<span class="takeaway-title"[^>]*>\s*What\s*AI fluency actually looks like in a candidate\s*<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">How organizations measure rewards and recognition effectiveness</span>'
);

html = html.replace(
    /<span class="takeaway-title"[^>]*>\s*Why\s*traditional signals like CVs fail for AI roles\s*<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">The most valued rewards and recognition methods</span>'
);

html = html.replace(
    /<span class="takeaway-title"[^>]*>\s*Real\s*insights from companies hiring for AI today\s*<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Key barriers like cost, fairness, and leadership support</span>'
);

html = html.replace(
    /<span class="takeaway-title"[^>]*>\s*How\s*to evolve your hiring processes to verify execution\s*<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">How AI improves personalization and timely recognition</span>'
);

// 8. Speakers
// Speaker 1
html = html.replace(
    /src="https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775660546464_120"/g,
    'src="https://public-cdn.hr.com/profile_images/2016/11/10/1478801377343_120"'
);
html = html.replace(/Mehak Chowdhary/g, 'Mark Vickers');
html = html.replace(/Head of Marketing - TestGorilla/g, 'Chief Research Analyst &amp; Data Wrangler (HR.com)');

// Speaker 2
html = html.replace(
    /src="https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775663244968_120"/g,
    'src="https://public-cdn.hr.com/profile_images/2018/12/21/1545408161313_120"'
);
html = html.replace(/Megan Bourdages/g, 'Lauren Bidwell, Ph.D.');
html = html.replace(/Vice President of Sales - TestGorilla/g, 'Senior Research Scientist (SAP SuccessFactors)');


fs.writeFileSync(filePath, html);
console.log('Done replacing content.');
