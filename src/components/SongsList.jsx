import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiClock, FiHeart, FiTrash } from "react-icons/fi";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import DeleteModel from "./Playlists/DeleteModel";
import useCurrentSong from "@/hooks/useCurrentSong";
import PlaylistAddContainer from "./Playlists/PlaylistAddContainer";
import ActionCreators from "@/react-mui-player/redux/actionCreators";
import { toggleSongsFavourite } from "@/services/musicApi/postSongs.api";
import { removeSongsFromPlaylists } from "@/services/playlistApi/getPlaylist.api";
import ManageSongsPlayback from "./PlayerBack/manageSongsPlayback";

function RecentPlayed({
  removeFromPlaylist = false,
  data,
  hideLike = false,
  playlistID,
  terminateQueries,
  terminateWithId = false,
  artistContainer = false,
}) {
  const [deleteClick, setDeleteClick] = useState(false);
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const [songId, setSongID] = useState(null);
  const [clicked, setClicked] = useState(false);

  const currentPlayingSong = useSelector((state) => state);
  const queryClient = useQueryClient();

  const currentSong = useCurrentSong();
  const dispatch = useDispatch();

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
      setClicked(true);

      // Change Database
      const fetchData = await toggleSongsFavourite(value._id);

      if (terminateQueries && terminateQueries.startsWith("[")) {
        const query = terminateQueries.split(",");
        console.log(query);
      }

      if (terminateWithId) {
        queryClient.invalidateQueries([terminateQueries], value._id);
      } else {
        queryClient.invalidateQueries(terminateQueries);
      }

      // Change Player Like Buttons
      if (currentPlayingSong.trackID === value._id) {
        dispatch(
          ActionCreators.getMusicDetails({
            ID: currentPlayingSong.trackID,
            favourite: fetchData.data.songs.isFavourite,
          })
        );
      }
      setClicked(false);
    }
  };

  const handlePlaylist = (data) => {
    setPlaylistAdd(true);
    setPlaylistData(data);
  };

  const removePlaylistHandler = async () => {
    const response = await removeSongsFromPlaylists(songId, playlistID);
    queryClient.invalidateQueries("playlists", playlistID);

    if (response.status === "success") {
      toast.success(`Remove from Playlist`, {
        hideProgressBar: true,
        autoClose: 3000,
      });
    }

    setDeleteClick(false);
  };

  return (
    <>
      {deleteClick && (
        <DeleteModel
          modalMessage="Remove from Playlists"
          setClick={setDeleteClick}
          deleteHandler={removePlaylistHandler}
        />
      )}
      {playlist && playlistData && (
        <PlaylistAddContainer setClick={setPlaylistAdd} data={playlistData} />
      )}
      {data?.length !== 0 ? (
        <section className="song-list">
          <div
            className={`recent-container  list_heading ${
              artistContainer ? "artists" : ""
            }`}>
            <span>#</span>
            <span></span>
            <span className="song-name">name</span>
            {!artistContainer ? (
              <span className="artist">artists</span>
            ) : (
              <span className="skip"></span>
            )}
            <span className="released-date">Released</span>
            <span className="recent-genre">genre</span>
            <span></span>
            <span className="length">
              <FiClock />
            </span>
            <span style={{ visibility: "hidden" }}>#</span>
          </div>
          {data &&
            data.map((value) => {
              return (
                <div
                  key={value._id}
                  tabIndex="0"
                  className={`recent-container hover-effect ${
                    currentSong?.ID === value.trackDetails.ID ? "playing" : ""
                  } ${artistContainer ? "artists" : ""}`}>
                  <ManageSongsPlayback
                    song={value}
                    musicList={musicList}
                    artists={artistContainer}
                  />

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
                          setSongID(value._id);
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
