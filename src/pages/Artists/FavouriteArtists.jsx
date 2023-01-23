import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import artistsImage from "@/assets/images/music-artists.png";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import { getFavouriteArtists } from "@/services/artistsApi/getArtistsDetails.api";
import Spinner from "@/components/Loader/Spinner";

function FavouriteArtists() {
  const navigate = useNavigate();

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery("artists", getFavouriteArtists, {
    select: (data) => data.data.artists,
  });

  const loader = isLoading || isError;

  const onClickArtists = (id) => {
    navigate(`/artists/${id}`);
  };

  return (
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
            <span>
              {!loader && artists.length !== 0 ? artists.length : "No"} artists
            </span>
          </div>
        </div>
      </section>

      {!loader ? (
        <ArtistsContainer
          artistsData={artists}
          onClickArtists={onClickArtists}
        />
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default FavouriteArtists;
