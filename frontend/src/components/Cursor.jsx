import React, { useRef, useState } from "react";
import { useEffect } from "react";

export default function Cursor({ isPlaying }) {
  const [percentageComplete, setPercentageComplete] = useState(0);
  const audioRef = useRef();
  const intervalRef = useRef();

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    audioRef.current = document.querySelector(".audioElement");
    const audioElement = audioRef.current;

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setPercentageComplete(0);
      } else {
        const currentPercentage = audioElement.duration
          ? (audioElement.currentTime / audioElement.duration) * 100
          : 0;
        setPercentageComplete(currentPercentage);
      }
    }, [20]);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      const audioElement = audioRef.current;
      if (audioElement !== undefined) {
        const currentPercentage = audioElement.duration
          ? (audioElement.currentTime / audioElement.duration) * 100
          : 0;
        setPercentageComplete(currentPercentage);
      }
      clearInterval(intervalRef.current);
    }
  });

  return (
    <div
      className="cursor"
      style={{ marginLeft: `${(percentageComplete / 100) * 60}vw` }}
    ></div>
  );
}
