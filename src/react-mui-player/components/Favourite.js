import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import withoutPropagation from "react-mui-player/utils/withoutPropagation";
import { useSelector } from "react-redux";

export default function Favourite(props) {
  const isFavourite = false;
  const sx = props.sx;

  // const value = useSelector(
  //   /**@type {import("../redux/types").useSelectCb} */
  //   (state) => state.volume
  // );

  const onClickHandler = () => {
    console.log("Click");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "70px",
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
        {isFavourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
}
