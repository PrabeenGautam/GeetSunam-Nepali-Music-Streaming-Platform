import { useEffect, useState } from "react";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import RecentPlayed from "@/components/SongsList";
import { Btn } from "@/components/StyledUI";
import PlaySong from "@/components/Player/PlaySong";
import { trackDetails } from "@/utils/trackDetails.utils";
import { getNewReleaseSongs } from "@/services/musicApi/getSongs.api";
import Loading from "@/components/Loading";

function NewReleases() {
  const [releaseSongs, setReleaseSongs] = useState(null);

  useEffect(() => {
    const fetchSongs = async function () {
      const releaseSongs = await getNewReleaseSongs();
      setReleaseSongs(trackDetails(releaseSongs.data.songs));
    };

    fetchSongs();
  }, []);
  return releaseSongs ? (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/releases"} textName="New Releases" />
        <section className="top-trends">
          <img
            src={releaseSongs[0].trackDetails.coverArt}
            className="trend-image"
            alt="new-release"></img>
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
  ) : (
    <Loading />
  );
}

export default NewReleases;
