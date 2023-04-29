import { Link } from "react-router-dom";

import useGSSelector from "@/redux/useGSSelector";

import { getGenresApi } from "@/services/musicApi/getGenres.api";
import Spinner from "../Loader/Spinner";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import LoginUser from "./LoginUser";

function SidebarRight() {
  const { userData } = useGSSelector((state) => state.userState);
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

  return !loader ? (
    <div className="sidebar-right">
      <LoginUser userData={userData} />

      {genres && (
        <>
          <div className="sidebar-title">{t("genre")}</div>
          <div className="grid genre-sidebar gap-sm">
            {genres.map((value) => {
              return (
                <div className="genre" key={value._id}>
                  <Link to={`genre/${value._id}`}>
                    <div className="genre-image">
                      <img src={value.image} alt={t("genre")} />
                    </div>
                    <div className="genre-name">{value.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  ) : (
    <Spinner />
  );
}

export default SidebarRight;
