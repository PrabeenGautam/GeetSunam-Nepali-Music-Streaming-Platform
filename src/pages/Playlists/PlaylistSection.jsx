import React from "react";
import PlaylistsCover from "assets/images/playlists-cover.png";
import PlaylistsContainer from "./PlaylistContainer";

function PlaylistSection() {
  const array = new Array(6).fill(0);
  return (
    <div className="playlist-container gradient">
      <section className="playlist">
        <div className="playlist-images">
          <img src={PlaylistsCover} alt="playlists" srcset="" />
        </div>
        <div className="playlist-details">
          <div>Collection</div>
          <div>Playlists</div>
          <div>
            <span>Created By: PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>6 playlist</span>
          </div>
        </div>
      </section>

      <PlaylistsContainer data={array} />
    </div>
  );
}

export default PlaylistSection;
