import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { Box, IconButton } from "@mui/material";
import React from "react";
import withoutPropagation from "react-mui-player/utils/withoutPropagation";

export default function AddToPlaylists(props) {
  const sx = props.sx;

  const onClickHandler = () => {
    console.log("Click");
  };

  return (
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
  );
}
