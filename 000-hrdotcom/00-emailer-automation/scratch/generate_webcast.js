const fs = require('fs');
const path = require('path');

const templatePath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/virtual-event.html';
const outDir = 'e:/HR/00-html/00-emailer-automation/webcasts/virtual-event-2026-06-10-state-of-rewards-and-recognition';
const outFile = path.join(outDir, 'virtual-event-2026-06-10-state-of-rewards-and-recognition.html');

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Subject & Preheader
html = html.replace('[REPLACE WITH GENERATED SUBJECT LINE]', 'Is your recognition program actually working? [Jun 10]');
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', 'New research reveals what truly drives engagement, retention & well-being. Free Jun 10.');

// 2. Sponsor Logo (in the Header Bar)
html = html.replace(
    /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"[\s\S]*?alt="TestGorilla"[\s\S]*?\/>/,
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/5/15/mapi3di4/120.jpg" alt="Awardco" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />'
);

// 3. Hero Title & Date
html = html.replace(
    /The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/,
    'New Data on What Winning Teams Get Right With Employee Recognition'
);
html = html.replace(
    /May 27, 2026 at 2:30 PM - 3:30 PM ET/,
    'June 10, 2026 at 1:00 PM - 1:55 PM ET'
);

// 4. Hero CTA Link (Story ID)
html = html.replace(/__STORY_ID__/g, '1777052893381');

// 5. Intro Copy
const oldIntro = 'Many newly-hired candidates sound fluent in AI during interviews but fail on the job.\n                                Join this webcast to learn what real AI fluency looks like and how to verify it before\n                                you make an offer.';
const newIntro = 'Many recognition programs fail to drive real engagement or retention. Unpack Awardco’s latest research and discover evidence-based strategies to design recognition experiences that actually move the needle.';

// The HTML might have multiple spaces/newlines, so let's use a regex to replace it
html = html.replace(/Many newly-hired candidates sound fluent in AI during interviews but fail on the job\.[\s\S]*?you make an offer\./, newIntro);

// 6. Bullets
const bulletTexts = [
    'What truly drives engagement, retention, and well-being',
    'How frequency, authenticity, and visibility influence outcomes',
    'Ways recognition impact varies across roles and generations',
    'How to translate research data into meaningful EX strategies'
];

let bCount = 0;
html = html.replace(/<span class="takeaway-title"[\s\S]*?>[\s\S]*?<\/span>/g, (match) => {
    if (bCount < bulletTexts.length) {
        const text = bulletTexts[bCount];
        bCount++;
        return '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">' + text + '</span>';
    }
    return match;
});

// 7. Mid-Content & Footer CTAs
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/lc8w');

// 8. Virtual Event Callout
html = html.replace(/__VE_NAME__/g, "HR.com's State of Rewards and Recognition");
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/8lpd');

// 9. Speakers Section
html = html.replace('Your expert hosts', 'Your expert host');
html = html.replace('Learn directly from industry leaders', 'Learn directly from an industry leader');

const speakersStart = '<!-- Presenter 1 -->';
const speakersEnd = '<!--[if mso]></tr></table><![endif]-->';

const newSpeakerBlock = `<!-- Presenter 1 -->
<!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0"
    cellspacing="0"
    style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"
                class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:24px 16px;">
                        <img alt="Christi Gilhoi"
                            src="https://public-cdn.hr.com/profile_images/2025/10/22/1761157073071_120"
                            width="90" height="90"
                            style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                        <span class="speaker-name"
                            style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                            Christi Gilhoi
                        </span>
                        <span class="speaker-role"
                            style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                            Awardco Center of Excellence Employee Experience Executive (Awardco)
                        </span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!--[if mso]></td><![endif]-->

<!--[if mso]></tr></table><![endif]-->`;

const sIdx = html.indexOf(speakersStart);
const eIdx = html.indexOf(speakersEnd) + speakersEnd.length;

if (sIdx !== -1 && eIdx !== -1) {
    html = html.substring(0, sIdx) + newSpeakerBlock + html.substring(eIdx);
}

// 10. Title Tag
html = html.replace(/<title>.*?<\/title>/, '<title>New Data on What Winning Teams Get Right With Employee Recognition | HR.com Webcast</title>');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(outFile, html, 'utf8');
console.log('Successfully generated ' + outFile);
