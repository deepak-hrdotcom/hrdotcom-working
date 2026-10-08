const fs = require('fs');
const srcPath = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\email-reference\\\\premium-templates\\\\standalone.html';
const buf = fs.readFileSync(srcPath);
console.log("First bytes:", buf.slice(0, 4));
