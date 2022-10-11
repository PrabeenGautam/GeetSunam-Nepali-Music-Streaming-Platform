import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/SongsList";
import { musicList } from "assets/data/musicList";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function SearchPage() {
  let query = useQuery().get("query").toLowerCase();
  const searchSongs = musicList.filter((value) =>
    value.trackDetails.title.toLowerCase().includes(query)
  );
  const recommendedSongs =
    searchSongs.length != 0 &&
    musicList.filter(
      (value) => value.artistsDetails == searchSongs[0].artistsDetails
    );

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.8)",
          padding: "2rem 2.5rem",
        }}>
        <CustomBreadcrumbs search={true} />
        <h2>
          Search results for:{" "}
          <span style={{ textDecoration: "underline" }}>{query}</span>
        </h2>
        <h3>Top Results</h3>

        <section className="playlist-songs">
          {searchSongs.length !== 0 ? (
            <RecentPlayed removeFromPlaylist={false} data={searchSongs} />
          ) : (
            <h4 style={{ color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
              No Songs Found For Given Query
            </h4>
          )}
        </section>
        {recommendedSongs && (
          <div>
            <section className="search-music padding">
              <h3>Songs From Same Artists </h3>
              <div className="languages">Based on what's you have searched</div>
            </section>
            <section className="playlist-songs">
              <RecentPlayed
                removeFromPlaylist={false}
                data={recommendedSongs}
              />
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
