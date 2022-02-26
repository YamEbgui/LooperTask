//get string and return it with spaces
export const cleanSoundName = (str) => {
  return str.replaceAll("_", " ").toUpperCase();
};
