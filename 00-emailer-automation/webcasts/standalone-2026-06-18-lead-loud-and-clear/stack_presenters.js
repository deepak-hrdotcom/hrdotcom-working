const fs = require('fs');

const path = 'e:/HR/00-html/00-emailer-automation/webcasts/standalone-2026-06-18-lead-loud-and-clear/standalone-2026-06-18-lead-loud-and-clear.html';
let html = fs.readFileSync(path, 'utf8');

// Regex to find the entire speakers section td inner content
const speakersSectionStart = html.indexOf('<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->');
const speakersSectionEnd = html.indexOf('<!--[if mso]></tr></table><![endif]-->') + '<!--[if mso]></tr></table><![endif]-->'.length;

if (speakersSectionStart !== -1 && speakersSectionEnd !== -1) {
    const speakersSection = html.slice(speakersSectionStart, speakersSectionEnd);
    
    // Extract presenters
    const presenterRegex = /<!-- Presenter \d -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/g;
    const presenters = speakersSection.match(presenterRegex);
    
    if (presenters && presenters.length > 0) {
        let newSpeakersSection = '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><![endif]-->\n';
        
        presenters.forEach((presenterHTML, index) => {
            // Update MSO tags for stacking
            let modified = presenterHTML.replace(/<!--\[if mso\]><td width="\d+" valign="top" style="padding:10px 4px;"><!\[endif\]-->/, '<!--[if mso]><tr><td width="100%" align="center" valign="top" style="padding:10px 0;"><![endif]-->');
            modified = modified.replace(/<!--\[if mso\]><\/td><!\[endif\]-->/, '<!--[if mso]></td></tr><![endif]-->');
            
            // Update table styles for stacking
            modified = modified.replace(/style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:\d+px;min-width: \d+px;margin:\d+px;"/, 'style="border-spacing:0;display:block;width:100%;max-width:260px;margin:0 auto 16px auto;"');
            modified = modified.replace(/style="max-width:\d+px;min-width:\d+px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba\(0,0,0,0\.04\);"/, 'style="max-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"');
            
            newSpeakersSection += '\n' + modified + '\n';
        });
        
        newSpeakersSection += '\n                            <!--[if mso]></table><![endif]-->';
        
        const newHtml = html.slice(0, speakersSectionStart) + newSpeakersSection + html.slice(speakersSectionEnd);
        fs.writeFileSync(path, newHtml, 'utf8');
        console.log('Successfully stacked speakers.');
    } else {
        console.log('No presenters found.');
    }
} else {
    console.log('Speakers section not found.');
}
