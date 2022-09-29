import React from "react";
import Featured from "./Featured/Featured";
import * as BiIcons from "react-icons/bi";
import MusicContainer from "./MusicContainer";
import { Link } from "react-router-dom";

function Content() {
  return (
    <div>
      <Featured />
      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>New Releases</span>
            <BiIcons.BiPlay className="heading_icons" />
          </div>
          <Link to={"/more"} className="see-more">
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

      <div className="main-section">
        <div className="subheading">
          <span>Recently Played</span>
          <BiIcons.BiPause className="heading_icons" />
        </div>

        <div className="content-section"></div>
      </div>
    </div>
  );
}

export default Content;
