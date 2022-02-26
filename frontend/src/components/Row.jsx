import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

export default function Row({ color, soundName, sound, isPlayingFunc }) {
  const [mute, setMute] = useState(false);
  const audioRef = useRef();

  const handleMuteClick = () => {
    setMute((prevState) => !prevState);
  };

  const handleEnding = () => {
    if (audioRef.loop !== true) {
      isPlayingFunc(false);
    }
  };

  return (
    <div className="row" style={{ backgroundColor: `${color}` }}>
      {soundName}
      <audio
        ref={audioRef}
        onEnded={handleEnding}
        className="audioElement"
        muted={mute}
        src={sound}
      ></audio>
      <button className="muteButton" onClick={handleMuteClick}>
        {mute ? (
          <BiVolumeMute size={"1.5vh"} />
        ) : (
          <BiVolumeFull size={"1.5vh"} />
        )}
      </button>
    </div>
  );
}
