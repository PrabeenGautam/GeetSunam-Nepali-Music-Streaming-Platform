import { FiHeart, FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { BiPlayCircle } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import useGSSelector from "@/redux/useGSSelector";
import { getFavouriteSongs } from "@/services/musicApi/getSongs.api";
import RecentPlayed from "@/components/SongsList";
import { trackDetails } from "./../../utils/trackDetails.utils";
import PlaySong from "@/components/Player/PlaySong";
import Spinner from "@/components/Loader/Spinner";
import { searchSongsApi } from "@/services/searchApi/search.api";
import { useTranslation } from "react-i18next";

function LikedSongs() {
  const location = useLocation();
  const auth = useGSSelector((state) => state.userState.userData);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "likedSongs",
  });

  const { data, isLoading, isError } = useQuery(
    "likedSongs",
    getFavouriteSongs,
    {
      select: (data) => data.data.songs,
    }
  );
  const {
    mutate,
    data: searchedData,
    isLoading: isSearchedLoading,
    isError: isSearchedError,
    reset: resetSearch,
  } = useMutation(
    (data) => {
      const searchQuery = data.split(" ").join("+");
      return searchSongsApi(searchQuery);
    },
    { onSuccess: () => setShowData(true) }
  );

  useEffect(() => {
    resetSearch();
  }, [location]);

  const likedSongs = data && trackDetails(data);
  const searchedSongs = searchedData && trackDetails(searchedData.data.songs);

  const loader = isLoading || isError;
  const searchedLoader = isSearchedLoading || isSearchedError;

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      mutate(e.target[0].value);
    }
  };

  return (
    <div className="playlist-container">
      <section className="playlist">
        <div className="playlist-images custom">
          <FiHeart />
        </div>

        <div className="playlist-details">
          <div>{t("playlist")}</div>
          <div>{t("liked")}</div>

          <div>
            <span>{auth.fullname}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {!loader && likedSongs?.length !== 0 ? likedSongs.length : "No"}{" "}
              {t("song")}
            </span>
          </div>
        </div>
      </section>

      <section className="playlist-songs padding">
        {!loader ? (
          likedSongs.length > 0 ? (
            <div className="music-section">
              {likedSongs.map((values) => {
                return (
                  <PlaySong trackDetails={values.trackDetails} key={values._id}>
                    <div className="music-container dynamic" key={values._id}>
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

                      <div className="song-name innerText" title={values.title}>
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
          ) : (
            <div>
              <h2>{t("noSong")}</h2>
              <h3>{t("message")}</h3>
              <div style={{ width: "30rem" }}>
                <form className="search-bar" onSubmit={onSubmitValue}>
                  <FiSearch className="icon-search" />
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Search songs to add them to playlist"
                    name="query"
                    onChange={(e) => {
                      if (!e.target.value) setShowData(false);
                    }}
                  />
                  <input type="submit" hidden />
                </form>
              </div>
              {!searchedLoader ? (
                showData && <RecentPlayed data={searchedSongs} />
              ) : (
                <Spinner />
              )}
            </div>
          )
        ) : (
          <div className="mt-80">
            <Spinner />
          </div>
        )}
      </section>
    </div>
  );
}

export default LikedSongs;
