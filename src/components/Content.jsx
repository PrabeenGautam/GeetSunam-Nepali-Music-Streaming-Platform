import Featured from "./Featured/Featured";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import RecentPlayed from "./RecentPlayed";
import * as HiIcons from "react-icons/hi";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";
import { musicList } from "assets/data/musicList";
import CustomBreadcrumbs from "./Breadcrumbs";
import { featuredArtists } from "./Featured/featureArtists.data";

function Content() {
  const featuredSongs = musicList.filter((value) => value.isFeatured === true);
  const releaseSongs = musicList.slice(0, 10);
  const artists = featuredArtists.slice(0, 10);
  const recentSongs = musicList.slice(0, 6);

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/home"} textName="Home" />
      <Featured data={featuredSongs} showSearchBar={true} />
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>New Releases</span>
            <BiIcons.BiPlay className="heading_icons" />
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
            <HiIcons.HiOutlineUser className="heading_icons" />
          </div>
        </div>

        <div className="content-section">
          <ArtistsSlider featuredArtists={artists} />
        </div>
      </div>

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiIcons.BiPause className="heading_icons" />
        </div>

        <RecentPlayed removeFromPlaylist={false} data={recentSongs} />
      </div>
    </div>
  );
}

export default Content;
