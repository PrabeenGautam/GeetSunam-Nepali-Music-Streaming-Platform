import React from "react";

function ArtistsContainer({ artistsData, onClickArtists }) {
  return (
    <section
      className="fav-artists-container"
      style={{ padding: "1rem 1.5rem" }}>
      {artistsData.map((value, index) => {
        return (
          <div
            className="artists"
            title={value.name}
            key={index}
            onClick={() => onClickArtists(value.id)}>
            <img src={value.profile} alt="artists" className="thumbnail-new" />
            <div className="song-artists">{value.name}</div>
          </div>
        );
      })}
    </section>
  );
}

export default ArtistsContainer;
