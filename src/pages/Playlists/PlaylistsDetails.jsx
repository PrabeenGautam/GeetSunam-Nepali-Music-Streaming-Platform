import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Playlist from "./Playlist";
import RecentPlayed from "@/components/SongsList";
import Loading from "@/components/Loading";
import useGSDispatch from "@/redux/useGSDispatch";
import { getPlaylistByIDThunk } from "@/redux/middlewares/playlistThunk";
import useGSSelector from "@/redux/useGSSelector";

function PlaylistsDetails() {
  const playlistName = `Playlist`;
  const { id: playlistID } = useParams();
  const dispatch = useGSDispatch();

  const playlist = useGSSelector((state) => state.playlistState.playlistByID);

  useEffect(() => {
    dispatch(getPlaylistByIDThunk(playlistID));
  }, [playlistID, dispatch]);

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
