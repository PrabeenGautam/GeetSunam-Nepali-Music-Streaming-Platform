import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import ArtistsContainer from "@/components/Artists/ArtistsContainer";
import { getArtistsAPI } from "@/services/artistsApi/getArtistsDetails.api";
import artistsImage from "@/assets/images/music-artists.png";
import Spinner from "@/components/Loader/Spinner";
import { useTranslation } from "react-i18next";

function Artists() {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "artists",
  });

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery("artists", getArtistsAPI, {
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
          <img src={artistsImage} alt="" className="custom-img" />
        </div>
        <div className="playlist-details">
          <div>{t("title")}</div>
          <div>{t("artist")}</div>
          <div>
            <span>{t("geetsunam")}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {artists?.length} {t("artist")}
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

export default Artists;
