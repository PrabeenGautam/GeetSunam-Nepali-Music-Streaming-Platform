import { useMemo, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { searchSongsApi } from "@/services/searchApi/search.api";
import RecentPlayed from "@/components/SongsList";
import { trackDetails } from "./../../utils/trackDetails.utils";
import Spinner from "@/components/Loader/Spinner";
import { useQuery as useReactQuery } from "react-query";

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
  }, [query]);

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

  const onClickNavPlaylists = () => {
    const options = {
      pathname: "/results/playlists",
      search: `?${createSearchParams({ query })}`,
    };
    navigate(options, { replace: true });
  };

  const {
    data: searchData,
    isLoading,
    isError,
  } = useReactQuery(["searchSongs", query], () => searchSongsApi(query), {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const loader = isLoading || isError;

  return (
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
            <div className="active">Songs</div>
            <div onClick={onClickNavArtists}>Artists</div>
            <div onClick={onClickNavPlaylists}>Playlists</div>
          </div>
        </div>

        {!loader ? (
          searchData.length !== 0 ? (
            <div style={{ padding: "0 2.5rem 2rem" }}>
              <RecentPlayed
                removeFromPlaylist={false}
                data={trackDetails(searchData)}
              />
            </div>
          ) : (
            <h3 style={{ padding: "0 2.5rem 2rem" }}>No Songs Found</h3>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default SearchSong;
