import CustomBreadcrumbs from "components/Breadcrumbs";
import MusicContainer from "components/MusicContainer";
import React from "react";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Featured } from "components/Featured";
import featuredSongs from "assets/data/featuredSongs.json";
import RecommendedSlider from "components/Slider/RecommendedSlider";

function Explore() {
  const array = new Array(12).fill(1);
  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/explore"} textName="Explore" />

      <div className="main-section">
        <Featured data={featuredSongs} />
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Recommended for you</span>
            <MdIcons.MdRecommend className="heading_icons" />
          </div>
          <Link to={"/recommendation"} className="see-more">
            See All
          </Link>
        </div>

        <div className="content-section">
          <RecommendedSlider />
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>Library</span>
            <MdIcons.MdLibraryMusic className="heading_icons" />
          </div>
        </div>

        <div className="music-section">
          {array.map((values, index) => {
            return (
              <div className="music-container" key={index}>
                <img
                  src="https://img.youtube.com/vi/Bn5Qpr79LQw/maxresdefault.jpg"
                  alt="thumbnail"
                  className="thumbnail-new"
                />
                <div className="song-name" title="Aayo Teejko Lahar">
                  Aayo Teejko Lahar
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
