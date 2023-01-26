import { useQuery } from "react-query";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import RecentPlayed from "@/components/SongsList";
import Recommended from "../assets/images/Recommended.png";
import { getRecommendedSongs } from "@/services/musicApi/getSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import Spinner from "@/components/Loader/Spinner";
import ManagePlayback from "@/components/PlayerBack/managePlayback";
import { useTranslation } from "react-i18next";

function Recommnedations() {
  const { data, isLoading, isError } = useQuery(
    "recommendedSongs",
    getRecommendedSongs,
    {
      select: (data) => data.data.songs,
      refetchOnWindowFocus: false,
    }
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "madeForYouPage",
  });

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
            <h2>{t("madeForYou")}</h2>
            <span className="details">
              <div>{t("description")}</div>
              <div>{t("createdBy")}</div>
              <div>{t("listen")}</div>
            </span>
            {!loader ? (
              <ManagePlayback song={recommendedSongs[0]} />
            ) : (
              <button className="btn btn-disabled">{t("play")}</button>
            )}
          </div>
        </section>
        {!loader ? (
          <RecentPlayed
            removeFromPlaylist={false}
            data={recommendedSongs}
            terminateQueries="recommendedSongs"
          />
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
