import { useQuery, useQueryClient } from "react-query";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import Spinner from "@/components/Loader/Spinner";
import {
  deleteCurrentUserSong,
  getCurrentUserSongs,
} from "@/services/musicApi/getSongs.api";
import { trackDetails } from "@/utils/trackDetails.utils";
import CurrentSongsList from "@/components/Artists/CurrentSongsList";
import { useState } from "react";
import DeleteModel from "@/components/Playlists/DeleteModel";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "dashboard" });

  const {
    data: songs,
    isLoading,
    isError,
  } = useQuery("currentUserSongs", getCurrentUserSongs, {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const currentUserSongs = songs && trackDetails(songs);
  const loader = isLoading || isError;

  const [deleteSong, setDeleteSong] = useState(false);

  const deleteSongHandler = async () => {
    if (!deleteSong) return;

    await deleteCurrentUserSong(deleteSong._id);
    queryClient.invalidateQueries("currentUserSongs");
    setDeleteSong(false);
  };

  const editHandler = async (value) => {
    navigate(`/users/song/${value._id}`, { state: value });
  };

  return (
    <>
      {deleteSong && (
        <DeleteModel
          modalMessage={`Remove ${deleteSong.title} from the library`}
          setClick={setDeleteSong}
          deleteHandler={deleteSongHandler}
        />
      )}
      <div className="content-container">
        <h2 style={{ color: "#f6f6f6", marginBottom: 20 }}>
          {t("manageSongs")}
        </h2>

        <div className="settings-section">
          {!loader ? (
            <CurrentSongsList
              data={currentUserSongs}
              setDeleteSong={setDeleteSong}
              editHandler={editHandler}
            />
          ) : (
            <div className="mt-80" style={{ marginBottom: 80 }}>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
