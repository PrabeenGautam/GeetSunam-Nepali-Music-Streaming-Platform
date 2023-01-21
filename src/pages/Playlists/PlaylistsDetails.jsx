import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Playlist from "./Playlist";
import Loading from "@/components/Loading";
import useGSDispatch from "@/redux/useGSDispatch";
import { getPlaylistByIDThunk } from "@/redux/middlewares/playlistThunk";
import useGSSelector from "@/redux/useGSSelector";

function PlaylistsDetails() {
  const playlistName = `Playlist`;
  const { id: playlistID } = useParams();
  const dispatch = useGSDispatch();

  const playlist = useGSSelector((state) => state.playlistState.playlistByID);

  useEffect(() => {
    dispatch(getPlaylistByIDThunk(playlistID));
  }, [playlistID, dispatch]);

  return playlist ? (
    <Playlist playlistName={playlistName} playlist={playlist} />
  ) : (
    <Loading />
  );
}

export default PlaylistsDetails;
