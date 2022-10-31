import { FiClock, FiHeart, FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";

import PauseSong from "components/Player/PauseSong";
import PlaySong from "components/Player/PlaySong";
import { possibleMediaState } from "components/Player/possibleMediaState.types";
import useCurrentSong from "hooks/useCurrentSong";
import PlaylistAddContainer from "components/Playlists/PlaylistAddContainer";

function ArtistsPlayed({ data }) {
  const currentSong = useCurrentSong();
  const { mediaState } = useSelector(({ mediaState }) => ({ mediaState }));
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);

  const musicList =
    data &&
    data.map(({ trackDetails }) => ({
      ID: trackDetails.ID,
      coverArt: trackDetails.coverArt,
      title: trackDetails.title,
      artist: trackDetails.artist,
      source: trackDetails.source,
      favourite: trackDetails.isFavourite,
    }));

  const handleFavourite = (data) => {
    console.log(data);
  };

  const handlePlaylist = (data) => {
    setPlaylistAdd(true);
    setPlaylistData(data);
  };

  return (
    <>
      {playlist && playlistData && (
        <PlaylistAddContainer setClick={setPlaylistAdd} data={playlistData} />
      )}
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
                  <PlaySong
                    trackDetails={value.trackDetails}
                    musicList={musicList}>
                    <FiPlayCircle className="recent-play" />
                  </PlaySong>
                )}
                <PlaySong
                  trackDetails={value.trackDetails}
                  musicList={musicList}>
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
                  onClick={() => handleFavourite(value)}
                  className={value.isFavourite ? "heart favourite" : "heart"}
                />
                <span className="length">{value.time}</span>
                {
                  <span
                    className="add-more"
                    title="Add to Playlists"
                    onClick={() => handlePlaylist(value)}>
                    Add
                  </span>
                }
              </div>
            );
          })}
      </section>
    </>
  );
}

export default ArtistsPlayed;
