import { useMemo, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { searchArtistsApi } from "@/services/searchApi/search.api";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";
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
  }, []);

  const onClickNavSongs = () => {
    const options = {
      pathname: "/results/songs",
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
  } = useReactQuery(["searchArtists", query], () => searchArtistsApi(query), {
    select: (data) => data.data.artists,
    refetchOnWindowFocus: false,
  });

  const loader = isLoading || isError;

  const onClickArtists = (id) => {
    navigate(`/artists/${id}`);
  };

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
            <div onClick={onClickNavSongs}>Songs</div>
            <div className="active">Artists</div>
            <div onClick={onClickNavPlaylists}>Playlists</div>
          </div>

          {!loader ? (
            searchData.length !== 0 ? (
              <ArtistsContainer
                artistsData={searchData}
                onClickArtists={onClickArtists}
                padding={false}
              />
            ) : (
              <h3 style={{ padding: "0 2.5rem 2rem" }}>No Artists Found</h3>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchSong;
