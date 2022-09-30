import React from "react";
import * as Icons from "react-icons/fi";

function RecentPlayed({
  isplaying = false,
  isfavorite = false,
  thumbnail,
  name,
  artists,
  genre,
  time,
}) {
  return (
    <div
      className={isplaying ? "recent-container playing" : "recent-container"}>
      {isplaying ? (
        <Icons.FiPauseCircle className="recent-play" />
      ) : (
        <Icons.FiPlayCircle className="recent-play" />
      )}
      <img src={thumbnail} alt="thumbnail" className="thumbnail-recent" />
      <span className="song-name">{name}</span>
      <span className="artists">{artists}</span>
      <span className="recent-genre">{genre}</span>
      <span className="length">{time}</span>
      <Icons.FiHeart className={isfavorite ? "heart favourite" : "heart"} />
    </div>
  );
}

export default RecentPlayed;
