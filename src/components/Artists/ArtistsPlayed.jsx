import AddToPlaylist from "components/Player/AddToPlayList";
import PauseSong from "components/Player/PauseSong";
import PlaySong from "components/Player/PlaySong";
import { possibleMediaState } from "components/Player/possibleMediaState.types";
import useCurrentSong from "hooks/useCurrentSong";
import React from "react";
import { FiClock, FiHeart, FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { useSelector } from "react-redux";

function ArtistsPlayed({ data }) {
  const currentSong = useCurrentSong();
  const { mediaState } = useSelector(({ mediaState }) => ({ mediaState }));
  return (
    <>
      <section className="song-list">
        <div className="recent-container list_heading ">
          <span>#</span>
          <span className="song-name">name</span>
          <span></span>
          <span className="artist">artists</span>
          <span className="recent-genre">genre</span>
          <span></span>
          <span className="length">
            <FiClock />
          </span>
          <span style={{ visibility: "hidden" }}>#</span>
        </div>
        {data &&
          data.map((value, index) => {
            return (
              <div
                key={index}
                className={`recent-container hover-effect ${
                  currentSong?.ID === value.trackDetails.ID ? "playing" : ""
                }`}>
                {currentSong?.ID === value.trackDetails.ID &&
                mediaState === possibleMediaState.PLAYING ? (
                  <PauseSong>
                    <FiPauseCircle className="recent-play" />
                  </PauseSong>
                ) : (
                  <PlaySong trackDetails={value.trackDetails}>
                    <FiPlayCircle className="recent-play" />
                  </PlaySong>
                )}
                <PlaySong trackDetails={value.trackDetails}>
                  <img
                    src={value.trackDetails.coverArt}
                    alt="thumbnail"
                    className="thumbnail-recent"
                  />
                  <span className="song-name">{value.trackDetails.title}</span>
                </PlaySong>
                <span className="artists">{value.artistsDetails.name}</span>
                <span className="recent-genre">
                  {value.genre.toUpperCase()}
                </span>
                <FiHeart
                  className={value.isFavourite ? "heart favourite" : "heart"}
                />
                <span className="length">{value.time}</span>
                {
                  <AddToPlaylist trackDetails={value.trackDetails}>
                    <span className="add-more" title="Add to Playlists">
                      Add
                    </span>
                  </AddToPlaylist>
                }
              </div>
            );
          })}
      </section>
    </>
  );
}

export default ArtistsPlayed;
