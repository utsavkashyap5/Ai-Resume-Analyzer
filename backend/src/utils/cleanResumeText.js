/**
 * Cleans extracted resume text before sending it to the AI.
 * Generic preprocessing only.
 * No hardcoded technologies.
 */

export const cleanResumeText = (text = "") => {
  if (!text) return "";

  let cleaned = text;

  cleaned = normalizeLineEndings(cleaned);
  cleaned = normalizeUnicode(cleaned);
  cleaned = normalizeWhitespace(cleaned);
  cleaned = normalizeBlankLines(cleaned);
  cleaned = normalizePunctuationSpacing(cleaned);
  cleaned = fixSeparatedLetters(cleaned);

  return cleaned.trim();
};

/**
 * Convert Windows line endings to Unix.
 */
const normalizeLineEndings = (text) => {
  return text.replace(/\r\n/g, "\n");
};

/**
 * Replace weird unicode characters commonly found in PDFs.
 */
const normalizeUnicode = (text) => {
  return text

    // Non-breaking space
    .replace(/\u00A0/g, " ")

    // Zero-width spaces
    .replace(/[\u200B-\u200D\uFEFF]/g, "")

    // Fancy quotes
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")

    // Long dashes
    .replace(/[–—]/g, "-");
};

/**
 * Normalize tabs and multiple spaces.
 */
const normalizeWhitespace = (text) => {
  return text
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ");
};

/**
 * Remove excessive blank lines.
 */
const normalizeBlankLines = (text) => {
  return text.replace(/\n{3,}/g, "\n\n");
};

/**
 * Fix spacing around punctuation.
 *
 * Example:
 * React . js -> React.js
 * Node . js -> Node.js
 */
const normalizePunctuationSpacing = (text) => {
  return text.replace(/(\w+)\s*\.\s*(\w+)/g, "$1.$2");
};

/**
 * Merge words extracted as individual capital letters.
 *
 * Example:
 * U T S A V
 * ->
 * UTSAV
 */
const fixSeparatedLetters = (text) => {
  return text.replace(
    /\b(?:[A-Z]\s+){2,}[A-Z]\b/g,
    (match) => match.replace(/\s+/g, "")
  );
};