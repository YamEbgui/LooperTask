import React, { useEffect, useRef, useState } from "react";
//import help function
import { setAllAudioTime } from "../helpers";
//import icon
import { BsFillHandIndexThumbFill } from "react-icons/bs";

export default function Cursor({ isPlaying, isStopped, setIsStopped }) {
  const [percentageComplete, setPercentageComplete] = useState(0);

  const audioRef = useRef(); //reference for audioElement
  const intervalRef = useRef(); //reference for interval(if started)

  const setCursorLoop = () => {
    clearInterval(intervalRef.current); //remove past interval

    audioRef.current = document.querySelector(".audioElement");

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setPercentageComplete(0);
      } else {
        const audioElement = audioRef.current;
        const currentPercentage = audioElement.duration
          ? (audioElement.currentTime / audioElement.duration) * 100
          : 0;
        setPercentageComplete(currentPercentage);
      }
    }, [20]);
  };

  //if audio is playing start interval for to see movement of the cursor
  //otherwise determinate percentage of progress and set state
  useEffect(() => {
    if (isStopped) {
      setPercentageComplete(0);
    }
    if (isPlaying) {
      setCursorLoop();
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

  //handle end of cursor drag
  //calculating percentage of the audio based on the position of the pointer(only vertical)
  //set audio current time and the state of the component.
  const handleDrop = (e) => {
    const percentage = Math.round(
      ((e.pageX - window.innerWidth * 0.2) / (window.innerWidth * 0.6)) * 100
    );
    if (percentage > 100 || percentage < 0) {
      setAllAudioTime(0, ".audioElement");
      setPercentageComplete(0);
    } else {
      setIsStopped(false); //change state to make drag & drop work after audio stopped
      setAllAudioTime(percentage, ".audioElement");
      setPercentageComplete(percentage);
    }
  };

  return (
    <div
      className="cursor"
      style={{ marginLeft: `${(percentageComplete / 100) * 60 - 0.9}vw` }}
      //set marginLeft to see movement of the cursor (0.9 for line accuracy)
      draggable="true"
      onDragEnd={handleDrop}
    >
      <div id="cursorLine"></div>
      <BsFillHandIndexThumbFill id="handIcon" size={"1.8vw"} color={"white"} />
    </div>
  );
}
