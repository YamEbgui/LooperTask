import React, { useState } from "react";
//import help function
import { improveString } from "../helpers";
//import array with 9 colors for the row colors
import { colors } from "../helpers/colors";
//import components
import Row from "./Row";
import Cursor from "./Cursor";
import ControlButtons from "./ControlButtons";
//import array with the audio files names to found then in Public directory
const sounds = require("../helpers/sounds.json");

export default function RowGroup() {
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  //handle click on loop button
  //set all audio elements loop or disable loop
  const handleLoop = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      audioElement.loop = !audioElement.loop;
    });
    setIsLooping((prevState) => !prevState);
  };

  //handle click on play button
  //play or pause all audio elements on the page
  const handlePlay = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      audioElement.paused ? audioElement.play() : audioElement.pause();
    });
    setIsStopped(false);
    setIsPlaying((prevState) => !prevState);
  };

  //handle click on stop button
  //stop all audio elements and set their current time to 0
  const handleStop = () => {
    document.querySelectorAll(".audioElement").forEach((audioElement) => {
      if (!audioElement.paused) audioElement.pause();
      audioElement.currentTime = 0;
    });
    setIsStopped(true);
    setIsPlaying(false);
  };

  //return ROW component for every audio file from list of audio files names
  const soundtracks = sounds.filesNames.map((fileName, index) => {
    return (
      <Row
        key={fileName}
        color={colors[index]}
        soundName={improveString(fileName)}
        soundSrc={`${process.env.PUBLIC_URL}/loopFiles/${fileName}.mp3`}
        isPlayingFunc={setIsPlaying}
      />
    );
  });

  return (
    <div className="rowGroup">
      <Cursor
        isPlaying={isPlaying}
        isStopped={isStopped}
        setIsStopped={setIsStopped}
      />
      {soundtracks}
      <ControlButtons
        isPlaying={isPlaying}
        isLooping={isLooping}
        handlePlay={handlePlay}
        handleLoop={handleLoop}
        handleStop={handleStop}
      />
    </div>
  );
}
