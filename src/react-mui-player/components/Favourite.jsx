import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionCreators from "@/react-mui-player/redux/actionCreators";

export default function Favourite(props) {
  const sx = props.sx;
  const favourite = useSelector((state) => state.favourite);
  const trackID = useSelector((state) => state.trackID);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(
      ActionCreators.getMusicDetails({ ID: trackID, favourite: !favourite })
    );
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
      <IconButton className="children" onClick={onClickHandler} size="large">
        {favourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
}
