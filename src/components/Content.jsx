import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { BiPause, BiPlay } from "react-icons/bi";

import RecentPlayed from "./SongsList";
import Featured from "./Featured/Featured";
import CustomBreadcrumbs from "./Breadcrumbs";
import FeaturedSkeleton from "./Loader/Featured";
import ArtistsSlider from "./Slider/ArtistsSlider";
import { trackDetails } from "@/utils/trackDetails.utils";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";
import { getFeaturedArtists } from "@/services/artistsApi/getArtistsDetails.api";

import {
  getNewReleaseLimitedSongs,
  getRecentlyPlayedSongs,
  getRecommendedSongs,
} from "@/services/musicApi/getSongs.api";

import {
  SongsSwiperLoader,
  ArtistsSwiperLoader,
} from "./Loader/LoaderComponents";
import { useTranslation } from "react-i18next";

function Content() {
  const { t } = useTranslation("translation", { keyPrefix: "homePage" });

  const {
    data: songsReleases,
    isLoading: isLoadingReleases,
    isError: isErrorReleases,
  } = useQuery("newReleasesLimited", getNewReleaseLimitedSongs, {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const {
    data: artists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
  } = useQuery("featuredArtists", getFeaturedArtists, {
    select: (data) => data.data.artists,
    refetchOnWindowFocus: false,
  });

  const {
    data: featuredData,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
  } = useQuery(["featured"], getFeaturedSongs, {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const {
    data: recentPlayed,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
  } = useQuery(["recentlyPlayed"], getRecentlyPlayedSongs, {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const {
    data: songsRecommended,
    isLoading: isLoadingRecommended,
    isError: isErrorRecommended,
  } = useQuery("recommendation", getRecommendedSongs, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const featuredSongs = featuredData && trackDetails(featuredData);
  const releaseSongs = songsReleases && trackDetails(songsReleases);

  const recentSongs = recentPlayed && trackDetails(recentPlayed);

  const loaderFeatured = isLoadingFeatured || isErrorFeatured;
  const loaderReleases = isLoadingReleases || isErrorReleases;
  const loaderArtists = isLoadingArtists || isErrorArtists;
  const loaderRecents = isLoadingRecent || isErrorRecent;

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName={t("home")} />
      {!loaderFeatured ? (
        <Featured data={featuredSongs} showSearchBar={false} />
      ) : (
        <FeaturedSkeleton />
      )}
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>{t("newReleases")}</span>
            <BiPlay className="heading_icons" />
          </div>
          <Link to={"/releases"} className="see-more">
            {t("seeAll")}
          </Link>
        </div>

        <div className="content-section">
          {!loaderReleases ? (
            <RecentlyPlayedSlider musicList={releaseSongs} />
          ) : (
            <SongsSwiperLoader />
          )}
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>{t("featuredArtists")}</span>
            <HiOutlineUser className="heading_icons" />
          </div>
        </div>

        <div className="content-section">
          {!loaderArtists ? (
            <ArtistsSlider featuredArtists={artists} />
          ) : (
            <ArtistsSwiperLoader />
          )}
        </div>
      </div>

      {!loaderRecents && recentPlayed.length > 0 && (
        <div className="main-section">
          <div className="subheading" style={{ marginBottom: 20 }}>
            <span>{t("recentlyPlayed")}</span>
            <BiPause className="heading_icons" />
          </div>

          <RecentPlayed
            removeFromPlaylist={false}
            data={recentSongs}
            terminateQueries="recentlyPlayed"
          />
        </div>
      )}
    </div>
  );
}

export default Content;
