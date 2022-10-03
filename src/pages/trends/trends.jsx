import React from "react";
import FeaturedImage from "assets/images/featured.jpg";
import { Btn } from "components/StyledUI";
import * as Icons from "react-icons/fi";
import { recentPlayed } from "components/recentPlayed.data";
import RecentPlayed from "components/RecentPlayed";
import CustomBreadcrumbs from "components/Breadcrumbs";

function Trends() {
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName="Trending" />
        <section className="top-trends">
          <img src={FeaturedImage} className="trend-image"></img>
          <div className="trend-section">
            <h2>Trending Songs</h2>
            <span className="details">
              <div>Top trending hits, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>16 Tracks</div>
            </span>
            <Btn className="btn-play">Play</Btn>
          </div>
        </section>
        <section className="song-list">
          <div className="recent-container list_heading ">
            <span style={{ visibility: "hidden" }}>#</span>
            <span></span>
            <span className="song-name">name</span>
            <span className="artists">artists</span>
            <span className="recent-genre">genre</span>
            <span></span>
            <span className="length">
              <Icons.FiClock />
            </span>
            <span style={{ visibility: "hidden" }}>#</span>
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
                isFavourite={value.favourite}
                isPlaying={value?.play}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Trends;
