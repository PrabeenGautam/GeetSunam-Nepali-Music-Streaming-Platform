import { useState } from "react";
import { FiMic, FiSearch } from "react-icons/fi";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import DeleteModel from "@/components/Playlists/DeleteModel";
import EditPlaylistsModel from "@/components/Playlists/EditPlaylistsModal";
import RecentPlayed from "@/components/SongsList";
import { deletePlaylistAPI } from "@/services/playlistApi/getPlaylist.api";

function Playlist({ playlistName = "No Name", playlist }) {
  const isLikedSongs = playlistName === "Liked Songs";
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [showData, setShowData] = useState(false);

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      setShowData(true);
    }
  };

  const deletePlaylists = () => {
    deletePlaylistAPI(playlist._id).then(() => {
      navigate("/playlists");
    });
  };

  return (
    <div className="playlist-container">
      {click && <EditPlaylistsModel setClick={setClick} />}
      {deleteClick && (
        <DeleteModel
          setClick={setDeleteClick}
          data={playlist.title}
          deleteHandler={deletePlaylists}
        />
      )}
      <section className="playlist">
        <div className="playlist-images">
          <img src={playlist.coverArt} alt="playlist" />
        </div>

        <div className="playlist-details">
          <div>Playlist</div>
          <div>{playlist.title}</div>
          {!isLikedSongs && (
            <div className="description">{playlist.description}</div>
          )}
          <div>
            <span>{playlist.createdBy.fullname}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {playlist.songs.length === 0 ? "No" : playlist.songs.length} Songs
            </span>
          </div>
        </div>
        {!isLikedSongs && (
          <div
            style={{
              position: "absolute",
              right: 20,
              zIndex: 999,
            }}>
            <button
              className="custom-btn"
              title="Edit Playlists"
              style={{
                marginRight: 10,
              }}
              onClick={() => setClick(true)}>
              <MdEditNote />
            </button>
            <button
              className="custom-btn btn-play"
              title="Delete Playlists"
              onClick={() => setDeleteClick(true)}>
              <MdDeleteOutline
                style={{
                  fill: "white",
                }}
              />
            </button>
          </div>
        )}
      </section>
      <section
        className="playlist-songs padding"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.8)" }}>
        {playlist.songs.length > 0 ? (
          <RecentPlayed removeFromPlaylist={true} />
        ) : (
          <div>
            <h2>No Songs Added to the Playlist</h2>
            <h3>Search for songs to add them</h3>
            <div style={{ width: "30rem" }}>
              <form className="search-bar" onSubmit={onSubmitValue}>
                <FiSearch className="icon-search" />
                <input
                  type="text"
                  className="text-input"
                  placeholder="Search songs to add them to playlist"
                  name="query"
                  onChange={(e) => {
                    if (!e.target.value) setShowData(false);
                  }}
                />
                <input type="submit" hidden />
                <div
                  style={{
                    borderLeft: "2px solid black",
                    paddingRight: 5,
                  }}></div>
                <FiMic className="icon-mic" />
              </form>
            </div>
            {showData ? <RecentPlayed /> : ""}
          </div>
        )}
      </section>
    </div>
  );
}

export default Playlist;
