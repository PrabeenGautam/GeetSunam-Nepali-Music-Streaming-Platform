import React, { useEffect, useRef } from "react";

import { PlayerInterface, Track } from "react-mui-player";
import { useDispatch } from "react-redux";
import ActionCreators from "react-mui-player/redux/actionCreators";

const PlaySong = ({ trackDetails = {}, children }) => {
  const currTrackRef = useRef(trackDetails);
  const { ID, coverArt, title, artist, source, isFavourite } =
    currTrackRef.current;
  const dispatch = useDispatch();

  const playSong = () => {
    PlayerInterface.play([new Track(ID, coverArt, title, artist, source)]);
    dispatch(ActionCreators.getMusicDetails({ ID, isFavourite }));
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
