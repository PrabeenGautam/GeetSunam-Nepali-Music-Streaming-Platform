import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import React from "react";
import * as Icons from "react-icons/fi";
import FeaturedImage from "assets/images/featured.jpg";
import { recentPlayed } from "assets/data/recentPlayed.data";

function NewReleases() {
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/releases"} textName="New Releases" />
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
        <RecentPlayed removeFromPlaylist={false} />
      </div>
    </div>
  );
}

export default NewReleases;
