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
import AddToPlaylist from "./Player/AddToPlayList";
import PlaySong from "./Player/PlaySong";
import PauseSong from "./Player/PauseSong";
import useCurrentSong from "hooks/useCurrentSong";
import { possibleMediaState } from "./Player/possibleMediaState.types";
import PlaylistAddContainer from "./Playlists/PlaylistAddContainer";

function RecentPlayed({ removeFromPlaylist = false, data }) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [playlist, setPlaylistAdd] = useState(false);
  const [idToDelete, setIdDelete] = useState(null);

  const currentSong = useCurrentSong();
  const { mediaState } = useSelector(({ mediaState }) => ({ mediaState }));

  return (
    <>
      {deleteClick && <DeleteModel setClick={setDeleteClick} id={idToDelete} />}
      {playlist && <PlaylistAddContainer setClick={setPlaylistAdd} />}
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
                  key={index}
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
                  </PlaySong>
                  <span className="song-name">
                    <PlaySong trackDetails={value.trackDetails}>
                      <span>{value.trackDetails.title}</span>
                    </PlaySong>
                  </span>

                  <span className="artists">{value.artistsDetails.name}</span>
                  <span className="recent-genre">
                    {value.genre.toUpperCase()}
                  </span>
                  <FiHeart
                    className={
                      value.trackDetails.isFavourite
                        ? "heart favourite"
                        : "heart"
                    }
                  />
                  <span className="length">{value.time}</span>
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
                    // <AddToPlaylist trackDetails={value.trackDetails}>
                    <span className="add-more" title="Add to Playlists">
                      Add
                    </span>
                    // </AddToPlaylist>
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
