import { useState } from "react";
import { FiHeart, FiMic, FiSearch } from "react-icons/fi";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";

import DeleteModel from "components/Playlists/DeleteModel";
import EditPlaylistsModel from "components/Playlists/EditPlaylistsModal";
import RecentPlayed from "components/SongsList";

function Playlist({ playlistName = "No Name", data }) {
  const isLikedSongs = playlistName === "Liked Songs";
  const [click, setClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [showData, setShowData] = useState(false);
  const { id } = useParams();

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      setShowData(true);
    }
  };

  return (
    <div className="playlist-container">
      {click && <EditPlaylistsModel setClick={setClick} />}
      {deleteClick && (
        <DeleteModel setClick={setDeleteClick} data={playlistName} id={id} />
      )}
      <section className="playlist">
        <div className="playlist-images">
          <FiHeart />
        </div>
        <div className="playlist-details">
          <div>Playlist</div>
          <div>{playlistName}</div>
          {!isLikedSongs && (
            <div className="description">{`This is ${playlistName}`}</div>
          )}
          <div>
            <span>PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>12 songs</span>
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
        {data ? (
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
