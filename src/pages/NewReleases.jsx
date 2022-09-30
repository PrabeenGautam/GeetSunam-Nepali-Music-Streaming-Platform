import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import React from "react";
import * as Icons from "react-icons/fi";
import FeaturedImage from "assets/images/featured.jpg";
import { recentPlayed } from "components/recentPlayed.data";

function NewReleases() {
  return (
    <>
      <div className="trends">
        <CustomBreadcrumbs link={"trends"} textName="New Releases" />
        <section className="top-trends">
          <img src={FeaturedImage} className="trend-image"></img>
          <div className="trend-section">
            <h2>New Releases</h2>
            <span className="details">
              <div>New releases songs, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>Tracks from 16 days</div>
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
            <span className="length">duration</span>
            <Icons.FiHeart className="heart" />
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
    </>
  );
}

export default NewReleases;
