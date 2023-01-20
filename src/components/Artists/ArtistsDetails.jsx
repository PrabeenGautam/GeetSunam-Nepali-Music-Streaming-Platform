import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";

import ArtistsPlayed from "./ArtistsPlayed";
import {
  getArtistsById,
  getArtistsSongs,
} from "@/services/artistsApi/getArtistsDetails.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import Loading from "../Loading";

function ArtistsDetails() {
  const { id: userId } = useParams();

  const [artist, setArtist] = useState(null);
  const [artistsSong, setArtistSong] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      const artistDetail = await getArtistsById(userId);
      const artistSongs = await getArtistsSongs(userId);

      setArtist(artistDetail.data.artists);
      setArtistSong(trackDetails(artistSongs.data.songs));
    };

    fetchData();
  }, []);

  return artist ? (
    <>
      <div className="playlist-container gradient">
        <section className="playlist">
          <div className="artists-images">
            <img src={artist.profileImage} alt="thumbnail" />
          </div>
          <div className="playlist-details">
            <div>Artists</div>
            <div>{artist.fullname}</div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>{artistsSong.length} songs</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button className="custom-btn" title="Remove from Favourite">
              {artist.isFavourite ? (
                <FiHeart
                  style={{
                    fill: "var(--highlight)",
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <FiHeart
                  style={{
                    stroke: "var(--highlight)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
            </button>
          </div>
        </section>

        <div className="padding">
          {artistsSong.length > 0 ? (
            <ArtistsPlayed data={artistsSong} />
          ) : (
            <h3>Artists have not uploaded any songs.</h3>
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ArtistsDetails;
