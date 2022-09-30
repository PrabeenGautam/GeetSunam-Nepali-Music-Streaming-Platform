import React from "react";
import FeaturedImage from "assets/images/featured.jpg";
import { Btn } from "components/StyledUI";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fi";
import { recentPlayed } from "components/recentPlayed.data";
import RecentPlayed from "components/RecentPlayed";

function Trends() {
  return (
    <>
      <div className="trends">
        <section className="breadcrumbs">
          <Link to="/" style={{ marginRight: 7 }}>
            <span className="root-link">GeetSunam</span>
          </Link>
          <span> {">"} </span>
          <Link
            to="/trends"
            style={{ marginLeft: 7, textDecoration: "underline" }}>
            <span>Trending Songs</span>
          </Link>
        </section>
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

export default Trends;
