import React from "react";
import { useState } from "react";

export default function Row({ soundName, sound }) {
  const [mute, setMute] = useState(false);

  const handleMuteClick = () => {
    setMute((prevState) => !prevState);
  };

  return (
    <div className="row">
      <h3>{soundName}</h3>
      <audio className="audioElement" autoPlay muted={mute} src={sound}></audio>
      <button onClick={handleMuteClick}>mute</button>
    </div>
  );
}
