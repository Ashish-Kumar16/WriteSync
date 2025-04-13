const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (page, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${page.title}.pdf"`,
  );
  doc.pipe(res);

  doc.fontSize(20).text(page.title, { align: "center" });
  doc.moveDown();

  page.blocks.forEach((block) => {
    if (block.type.startsWith("heading-")) {
      const level = parseInt(block.type.split("-")[1]);
      doc.fontSize(18 - level * 2).text(block.content);
    } else if (block.type === "image") {
      // Note: PDFKit requires image files to be accessible; adjust paths as needed
      try {
        doc.image(block.content, { width: 300 });
      } catch (err) {
        doc.fontSize(12).text("[Image not available]");
      }
    } else if (block.type === "divider") {
      doc.moveDown().lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    } else {
      doc.fontSize(12).text(block.content);
    }
    doc.moveDown();
  });

  doc.end();
};

module.exports = { generatePDF };
