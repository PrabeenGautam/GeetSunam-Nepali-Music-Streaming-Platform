import EditPlaylistsModel from "components/Playlists/EditPlaylistsModal";
import RecentPlayed from "components/RecentPlayed";
import React from "react";
import { useParams } from "react-router-dom";
import Playlist from "./Playlist";

function PlaylistsDetails() {
  const { id } = useParams();
  const playlistName = `Playlist ${id}`;

  return (
    <>
      <Playlist playlistName={playlistName} />
      <div>
        <section
          className="search-music padding"
          style={{ margin: "0 2.5rem" }}>
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
      </div>
    </>
  );
}

export default PlaylistsDetails;
