import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import Spinner from "@/components/Loader/Spinner";
import RecentPlayed from "@/components/SongsList";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { trackDetails } from "@/utils/trackDetails.utils";
import FeaturedSkeleton from "@/components/Loader/Featured";
import { getTrendingSongs } from "@/services/musicApi/getSongs.api";
import ManagePlayback from "@/components/PlayerBack/managePlayback";

function Trends() {
  const { data, isLoading, isError } = useQuery(
    "trendingSongs",
    getTrendingSongs,
    {
      select: (data) => data.data.songs,
    }
  );

  const trending = data && trackDetails(data);
  const loader = isLoading || isError;

  const dispatch = useDispatch();

  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName="Trending" />
        <section className="top-trends">
          {!loader ? (
            <img
              src={trending[0].trackDetails.coverArt}
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
            <h2>Trending Songs</h2>
            <span className="details">
              <div>Top trending hits, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>{!loader && trending.length} Tracks</div>
            </span>
            {!loader ? (
              <ManagePlayback song={trending[0]} />
            ) : (
              <button className="btn btn-disabled">Play</button>
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
