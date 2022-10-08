import Featured from "./Featured/Featured";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import RecentPlayed from "./RecentPlayed";
import * as HiIcons from "react-icons/hi";
import FeaturedArtists from "./Artists/FeaturedArtists";
import CustomBreadcrumbs from "./Breadcrumbs";
import { featuredArtists } from "./Featured/featureArtists.data";
import { tracksData } from "assets/data/tracks.data";
import featuredSongs from "assets/data/featuredSongs.json";
import RecentlyPlayedSlider from "./Slider/RecentlyPlayedSlider";
import ArtistsSlider from "./Slider/ArtistsSlider";

function Content() {
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
          <RecentlyPlayedSlider />
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
          <ArtistsSlider />
        </div>
      </div>

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiIcons.BiPause className="heading_icons" />
        </div>

        <RecentPlayed removeFromPlaylist={false} />
      </div>
    </div>
  );
}

export default Content;
