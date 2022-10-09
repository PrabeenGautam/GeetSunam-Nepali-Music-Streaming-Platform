import React from "react";
import FeaturedImage from "assets/images/featured.jpg";
import { Btn } from "components/StyledUI";
import RecentPlayed from "components/RecentPlayed";
import CustomBreadcrumbs from "components/Breadcrumbs";
import { musicList } from "assets/data/musicList";

function Trends() {
  const musicData = musicList.slice(4, 12);
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
        <RecentPlayed removeFromPlaylist={false} data={musicData} />
      </div>
    </div>
  );
}

export default Trends;
