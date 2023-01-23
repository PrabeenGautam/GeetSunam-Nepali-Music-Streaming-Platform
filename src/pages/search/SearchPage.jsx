import { useMemo, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { searchApi } from "@/services/searchApi/search.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import PlaylistContainer from "@/pages/Playlists/PlaylistContainer";
import PlaySong from "@/components/Player/PlaySong";
import { BiPlayCircle } from "react-icons/bi";
import Spinner from "@/components/Loader/Spinner";
import { useQuery as useReactQuery } from "react-query";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function SearchPage() {
  let query = useQuery().get("query")?.toLowerCase();

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/home");
    }
    refetch();
  }, [query]);

  const onClickNavArtists = () => {
    const options = {
      pathname: "/results/artists",
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

  const onClickNavPlaylists = () => {
    const options = {
      pathname: "/results/playlists",
      search: `?${createSearchParams({ query })}`,
    };
    navigate(options, { replace: true });
  };

  const onClickArtists = (id) => {
    navigate(`/artists/${id}`);
  };

  const onClickPlaylists = (id) => {
    navigate(`/playlists/${id}`);
  };

  const {
    data: searchData,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useReactQuery("searchAny", () => searchApi(query), {
    select: (data) => data.data.search,
  });

  const loader = isFetching || isLoading || isError;

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
            <div className="active">All</div>
            <div onClick={onClickNavSongs}>Songs</div>
            <div onClick={onClickNavArtists}>Artists</div>
            <div onClick={onClickNavPlaylists}>Playlists</div>
          </div>

          {!loader ? (
            searchData.songs?.length === 0 &&
            searchData.artists?.length === 0 &&
            searchData.playlists?.length === 0 ? (
              <h2>No Search Results</h2>
            ) : (
              <div className="searched-data">
                {searchData.songs?.length !== 0 && (
                  <div className="main-section">
                    <div className="heading">
                      <div className="subheading">
                        <span>Searched Songs: </span>
                      </div>
                    </div>
                    <div className="music-section">
                      {trackDetails(searchData.songs).map((values) => {
                        return (
                          <PlaySong
                            trackDetails={values.trackDetails}
                            key={values._id}>
                            <div
                              className="music-container dynamic"
                              key={values._id}>
                              <div className="play-icon-container">
                                <img
                                  src={values.coverArt}
                                  alt="thumbnail"
                                  className="thumbnail-new"
                                />

                                <span className="play-icon">
                                  <BiPlayCircle />
                                </span>
                              </div>

                              <div
                                className="song-name innerText"
                                title={values.title}>
                                {values.title}
                              </div>

                              <div className="song-artists">
                                {values.artists.fullname}
                              </div>
                            </div>
                          </PlaySong>
                        );
                      })}
                    </div>
                  </div>
                )}

                {searchData.artists?.length !== 0 && (
                  <div>
                    <h2>Artists</h2>
                    <ArtistsContainer
                      artistsData={searchData.artists}
                      onClickArtists={onClickArtists}
                      padding={false}
                    />
                  </div>
                )}

                {searchData.playlists?.length !== 0 && (
                  <div>
                    <div className="main-section">
                      <div className="heading">
                        <div className="subheading">
                          <span>Playlists </span>
                        </div>
                      </div>
                    </div>

                    <PlaylistContainer
                      data={searchData.playlists}
                      onClickPlaylists={onClickPlaylists}
                      padding={false}
                    />
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="mt-80">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
