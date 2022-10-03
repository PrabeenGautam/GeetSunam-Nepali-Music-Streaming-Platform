import Featured from "./Featured/Featured";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import MusicContainer from "./MusicContainer";
import RecentPlayed from "./RecentPlayed";
import { recentPlayed } from "./recentPlayed.data";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import FeaturedArtists from "./Featured/FeaturedArtists";
import CustomBreadcrumbs from "./Breadcrumbs";

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
          <FeaturedArtists />
        </div>
      </div>

      <div className="main-section">
        <div className="subheading" style={{ marginBottom: 20 }}>
          <span>Recently Played</span>
          <BiIcons.BiPause className="heading_icons" />
        </div>

        <section className="song-list">
          <div className="recent-container list_heading ">
            <span style={{ visibility: "hidden" }}>#</span>
            <span></span>
            <span className="song-name">name</span>
            <span className="artists">artists</span>
            <span className="recent-genre">genre</span>
            <span style={{ visibility: "hidden" }}>#</span>
            <span className="length">
              <FiIcons.FiClock />
            </span>
            <span style={{ visibility: "hidden" }}></span>
          </div>
          {recentPlayed.map((value, index) => {
            return (
              <RecentPlayed
                key={index}
                thumbnail={value.thumbnail}
                name={value.name}
                artists={value.artists}
                genre={value.genre}
                time={value.time}
                isfavorite={value.favourite}
                isplaying={value?.play}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Content;
