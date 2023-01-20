import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FiClock,
  FiHeart,
  FiPauseCircle,
  FiPlayCircle,
  FiTrash,
} from "react-icons/fi";

import DeleteModel from "./Playlists/DeleteModel";
import PlaySong from "./Player/PlaySong";
import PauseSong from "./Player/PauseSong";
import useCurrentSong from "@/hooks/useCurrentSong";
import { possibleMediaState } from "./Player/possibleMediaState.types";
import PlaylistAddContainer from "./Playlists/PlaylistAddContainer";

function RecentPlayed({ removeFromPlaylist = false, data }) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const [idToDelete, setIdDelete] = useState(null);

  const currentSong = useCurrentSong();
  const { mediaState } = useSelector(({ mediaState }) => ({ mediaState }));

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
      {deleteClick && <DeleteModel setClick={setDeleteClick} id={idToDelete} />}
      {playlist && playlistData && (
        <PlaylistAddContainer setClick={setPlaylistAdd} data={playlistData} />
      )}
      {data?.length !== 0 ? (
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
                  key={value._id || index}
                  tabIndex="0"
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
                  </PlaySong>
                  <span className="song-name">
                    <PlaySong
                      trackDetails={value.trackDetails}
                      musicList={musicList}>
                      <span>{value.trackDetails.title}</span>
                    </PlaySong>
                  </span>

                  <span className="artists">
                    {value?.artists?.fullname || value.artistsDetails.name}
                  </span>
                  <span className="recent-genre">
                    {value.genre?.name?.toUpperCase() ||
                      value.genre.toUpperCase()}
                  </span>
                  <FiHeart
                    onClick={() => handleFavourite(value)}
                    className={
                      value.trackDetails.isFavourite
                        ? "heart favourite"
                        : "heart"
                    }
                  />
                  <span className="length">{value.duration || value.time}</span>
                  {removeFromPlaylist ? (
                    <span className="more">
                      <FiTrash
                        style={{ stroke: "white" }}
                        title="Remove from Playlists"
                        onClick={() => {
                          setIdDelete(index);
                          setDeleteClick(true);
                        }}
                      />
                    </span>
                  ) : (
                    <span
                      className="add-more"
                      title="Add to Playlists"
                      onClick={() => handlePlaylist(value)}>
                      Add
                    </span>
                  )}
                </div>
              );
            })}
        </section>
      ) : (
        <h4
          style={{
            color: "rgba(255,255,255,0.8)",
            marginTop: 20,
            marginBottom: 20,
          }}>
          No Music To Show
        </h4>
      )}
    </>
  );
}

export default RecentPlayed;
