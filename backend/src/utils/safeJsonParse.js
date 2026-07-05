export const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid AI JSON response.");
  }
};