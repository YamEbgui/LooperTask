import React from "react";
import { useState } from "react";
import { cleanSoundName } from "../helpers";
import Row from "./Row";
// import * as sounds from "../helpers/sounds.json";
const sounds = require("../helpers/sounds.json");

export default function RowGroup() {
  const [isLooping, setIsLooping] = useState(false);

  const handleLoop = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      audioElement.loop = !audioElement.loop;
    });
    setIsLooping((prevState) => !prevState);
  };

  const handlePlay = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      audioElement.paused ? audioElement.play() : audioElement.pause();
    });
  };

  const handleStop = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      if (!audioElement.paused) audioElement.pause();
      audioElement.currentTime = 0;
    });
  };

  const soundtracks = sounds.filesNames.map((fileName) => {
    return (
      <Row
        key={fileName}
        soundName={cleanSoundName(fileName)}
        sound={`${process.env.PUBLIC_URL}/loopFiles/${fileName}.mp3`}
      />
    );
  });

  return (
    <div>
      {soundtracks}
      <button onClick={handlePlay}>PLAY</button>
      <button onClick={handleStop}>STOP</button>
      <button className="" onClick={handleLoop}>
        LOOP
      </button>
    </div>
  );
}
