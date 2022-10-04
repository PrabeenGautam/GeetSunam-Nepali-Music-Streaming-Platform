import Featured from "./Featured/Featured";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import MusicContainer from "./MusicContainer";
import RecentPlayed from "./RecentPlayed";
import * as HiIcons from "react-icons/hi";
import FeaturedArtists from "./Featured/FeaturedArtists";
import CustomBreadcrumbs from "./Breadcrumbs";
import { featuredArtists } from "./Featured/featureArtists.data";

function Content() {
  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/"} textName="Home" />
      <Featured />
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
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
          <MusicContainer />
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
          <FeaturedArtists featuredArtists={featuredArtists} />
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
