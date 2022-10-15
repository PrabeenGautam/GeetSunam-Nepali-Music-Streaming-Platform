import React, { useEffect, useRef } from "react";

import { PlayerInterface, Track } from "react-mui-player";
import { useDispatch } from "react-redux";
import ActionCreators from "react-mui-player/redux/actionCreators";

const PlaySong = ({ trackDetails = {}, children, musicList = [] }) => {
  const currTrackRef = useRef(trackDetails);
  const {
    ID,
    coverArt,
    title,
    artist,
    source,
    isFavourite: favourite,
  } = currTrackRef.current;
  const dispatch = useDispatch();

  const playSong = () => {
    PlayerInterface.play([
      new Track(ID, coverArt, title, artist, source, favourite),
    ]);
    if (musicList.length !== 0) {
      PlayerInterface.setPlaylist(musicList);
    }
    dispatch(ActionCreators.getMusicDetails({ ID, favourite }));
  };

  useEffect(() => {
    if (trackDetails) {
      currTrackRef.current = trackDetails;
    }
    return () => {
      currTrackRef.current = {};
    };
  }, [currTrackRef, trackDetails]);

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => playSong(),
      style: { cursor: "pointer" },
    });
  });
};

export default PlaySong;
