import { Link } from "react-router-dom";
import { BiPause, BiPlay } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useQuery } from "react-query";

import Featured from "./Featured/Featured";
import RecentPlayed from "./SongsList";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";
import CustomBreadcrumbs from "./Breadcrumbs";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import { getFeaturedArtists } from "@/services/artistsApi/getArtistsDetails.api";

import {
  getNewReleaseLimitedSongs,
  getRecentlyPlayedSongs,
} from "@/services/musicApi/getSongs.api";
import FeaturedSkeleton from "./Loader/Featured";
import {
  SongsSwiperLoader,
  ArtistsSwiperLoader,
} from "./Loader/LoaderComponents";
import Spinner from "./Loader/Spinner";

function Content() {
  const [changeFavourite, setChangeFavourite] = useState(false);

  const {
    data: songsReleases,
    isLoading: isLoadingReleases,
    isError: isErrorReleases,
  } = useQuery("newReleasesLimited", getNewReleaseLimitedSongs, {
    select: (data) => data.data.songs,
  });

  const {
    data: artists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
  } = useQuery("featuredArtists", getFeaturedArtists, {
    select: (data) => data.data.artists,
  });

  const {
    data: featuredData,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
  } = useQuery(["featured"], getFeaturedSongs, {
    select: (data) => data.data.songs,
  });

  const {
    data: recentPlayed,
    isLoading: isLoadingRecent,
    isError: isErrorRecenet,
  } = useQuery(["recentlyPlayed"], getRecentlyPlayedSongs, {
    select: (data) => data.data.songs,
  });

  const featuredSongs = featuredData && trackDetails(featuredData);
  const releaseSongs = songsReleases && trackDetails(songsReleases);
  const recentSongs = recentPlayed && trackDetails(recentPlayed);

  const loaderFeatured = isLoadingFeatured || isErrorFeatured;
  const loaderReleases = isLoadingReleases || isErrorReleases;
  const loaderArtists = isLoadingArtists || isErrorArtists;
  const loaderRecents = isLoadingRecent || isErrorRecenet;

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName="Home" />
      {!loaderFeatured ? (
        <Featured
          data={featuredSongs}
          showSearchBar={true}
          setChangeFavourite={setChangeFavourite}
        />
      ) : (
        <FeaturedSkeleton />
      )}
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>New Releases</span>
            <BiPlay className="heading_icons" />
          </div>
          <Link to={"/releases"} className="see-more">
            See All
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
            <span>Featured Artists</span>
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

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiPause className="heading_icons" />
        </div>

        {!loaderRecents ? (
          <RecentPlayed removeFromPlaylist={false} data={recentSongs} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Content;
