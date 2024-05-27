import React, { useEffect, useState, useRef } from "react";
import coverImg from "../assets/cover.jpg";

const SongCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [audio, setAudio] = useState(new Audio(song));
  const audioRef = useRef();
  const [progress, setProgress] = useState(0);

  const animate = () => {
    requestAnimationFrame(animate);
    setProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    animate();
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    console.log(audioRef.current.currentTime);
  }, [isPlaying]);

  return (
    <div className=" bg-black w-[40vw] h-4/5 m-auto rounded-xl">
      <audio ref={audioRef} src={song}></audio>
      <img
        className="w-[75%] h-[75%] rounded-lg object-contain mx-auto mt-6 mb-4 bg-white bg-opacity-50"
        src={coverImg}
        alt=""
      />
      <div className=" flex flex-col justify-center items-center gap-4">
        <p className=" text-white flex flex-row justify-center gap-2 w-[100%]">
          {Math.floor(progress)}
          <input className=" w-[70%]" type="range" value={progress} />
        </p>
        <button
          className=" bg-white py-2 rounded-md font-mono font-bold w-1/4 text-xl hover:bg-sky-500 transition-all ease-in-out "
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default SongCard;
