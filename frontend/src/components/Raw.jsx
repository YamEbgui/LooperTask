import React from "react";
import { useState } from "react";

export default function Raw({ sound }) {
  const [mute, setMute] = useState(false);

  const handleMuteClick = () => {
    setMute((prevState) => !prevState);
  };

  return (
    <div className="raw">
      <h3>sound</h3>
      <audio autoPlay muted={mute} src={sound}></audio>
      <button onClick={handleMuteClick}>mute</button>
    </div>
  );
}
