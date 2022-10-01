import CustomBreadcrumbs from "components/Breadcrumbs";
import FeaturedArtists from "components/Featured/FeaturedArtists";
import MusicContainer from "components/MusicContainer";
import React from "react";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <>
      <CustomBreadcrumbs link={"/explore"} textName="Explore" />
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
    </>
  );
}

export default Explore;
