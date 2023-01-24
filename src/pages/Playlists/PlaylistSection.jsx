import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import PlaylistsCover from "@/assets/images/playlists-cover.png";
import PlaylistsContainer from "./PlaylistContainer";
import { Btn } from "@/components/StyledUI";

import {
  createPlaylistsAPI,
  getPlaylistsAPI,
} from "@/services/playlistApi/getPlaylist.api";

import useGSSelector from "@/redux/useGSSelector";
import Spinner from "@/components/Loader/Spinner";
import { useTranslation } from "react-i18next";

function PlaylistSection() {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", {
    keyPrefix: "playlistsPage",
  });

  const userData = useGSSelector((state) => state.userState.userData);

  const {
    data: playlist,
    isLoading,
    isError,
    refetch: refetchPlaylist,
  } = useQuery("playlists", getPlaylistsAPI, {
    select: (data) => data.data.playlists,
  });

  const loader = isLoading || isError;

  const onClickPlaylists = (playlists) => {
    navigate(`/playlists/${playlists}`);
  };

  const playlistHandler = async () => {
    const response = await createPlaylistsAPI();
    if (response.data) {
      refetchPlaylist();
    }
  };

  return (
    <div className="playlist-container gradient">
      <section className="playlist" style={{ marginBottom: "2rem" }}>
        <div className="playlist-images custom">
          <img src={PlaylistsCover} alt="playlists" />
        </div>
        <div className="playlist-details">
          <div>{t("collection")}</div>
          <div>{t("playlist")}</div>
          <div>
            <span>
              {t("createdBy")}: {userData.fullname}
            </span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {!loader && playlist.length !== 0 ? playlist.length : "No"}{" "}
              {t("playlist")}
            </span>
          </div>
        </div>
        <Btn
          style={{ color: "#333", position: "absolute", right: 20 }}
          onClick={playlistHandler}>
          {t("createPlaylist")}
        </Btn>
      </section>

      {!loader ? (
        <PlaylistsContainer
          data={playlist}
          onClickPlaylists={onClickPlaylists}
        />
      ) : (
        <div className="mt-80">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default PlaylistSection;
