import React, { useState } from "react";
import * as Icons from "react-icons/fi";
import { useSelector } from "react-redux";

import DeleteModel from "./Playlists/DeleteModel";
import { recentPlayed } from "assets/data/recentPlayed.data";
import AddToPlaylist from "./Player/AddToPlayList";
import PlaySong from "./Player/PlaySong";
import PauseSong from "./Player/PauseSong";
import useCurrentSong from "hooks/useCurrentSong";
import { possibleMediaState } from "./Player/possibleMediaState.types";

function RecentPlayed({ removeFromPlaylist = false }) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [idToDelete, setIdDelete] = useState(null);

  const currentSong = useCurrentSong();
  const { mediaState } = useSelector(({ mediaState }) => ({ mediaState }));
  return (
    <>
      {deleteClick && <DeleteModel setClick={setDeleteClick} id={idToDelete} />}
      <section className="song-list">
        <div className="recent-container list_heading ">
          <span>#</span>
          <span className="song-name">name</span>
          <span></span>
          <span className="artist">artists</span>
          <span className="recent-genre">genre</span>
          <span></span>
          <span className="length">
            <Icons.FiClock />
          </span>
          <span style={{ visibility: "hidden" }}>#</span>
        </div>
        {recentPlayed &&
          recentPlayed.map((value, index) => {
            return (
              <div
                key={index}
                className={`recent-container hover-effect ${
                  currentSong?.ID === value.trackDetails.ID ? "playing" : ""
                }`}
              >
                {currentSong?.ID === value.trackDetails.ID &&
                mediaState === possibleMediaState.PLAYING ? (
                  <PauseSong>
                    <Icons.FiPauseCircle className="recent-play" />
                  </PauseSong>
                ) : (
                  <PlaySong trackDetails={value.trackDetails}>
                    <Icons.FiPlayCircle className="recent-play" />
                  </PlaySong>
                )}
                <img
                  src={value.thumbnail}
                  alt="thumbnail"
                  className="thumbnail-recent"
                />
                <span className="song-name">{value.name}</span>
                <span className="artists">{value.artists}</span>
                <span className="recent-genre">{value.genre}</span>
                <Icons.FiHeart
                  className={value.isFavourite ? "heart favourite" : "heart"}
                />
                <span className="length">{value.time}</span>
                {removeFromPlaylist ? (
                  <span className="more">
                    <Icons.FiTrash
                      style={{ stroke: "white" }}
                      title="Remove from Playlists"
                      onClick={() => {
                        setIdDelete(index);
                        setDeleteClick(true);
                      }}
                    />
                  </span>
                ) : (
                  <AddToPlaylist trackDetails={value.trackDetails}>
                    <span className="add-more" title="Add to Playlists">
                      Add
                    </span>
                  </AddToPlaylist>
                )}
              </div>
            );
          })}
      </section>
    </>
  );
}

export default RecentPlayed;
