import React from "react";
import { useSelector } from "react-redux";

const Display = () => {
  const displayText = useSelector((state) => state.drumMachine.displayText);

  return (
    <div id="display" className="mt-3">
      {displayText}
    </div>
  );
};

export default Display;
