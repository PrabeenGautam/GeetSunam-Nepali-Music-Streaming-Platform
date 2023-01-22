import { Btn } from "@/components/StyledUI";
import RecentPlayed from "@/components/SongsList";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import PlaySong from "@/components/Player/PlaySong";
import { useState } from "react";
import { useEffect } from "react";
import { getTrendingSongs } from "@/services/musicApi/getSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import { SongsTableLoader } from "@/components/Loader/LoaderComponents";
import FeaturedSkeleton from "@/components/Loader/Featured";

function Trends() {
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const song = await getTrendingSongs();
      setTrending(trackDetails(song.data.songs));
    };

    fetchdata();
  }, []);
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName="Trending" />
        <section className="top-trends">
          {trending ? (
            <img
              src={trending[0].trackDetails.coverArt}
              className="trend-image"
              alt="trending"></img>
          ) : (
            <FeaturedSkeleton
              width="360px"
              height="300px"
              borderRadius="12px"
            />
          )}
          <div className="trend-section">
            <h2>Trending Songs</h2>
            <span className="details">
              <div>Top trending hits, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>{trending && trending.length} Tracks</div>
            </span>
            {trending ? (
              <PlaySong trackDetails={trending[0].trackDetails}>
                <Btn className="btn-play">Play</Btn>
              </PlaySong>
            ) : (
              <button className="btn btn-disabled">Play</button>
            )}
          </div>
        </section>
        {trending ? (
          <RecentPlayed removeFromPlaylist={false} data={trending} />
        ) : (
          <SongsTableLoader />
        )}
      </div>
    </div>
  );
}

export default Trends;
