import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import artistsImage from "@/assets/images/music-artists.png";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import Loading from "@/components/Loading";
import { getFavouriteArtists } from "@/services/artistsApi/getArtistsDetails.api";

function FavouriteArtists() {
  const navigate = useNavigate();

  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const fetchArtists = async function () {
      const artists = await getFavouriteArtists();
      setArtists(artists.data.artists);
    };

    fetchArtists();
  }, []);

  const onClickArtists = (id) => {
    navigate(`/artists/${id}`);
  };

  return artists ? (
    <div className="playlist-container gradient">
      <section className="playlist" style={{ marginBottom: "2rem" }}>
        <div className="playlist-images custom">
          <img src={artistsImage} alt="" />
        </div>
        <div className="playlist-details">
          <div>Collection</div>
          <div>Favourite Artists</div>
          <div>
            <span>PrabinGautam</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>{artists.length !== 0 ? artists.length : "No"} artists</span>
          </div>
        </div>
      </section>

      <ArtistsContainer artistsData={artists} onClickArtists={onClickArtists} />
    </div>
  ) : (
    <Loading />
  );
}

export default FavouriteArtists;
