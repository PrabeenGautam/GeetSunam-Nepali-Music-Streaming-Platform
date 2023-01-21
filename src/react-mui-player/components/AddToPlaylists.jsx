import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import PlaylistAddContainer from "@/components/Playlists/PlaylistAddContainer";
import withoutPropagation from "@/react-mui-player/utils/withoutPropagation";

export default function AddToPlaylists(props) {
  const sx = props.sx;
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const currentSong = useSelector((state) => state);

  const onClickHandler = () => {
    const songId = currentSong.playlist[currentSong.currentTrack].ID;
    setPlaylistAdd(true);
    setPlaylistData(songId);
  };

  return (
    <>
      {playlist && playlistData && (
        <PlaylistAddContainer setClick={setPlaylistAdd} data={playlistData} />
      )}
      <Box
        sx={{
          display: "flex",
          width: "60px",
          direction: "row",
          wrap: "nowrap",
          alignItems: "center",
          "& > .children": {
            mx: 1,
          },
          ...sx,
        }}>
        <IconButton
          className="children"
          onClick={withoutPropagation(onClickHandler)}
          title="Add to Playlist"
          size="large">
          <PlaylistAddRoundedIcon />
        </IconButton>
      </Box>
    </>
  );
}
