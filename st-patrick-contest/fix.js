const fs = require('fs');
let content = fs.readFileSync('e:/HR/00-html/st-patrick-contest/index.html', 'utf-8');
// Fix duplicated spc- prefixes caused by overlapping subclass names
content = content.replace(/(spc-)+/g, 'spc-');
// Also if a class had a hyphen in front of spc-, fix it if any (shouldn't be, but just in case)
fs.writeFileSync('e:/HR/00-html/st-patrick-contest/index.html', content, 'utf-8');
console.log('Fixed multiple spc- prefixes!');
