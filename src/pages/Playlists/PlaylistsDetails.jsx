import React from "react";
import { useParams } from "react-router-dom";
import Playlist from "./Playlist";

function PlaylistsDetails() {
  const { id } = useParams();
  const playlistName = `Playlist ${id}`;

  return (
    <>
      <Playlist playlistName={playlistName} />
    </>
  );
}

export default PlaylistsDetails;
