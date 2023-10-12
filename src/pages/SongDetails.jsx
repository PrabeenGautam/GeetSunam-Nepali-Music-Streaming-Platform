import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdPlaylistAdd } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";

import { possibleMediaState } from "@/components/Player/possibleMediaState.types";
import { useSongsData } from "@/hooks/useSongsData";
import RecentPlayed from "@/components/SongsList";
import PauseSong from "@/components/Player/PauseSong";
import ActionCreators from "@/react-mui-player/redux/actionCreators";
import PlaySong from "@/components/Player/PlaySong";
import { trackDetails } from "@/utils/trackDetails.utils";
import { toggleSongsFavourite } from "@/services/musicApi/postSongs.api";
import PlaylistAddContainer from "@/components/Playlists/PlaylistAddContainer";
import { recommendSongBasedOnCurrent } from "@/services/musicApi/recommendSongBased.api";
import Spinner from "@/components/Loader/Spinner";

function SongDetails() {
  const [clicked, setClicked] = useState(false);
  const [playlist, setPlaylistAdd] = useState(false);

  const queryClient = useQueryClient();

  const { id: songId } = useParams();
  const dispatch = useDispatch();

  const stats = useSelector((state) => state);
  const { data: currentSong, isFetching } = useSongsData(songId);

  const {
    data: recommendedSong,
    isLoading: isLoadingRecommendation,
    isError: isErrorRecommendation,
  } = useQuery(
    ["recommend-songs-based-on-current", songId],
    () => recommendSongBasedOnCurrent(songId),
    {
      select: (data) => data.similar_songs,
      refetchOnWindowFocus: false,
    }
  );

  const onPlay = () => dispatch(ActionCreators.play());

  const track = !isFetching && trackDetails(currentSong);
  const recommendedSongDetails =
    recommendedSong && trackDetails(recommendedSong);

  const loader = isLoadingRecommendation || isErrorRecommendation;

  const handleFavourite = async () => {
    if (!clicked) {
      setClicked(true);
      const fetchData = await toggleSongsFavourite(songId);
      queryClient.invalidateQueries(["songs", songId]);

      if (currentSong.trackID === songId || currentSong._id === songId) {
        dispatch(
          ActionCreators.getMusicDetails({
            ID: currentSong?.trackID || track._id,
            favourite: fetchData.data.songs.isFavourite,
          })
        );
      }
      setClicked(false);
    }
  };

  return (
    <>
      {playlist && (
        <PlaylistAddContainer setClick={setPlaylistAdd} data={songId} />
      )}
      <div className="content-container">
        <div
          className="trends"
          style={{
            borderBottom: "2px solid grey",
            paddingBottom: "20px",
            marginBottom: 20,
          }}>
          <section className="top-trends">
            <img
              src={currentSong?.coverArt}
              className="trend-image"
              alt="newReleases"></img>

            <div className="trend-section">
              <h2>{currentSong?.title}</h2>
              <span className="details">
                <div style={{ fontSize: 20 }}>
                  {currentSong?.artist || currentSong?.artists?.fullname}
                </div>
                {currentSong?.duration && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ fontSize: "1rem" }}>
                      {currentSong?.duration}
                    </div>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "white",
                      }}></div>
                    <div style={{ fontSize: "1rem" }}>
                      {currentSong?.releasedDate}
                    </div>
                  </div>
                )}
              </span>

              <div className="button-section">
                <div className="btn-play-songs">
                  {stats.trackID === songId ? (
                    <React.Fragment>
                      {stats.mediaState === possibleMediaState.PLAYING && (
                        <PauseSong>
                          <FaPause />
                        </PauseSong>
                      )}

                      {stats.mediaState === possibleMediaState.PAUSED && (
                        <span
                          className="flex-center"
                          onClick={onPlay}
                          style={{ width: "100%", height: "100%" }}>
                          <FaPlay />
                        </span>
                      )}
                    </React.Fragment>
                  ) : !isFetching ? (
                    <PlaySong trackDetails={track.trackDetails}>
                      <FaPlay />
                    </PlaySong>
                  ) : (
                    <FaPlay />
                  )}
                </div>

                <div className="btn-heart-songs" onClick={handleFavourite}>
                  {!isFetching ? (
                    track.isFavourite ? (
                      <AiTwotoneHeart />
                    ) : (
                      <AiOutlineHeart />
                    )
                  ) : (
                    <AiOutlineHeart />
                  )}
                </div>

                <div
                  className="btn-heart-songs"
                  onClick={() => setPlaylistAdd(true)}>
                  <MdPlaylistAdd />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div>
          <h2>Recommended Songs Based on Current Songs</h2>
          {!loader ? (
            <RecentPlayed data={recommendedSongDetails} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}

export default SongDetails;
