import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators";

import { Slider, IconButton, Box, Popover } from "@mui/material";
import {
  VolumeUp as VolumeFullIcon,
  RemoveCircle,
  VolumeOff,
  AddCircle,
} from "@mui/icons-material";

import withoutPropagation from "../utils/withoutPropagation";

export default function VolumeControl(props) {
  const sx = props.sx;

  const dispatch = useDispatch();
  const onVolumeChange = (value) =>
    dispatch(actionCreators.changeVolume(value));

  const value = useSelector(
    /**@type {import("../redux/types").useSelectCb} */
    (state) => state.volume
  );

  const handleSliderChange = (event, newValue) => {
    onVolumeChange(newValue);
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
        title="Reduce Volume"
        onClick={withoutPropagation(
          onVolumeChange,
          value < 10 ? 0 : value - 10
        )}
        size="large">
        {value === 0 ? <VolumeOff /> : <RemoveCircle />}
      </IconButton>
      <Slider
        className="children"
        value={value}
        valueLabelDisplay="auto"
        aria-labelledby="continuous-slider"
        onChange={handleSliderChange}
      />
      <IconButton
        className="children"
        title="Increase Volume"
        onClick={withoutPropagation(
          onVolumeChange,
          value > 90 ? 100 : value + 10
        )}
        size="large">
        {value === 100 ? <VolumeFullIcon /> : <AddCircle />}
      </IconButton>
    </Box>
  );
}
