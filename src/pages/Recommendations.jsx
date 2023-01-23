import { useQuery } from "react-query";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import RecentPlayed from "@/components/SongsList";
import { Btn } from "@/components/StyledUI";
import Recommended from "../assets/images/Recommended.png";
import { musicList } from "@/assets/data/musicList";
import PlaySong from "@/components/Player/PlaySong";
import { getRecommendedSongs } from "@/services/musicApi/getSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import Spinner from "@/components/Loader/Spinner";
import ManagePlayback from "@/components/PlayerBack/mangePlayback";

function Recommnedations() {
  const { data, isLoading, isError } = useQuery(
    "recommendedSongs",
    getRecommendedSongs,
    {
      select: (data) => data.data.songs,
    }
  );

  const recommendedSongs = data && trackDetails(data);
  const loader = isLoading || isError;
  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/recommendation"} textName="Recommendation" />
        <section className="top-trends">
          <img
            src={Recommended}
            className="trend-image"
            style={{ width: 300 }}
            alt="recommendation"></img>
          <div className="trend-section">
            <h2>Made For You</h2>
            <span className="details">
              <div>Songs Specially Created for you</div>
              <div>Created by GeetSunam</div>
              <div>Listen to best songs</div>
            </span>
            {!loader ? (
              <ManagePlayback song={recommendedSongs[0]} />
            ) : (
              <button className="btn btn-disabled">Play</button>
            )}
          </div>
        </section>
        {!loader ? (
          <RecentPlayed removeFromPlaylist={false} data={recommendedSongs} />
        ) : (
          <div className="mt-80">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommnedations;
