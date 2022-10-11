import { Btn } from "components/StyledUI";
import RecentPlayed from "components/RecentPlayed";
import CustomBreadcrumbs from "components/Breadcrumbs";
import { musicList } from "assets/data/musicList";
import PlaySong from "components/Player/PlaySong";

function Trends() {
  const musicData = musicList.slice(4, 12);
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName="Trending" />
        <section className="top-trends">
          <img
            src={musicData[0].trackDetails.coverArt}
            className="trend-image"
            alt="trending"
          ></img>
          <div className="trend-section">
            <h2>Trending Songs</h2>
            <span className="details">
              <div>Top trending hits, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>{musicData.length} Tracks</div>
            </span>
            <PlaySong trackDetails={musicData[0].trackDetails}>
              <Btn className="btn-play">Play</Btn>
            </PlaySong>
          </div>
        </section>
        <RecentPlayed removeFromPlaylist={false} data={musicData} />
      </div>
    </div>
  );
}

export default Trends;
