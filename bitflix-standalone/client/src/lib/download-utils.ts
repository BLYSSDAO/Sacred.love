import { jsPDF } from "jspdf";

export const downloadPDF = (title: string, subtitle: string, sections: { heading: string; content: string }[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const textWidth = pageWidth - (margin * 2);
  let y = 20;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, margin, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text(subtitle, margin, y);
  y += 20;

  // Separator
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Content
  doc.setTextColor(0);
  doc.setFontSize(12);

  sections.forEach((section) => {
    // Check for page break
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(section.heading, margin, y);
    y += 8;

    // Body
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    
    // Split text to fit width
    const splitText = doc.splitTextToSize(section.content.replace(/\s+/g, " ").trim(), textWidth);
    
    // Check height of text block
    const textHeight = splitText.length * 7;
    if (y + textHeight > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(splitText, margin, y);
    y += textHeight + 10;
  });

  // Footer
  const pageCount = doc.internal.pages.length - 1; // internal pages is 1-indexed but includes empty init
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} - BLYSS DAO Confidential`, margin, 285);
  }

  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};
