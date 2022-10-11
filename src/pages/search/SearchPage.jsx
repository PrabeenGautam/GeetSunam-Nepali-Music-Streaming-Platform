import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/SongsList";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function SearchPage() {
  let query = useQuery().get("query");

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
          <RecentPlayed removeFromPlaylist={false} />
        </section>

        <div>
          <section className="search-music padding">
            <h3>Recommended</h3>
            <div className="languages">Based on what's you have searched</div>
          </section>
          <section className="playlist-songs">
            <RecentPlayed removeFromPlaylist={false} />
          </section>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
