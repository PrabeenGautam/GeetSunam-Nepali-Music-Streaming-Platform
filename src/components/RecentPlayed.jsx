import React, { useState } from "react";
import * as Icons from "react-icons/fi";
import DeleteModel from "./Playlists/DeleteModel";
import { recentPlayed } from "./recentPlayed.data";

function RecentPlayed({ removeFromPlaylist = false }) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [idToDelete, setIdDelete] = useState(null);

  return (
    <>
      {deleteClick && <DeleteModel setClick={setDeleteClick} id={idToDelete} />}
      <section className="song-list">
        <div className="recent-container list_heading ">
          <span>#</span>
          <span className="song-name">name</span>
          <span></span>
          <span className="artists">artists</span>
          <span className="recent-genre">genre</span>
          <span></span>
          <span className="length">
            <Icons.FiClock />
          </span>
          <span style={{ visibility: "hidden" }}>#</span>
        </div>
        {recentPlayed.map((value, index) => {
          return (
            <div
              key={index}
              className={`recent-container hover-effect ${
                value.isPlaying ? "playing" : ""
              }`}>
              {value.isPlaying ? (
                <Icons.FiPauseCircle className="recent-play" />
              ) : (
                <Icons.FiPlayCircle className="recent-play" />
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
                    title="Delete from Playlists"
                    onClick={() => {
                      setIdDelete(index);
                      setDeleteClick(true);
                    }}
                  />
                </span>
              ) : (
                <span className="add-more" title="Add to Playlists">
                  Add
                </span>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default RecentPlayed;
