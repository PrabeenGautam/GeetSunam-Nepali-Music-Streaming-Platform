import { useMemo, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { searchPlaylistsApi } from "@/services/searchApi/search.api";
import PlaylistsContainer from "../Playlists/PlaylistContainer";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function SearchSong() {
  let query = useQuery().get("query")?.toLowerCase();

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/home");
    }
  }, []);

  const onClickNavArtists = () => {
    const options = {
      pathname: "/results/artists",
      search: `?${createSearchParams({ query })}`,
    };
    navigate(options, { replace: true });
  };

  const onClickNavAll = () => {
    const options = {
      pathname: "/results",
      search: `?${createSearchParams({ query })}`,
    };
    navigate(options, { replace: true });
  };

  const onClickNavSongs = () => {
    const options = {
      pathname: "/results/songs",
      search: `?${createSearchParams({ query })}`,
    };
    navigate(options, { replace: true });
  };

  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const searchData = async () => {
      const searchResult = await searchPlaylistsApi(query);
      setSearchData(searchResult.data.playlists);
    };

    if (query) searchData();
  }, [query]);

  const onClickPlaylists = (playlists) => {
    navigate(`/playlists/${playlists}`);
  };

  return (
    searchData && (
      <>
        <div>
          <div className="header-filterd">
            <div
              style={{
                padding: "2rem 2.5rem 0",
              }}>
              <CustomBreadcrumbs search={true} />
              <h2>
                <span>Search results for: </span>
                <span style={{ textDecoration: "underline" }}>{query}</span>
              </h2>
              <div className="filter-section">
                <div onClick={onClickNavAll}>All</div>
                <div onClick={onClickNavSongs}>Songs</div>
                <div onClick={onClickNavArtists}>Artists</div>
                <div className="active">Playlists</div>
              </div>
            </div>

            {searchData.length !== 0 ? (
              <PlaylistsContainer
                data={searchData}
                onClickPlaylists={onClickPlaylists}
              />
            ) : (
              <h3 style={{ padding: "0 2.5rem 2rem" }}>No Playlists Found</h3>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default SearchSong;
