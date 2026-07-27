const fs = require('fs');
const path = require('path');

const destPath = 'e:/HR/00-html/00-emailer-automation/webcasts/virtual-event-2026-05-27-ai-in-people-decisions/virtual-event-2026-05-27-ai-in-people-decisions.html';
let html = fs.readFileSync(destPath, 'utf8');

// Title tag
html = html.replace(/<title>.*?<\/title>/, '<title>AI in People Decisions: What the Research Actually Says | HR.com Webcast</title>');

// Subject Line
html = html.replace(/\[REPLACE WITH GENERATED SUBJECT LINE\]/, 'Your AI tools might be hiding bias. [May 27]');

// Preheader
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, 'Unpack the latest research on how AI behaves in HR workflows—and how to govern it.');

// Header Bar Logo
html = html.replace(/https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg/, 'https://public-cdn.hr.com/system/app/media/rs/2024/2/22/lsxgwcfe/120.jpg');
html = html.replace(/alt="TestGorilla"/g, 'alt="AIX powered by HR.com"');

// Hero Title
html = html.replace(/The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/, 'AI in People Decisions: What the Research Actually Says');

// Hero Date
html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET/, 'May 27, 2026 at 11:00 AM - 11:30 AM ET');

// CTA Links
html = html.replace(/__STORY_ID__/g, '1778004460715');
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/j34fi');
html = html.replace(/__VE_NAME__/g, 'AI4HR Live');
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/32ip');

// Intro Paragraph
html = html.replace(
    `Many newly-hired candidates sound fluent in AI during interviews but fail on the job.
                                Join this webcast to learn what real AI fluency looks like and how to verify it before
                                you make an offer.`,
    `Are your new AI hiring tools actually reducing bias, or just hiding it? Join this webcast to unpack the latest research on how AI behaves in real HR workflows and how to govern it effectively.`
);

// Bullet 1
html = html.replace(
    `What\r\n                                            AI fluency actually looks like in a candidate`,
    `Identify workflow conditions that increase unreliable AI outputs`
);
html = html.replace(
    `What\n                                            AI fluency actually looks like in a candidate`,
    `Identify workflow conditions that increase unreliable AI outputs`
);


// Bullet 2
html = html.replace(
    `Why\r\n                                            traditional signals like CVs fail for AI roles`,
    `Recognize assumptions in vendor claims about bias reduction`
);
html = html.replace(
    `Why\n                                            traditional signals like CVs fail for AI roles`,
    `Recognize assumptions in vendor claims about bias reduction`
);


// Bullet 3
html = html.replace(
    `Real\r\n                                            insights from companies hiring for AI today`,
    `Formulate targeted questions to evaluate AI tools`
);
html = html.replace(
    `Real\n                                            insights from companies hiring for AI today`,
    `Formulate targeted questions to evaluate AI tools`
);


// Bullet 4
html = html.replace(
    `How\r\n                                            to evolve your hiring processes to verify execution`,
    `Identify practical steps to strengthen internal AI governance`
);
html = html.replace(
    `How\n                                            to evolve your hiring processes to verify execution`,
    `Identify practical steps to strengthen internal AI governance`
);

// Presenters
html = html.replace(/Mehak Chowdhary/g, 'Charles Epstein');
html = html.replace(/Head of Marketing - TestGorilla/g, 'Founder and Managing Director - AIX powered by HR.com');
html = html.replace(/https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775660546464_120/g, 'https://public-cdn.hr.com/profile_images/2017/5/23/1495544030200_120');

html = html.replace(/Megan Bourdages/g, 'Alice Dawson');
html = html.replace(/Vice President of Sales - TestGorilla/g, 'Associate Research Scientist - Rutgers University');
html = html.replace(/https:\/\/public-cdn\.hr\.com\/profile_images\/2026\/4\/8\/1775663244968_120/g, 'https://public-cdn.hr.com/profile_images/2026/5/5/1778003702071_120');

fs.writeFileSync(destPath, html);
console.log('Successfully generated: ' + destPath);
