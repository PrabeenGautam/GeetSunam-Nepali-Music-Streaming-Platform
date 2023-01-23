import { Btn } from "@/components/StyledUI";
import RecentPlayed from "@/components/SongsList";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import PlaySong from "@/components/Player/PlaySong";
import { getNewReleaseSongs } from "@/services/musicApi/getSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import FeaturedSkeleton from "@/components/Loader/Featured";
import { useQuery } from "react-query";
import Spinner from "@/components/Loader/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { possibleMediaState } from "@/components/Player/possibleMediaState.types";
import React from "react";
import PauseSong from "@/components/Player/PauseSong";
import ActionCreators from "@/react-mui-player/redux/actionCreators";
import ManagePlayback from "@/components/PlayerBack/managePlayback";

function NewReleases() {
  const { data, isLoading, isError } = useQuery(
    "newReleases",
    getNewReleaseSongs,
    {
      select: (data) => data.data.songs,
    }
  );

  const newReleases = data && trackDetails(data);
  const loader = isLoading || isError;

  const dispatch = useDispatch();

  const currentSong = useSelector((state) => state);
  const onPlay = () => dispatch(ActionCreators.play());

  return (
    <div className="content-container">
      <div className="trends">
        <CustomBreadcrumbs link={"/trends"} textName="Trending" />
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
            <h2>New Releases</h2>
            <span className="details">
              <div>New releases songs, refreshed daily</div>
              <div>Created by GeetSunam</div>
              <div>Tracks from 2 weeks</div>
            </span>
            {!loader ? (
              <ManagePlayback song={newReleases[0]} />
            ) : (
              <button className="btn btn-disabled">Play</button>
            )}
          </div>
        </section>
        {!loader ? (
          <RecentPlayed removeFromPlaylist={false} data={newReleases} />
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
