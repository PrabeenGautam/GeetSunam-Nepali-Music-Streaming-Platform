import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import React from "react";
import Recommended from "../assets/images/Recommended.png";
import { recentPlayed } from "components/recentPlayed.data";
import * as Icons from "react-icons/fi";

function Recommnedations() {
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/recommendation"} textName="Recommendation" />
        <section className="top-trends">
          <img src={Recommended} className="trend-image"></img>
          <div className="trend-section">
            <h2>Made For You</h2>
            <span className="details">
              <div>Songs Specially Created for you</div>
              <div>Created by GeetSunam</div>
              <div>Listen to best songs</div>
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

export default Recommnedations;
