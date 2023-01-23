import { useDispatch, useSelector } from "react-redux";
import React from "react";

import ActionCreators from "@/react-mui-player/redux/actionCreators";
import { possibleMediaState } from "@/components/Player/possibleMediaState.types";
import PauseSong from "@/components/Player/PauseSong";
import { Btn } from "@/components/StyledUI";
import PlaySong from "@/components/Player/PlaySong";

function ManagePlayback({ song }) {
  const dispatch = useDispatch();

  const currentSong = useSelector((state) => state);
  const onPlay = () => dispatch(ActionCreators.play());

  return (
    <React.Fragment>
      {currentSong.trackID === song._id ? (
        <React.Fragment>
          {currentSong.mediaState === possibleMediaState.PLAYING && (
            <PauseSong>
              <Btn className="btn-pause">Playing</Btn>
            </PauseSong>
          )}

          {currentSong.mediaState === possibleMediaState.PAUSED && (
            <Btn className="btn-play" onClick={onPlay}>
              Resume
            </Btn>
          )}
        </React.Fragment>
      ) : (
        <PlaySong trackDetails={song.trackDetails}>
          <Btn className="btn-play">Play</Btn>
        </PlaySong>
      )}
    </React.Fragment>
  );
}

export default ManagePlayback;
