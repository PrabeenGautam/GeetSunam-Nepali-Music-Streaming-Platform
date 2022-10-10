import CustomBreadcrumbs from "components/Breadcrumbs";
import React from "react";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Featured } from "components/Featured";
import RecommendedSlider from "components/Slider/RecommendedSlider";
import { musicList } from "assets/data/musicList";
import AutoMarquee from "components/Slider/AutoMarquee";

function Explore() {
  const recommendedSongs = musicList.slice(4, 14);
  const featuredSongs = musicList.filter(
    (value) => value.trackDetails.isFeatured === true
  );
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
          <RecommendedSlider data={recommendedSongs} />
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
          {musicList.map((values, index) => {
            return (
              <div className="music-container" key={index}>
                <img
                  src={values.trackDetails.coverArt}
                  alt="thumbnail"
                  className="thumbnail-new"
                />
                <AutoMarquee
                  className={"song-name"}
                  value={values.trackDetails.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
