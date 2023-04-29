import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import Spinner from "@/components/Loader/Spinner";
import { getGenresApi } from "@/services/musicApi/getGenres.api";

function Genre() {
  const { t } = useTranslation("translation", { keyPrefix: "sidebarRight" });

  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery("genres", getGenresApi, {
    select: (data) => data.data.genres,
    refetchOnWindowFocus: false,
  });

  const loader = isLoading || isError;
  return (
    <div className="content-container">
      <h2>{t("genre")}</h2>
      {!loader ? (
        <div className="grid gap-sm genre-section">
          {genres.map((value) => {
            return (
              <div className="genre" key={value._id}>
                <Link to={`/genre/${value._id}`}>
                  <div className="genre-image">
                    <img src={value.image} alt={t("genre")} />
                  </div>
                  <div className="genre-name">{value.name}</div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Genre;
