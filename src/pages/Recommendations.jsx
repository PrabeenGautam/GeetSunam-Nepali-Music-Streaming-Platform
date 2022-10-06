import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import React from "react";
import Recommended from "../assets/images/Recommended.png";
import { recentPlayed } from "assets/data/recentPlayed.data";
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
        <RecentPlayed removeFromPlaylist={false} />
      </div>
    </div>
  );
}

export default Recommnedations;
