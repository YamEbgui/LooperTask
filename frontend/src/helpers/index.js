//get string and return it with spaces instead of underline
export const improveString = (str) => {
  return str.replaceAll("_", " ").toUpperCase();
};

//get selector of audio elements and set their current time by the percentage the user insert
export const setAllAudioTime = (percentage, audioSelector) => {
  document.querySelectorAll(audioSelector).forEach((audioElement) => {
    audioElement.currentTime = (percentage / 100) * audioElement.duration;
  });
};
