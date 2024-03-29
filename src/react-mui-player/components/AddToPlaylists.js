import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { Box, IconButton } from "@mui/material";
import PlaylistAddContainer from "components/Playlists/PlaylistAddContainer";
import React, { useState } from "react";
import withoutPropagation from "react-mui-player/utils/withoutPropagation";
import { useSelector } from "react-redux";

export default function AddToPlaylists(props) {
  const sx = props.sx;
  const [playlist, setPlaylistAdd] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const currentSong = useSelector((state) => state);

  const onClickHandler = () => {
    const song = currentSong.playlist[currentSong.currentTrack];
    setPlaylistAdd(true);
    setPlaylistData(song);
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
