import CustomBreadcrumbs from "components/Breadcrumbs";
import MusicContainer from "components/MusicContainer";
import React from "react";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <>
      <CustomBreadcrumbs link={"trends"} textName="Explore" />
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>New Releases</span>
            <BiIcons.BiPlay className="heading_icons" />
          </div>
          <Link to={"/releases"} className="see-more">
            See more
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
    </>
  );
}

export default Explore;
