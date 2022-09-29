import React from "react";
import FeaturedImage from "../../assets/featured.jpg";

import SearchBar from "./SearchBar";

function Featured() {
  return (
    <div className="featured">
      <SearchBar />
      <img src={FeaturedImage} alt="featured-image" className="featured-img" />
      <div className="details">
        <div className="title">Featured Songs</div>
        <div className="song-details">
          <div className="artists">Sunil Giri</div>
          <div className="song-name">Ko Hola Tyo</div>
        </div>
        <div className="play-featured">
          <button className="btn btn-play">Play</button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
