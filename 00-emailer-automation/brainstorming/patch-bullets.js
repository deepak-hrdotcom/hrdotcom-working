
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../email-reference/premium-templates/upcoming-webcast-template.html');
let html = fs.readFileSync(filePath, 'utf8');

// Helper: build one bullet row
// color = badge bg color, textColor = badge text color, num = '01', label = bold text
function bulletRow(color, textColor, num, label, isLast) {
  var mb = isLast ? '0' : '14px';
  return [
    '                            <!-- Takeaway ' + num + ' -->',
    '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:' + mb + ';">',
    '                                <tr>',
    '                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">',
    '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
    '                                            <tr>',
    '                                                <td align="center" valign="middle"',
    '                                                    style="background-color:' + color + ';border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:' + textColor + ';line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
    '                                                    ' + num,
    '                                                </td>',
    '                                            </tr>',
    '                                        </table>',
    '                                    </td>',
    '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
    '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">' + label + '</span>',
    '                                    </td>',
    '                                </tr>',
    '                            </table>'
  ].join('\n');
}

// Build the four bullets block
var bulletsBlock = [
  bulletRow('#EF4A3D', '#FFFFFF', '01', 'What AI agents actually are &mdash; and why they\u2019re different', false),
  '',
  bulletRow('#4AC4D6', '#0D1F28', '02', 'Real-world examples from Fortune 500 L&amp;D teams', false),
  '',
  bulletRow('#94C83D', '#1A2A00', '03', 'A practical readiness framework for your L&amp;D team', false),
  '',
  bulletRow('#FDB414', '#1A1000', '04', 'How to compress weeks of L&amp;D work into hours', true)
].join('\n');

// Match and replace the entire old bullets block
// We'll match from "<!-- Takeaway 01 -->" to just before "<!-- Mid-content CTA"
var oldBulletsRe = /[ \t]*<!-- Takeaway 01 -->[\s\S]*?<!-- Takeaway 04 -->[\s\S]*?<\/table>\n/;

var match = oldBulletsRe.exec(html);
if (!match) {
  // Try the generated label format
  oldBulletsRe = /[ \t]*<!-- Takeaway 1 -->[\s\S]*?<!-- Takeaway 4 -->[\s\S]*?<\/table>\n/;
  match = oldBulletsRe.exec(html);
}

if (match) {
  html = html.replace(oldBulletsRe, bulletsBlock + '\n');
  console.log('Bullets replaced via regex.');
} else {
  console.log('ERROR: Could not find bullets block to replace. Dumping sample:');
  var idx = html.indexOf('Takeaway');
  console.log(html.substring(idx - 50, idx + 200));
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done.');
