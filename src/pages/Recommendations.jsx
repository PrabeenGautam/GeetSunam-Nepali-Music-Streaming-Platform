import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import React from "react";
import Recommended from "../assets/images/Recommended.png";
import { musicList } from "assets/data/musicList";
import PlaySong from "components/Player/PlaySong";

function Recommnedations() {
  const recommendedSongs = musicList.slice(14, 24);
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/recommendation"} textName="Recommendation" />
        <section className="top-trends">
          <img
            src={recommendedSongs[0].trackDetails.coverArt}
            className="trend-image"></img>
          <div className="trend-section">
            <h2>Made For You</h2>
            <span className="details">
              <div>Songs Specially Created for you</div>
              <div>Created by GeetSunam</div>
              <div>Listen to best songs</div>
            </span>
            <PlaySong trackDetails={recommendedSongs[0].trackDetails}>
              <Btn className="btn-play">Play</Btn>
            </PlaySong>
          </div>
        </section>
        <RecentPlayed removeFromPlaylist={false} data={recommendedSongs} />
      </div>
    </div>
  );
}

export default Recommnedations;
