import React, { useRef } from "react";

import { PlayerInterface, Track } from "react-mui-player";

const PlaySong = ({ trackDetails = {}, children }) => {
  const currTrackRef = useRef(trackDetails);
  const { ID, coverArt, title, artist, source } = currTrackRef.current;
  const playSong = () => {
    PlayerInterface.play([new Track(ID, coverArt, title, artist, source)]);
  };
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => playSong(),
      style: { cursor: "pointer" },
    });
  });
};

export default PlaySong;
