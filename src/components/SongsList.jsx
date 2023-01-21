import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import ActionCreators from "@/react-mui-player/redux/actionCreators";
import { toggleSongsFavourite } from "@/services/musicApi/postSongs.api";

function RecentPlayed({
  removeFromPlaylist = false,
  data: musicData,
  hideLike = false,
}) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const [idToDelete, setIdDelete] = useState(null);
  const [data, setData] = useState(musicData);
  const [clicked, setClicked] = useState(false);

  const currentPlayingSong = useSelector((state) => state);

  const currentSong = useCurrentSong();
  const dispatch = useDispatch();
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

  const handleFavourite = async (value) => {
    if (!clicked) {
      const deepCopy = JSON.parse(JSON.stringify(data));
      setClicked(true);

      // Change Database
      const fetchData = await toggleSongsFavourite(value._id);

      // Change Player Like Buttons
      if (currentPlayingSong.trackID === value._id) {
        dispatch(
          ActionCreators.getMusicDetails({
            ID: currentPlayingSong.trackID,
            favourite: fetchData.data.isFavourite,
          })
        );
      }

      // Change frontend Data
      const changedData = deepCopy.map((song) => {
        if (song._id === value._id) {
          song.isFavourite = fetchData.data.isFavourite;
          song.trackDetails.isFavourite = fetchData.data.isFavourite;
        }
        return song;
      });

      setData(() => changedData);
      setClicked(false);
    }
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
            <span className="released-date">Released</span>
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
                  <span className="released-date">
                    {value?.releasedDate || "No Data"}
                  </span>
                  <span className="recent-genre">
                    {value.genre?.name?.toUpperCase() ||
                      value.genre.toUpperCase()}
                  </span>
                  {!hideLike ? (
                    <FiHeart
                      onClick={() => handleFavourite(value)}
                      className={
                        value.isFavourite ? "heart favourite" : "heart"
                      }
                    />
                  ) : (
                    <span></span>
                  )}

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
