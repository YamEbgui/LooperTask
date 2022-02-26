import React from "react";
import { useState } from "react";
import { improveString } from "../helpers";
import { colors } from "../helpers/colors";
import Row from "./Row";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { ImLoop } from "react-icons/im";
const sounds = require("../helpers/sounds.json");

export default function RowGroup() {
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setIsPlaying((prevState) => !prevState);
  };

  const handleStop = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      if (!audioElement.paused) audioElement.pause();
      audioElement.currentTime = 0;
    });
    setIsPlaying(false);
  };

  const soundtracks = sounds.filesNames.map((fileName, index) => {
    return (
      <Row
        key={fileName}
        color={colors[index]}
        soundName={improveString(fileName)}
        sound={`${process.env.PUBLIC_URL}/loopFiles/${fileName}.mp3`}
        isPlayingFunc={setIsPlaying}
      />
    );
  });

  return (
    <div className="rowGroup">
      {soundtracks}
      <div className="buttonsArea">
        <button id="playButton" className="controlButton" onClick={handlePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button id="stopButton" className="controlButton" onClick={handleStop}>
          <FaStop />
        </button>
        <button id="loopButton" className="controlButton" onClick={handleLoop}>
          <ImLoop color={isLooping ? "white" : "black"} />
        </button>
      </div>
    </div>
  );
}
