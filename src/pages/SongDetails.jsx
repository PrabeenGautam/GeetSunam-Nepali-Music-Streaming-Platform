import { useParams } from "react-router-dom";
import React from "react";
import { useSongsData } from "@/hooks/useSongsData";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { useSelector } from "react-redux";
import { possibleMediaState } from "@/components/Player/possibleMediaState.types";
import { MdPlaylistAdd } from "react-icons/md";
import RecentPlayed from "@/components/SongsList";

function SongDetails() {
  const { id: songId } = useParams();

  const stats = useSelector((state) => state);
  const { data: currentSong } = useSongsData(songId);

  return (
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
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: "1rem" }}>{currentSong?.duration}</div>
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
            </span>

            <div className="button-section">
              <div className="btn-play-songs">
                {stats.trackID === songId &&
                stats.mediaState === possibleMediaState.PLAYING ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </div>

              <div className="btn-heart-songs">
                {currentSong?.isFavourite ? (
                  <AiTwotoneHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>

              <div className="btn-heart-songs">
                <MdPlaylistAdd />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <h2>Recommended Songs Based on Current Songs</h2>
        <RecentPlayed data={[]} />
      </div>
    </div>
  );
}

export default SongDetails;
