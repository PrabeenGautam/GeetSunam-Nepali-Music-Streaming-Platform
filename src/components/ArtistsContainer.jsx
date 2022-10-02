import React from "react";

function ArtistsContainer({ artistsData }) {
  return (
    <section
      className="fav-artists-container"
      style={{ padding: "1rem 1.5rem" }}>
      {artistsData.map((value, index) => {
        return (
          <div className="artists" title={value.name} key={index}>
            <img src={value.img} alt="artists" className="thumbnail-new" />
            <div className="song-artists">{value.name}</div>
          </div>
        );
      })}
    </section>
  );
}

export default ArtistsContainer;
