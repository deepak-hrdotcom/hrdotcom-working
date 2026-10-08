const fs = require('fs');

const path = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\webcasts\\\\standalone-2026-05-20-hiring-tech\\\\standalone-2026-05-20-hiring-tech.html';
let html = fs.readFileSync(path, 'utf8');

// Logo
html = html.replace(
    /<img src=\"https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg\"[\s\S]*?alt=\"TestGorilla\"/s,
    '<img src=\"https://public-cdn.hr.com/system/app/media/rs/2025/6/24/mcapy8ld/120.jpg\"\n                                            alt=\"SelectSoftware Reviews\"'
);

// Bullets
html = html.replace(
    />What[\s\S]*?AI fluency actually looks like in a candidate<\/span>/s,
    '>How hiring tech directly influences candidate perception</span>'
);
html = html.replace(
    />Why[\s\S]*?traditional signals like CVs fail for AI roles<\/span>/s,
    '>Where systems commonly break down and create friction</span>'
);
html = html.replace(
    />Real[\s\S]*?insights from companies hiring for AI today<\/span>/s,
    '>How to audit your current hiring tech stack</span>'
);
html = html.replace(
    />How[\s\S]*?to evolve your hiring processes to verify execution<\/span>/s,
    '>Quick wins to immediately improve the candidate experience</span>'
);

fs.writeFileSync(path, html);
console.log('Fixed!');
