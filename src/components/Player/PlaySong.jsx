import { useRef } from "react";

import { PlayerInterface, Track } from "react-mui-player";

const PlaySong = ({ trackDetails = {}, children }) => {
  const currTrackRef = useRef(trackDetails);
  const { ID, coverArt, title, artist, source } = currTrackRef.current;
  const playSong = () => {
    PlayerInterface.play([new Track(ID, coverArt, title, artist, source)]);
  };
  return <div onClick={() => playSong()}>{children}</div>;
};

export default PlaySong;
