const fs = require('fs');
const destPath = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\webcasts\\\\standalone-2026-05-20-hiring-tech\\\\standalone-2026-05-20-hiring-tech.html';

let html = fs.readFileSync(destPath, 'utf8');

// Find where the sponsor logo might be
let match = html.match(/<img[^>]+alt=\"([^\"]+)\"[^>]*>/g);
if (match) {
    console.log("Images found:");
    match.forEach(m => console.log(m));
} else {
    console.log("No images found.");
}

// Check bullet section
let bulletIdx = html.indexOf("What You'll Learn");
if (bulletIdx !== -1) {
    console.log("\n--- Bullet Section ---");
    console.log(html.substring(bulletIdx, bulletIdx + 1500));
} else {
    console.log("No 'What You'll Learn' found.");
}
