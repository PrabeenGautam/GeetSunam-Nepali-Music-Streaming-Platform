import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import MusicPlayedAnimation from "@/components/MusicPlayed";
import { possibleMediaState } from "@/components/Player/possibleMediaState.types";

const StyledImg = styled("img")(() => ({
  height: "100%",
  width: "100%",
  border: "0px",
}));

export default function CoverArt(props) {
  const { src, sx, id } = props;

  const state = useSelector((state) => state);
  const isPlaying = state.mediaState === possibleMediaState.PLAYING;

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
      {isPlaying && state.trackID === id ? (
        <MusicPlayedAnimation />
      ) : (
        <StyledImg src={src} alt={""} style={{ objectFit: "cover" }} />
      )}
    </Box>
  );
}
