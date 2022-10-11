import CustomBreadcrumbs from "components/Breadcrumbs";
import RecentPlayed from "components/RecentPlayed";
import { Btn } from "components/StyledUI";
import { musicList } from "assets/data/musicList";
import PlaySong from "components/Player/PlaySong";

function NewReleases() {
  const releaseSongs = musicList.slice(30, 41);
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/releases"} textName="New Releases" />
        <section className="top-trends">
          <img
            src={releaseSongs[0].trackDetails.coverArt}
            className="trend-image"
            alt="trending"
          ></img>
          <div className="trend-section">
            <h2>New Releases</h2>
            <span className="details">
              <div>New releases songs, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>Tracks from 2 weeks</div>
            </span>
            <PlaySong trackDetails={releaseSongs[0].trackDetails}>
              <Btn className="btn-play">Play</Btn>
            </PlaySong>
          </div>
        </section>
        <RecentPlayed removeFromPlaylist={false} data={releaseSongs} />
      </div>
    </div>
  );
}

export default NewReleases;
