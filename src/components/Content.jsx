import { Link } from "react-router-dom";
import { BiPause, BiPlay } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { useEffect, useState } from "react";

import Featured from "./Featured/Featured";
import RecentPlayed from "./SongsList";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";
import CustomBreadcrumbs from "./Breadcrumbs";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";
import Loading from "./Loading";
import { trackDetails } from "@/utils/trackDetails.utils";
import { getFeaturedArtists } from "@/services/artistsApi/getArtistsDetails.api";

import {
  getNewReleaseSongs,
  getRecentlyPlayedSongs,
} from "@/services/musicApi/getSongs.api";

function Content() {
  const [featuredSongs, setFeaturedSongs] = useState(null);
  const [releaseSongs, setReleaseSongs] = useState(null);
  const [artists, setFeaturedArtists] = useState(null);
  const [recentSongs, setRecentSongs] = useState(null);
  const [changeFavourite, setChangeFavourite] = useState(false);

  useEffect(() => {
    const fetchSongs = async function () {
      const featuredSongs = await getFeaturedSongs();
      setFeaturedSongs(trackDetails(featuredSongs.data.songs));
    };

    fetchSongs();
  }, [changeFavourite]);

  useEffect(() => {
    const fetchSongs = async function () {
      const featuredSongs = await getFeaturedSongs();
      const releaseSongs = await getNewReleaseSongs();
      const featuredArtists = await getFeaturedArtists();
      const recentSongs = await getRecentlyPlayedSongs();

      setFeaturedSongs(trackDetails(featuredSongs.data.songs));
      setReleaseSongs(trackDetails(releaseSongs.data.songs));
      setFeaturedArtists(featuredArtists.data.artists);
      setRecentSongs(trackDetails(recentSongs.data.songs));
    };

    fetchSongs();
  }, [changeFavourite]);

  return featuredSongs && artists ? (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName="Home" />
      {featuredSongs.length !== 0 && (
        <Featured
          data={featuredSongs}
          showSearchBar={true}
          setChangeFavourite={setChangeFavourite}
        />
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
          <RecentlyPlayedSlider musicList={releaseSongs} />
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
          {artists.length !== 0 && <ArtistsSlider featuredArtists={artists} />}
        </div>
      </div>

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiPause className="heading_icons" />
        </div>

        <RecentPlayed removeFromPlaylist={false} data={recentSongs} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Content;
