import React from "react";
import { useSelector } from "react-redux";

import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { possibleMediaState } from "../Player/possibleMediaState.types";
import PauseSong from "../Player/PauseSong";
import PlaySong from "../Player/PlaySong";
import ResumeSong from "../Player/ResumeSong";

function ManageCurrentPlayback({ song, musicList, artists }) {
  const currentSong = useSelector((state) => state);

  return (
    <React.Fragment>
      {currentSong.trackID === song._id ? (
        <React.Fragment>
          {currentSong.mediaState === possibleMediaState.PLAYING && (
            <PauseSong>
              <FiPauseCircle className="recent-play" />
              <img
                src={song.trackDetails.coverArt}
                alt="thumbnail"
                className="thumbnail-recent"
              />
              <span className="song-name">
                <span>{song.trackDetails.title}</span>
              </span>
              <span className="released-date">
                {song?.releasedDate || "No Data"}
              </span>
              <span className="recent-genre">
                {song.genre?.name?.toUpperCase()}
              </span>
            </PauseSong>
          )}

          {currentSong.mediaState === possibleMediaState.PAUSED && (
            <ResumeSong>
              <FiPlayCircle className="recent-play" />
              <img
                src={song.trackDetails.coverArt}
                alt="thumbnail"
                className="thumbnail-recent"
              />
              <span className="song-name">
                <span>{song.trackDetails.title}</span>
              </span>
              <span className="released-date">
                {song?.releasedDate || "No Data"}
              </span>
              <span className="recent-genre">
                {song.genre?.name?.toUpperCase()}
              </span>
            </ResumeSong>
          )}
        </React.Fragment>
      ) : (
        <PlaySong trackDetails={song.trackDetails} musicList={musicList}>
          <FiPlayCircle className="recent-play" />
          <img
            src={song.trackDetails.coverArt}
            alt="thumbnail"
            className="thumbnail-recent"
          />
          <span className="song-name">
            <span>{song.trackDetails.title}</span>
          </span>
          <span className="released-date">
            {song?.releasedDate || "No Data"}
          </span>
          <span className="recent-genre">
            {song.genre?.name?.toUpperCase()}
          </span>
        </PlaySong>
      )}
    </React.Fragment>
  );
}

export default ManageCurrentPlayback;
