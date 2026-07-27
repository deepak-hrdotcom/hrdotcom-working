const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-webcast-template-virtual-event.html';
const destDir = 'e:/HR/00-html/00-emailer-automation/webcasts/2026-05-27-the-ai-hiring-gap';
const destPath = path.join(destDir, '2026-05-27-the-ai-hiring-gap.html');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

let content = fs.readFileSync(srcPath, 'utf8');

// Replacements
content = content.replace('[REPLACE WITH GENERATED SUBJECT LINE]', 'AI knowledge doesn\'t equal AI fluency [May 27]');
content = content.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', 'Find out why top candidates fail on the job and how to fix your hiring process. Register.');

// CTA Replacements
// It replaces globally just in case there are multiple
content = content.split('__STORY_ID__').join('1766413256784');
content = content.split('__SECONDARY_CTA__').join('https://web.hr.com/kr9b');
content = content.split('__VE_CTA__').join('https://web.hr.com/32ip');

fs.writeFileSync(destPath, content);
console.log('Done creating ' + destPath);
