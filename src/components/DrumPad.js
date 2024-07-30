import React from "react";

const DrumPad = ({ id, audioSrc, label, onClick }) => {
  const handleClick = () => {
    document.getElementById(label).play();
    onClick();
  };

  return (
    <button
      type="button"
      className="drum-pad btn btn-primary m-1"
      id={id}
      onClick={handleClick}
    >
      {label}
      <audio className="clip" id={label} src={audioSrc} />
    </button>
  );
};

export default DrumPad;
