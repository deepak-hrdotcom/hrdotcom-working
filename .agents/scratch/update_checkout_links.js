const fs = require('fs');
const path = require('path');

const dir = 'E:/HR/00-html/00-projects/01-education/2026-Redesign-Education/cert-prep-course-pages';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalReplaced = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match the merchant checkout URLs (handles both product.show and basket.update)
  // Extracts the productID value which comes after productID=
  // And matches the rest of the string up until the quote (' or ")
  const regex = /\/en\?t=\/merchant\/singleCheckoutWizerd\/(?:product\.show|basket\.update)[^'"]*productID=(\d+)[^'"]*/g;
  
  const matches = content.match(regex);
  if (matches) {
    console.log(`Found ${matches.length} matches in ${file}`);
    
    // Replace each match with the new format
    const newContent = content.replace(regex, (match, productId) => {
      // The user requested: /en?t=/domain/checkout/index&productID=12345
      // Since it's in HTML, we should probably keep &amp; if it was used, or just use & as requested.
      // Usually hrefs should use &amp;, but the user's example was: <a href="/en?t=/domain/checkout/index&productID=12345">
      // Let's use &amp; just to be safe and valid HTML, since the old ones used &amp; or &.
      const ampersand = match.includes('&amp;') ? '&amp;' : '&';
      return `/en?t=/domain/checkout/index${ampersand}productID=${productId}`;
    });
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    totalReplaced += matches.length;
  }
});

console.log(`Update complete. Replaced ${totalReplaced} checkout links across all files.`);
