import DeleteModel from "components/Playlists/DeleteModel";
import EditPlaylistsModel from "components/Playlists/EditPlaylistsModal";
import RecentPlayed from "components/RecentPlayed";

import React from "react";
import { useState } from "react";
import * as Icons from "react-icons/fi";
import * as MdIcons from "react-icons/md";

function Playlist({ playlistName = "No Name" }) {
  const isLikedSongs = playlistName === "Liked Songs";
  const [click, setClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);

  if (click || deleteClick) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="playlist-container">
      {click && <EditPlaylistsModel setClick={setClick} />}
      {deleteClick && (
        <DeleteModel setClick={setDeleteClick} data={playlistName} />
      )}
      <section className="playlist">
        <div className="playlist-images">
          <Icons.FiHeart />
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
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button
              className="custom-btn"
              title="Edit Playlists"
              style={{ marginRight: 10 }}
              onClick={() => setClick(true)}>
              <MdIcons.MdEditNote />
            </button>
            <button
              className="custom-btn btn-play"
              title="Delete Playlists"
              onClick={() => setDeleteClick(true)}>
              <MdIcons.MdDeleteOutline style={{ fill: "white" }} />
            </button>
          </div>
        )}
      </section>
      <section
        className="playlist-songs padding"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.8)" }}>
        <RecentPlayed removeFromPlaylist={true} />
      </section>

      {!isLikedSongs && (
        <>
          <section className="search-music padding">
            <h3>Recommended</h3>
            <div className="languages">Based on what's in this playlist</div>
          </section>

          <section
            className="playlist-songs"
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.8)",
              padding: "0 2.5rem",
            }}>
            <RecentPlayed removeFromPlaylist={false} />
          </section>
        </>
      )}
    </div>
  );
}

export default Playlist;
