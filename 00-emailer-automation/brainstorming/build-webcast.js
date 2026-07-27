const fs = require('fs');
const path = require('path');

const templatePath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-webcast-template.html';
const outputPath = 'e:/HR/00-html/00-emailer-automation/webcasts/2026-04-23-end-the-architorture/2026-04-23-end-the-architorture.html';

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Preview text
html = html.replace(
    /The conversation around AI in HR has moved past chatbots and content generators\.\.\./, 
    "Tired of scattered HR data stalling your reviews? End the archi-torture..."
);

// 2. Sponsor Logo 
// Since Sponsors: N/A, we will replace the <img> block with an empty space or just remove it.
html = html.replace(
    /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2022\/3\/25\/l164gf41\/120\.jpg"[\s\S]*?\/>/,
    ""
);

// 3. Webcast Title
html = html.replace(
    /A Practical Guide to AI Agents for HR \| HR\.com Webcast/,
    "End the Archi-torture: Modern Job Architecture Without the Chaos | HR.com Webcast"
);
html = html.replace(
    /A Practical Guide to AI Agents for HR\n\s*?<\/h1>/,
    "End the Archi-torture: Modern Job Architecture Without the Chaos\n                            </h1>"
);

// 4. Date Meta
html = html.replace(
    /April 14, 2026 at 11:00 AM - 12:00 PM ET/,
    "April 23, 2026 at 1:00 PM - 1:30 PM ET"
);

// 5. Links
html = html.replace(
    /https:\/\/www\.hr\.com\/(en\?t=\/CustomCode\/webcasts\/registration&storyID=1773147735398&relType=2)/g,
    "https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1772751702259&relType=2&eventID=1766410350540"
);

// 6. Intro Copy
html = html.replace(
    /AI agents are rewriting the rules of L&amp;D\. Early adopters are compressing weeks of work into hours&mdash;join this free session to learn how\./,
    "Tired of scattered HR data stalling your reviews? End the archi-torture. Discover how the JDX+ platform standardizes job information, giving your team speed and governance to build a sustainable architecture."
);

// 7. Bullets
html = html.replace(
    /What AI agents actually are &mdash; and why they’re different/,
    "Standardize critical data with best-practice fields and smart rules"
);
html = html.replace(
    /Real-world examples from Fortune 500 L&amp;D teams/,
    "Navigate customized architecture through a guided, step-by-step framework"
);
html = html.replace(
    /A practical readiness framework for your L&amp;D team/,
    "Leverage AI assistance while retaining human-in-the-loop review and audit controls"
);
html = html.replace(
    /How to compress weeks of L&amp;D work into hours/,
    "Transform complex reporting into actionable answers via plain language queries"
);

// 8. Speakers Array
const speakersArr = [
    {
        name: "Paul Smith",
        title: "Solutions Consultant - JDXpert",
        img: ""
    }
];

let speakerBlocks = [];
speakersArr.forEach(speaker => {
    let block = [
        '                                <div class="speaker-card-div"',
        '                                    style="display:inline-block;width:100%;vertical-align:top;text-align:center;padding:10px 0;">',
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
        '                                        style="max-width:280px;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
        '                                        class="speaker-card-inner">',
        '                                        <tr>',
        '                                            <td align="center" style="padding: 24px 16px;">',
        '                                                <img alt="' + speaker.name + '" src="' + speaker.img + '" width="90" style="display:block; border-radius:50%; margin-bottom:14px; border: 3px solid #ECEEF0;" />',
        '                                                <span class="speaker-name"',
        '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
        '                                                    ' + speaker.name,
        '                                                </span>',
        '                                                <span class="speaker-role"',
        '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
        '                                                    ' + speaker.title,
        '                                                </span>',
        '                                            </td>',
        '                                        </tr>',
        '                                    </table>',
        '                                </div>'
    ].join('\n');
    speakerBlocks.push(block);
});

// find the target to replace:
// from <div class="speaker-card-div" to </div>
// using regex
html = html.replace(
    /<!-- Presenter 1 -->[\s\S]*<!--\[if mso\]><\/td><!\[endif\]-->/g,
    '<!-- Presenter 1 -->\n<!--[if mso]><td width="100%" align="center" valign="top" style="padding:10px 0;"><![endif]-->\n' + speakerBlocks.join('\n') + '\n<!--[if mso]></td><![endif]-->'
);


fs.writeFileSync(outputPath, html);
console.log('Successfully wrote generated HTML to ' + outputPath);
