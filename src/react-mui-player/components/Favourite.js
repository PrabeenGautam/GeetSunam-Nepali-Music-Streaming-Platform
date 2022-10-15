import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import withoutPropagation from "react-mui-player/utils/withoutPropagation";
import { useSelector } from "react-redux";

export default function Favourite(props) {
  const sx = props.sx;
  const favourite = useSelector((state) => state.favourite);

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
        size="large">
        {favourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
}
