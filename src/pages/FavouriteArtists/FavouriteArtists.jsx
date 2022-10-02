import React from "react";
import * as Icons from "react-icons/fi";
import artists from "assets/images/music-artists.png";
import { featuredArtists } from "components/Featured/featureArtists.data";
import ArtistsContainer from "components/ArtistsContainer";

function FavouriteArtists() {
  return (
    <div className="playlist-container gradient">
      <section className="playlist">
        <div className="playlist-images">
          <img src={artists} alt="" />
        </div>
        <div className="playlist-details">
          <div>Collection</div>
          <div>Favourite Artists</div>
          <div>
            <span>Created By: PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>12 artists</span>
          </div>
        </div>
      </section>

      <ArtistsContainer artistsData={featuredArtists} />
    </div>
  );
}

export default FavouriteArtists;
