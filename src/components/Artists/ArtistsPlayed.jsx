import { recentPlayed } from "components/recentPlayed.data";
import React from "react";
import * as Icons from "react-icons/fi";

function ArtistsPlayed() {
  return (
    <>
      <section className="song-list">
        <div className="recent-container list_heading artists-details">
          <span>#</span>
          <span className="song-name">name</span>
          <span></span>
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
              className={`recent-container hover-effect artists-details ${
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

              <span className="recent-genre">{value.genre}</span>
              <Icons.FiHeart
                className={value.isFavourite ? "heart favourite" : "heart"}
              />
              <span className="length">{value.time}</span>
              <span className="add-more" title="Add to Playlists">
                Add
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ArtistsPlayed;
