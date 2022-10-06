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
      const { ID, coverArt, title, artist, source } = trackDetails;
      PlayerInterface.playLater([
        new Track(ID, coverArt, title, artist, source),
      ]);
    }
  };
  return <div onClick={() => addToPlaylist()}>{children}</div>;
};

export default AddToPlaylist;
