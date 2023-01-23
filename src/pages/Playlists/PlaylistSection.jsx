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

function PlaylistSection() {
  const navigate = useNavigate();

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
          <div>Collection</div>
          <div>Playlists</div>
          <div>
            <span>Created By: {userData.fullname}</span>
            <span style={{ fontWeight: "bold" }}>.</span>
            <span>
              {!loader && playlist.length !== 0 ? playlist.length : "No"}{" "}
              playlist
            </span>
          </div>
        </div>
        <Btn
          style={{ color: "#333", position: "absolute", right: 20 }}
          onClick={playlistHandler}>
          Create Playlists
        </Btn>
      </section>

      {!loader ? (
        <PlaylistsContainer
          data={playlist}
          onClickPlaylists={onClickPlaylists}
        />
      ) : (
        <div className="mt-20">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default PlaylistSection;
