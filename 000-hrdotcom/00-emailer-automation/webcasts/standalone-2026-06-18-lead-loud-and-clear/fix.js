const fs = require('fs');

const htmlPath = 'e:/HR/00-html/00-emailer-automation/webcasts/standalone-2026-06-18-lead-loud-and-clear/standalone-2026-06-18-lead-loud-and-clear.html';
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/<td width="200" valign="top" style="padding:10px 8px;">/g, '<td width="170" valign="top" style="padding:10px 4px;">');
html = html.replace(/max-width:200px;min-width: 200px;margin:8px;/g, 'max-width:170px;min-width: 170px;margin:4px;');
html = html.replace(/max-width:200px;min-width:200px;/g, 'max-width:170px;min-width:170px;');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done fixing widths!');
