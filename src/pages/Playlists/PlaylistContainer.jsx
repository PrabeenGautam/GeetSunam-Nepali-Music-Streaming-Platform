import React from "react";
import PlaylistsPlaceholder from "assets/images/playlists.png";

function PlaylistsContainer({ data, onClickPlaylists }) {
  return (
    <section
      className="fav-artists-container"
      style={{ padding: "1rem 1.5rem" }}>
      {data.map((value, index) => {
        return (
          <div
            className="artists"
            title={value}
            key={index}
            onClick={() => onClickPlaylists(index)}>
            <img
              src={PlaylistsPlaceholder}
              alt="playlists"
              className="thumbnail-new"
            />
            <div className="song-artists">{`Playlists ${index + 1}`}</div>
          </div>
        );
      })}
    </section>
  );
}

export default PlaylistsContainer;
