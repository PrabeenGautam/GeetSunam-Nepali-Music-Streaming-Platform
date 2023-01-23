import React from "react";

import { PlayerInterface } from "@/react-mui-player";

const ResumeSong = ({ children }) => {
  const resumeSong = () => {
    PlayerInterface.play();
  };
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => resumeSong(),
      style: { cursor: "pointer" },
    });
  });
};

export default ResumeSong;
