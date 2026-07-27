const fs = require('fs');
const path = require('path');

const srcPath = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\email-reference\\\\premium-templates\\\\upcoming-webcast-template.html';
const destFolder = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\webcasts\\\\2026-04-23-run-it-cue-executes-frontline-hiring';
const destPath = path.join(destFolder, '2026-04-23-run-it-cue-executes-frontline-hiring.html');

let html = fs.readFileSync(srcPath, 'utf8');

html = html.replace(
    '<title>A Practical Guide to AI Agents for HR | HR.com Webcast</title>',
    '<title>Run it: Cue executes frontline hiring and staffing in real time | HR.com Webcast</title>'
);

html = html.replace(
    'The conversation around AI in HR has moved past chatbots and content generators...',
    'Frontline hiring breaks when traditional software relies on manual effort. Join this demo...'
);

html = html.replace(
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2022/3/25/l164gf41/120.jpg"\\n                                            alt="Arist"',
    '<img src=""\\n                                            alt="N/A"'
);

// Fallback replace if newline was tricky:
html = html.replace(
    'https://public-cdn.hr.com/system/app/media/rs/2022/3/25/l164gf41/120.jpg',
    ''
).replace(
    'alt="Arist"',
    'alt=""'
);

html = html.split('A Practical Guide to AI Agents for HR').join('Run it: Cue executes frontline hiring and staffing in real time');

html = html.split('April 14, 2026 at 11:00 AM - 12:00 PM ET').join('April 23, 2026 at 11:00 AM - 11:30 AM ET');

html = html.split('https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773147735398&relType=2').join('https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1774975660593&relType=2&eventID=1766410350540');

html = html.replace(
    'AI agents are rewriting the rules of L&amp;D. Early adopters are compressing weeks of work into hours&mdash;join this free session to learn how.',
    'Frontline hiring breaks when traditional software relies on manual effort. Join this demo session to see how Cue by Fountain uses AI to fully automate frontline tracking, scheduling, and follow-up without manual oversight.'
);

html = html.replace(
    'What AI agents actually are &mdash; and why they’re different',
    "Diagnose what's slowing hiring across roles and locations"
);

html = html.replace(
    'Real-world examples from Fortune 500 L&amp;D teams',
    'Automatically follow up with candidates to reduce drop-off'
);

html = html.replace(
    'A practical readiness framework for your L&amp;D team',
    'Generate a hiring plan and execute the next best actions'
);

html = html.replace(
    'How to compress weeks of L&amp;D work into hours',
    'Improve time-to-hire and fill rates without adding headcount'
);

html = html.replace(
    '<img alt="Michael Ioffe" src="https://public-cdn.hr.com/profile_images/2021/12/14/1639477478951_120"',
    '<img alt="Will Jensen" src=""'
);
html = html.split('Michael Ioffe').join('Will Jensen');
html = html.split('Co-Founder and CEO - Arist').join('Senior Director, Special Projects - Fountain');

if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
}
fs.writeFileSync(destPath, html);
console.log('Created emailer at ' + destPath);
