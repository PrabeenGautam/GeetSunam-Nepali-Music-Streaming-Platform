import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import PlaylistsCover from "assets/images/playlists-cover.png";
import PlaylistsContainer from "./PlaylistContainer";
import { Btn } from "components/StyledUI";
import { createPlaylistsAPI } from "services/playlistApi/getPlaylist.api";
import Loading from "components/Loading";
import useGSSelector from "redux/useGSSelector";
import useGSDispatch from "redux/useGSDispatch";
import { getPlaylistThunk } from "redux/middlewares/playlistThunk";

function PlaylistSection() {
  const navigate = useNavigate();
  const dispatch = useGSDispatch();

  const userData = useGSSelector((state) => state.userState.userData);
  const playlist = useGSSelector((state) => state.playlistState.playlists);

  useEffect(() => {
    dispatch(getPlaylistThunk());
  }, [dispatch]);

  const onClickPlaylists = (playlists) => {
    navigate(`/playlists/${playlists}`);
  };

  const playlistHandler = async () => {
    const response = await createPlaylistsAPI();
    if (response.data) {
      dispatch(getPlaylistThunk());
    }
  };

  return playlist ? (
    <div className="playlist-container gradient">
      <section className="playlist">
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
              {playlist.length === 0 ? "No" : playlist.length} playlist
            </span>
          </div>
        </div>
        <Btn
          style={{ color: "#333", position: "absolute", right: 20 }}
          onClick={playlistHandler}>
          Create Playlists
        </Btn>
      </section>

      <PlaylistsContainer data={playlist} onClickPlaylists={onClickPlaylists} />
    </div>
  ) : (
    <Loading />
  );
}

export default PlaylistSection;
