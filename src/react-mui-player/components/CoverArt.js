import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MusicPlayedAnimation from "components/MusicPlayed";
import { useSelector } from "react-redux";

const StyledImg = styled("img")(() => ({
  height: "100%",
  width: "100%",
  border: "0px",
}));

export default function CoverArt(props) {
  const { src, sx, id } = props;

  const state = useSelector((state) => state);
  const isPlaying = state.mediaState === "PLAYING";

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}>
      {isPlaying && Number(state.trackID) === id ? (
        <MusicPlayedAnimation />
      ) : (
        <StyledImg src={src} alt={""} />
      )}
    </Box>
  );
}
