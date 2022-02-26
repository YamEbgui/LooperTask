//get string and return it with spaces instead of underline
export const improveString = (str) => {
  return str.replaceAll("_", " ").toUpperCase();
};
