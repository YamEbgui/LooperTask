import React from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { ImLoop } from "react-icons/im";

export default function ControlButtons({
  isPlaying,
  isLooping,
  handleLoop,
  handlePlay,
  handleStop,
}) {
  return (
    <div className="buttonsArea">
      <button id="playButton" className="controlButton" onClick={handlePlay}>
        {isPlaying ? <FaPause size={"2vh"} /> : <FaPlay size={"2vh"} />}
      </button>
      <button id="stopButton" className="controlButton" onClick={handleStop}>
        <FaStop size={"2vh"} />
      </button>
      <button
        id="loopButton"
        className={isLooping ? "controlButton active" : "controlButton"}
        onClick={handleLoop}
      >
        <ImLoop size={"2vh"} color={isLooping ? "white" : "black"} />
      </button>
    </div>
  );
}
