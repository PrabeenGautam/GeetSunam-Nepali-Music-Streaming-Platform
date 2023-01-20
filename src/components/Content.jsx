import { Link } from "react-router-dom";
import { BiPause, BiPlay } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { useEffect, useState } from "react";

import Featured from "./Featured/Featured";
import RecentPlayed from "./SongsList";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";
import { shortMusicList } from "@/assets/data/musicList";
import CustomBreadcrumbs from "./Breadcrumbs";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";
import Loading from "./Loading";
import getNewReleaseSongs from "@/services/musicApi/getNewlyReleases.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import { getFeaturedArtists } from "@/services/artistsApi/getArtistsDetails.api";

function Content() {
  const [featuredSongs, setFeaturedSongs] = useState(null);
  const [releaseSongs, setReleaseSongs] = useState(null);
  const [artists, setFeaturedArtists] = useState(null);

  const recentSongs = shortMusicList;

  useEffect(() => {
    const fetchSongs = async function () {
      const featuredSongs = await getFeaturedSongs();
      const releaseSongs = await getNewReleaseSongs();
      const featuredArtists = await getFeaturedArtists();

      setFeaturedSongs(trackDetails(featuredSongs.data.songs));
      setReleaseSongs(trackDetails(releaseSongs.data.songs));
      setFeaturedArtists(featuredArtists.data.artists);
    };

    fetchSongs();
  }, []);

  return featuredSongs ? (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName="Home" />
      <Featured data={featuredSongs} showSearchBar={true} />
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
          <ArtistsSlider featuredArtists={artists} />
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
