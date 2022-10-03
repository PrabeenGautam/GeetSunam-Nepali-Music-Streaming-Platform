import RecentPlayed from "components/RecentPlayed";
import { recentPlayed } from "components/recentPlayed.data";
import React from "react";
import * as Icons from "react-icons/fi";

function Playlist({ playlistName = "No Name" }) {
  return (
    <div className="playlist-container">
      <section className="playlist">
        <div className="playlist-images">
          <Icons.FiHeart />
        </div>
        <div className="playlist-details">
          <div>Playlist</div>
          <div>{playlistName}</div>
          <div>
            <span>PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>12 songs</span>
          </div>
        </div>
      </section>
      <section className="playlist-songs">
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
              <RecentPlayed
                key={index}
                thumbnail={value.thumbnail}
                name={value.name}
                artists={value.artists}
                genre={value.genre}
                time={value.time}
                isFavourite={value.favourite}
                isPlaying={value?.play}
              />
            );
          })}
        </section>
      </section>
    </div>
  );
}

export default Playlist;
