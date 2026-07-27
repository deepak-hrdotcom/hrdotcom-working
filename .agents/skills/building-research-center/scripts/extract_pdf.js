const fs = require('fs');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();

const pdfPath = process.argv[2];
const outputPath = process.argv[3] || 'extracted_text.txt';

if (!pdfPath) {
    console.error('Usage: node extract_pdf.js <path-to-pdf> [output-path]');
    process.exit(1);
}

const options = {}; 

pdfExtract.extract(pdfPath, options, (err, data) => {
    if (err) return console.error('Error extracting PDF:', err);
    let extractedText = '';
    data.pages.forEach(page => {
        let lines = {};
        page.content.forEach(item => {
            const y = Math.round(item.y);
            if (!lines[y]) lines[y] = [];
            lines[y].push(item.str);
        });
        const sortedY = Object.keys(lines).sort((a, b) => Number(a) - Number(b));
        sortedY.forEach(y => {
            extractedText += lines[y].join(' ') + '\n';
        });
        extractedText += '\n--- PAGE BREAK ---\n\n';
    });
    
    fs.writeFileSync(outputPath, extractedText);
    console.log(`Successfully extracted ${data.pages.length} pages to ${outputPath}`);
});
