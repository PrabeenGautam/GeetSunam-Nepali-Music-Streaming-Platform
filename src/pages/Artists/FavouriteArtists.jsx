import React from "react";
import { useNavigate } from "react-router-dom";

import artists from "@/assets/images/music-artists.png";
import { featuredArtists } from "@/components/Featured/featureArtists.data";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";

function FavouriteArtists() {
  const navigate = useNavigate();
  const favouriteArtists = featuredArtists.filter(
    (value) => value.isFavourite === true
  );

  const onClickArtists = (id) => {
    navigate(`/fav-artists/${id}`);
  };

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

      <ArtistsContainer
        artistsData={favouriteArtists}
        onClickArtists={onClickArtists}
      />
    </div>
  );
}

export default FavouriteArtists;
