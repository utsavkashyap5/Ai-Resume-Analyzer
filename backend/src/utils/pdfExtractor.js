import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (buffer) => {
  try {
    const uint8Array = new Uint8Array(buffer);

    const pdf = await getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n";
    }

    extractedText = extractedText.replace(/\s+/g, " ").trim();

    if (!extractedText) {
      throw new Error("No readable text found in PDF.");
    }

    return extractedText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
};