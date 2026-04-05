const AdmZip = require('adm-zip');
const zip = new AdmZip('e:\\SGP\\Technical_paper_final_SGP_-_2025-26.docx');
const content = zip.readAsText('word/document.xml');

// Better XML text extraction - preserve paragraph breaks
const paragraphs = content.split(/<\/w:p>/g);
let lineNum = 0;
paragraphs.forEach(p => {
  // Extract text from w:t tags
  const texts = [];
  const matches = p.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g);
  for (const m of matches) {
    texts.push(m[1]);
  }
  const line = texts.join('').trim();
  if (line.length > 0) {
    console.log(`${lineNum}: ${line}`);
    lineNum++;
  }
});
