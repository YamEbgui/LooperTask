import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { setAllAudioTime } from "../helpers";
import { BsFillHandIndexThumbFill } from "react-icons/bs";

export default function Cursor({ isPlaying, isStopped }) {
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
    if (isStopped) {
      setPercentageComplete(0);
    }
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

  const handleDrop = (e) => {
    const percentage = Math.round(
      ((e.pageX - window.innerWidth * 0.2) / (window.innerWidth * 0.6)) * 100
    );
    console.log(e.pageX, "pre", percentage);
    if (percentage > 100 || percentage < 0) {
      setAllAudioTime(0, ".audioElement");
      setPercentageComplete(0);
    } else {
      setAllAudioTime(percentage, ".audioElement");
      setPercentageComplete(percentage);
    }
  };

  return (
    <span
      className="cursor"
      style={{ marginLeft: `${(percentageComplete / 100) * 60 - 0.9}vw` }}
      draggable="true"
      onDragEnd={handleDrop}
    >
      <div id="cursorLine"></div>
      <BsFillHandIndexThumbFill id="handIcon" size={"1.8vw"} color={"white"} />
    </span>
  );
}
