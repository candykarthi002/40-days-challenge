import { useRef, useState } from "react";
import Header from "./components/Header";
import song from "./assets/Bloody Sweet.mp3";
import SongCard from "./components/SongCard";

function App() {
  const [audio, setAudio] = useState("");
  const handleInput = (e) => {
    console.log(new Audio(e.target.files[0]).src);
  };
  return (
    <div className=" bg-slate-400 h-screen w-screen px-10 py-5 flex flex-col justify-start">
      <Header title="VibeZone" />
      <SongCard song={song} />
    </div>
  );
}

export default App;
