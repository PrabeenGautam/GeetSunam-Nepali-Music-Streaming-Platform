import { useParams } from "react-router-dom";

import RecentPlayed from "components/SongsList";
import Playlist from "./Playlist";

function PlaylistsDetails() {
  const { id } = useParams();
  const playlistName = `Playlist ${id}`;
  const data = false;

  return (
    <>
      <Playlist playlistName={playlistName} data={data} />
      <div>
        {data && (
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
  );
}

export default PlaylistsDetails;
