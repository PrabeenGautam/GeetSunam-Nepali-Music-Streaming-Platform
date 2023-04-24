import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import artistsImage from "@/assets/images/music-artists.png";
import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import { getFavouriteArtists } from "@/services/artistsApi/getArtistsDetails.api";
import Spinner from "@/components/Loader/Spinner";
import { useTranslation } from "react-i18next";
import useGSSelector from "@/redux/useGSSelector";

function FavouriteArtists() {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "artists",
  });

  const auth = useGSSelector((state) => state.userState.userData);

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery("fav-artists", getFavouriteArtists, {
    select: (data) => data.data.artists,
    refetchOnWindowFocus: false,
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
          <div>{t("title")}</div>
          <div>{t("favourite")}</div>
          <div>
            <span>{auth.fullname}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {!loader && artists.length !== 0 ? artists.length : "No"}{" "}
              {t("artist")}
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
        <div className="mt-80">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default FavouriteArtists;
