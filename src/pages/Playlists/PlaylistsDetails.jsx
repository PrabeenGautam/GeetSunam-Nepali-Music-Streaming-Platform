import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import Playlist from "./Playlist";
import RecentPlayed from "components/SongsList";
import { getPlaylistByID } from "services/playlistApi/getPlaylist.api";
import Loading from "components/Loading";

function PlaylistsDetails() {
  const playlistName = `Playlist`;
  const data = false;

  const { id: playlistID } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await getPlaylistByID(playlistID);
    if (response) setPlaylist(response.data.playlist);
  }, [playlistID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return playlist ? (
    <>
      <Playlist playlistName={playlistName} playlist={playlist} />
      <div>
        {playlist.songs.length > 0 && (
          <>
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
          </>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default PlaylistsDetails;
