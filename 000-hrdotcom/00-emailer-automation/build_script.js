const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-webcast-template.html';
const destDir = 'e:/HR/00-html/00-emailer-automation/webcasts/2026-04-08-what-employees-need-most-to-thrive-at-work';
const destPath = path.join(destDir, '2026-04-08-what-employees-need-most-to-thrive-at-work.html');

let html = fs.readFileSync(srcPath, 'utf8');

html = html.replace(/{{TITLE}}/g, 'What Employees Need Most to Thrive at Work');
html = html.replace(/{{PREVIEW_TEXT}}/g, 'Break down the barriers to employee engagement and discover how top organizations are leveraging AI and flexible models to build human-centered workplaces.');
html = html.replace(/{{DATE}}/g, 'April 8, 2026 at 10:00 AM - 10:55 AM ET');
html = html.replace(/{{REG_LINK}}/g, 'https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773670189654&relType=2&eventID=1752588609462');

const copyHtml = Array(
  '<p style="margin:0 0 16px 0; font-family:\'Manrope\',Arial,sans-serif; font-size:16px; font-weight:400; color:#4A5568; line-height:28px; text-align:left;">',
  'Employee expectations are peaking, burnout remains a persistent threat, and rapid AI adoption is fundamentally shifting how work gets done. Yet despite these pressures, your HR team is likely struggling to break down the barriers—from budget constraints to leadership buy-in—that prevent you from delivering a truly supportive, engaging work experience.',
  '</p>',
  '<p style="margin:0; font-family:\'Manrope\',Arial,sans-serif; font-size:16px; font-weight:500; color:#2A343E; line-height:28px; text-align:left;">',
  'Join us as we unpack the 7th Annual Future of Human Experience Study 2026. Discover actionable insights to leverage AI and refine flexible models, empowering you to build a more human-centered, thriving workplace.',
  '</p>'
).join('\n');

html = html.replace(/{{COPY}}/g, copyHtml);

const presentersHtml = Array(
  '<table border="0" cellpadding="0" cellspacing="0" align="center">',
  '  <tr>',
  '    <td align="center">',
  '      <div class="speaker-card-div" style="display:inline-block; vertical-align:top; width:260px; margin: 0 10px;">',
  '        <table border="0" cellpadding="0" cellspacing="0" width="100%">',
  '          <tr>',
  '            <td align="center" style="padding: 16px;" class="speaker-card-inner">',
  '              <img alt="Mark Vickers" src="https://public-cdn.hr.com/profile_images/2016/11/10/1478801377343_120" width="90" style="display:block; border-radius:50%; margin-bottom:14px; border: 3px solid #ECEEF0;" />',
  '              <h3 class="speaker-name" style="margin:0 0 4px 0; font-family:\'Manrope\',Arial,sans-serif; font-size:16px; font-weight:800; color:#2A343E;">Mark Vickers</h3>',
  '              <p class="speaker-role" style="margin:0; font-family:\'Manrope\',Arial,sans-serif; font-size:13px; font-weight:600; color:#FDB414; line-height:18px;">Chief Research Analyst & Data Wrangler<br/><span style="color:#718096;font-weight:500;font-size:12px;">HR.com</span></p>',
  '            </td>',
  '          </tr>',
  '        </table>',
  '      </div>',
  '    </td>',
  '  </tr>',
  '</table>'
).join('\n');

html = html.replace(/{{PRESENTERS}}/g, presentersHtml);

const sponsorsHtml = Array(
  '<table border="0" cellpadding="0" cellspacing="0" align="center">',
  '  <tr>',
  '    <td align="center" style="padding: 0 15px;">',
  '      <img alt="SAP" src="https://public-cdn.hr.com/system/app/media/rs/2026/2/11/mlicv0tp/120.jpg" style="display: block; max-width: 140px; height: auto;" border="0" />',
  '    </td>',
  '    <td align="center" style="padding: 0 15px;">',
  '      <img alt="HR.com" src="https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg" style="display: block; max-width: 140px; height: auto;" border="0" />',
  '    </td>',
  '  </tr>',
  '</table>'
).join('\n');

html = html.replace(/{{SPONSORS}}/g, sponsorsHtml);

html = html.replace('A clear diagnosis of your recognition gaps', 'Surprising workplace factors for engagement');
html = html.replace("Identify exactly what's missing and how to communicate its business value to leadership.", 'Discover which elements—from purpose and pay to workload and manager relationships—truly matter most to employees today.');

html = html.replace('How to surface hidden cultural risks with AI', 'Overcoming barriers to progress');
html = html.replace('Real-time behavioral data that lets you act before disengagement or attrition become costly.', 'Learn how to navigate budget limits, leadership buy-in, and infrastructure gaps to effectively improve the employee experience.');

html = html.replace('A scalable recognition framework that builds belonging', 'The growing role of AI at work');
html = html.replace('Personalize at scale and unlock the power of peer-to-peer moments that retain your best people.', 'Understand how AI can improve productivity and personalization while addressing the essential human concerns of trust and privacy.');

fs.mkdirSync(destDir, { recursive: true });
fs.writeFileSync(destPath, html, 'utf8');

console.log('Build complete');
