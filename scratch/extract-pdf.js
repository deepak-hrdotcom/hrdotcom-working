const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join(__dirname, '../00-research/2026/HR.com-State-of-Today\'s-HR-Technology-and-Integrations/pdfs/chapter-09.pdf');
const outputPath = path.join(__dirname, '../00-research/2026/HR.com-State-of-Today\'s-HR-Technology-and-Integrations/pdfs/chapter-09-extracted.txt');

console.log("Reading PDF from:", pdfPath);

if (!fs.existsSync(pdfPath)) {
  console.error("PDF file not found!");
  process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: dataBuffer });

parser.getText().then(function(result) {
  fs.writeFileSync(outputPath, result.text);
  console.log("PDF text extracted successfully to:", outputPath);
  parser.destroy();
}).catch(err => {
  console.error("Error parsing PDF:", err);
  process.exit(1);
});
