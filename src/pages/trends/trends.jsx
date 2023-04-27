import React from "react";
import { useQuery } from "react-query";

import Spinner from "@/components/Loader/Spinner";
import RecentPlayed from "@/components/SongsList";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { trackDetails } from "@/utils/trackDetails.utils";
import FeaturedSkeleton from "@/components/Loader/Featured";
import { getTrendingSongs } from "@/services/musicApi/getSongs.api";
import ManagePlayback from "@/components/PlayerBack/managePlayback";
import { useTranslation } from "react-i18next";

function Trends() {
  const { data, isLoading, isError } = useQuery(
    "trendingSongs",
    getTrendingSongs,
    {
      select: (data) => data.data.songs,
      refetchOnWindowFocus: false,
    }
  );

  const { t } = useTranslation("translation", { keyPrefix: "trendingPage" });

  const trending = data && trackDetails(data);
  const loader = isLoading || isError;

  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName={t("trending")} />
        <section className="top-trends">
          {!loader ? (
            <img
              src={trending?.[0]?.trackDetails?.coverArt}
              className="trend-image"
              alt="trending"></img>
          ) : (
            <FeaturedSkeleton
              width="450px"
              height="300px"
              borderRadius="12px"
            />
          )}
          <div className="trend-section">
            <h2>{t("trendingSongs")}</h2>
            <span className="details">
              <div>{t("description")}</div>
              <div>{t("createdBy")}</div>
              <div>
                {!loader && trending.length} {t("tracks")}
              </div>
            </span>
            {!loader ? (
              <ManagePlayback song={trending[0]} />
            ) : (
              <button className="btn btn-disabled">{t("play")}</button>
            )}
          </div>
        </section>
        {!loader ? (
          <RecentPlayed
            removeFromPlaylist={false}
            data={trending}
            terminateQueries="trendingSongs"
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

export default Trends;
