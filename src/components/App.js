import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import DrumPad from "./DrumPad";
import Display from "./Display";
import { setDisplayText } from "../redux/slice";
import "../styles/App.css";

const drumPads = [
  {
    id: "Heater 1",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    label: "Q",
  },
  {
    id: "Heater 2",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    label: "W",
  },
  {
    id: "Heater 3",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    label: "E",
  },
  {
    id: "Heater 4",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    label: "A",
  },
  {
    id: "Clap",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    label: "S",
  },
  {
    id: "Open-HH",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    label: "D",
  },
  {
    id: "Kick-n-Hat",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    label: "Z",
  },
  {
    id: "Kick",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    label: "X",
  },
  {
    id: "Closed-HH",
    audioSrc:
      "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
    label: "C",
  },
];

const App = () => {
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    const drumPad = document.getElementById(key);
    if (drumPad) {
      drumPad.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main
      id="drum-machine"
      data-testid="drum-machine"
      className="container text-center h-100 d-flex flex-column justify-content-center align-content-center"
    >
      <Display />
      <div className="row justify-content-center">
        {drumPads.map((pad) => (
          <DrumPad
            key={pad.label}
            id={pad.id}
            audioSrc={pad.audioSrc}
            label={pad.label}
            onClick={() => dispatch(setDisplayText(pad.id))}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
