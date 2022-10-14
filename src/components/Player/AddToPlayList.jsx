import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { PlayerInterface, Track } from "react-mui-player";

const AddToPlaylist = ({ trackDetails = {}, children }) => {
  const playlist = useSelector((state) => state.playlist, shallowEqual);

  const isOnPlaylist = () => {
    if (playlist.length === 0) {
      return false;
    } else {
      return playlist.some((song) => song.ID === trackDetails.ID);
    }
  };

  const addToPlaylist = () => {
    if (!isOnPlaylist()) {
      //maintain order!
      const { ID, coverArt, title, artist, source, isFavourite } = trackDetails;
      PlayerInterface.playLater([
        new Track(ID, coverArt, title, artist, source, isFavourite),
      ]);
    }
  };
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => addToPlaylist(),
      style: { cursor: "pointer" },
    });
  });
};

export default AddToPlaylist;
