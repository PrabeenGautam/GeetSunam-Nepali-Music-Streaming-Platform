import { FiHeart, FiSearch, FiMic } from "react-icons/fi";
import { useState, useEffect } from "react";

import useGSSelector from "@/redux/useGSSelector";
import Loading from "@/components/Loading";
import { getFavouriteSongs } from "@/services/musicApi/getSongs.api";
import RecentPlayed from "@/components/SongsList";
import { trackDetails } from "./../../utils/trackDetails.utils";

function LikedSongs() {
  const auth = useGSSelector((state) => state.userState.userData);
  const [likedSongs, setLikedSongs] = useState(null);
  const [showData, setShowData] = useState(false);

  const onSubmitValue = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      setShowData(true);
    }
  };

  useEffect(() => {
    const fetchData = async function () {
      const songs = await getFavouriteSongs();
      setLikedSongs(trackDetails(songs.data.songs));
    };

    fetchData();
  }, []);
  return likedSongs ? (
    <div className="playlist-container">
      <section className="playlist">
        <div className="playlist-images custom">
          <FiHeart />
        </div>

        <div className="playlist-details">
          <div>Playlist</div>
          <div>Liked Songs</div>

          <div>
            <span>{auth.fullname}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {likedSongs.length !== 0 ? likedSongs.length : "No"} Songs
            </span>
          </div>
        </div>
      </section>

      <section
        className="playlist-songs padding"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.8)" }}>
        {likedSongs.length > 0 ? (
          <RecentPlayed
            removeFromPlaylist={true}
            data={likedSongs}
            hideLike={true}
          />
        ) : (
          <div>
            <h2>You have not liked any songs.</h2>
            <h3>Search for songs to add them to the list</h3>
            <div style={{ width: "30rem" }}>
              <form className="search-bar" onSubmit={onSubmitValue}>
                <FiSearch className="icon-search" />
                <input
                  type="text"
                  className="text-input"
                  placeholder="Search songs to add them to playlist"
                  name="query"
                  onChange={(e) => {
                    if (!e.target.value) setShowData(false);
                  }}
                />
                <input type="submit" hidden />
                <div
                  style={{
                    borderLeft: "2px solid black",
                    paddingRight: 5,
                  }}></div>
                <FiMic className="icon-mic" />
              </form>
            </div>
            {showData ? <RecentPlayed /> : ""}
          </div>
        )}
      </section>
    </div>
  ) : (
    <Loading />
  );
}

export default LikedSongs;
