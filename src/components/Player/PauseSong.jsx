import React from "react";
import { PlayerInterface } from "react-mui-player";

const PauseSong = ({ children }) => {
  const pauseSong = () => {
    PlayerInterface.pause();
  };
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => pauseSong(),
      style: { cursor: "pointer" },
    });
  });
};

export default PauseSong;
