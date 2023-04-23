import React from "react";
import { useQuery } from "react-query";

import Spinner from "@/components/Loader/Spinner";
import RecentPlayed from "@/components/SongsList";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { trackDetails } from "@/utils/trackDetails.utils";
import FeaturedSkeleton from "@/components/Loader/Featured";
import ManagePlayback from "@/components/PlayerBack/managePlayback";
import { getNewReleaseSongs } from "@/services/musicApi/getSongs.api";
import { useTranslation } from "react-i18next";

function NewReleases() {
  const { t } = useTranslation("translation", {
    keyPrefix: "newReleasePage",
  });
  const { data, isLoading, isError } = useQuery(
    "newReleases",
    getNewReleaseSongs,
    {
      select: (data) => data.data.songs,
      refetchOnWindowFocus: false,
    }
  );

  const newReleases = data && trackDetails(data);
  const loader = isLoading || isError;

  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName={t("newReleases")} />
        <section className="top-trends">
          {!loader ? (
            <img
              src={newReleases[0].trackDetails.coverArt}
              className="trend-image"
              alt="newReleases"></img>
          ) : (
            <FeaturedSkeleton
              width="450px"
              height="300px"
              borderRadius="12px"
            />
          )}
          <div className="trend-section">
            <h2>{t("newReleases")}</h2>
            <span className="details">
              <div>{t("description")}</div>
              <div>{t("createdBy")}</div>
              <div>{t("tracksDate")}</div>
            </span>
            {!loader ? (
              <ManagePlayback song={newReleases[0]} />
            ) : (
              <button className="btn btn-disabled">Play</button>
            )}
          </div>
        </section>
        {!loader ? (
          <RecentPlayed
            removeFromPlaylist={false}
            data={newReleases}
            terminateQueries="newReleases"
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

export default NewReleases;
