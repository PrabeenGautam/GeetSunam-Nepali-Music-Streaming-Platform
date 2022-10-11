import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { PlayerInterface, Track } from "react-mui-player";

const PlayNext = ({ trackDetails = {}, children }) => {
  const playlist = useSelector((state) => state.playlist, shallowEqual);

  const isOnPlaylist = () => {
    if (playlist.length === 0) {
      return false;
    } else {
      return playlist.some((song) => song.ID === trackDetails.ID);
    }
  };

  const addToPlayNext = () => {
    if (!isOnPlaylist()) {
      //maintain order!
      const { ID, coverArt, title, artist, source } = trackDetails;
      PlayerInterface.playNext([
        new Track(ID, coverArt, title, artist, source),
      ]);
    }
  };

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => addToPlayNext(),
      style: { cursor: "pointer" },
    });
  });
};

export default PlayNext;
